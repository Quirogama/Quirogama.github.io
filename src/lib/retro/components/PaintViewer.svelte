<script>
  import { onMount } from 'svelte';
  let canvasEl;
  let ctx;
  let { width = 535, height = 290 } = $props();

  let tool = $state('pencil');
  let color1 = $state('#000000');
  let color2 = $state('#FFFFFF');
  let size = $state(1);

  const palette = [
    '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
    '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000',
    '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF',
    '#FFFF80', '#00FF80', '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
  ];

  let drawing = $state(false);
  let start = $state({ x: 0, y: 0 });
  let last = $state({ x: 0, y: 0 });
  let snapshot = $state(null);
  let wasDrawingOnLeave = $state(false);

  // Inicializa el canvas con fondo blanco al montar
  onMount(() => {
    ctx = canvasEl.getContext('2d');
    resizeCanvas();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  });

  // Ajusta el canvas considerando el pixel ratio de pantallas de alta densidad
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvasEl.width = width * dpr;
    canvasEl.height = height * dpr;
    canvasEl.style.width = width + 'px';
    canvasEl.style.height = height + 'px';
    ctx = canvasEl.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Convierte coordenadas del mouse a coordenadas locales del canvas
  function toLocal(e) {
    const rect = canvasEl.getBoundingClientRect();
    const xClient = e.clientX - rect.left;
    const yClient = e.clientY - rect.top;
    const dpr = window.devicePixelRatio || 1;
    const scaleX = (canvasEl.width / dpr) / rect.width;
    const scaleY = (canvasEl.height / dpr) / rect.height;
    return { x: xClient * scaleX, y: yClient * scaleY };
  }

  // Inicia el dibujo: activa herramienta según el tool seleccionado
  function pointerDown(e) {
    const p = toLocal(e);
    drawing = true;
    start = { ...p };
    last = { ...p };
    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }
    if (tool === 'fill') {
      bucketFill(Math.round(p.x), Math.round(p.y));
    }
    if (tool === 'picker') {
      pickColor(Math.round(p.x), Math.round(p.y));
      drawing = false;
    }
  }

  // Maneja el movimiento del puntero: dibuja líneas, formas o borra según la herramienta
  function pointerMove(e) {
    if (e && typeof e.buttons !== 'undefined' && e.buttons === 0) {
      if (drawing) {
        drawing = false;
        snapshot = null;
      }
      return;
    }
    if (!drawing) return;
    const p = toLocal(e);
    if (tool === 'pencil') {
      ctx.strokeStyle = color1;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
    } else if (tool === 'brush') {
      ctx.strokeStyle = color1;
      ctx.lineWidth = size * 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = size * 4;
      ctx.lineCap = 'square';
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
    } else {
      redrawPreview(p);
    }
  }

  // Finaliza el dibujo: renderiza formas finales (líneas, rectángulos, elipses)
  function pointerUp(e) {
    if (!drawing) return;
    drawing = false;
    const p = toLocal(e);
    if (tool === 'line') {
      ctx.strokeStyle = color1;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    } else if (tool === 'rect') {
      ctx.strokeStyle = color1;
      ctx.lineWidth = size;
      const x = Math.min(start.x, p.x);
      const y = Math.min(start.y, p.y);
      const w = Math.abs(p.x - start.x);
      const h = Math.abs(p.y - start.y);
      ctx.strokeRect(x, y, w, h);
    } else if (tool === 'ellipse') {
      ctx.strokeStyle = color1;
      ctx.lineWidth = size;
      const x = Math.min(start.x, p.x);
      const y = Math.min(start.y, p.y);
      const w = Math.abs(p.x - start.x);
      const h = Math.abs(p.y - start.y);
      ctx.beginPath();
      ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (tool === 'rectFilled') {
      ctx.fillStyle = color1;
      const x = Math.min(start.x, p.x);
      const y = Math.min(start.y, p.y);
      const w = Math.abs(p.x - start.x);
      const h = Math.abs(p.y - start.y);
      ctx.fillRect(x, y, w, h);
    } else if (tool === 'ellipseFilled') {
      ctx.fillStyle = color1;
      const x = Math.min(start.x, p.x);
      const y = Math.min(start.y, p.y);
      const w = Math.abs(p.x - start.x);
      const h = Math.abs(p.y - start.y);
      ctx.beginPath();
      ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
    snapshot = null;
  }

  // Detiene el dibujo al salir del canvas, guarda estado si se estaba dibujando
  function pointerLeave(e) {
    if (drawing && e && typeof e.buttons !== 'undefined' && e.buttons !== 0) {
      wasDrawingOnLeave = true;
    } else {
      wasDrawingOnLeave = false;
    }
    drawing = false;
    snapshot = null;
  }

  // Retoma el dibujo al volver a entrar al canvas con el botón presionado
  function pointerEnter(e) {
    if (wasDrawingOnLeave && e && typeof e.buttons !== 'undefined' && e.buttons !== 0) {
      const p = toLocal(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      drawing = true;
      wasDrawingOnLeave = false;
      start = { ...p };
      last = { ...p };
      return;
    }
    if (drawing) drawing = false;
    wasDrawingOnLeave = false;
    snapshot = null;
    start = { x: 0, y: 0 };
    last = { x: 0, y: 0 };
  }

  // Redibuja preview de formas (línea/rectángulo/elipse) mientras se arrastra
  function redrawPreview(p) {
    if (!snapshot) return;
    ctx.putImageData(snapshot, 0, 0);
    ctx.strokeStyle = color1;
    ctx.fillStyle = color1;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    
    if (tool === 'line') {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    } else if (tool === 'rect') {
      const x = Math.min(start.x, p.x);
      const y = Math.min(start.y, p.y);
      const w = Math.abs(p.x - start.x);
      const h = Math.abs(p.y - start.y);
      ctx.strokeRect(x, y, w, h);
    } else if (tool === 'ellipse') {
      const x = Math.min(start.x, p.x);
      const y = Math.min(start.y, p.y);
      const w = Math.abs(p.x - start.x);
      const h = Math.abs(p.y - start.y);
      ctx.beginPath();
      ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (tool === 'rectFilled') {
      const x = Math.min(start.x, p.x);
      const y = Math.min(start.y, p.y);
      const w = Math.abs(p.x - start.x);
      const h = Math.abs(p.y - start.y);
      ctx.fillRect(x, y, w, h);
    } else if (tool === 'ellipseFilled') {
      const x = Math.min(start.x, p.x);
      const y = Math.min(start.y, p.y);
      const w = Math.abs(p.x - start.x);
      const h = Math.abs(p.y - start.y);
      ctx.beginPath();
      ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // Guarda snapshot del canvas para herramientas de forma (permite preview)
  function beginPreview() {
    if (tool === 'line' || tool === 'rect' || tool === 'ellipse' || tool === 'rectFilled' || tool === 'ellipseFilled') {
      snapshot = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
    }
  }

  // Limpia el canvas con fondo blanco
  function clearCanvas() {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }

  // Descarga el canvas como PNG
  function savePNG() {
    const link = document.createElement('a');
    link.download = 'paint.png';
    link.href = canvasEl.toDataURL('image/png');
    link.click();
  }

  // Selector: captura el color del pixel clickeado
  function pickColor(x, y) {
    const img = ctx.getImageData(x, y, 1, 1);
    const d = img.data;
    const r = d[0].toString(16).padStart(2, '0');
    const g = d[1].toString(16).padStart(2, '0');
    const b = d[2].toString(16).padStart(2, '0');
    color1 = `#${r}${g}${b}`;
  }

  // Relleno por inundación: pinta área contigua del mismo color usando stack
  function bucketFill(x, y) {
    const img = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
    const w = img.width;
    const h = img.height;
    const d = img.data;
    const targetOffset = (y * w + x) * 4;
    const targetR = d[targetOffset];
    const targetG = d[targetOffset + 1];
    const targetB = d[targetOffset + 2];
    const targetA = d[targetOffset + 3];
    const fillColor = hexToRgba(color1);
    if (targetR === fillColor[0] && targetG === fillColor[1] && targetB === fillColor[2] && targetA === fillColor[3]) return;

    const stack = [[x, y]];
    while (stack.length) {
      const [cx, cy] = stack.pop();
      if (cx < 0 || cy < 0 || cx >= w || cy >= h) continue;
      const off = (cy * w + cx) * 4;
      if (d[off] === targetR && d[off + 1] === targetG && d[off + 2] === targetB && d[off + 3] === targetA) {
        d[off] = fillColor[0];
        d[off + 1] = fillColor[1];
        d[off + 2] = fillColor[2];
        d[off + 3] = fillColor[3];
        stack.push([cx + 1, cy]);
        stack.push([cx - 1, cy]);
        stack.push([cx, cy + 1]);
        stack.push([cx, cy - 1]);
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  // Convierte color hexadecimal a array RGBA
  function hexToRgba(hex) {
    const c = hex.replace('#', '');
    const bigint = parseInt(c.length === 3 ? c.split('').map(ch => ch + ch).join('') : c, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b, 255];
  }
</script>

<div class="paint-root">
  <div class="paint-container">
    <!-- Toolbox a la izquierda con iconos tipo Windows 98 -->
    <div class="toolbox">
      <div class="tool-grid">
        <button class="tool-btn" class:active={tool==='pencil'} onclick={() => tool='pencil'} title="Lápiz (P)">✏️</button>
        <button class="tool-btn" class:active={tool==='brush'} onclick={() => tool='brush'} title="Pincel (B)">🖌️</button>
        <button class="tool-btn" class:active={tool==='fill'} onclick={() => tool='fill'} title="Relleno (F)">🪣</button>
        <button class="tool-btn" class:active={tool==='picker'} onclick={() => tool='picker'} title="Selector color (I)">💧</button>
        <button class="tool-btn" class:active={tool==='eraser'} onclick={() => tool='eraser'} title="Borrador (E)">🧹</button>
        <button class="tool-btn" class:active={tool==='line'} onmousedown={beginPreview} onclick={() => tool='line'} title="Línea (L)">/</button>
        <button class="tool-btn" class:active={tool==='rect'} onmousedown={beginPreview} onclick={() => tool='rect'} title="Rectángulo (R)">▭</button>
        <button class="tool-btn" class:active={tool==='ellipse'} onmousedown={beginPreview} onclick={() => tool='ellipse'} title="Elipse (O)">○</button>
        <button class="tool-btn" class:active={tool==='rectFilled'} onmousedown={beginPreview} onclick={() => tool='rectFilled'} title="Rectángulo relleno">▬</button>
        <button class="tool-btn" class:active={tool==='ellipseFilled'} onmousedown={beginPreview} onclick={() => tool='ellipseFilled'} title="Elipse rellena">●</button>
      </div>
      
      <!-- Selector de tamaño -->
      <div class="size-selector">
        <div class="size-title">Tamaño:</div>
        <div class="size-options">
          <button class="size-btn" class:active={size===1} onclick={() => size=1}>·</button>
          <button class="size-btn" class:active={size===2} onclick={() => size=2}>•</button>
          <button class="size-btn" class:active={size===3} onclick={() => size=3}>●</button>
          <button class="size-btn" class:active={size===5} onclick={() => size=5}>⬤</button>
        </div>
      </div>
    </div>

    <!-- Área del canvas -->
    <div class="canvas-area">
      <canvas
        bind:this={canvasEl}
        onpointerdown={(e) => { beginPreview(e); pointerDown(e); }}
        onpointermove={pointerMove}
        onpointerup={pointerUp}
        onpointerleave={pointerLeave}
        onpointerenter={pointerEnter}
      ></canvas>
    </div>
  </div>

  <!-- Barra inferior con selector de colores y paleta -->
  <div class="bottom-panel">
    <div class="color-box">
      <div class="color-display">
        <div class="color-primary" style="background:{color1}" title="Color 1"></div>
        <div class="color-secondary" style="background:{color2}" title="Color 2"></div>
      </div>
    </div>
    
    <div class="palette">
      {#each palette.slice(0, 14) as c}
        <button class="color-swatch" class:selected={color1 === c} style="background:{c};" onclick={() => color1 = c} title={c}></button>
      {/each}
      <div class="palette-row2">
        {#each palette.slice(14) as c}
          <button class="color-swatch" class:selected={color1 === c} style="background:{c};" onclick={() => color1 = c} title={c}></button>
        {/each}
      </div>
    </div>

    <div class="actions">
      <button class="action-btn" onclick={clearCanvas} title="Limpiar (C)">Limpiar</button>
      <button class="action-btn" onclick={savePNG} title="Guardar (S)">Guardar</button>
    </div>
  </div>
</div>

<style>
  .paint-root {
    font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #c0c0c0;
  }

  .paint-container {
    display: flex;
    flex: 1;
    gap: 2px;
    padding: 2px;
    overflow: hidden;
  }

  /* Toolbox estilo Windows 98 */
  .toolbox {
    width: 62px;
    background: #c0c0c0;
    border: 2px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
    padding: 3px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tool-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
  }

  .tool-btn {
    width: 24px;
    height: 24px;
    aspect-ratio: 1 / 1;
    padding: 0;
    border: 1px solid;
    border-color: #dfdfdf #000000 #000000 #dfdfdf;
    background: #c0c0c0;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'MS Sans Serif', 'Tahoma', sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    line-height: 1;
  }

  .tool-btn:hover {
    border-color: #ffffff #808080 #808080 #ffffff;
  }

  .tool-btn.active {
    border-color: #000000 #dfdfdf #dfdfdf #000000;
    background: #ffffff;
  }

  .size-selector {
    border-top: 1px solid #808080;
    padding-top: 6px;
  }

  .size-title {
    font-size: 9px;
    display: block;
    margin-bottom: 4px;
  }

  .size-options {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .size-btn {
    width: 100%;
    height: 18px;
    padding: 0;
    border: 1px solid;
    border-color: #dfdfdf #000000 #000000 #dfdfdf;
    background: #c0c0c0;
    cursor: pointer;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .size-btn.active {
    border-color: #000000 #dfdfdf #dfdfdf #000000;
    background: #ffffff;
  }

  /* Canvas area */
  .canvas-area {
    flex: 1;
    background: #ffffff;
    border: 2px solid;
    border-color: #808080 #dfdfdf #dfdfdf #808080;
    overflow: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 4px;
  }

  canvas {
    background: #ffffff;
    display: block;
    cursor: crosshair;
    image-rendering: pixelated;
    width: auto;
    height: auto;
    flex: 0 0 auto;
  }

  /* Panel inferior */
  .bottom-panel {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px;
    background: #c0c0c0;
    border-top: 2px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
    min-height: 42px;
  }

  .color-box {
    width: 36px;
    height: 36px;
    border: 1px solid #000;
    background: #c0c0c0;
    position: relative;
  }

  .color-display {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .color-primary {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 2px;
    left: 2px;
    border: 1px solid #000;
  }

  .color-secondary {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 2px;
    right: 2px;
    border: 1px solid #000;
  }

  /* Paleta de colores */
  .palette {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    max-width: 420px;
  }

  .color-swatch {
    width: 18px;
    height: 18px;
    aspect-ratio: 1 / 1;
    border: 2px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
    padding: 0;
    margin: 0;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 0;
    min-width: 0;
    min-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }

  .color-swatch:hover {
    border-color: #ffffff #000000 #000000 #ffffff;
  }

  .color-swatch.selected {
    border-color: #000000 #dfdfdf #dfdfdf #000000;
    box-shadow: inset 1px 1px #808080;
  }

  .palette-row2 {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 2px;
  }

  /* Botones de acción */
  .actions {
    display: flex;
    gap: 4px;
  }

  .action-btn {
    padding: 4px 12px;
    border: 2px solid;
    border-color: #ffffff #000000 #000000 #ffffff;
    background: #c0c0c0;
    cursor: pointer;
    font-size: 11px;
    font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  }

  .action-btn:active {
    border-color: #000000 #ffffff #ffffff #000000;
  }
</style>



