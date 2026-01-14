<script>
  import { onMount } from 'svelte';
  let canvasEl;
  let ctx;
  // Tamaño del canvas
  export let width = 600;
  export let height = 240;

  // Variables de estado
  let isOutside = false; // Si el puntero está fuera del canvas
  let tool = 'pencil'; // Herramienta seleccionada
  let color = '#000000'; // Color actual
  let bg = '#ffffff'; // Color de fondo
  let size = 4; // Tamaño del pincel

  // Paleta de colores clásica de MS Paint
  const palette = [
    '#000000', '#808080', '#C0C0C0', '#FFFFFF', // negros/blancos
    '#800000', '#FF0000', '#FFA500', '#FFFF00', // rojos/naranja/amarillo
    '#008000', '#00FF00', '#00FFFF', '#0000FF', // verdes/cianes/azules
    '#800080', '#A52A2A' // púrpura/marrón
  ];

  let drawing = false; // Si se está dibujando actualmente
  let start = { x: 0, y: 0 }; // Punto de inicio del trazo
  let last = { x: 0, y: 0 }; // Último punto del trazo
  let wasDrawingOnLeave = false; // Si estaba dibujando cuando el puntero salió

  // Inicializa el canvas y el contexto 2D
  onMount(() => {
    ctx = canvasEl.getContext('2d');
    resizeCanvas();
    // Rellena el fondo
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  });

  // Redimensiona el canvas considerando la densidad de píxeles del dispositivo
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvasEl.width = width * dpr;
    canvasEl.height = height * dpr;
    canvasEl.style.width = width + 'px';
    canvasEl.style.height = height + 'px';
    ctx = canvasEl.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Convierte coordenadas del evento a coordenadas del canvas
  function toLocal(e) {
    const rect = canvasEl.getBoundingClientRect();
    const xClient = e.clientX - rect.left;
    const yClient = e.clientY - rect.top;
    const styledW = parseFloat(canvasEl.style.width) || width;
    const styledH = parseFloat(canvasEl.style.height) || height;
    const scaleX = styledW / rect.width;
    const scaleY = styledH / rect.height;
    return { x: xClient * scaleX, y: yClient * scaleY };
  }

  // Inicia el dibujo cuando se presiona el puntero
  function pointerDown(e) {
    const p = toLocal(e);
    drawing = true;
    start = { ...p };
    last = { ...p };
    if (tool === 'pencil' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }
    if (tool === 'fill') {
      bucketFill(Math.round(p.x), Math.round(p.y));
    }
    try { canvasEl && canvasEl.focus && canvasEl.focus(); } catch (err) {}
  }

  // Maneja los atajos de teclado
  function keydownHandler(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (k === 'p') {
      tool = 'pencil';
      e.preventDefault();
    } else if (k === 'l') {
      tool = 'line';
      e.preventDefault();
    } else if (k === 'r') {
      tool = 'rect';
      e.preventDefault();
    } else if (k === 'f') {
      tool = 'fill';
      e.preventDefault();
    } else if (k === 'e') {
      tool = 'eraser';
      e.preventDefault();
    } else if (k === 's') {
      savePNG();
      e.preventDefault();
    } else if (k === 'c') {
      clearCanvas();
      e.preventDefault();
    } else if (k === 'escape') {
      // Cancela la previsualización
      if (snapshot) {
        try { ctx.putImageData(snapshot, 0, 0); } catch (err) {}
        snapshot = null;
      }
      drawing = false;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      size = Math.max(1, size - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      size = Math.min(64, size + 1);
      e.preventDefault();
    }
  }

  // Dibuja mientras se mueve el puntero
  function pointerMove(e) {
    try { canvasEl.releasePointerCapture && canvasEl.releasePointerCapture(e.pointerId); } catch (err) {}
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
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
    } else if (tool === 'eraser') {
      ctx.strokeStyle = bg;
      ctx.lineWidth = size * 2;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
    } else {
      // Muestra previsualización para líneas y rectángulos
      redrawPreview(p);
    }
  }

  let snapshot = null; // Almacena la imagen para previsualizaciones

  // Finaliza el dibujo cuando se suelta el puntero
  function pointerUp(e) {
    if (!drawing) return;
    drawing = false;
    const p = toLocal(e);
    if (tool === 'line') {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    } else if (tool === 'rect') {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      const x = Math.min(start.x, p.x);
      const y = Math.min(start.y, p.y);
      const w = Math.abs(p.x - start.x);
      const h = Math.abs(p.y - start.y);
      ctx.strokeRect(x, y, w, h);
    }
    snapshot = null;
  }

  // Maneja cuando el puntero sale del canvas
  function pointerLeave(e) {
    if (drawing && e && typeof e.buttons !== 'undefined' && e.buttons !== 0) {
      wasDrawingOnLeave = true;
    } else {
      wasDrawingOnLeave = false;
    }
    drawing = false;
    snapshot = null;
    try { ctx.closePath(); ctx.beginPath(); } catch (err) {}
  }

  // Maneja cuando el puntero entra al canvas nuevamente
  function pointerEnter(e) {
    if (wasDrawingOnLeave && e && typeof e.buttons !== 'undefined' && e.buttons !== 0) {
      const p = toLocal(e);
      try {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
      } catch (err) {}
      drawing = true;
      wasDrawingOnLeave = false;
      start = { ...p };
      last = { ...p };
      return;
    }
    if (drawing) drawing = false;
    wasDrawingOnLeave = false;
    snapshot = null;
    try { ctx.closePath(); ctx.beginPath(); } catch (err) {}
    start = { x: 0, y: 0 };
    last = { x: 0, y: 0 };
  }

  // Redibuja la previsualización de líneas y rectángulos
  function redrawPreview(p) {
    if (!snapshot) return;
    ctx.putImageData(snapshot, 0, 0);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
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
    }
  }

  // Guarda el snapshot para previsualizaciones
  function beginPreview(e) {
    if (tool === 'line' || tool === 'rect') {
      snapshot = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
    }
  }

  // Limpia todo el canvas
  function clearCanvas() {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }

  // Descarga el canvas como imagen PNG
  function savePNG() {
    const link = document.createElement('a');
    link.download = 'paint.png';
    link.href = canvasEl.toDataURL('image/png');
    link.click();
  }

  // Rellena con un color similar (flood fill basado en stack)
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
    const fillColor = hexToRgba(color);
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

  // Convierte color hexadecimal a RGB
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
  <div class="container">
    <!-- Área principal: herramientas a la izquierda y canvas a la derecha -->
    <div class="top">
      <div class="tools-column" role="group" aria-label="Tools">
        <!-- Botones de herramientas -->
        <button class:active={tool==='pencil'} on:click={() => tool='pencil'} title="Pencil">Pencil</button>
        <button class:active={tool==='line'} on:mousedown={beginPreview} on:click={() => tool='line'} title="Line">Line</button>
        <button class:active={tool==='rect'} on:mousedown={beginPreview} on:click={() => tool='rect'} title="Rectangle">Rectangle</button>
        <button class:active={tool==='fill'} on:click={() => tool='fill'} title="Fill">Fill</button>
        <button class:active={tool==='eraser'} on:click={() => tool='eraser'} title="Eraser">Eraser</button>

        <div class="tools-column-controls">
          <label class="brush-label" for="brushSize">Brush size</label>
          <input id="brushSize" class="brush-range" type="range" min="1" max="32" bind:value={size} aria-label="Brush size" />
          <button class="wide" on:click={clearCanvas} title="Clear">Clear</button>
          <button class="wide" on:click={savePNG} title="Save">Save</button>
        </div>
      </div>

      <!-- Canvas para dibujar -->
      <div class="canvas-wrap">
        <canvas
          bind:this={canvasEl}
          tabindex="0"
          on:keydown={keydownHandler}
          on:pointerdown={(e) => { beginPreview(e); pointerDown(e); }}
          on:pointermove={pointerMove}
          on:pointerup={pointerUp}
          on:pointerleave={pointerLeave}
          on:pointerenter={pointerEnter}
        ></canvas>
      </div>
    </div>

    <!-- Barra inferior con paleta de colores -->
    <div class="bottom-bar" role="toolbar" aria-label="Tools and colors">
      <div class="palette-row" role="list" aria-label="Color palette">
        {#each palette as c}
          <button class="swatch" class:selected={color === c} style="background:{c};" on:click={() => color = c} aria-label={c}></button>
        {/each}
      </div>
    </div>
    <!-- Espaciador inferior -->
    <div class="bottom-spacer" aria-hidden="true"></div>
  </div>
</div>

<style>
  .paint-root { font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif; }

  /* Layout: canvas arriba, barra inferior con herramientas y paleta */
  .container { display:flex; flex-direction:column; gap:8px; }

  .canvas-wrap { flex:1; padding:6px; background: #e4e4e4; display:flex; justify-content:center; align-items:center; overflow:auto; }
  canvas { background: #fff; border: 2px solid #000; image-rendering: pixelated; cursor: crosshair; max-width:100%; height:auto; display:block; }

  .top { display:flex; gap:8px; align-items:flex-start; }
  /* Columna de herramientas a la izquierda */
  .tools-column { width:115px; display:flex; flex-direction:column; gap:6px; }
  .tools-column button { background: #e9e9e9; border:2px outset #fff; padding:4px 6px; font-size:12px; cursor:pointer; text-align:left; }
  .tools-column button.active { border: 2px inset #000; }
  .tools-column-controls { display:flex; flex-direction:column; gap:6px; margin-top:6px; }
  .tools-column .brush-range { width:100%; }
  .tools-column .wide { width:100%; padding:5px 6px; }

  .bottom-bar { display:flex; align-items:center; gap:10px; padding:6px; background:#cfcfcf; border-top:2px solid #fff; flex-wrap:wrap; }
  .brush-label { font-size:12px; margin-right:6px; }
  .brush-range { width:120px; }
  .wide { padding:6px 8px; background:#e9e9e9; border:2px outset #fff; cursor:pointer; }

  /* Paleta de colores */
  .palette-row { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
  .swatch { width:28px; height:28px; border:1px solid #333; padding:0; margin:0; cursor:pointer; box-sizing:border-box; flex: 0 0 auto; }
  .swatch.selected { outline: 2px solid #000; box-shadow: 0 0 0 2px #fff inset; }
  .bottom-spacer { height: 0px; }
</style>
