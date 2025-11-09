<script>
  import { onMount } from 'svelte';
  let canvasEl;
  let ctx;
  // slightly larger default canvas so it's comfortable to draw
  // adjusted per user request (+3px)
  export let width = 600;
  // reduce canvas so added vertical space appears below the colors instead
  export let height = 240;

  // tools: pencil, line, rect, clear, fill (basic), eraser
  // track if pointer is currently outside the canvas (used when pointer capture is active)
  let isOutside = false;
  let tool = 'pencil';
  let color = '#000000';
  let bg = '#ffffff';
  let size = 4;

  // Classic MS Paint-like default palette (rows shown at bottom)
  const palette = [
    '#000000', '#808080', '#C0C0C0', '#FFFFFF', // blacks/whites
    '#800000', '#FF0000', '#FFA500', '#FFFF00', // reds/orange/yellow
    '#008000', '#00FF00', '#00FFFF', '#0000FF', // greens/cyans/blues
    '#800080', '#A52A2A' // purple/brown (removed two colors to simplify)
  ];

    // attempt to capture the pointer so we still receive events even if the
    // pointer moves outside the canvas — this helps detect pointerup outside
    try { canvasEl.setPointerCapture && canvasEl.setPointerCapture(e.pointerId); } catch (err) {}
  let drawing = false;
  let start = { x: 0, y: 0 };
  let last = { x: 0, y: 0 };
  // if the pointer left while drawing, we mark this so re-entering while
  // still pressed can resume drawing (user requested resume-on-reenter)
  let wasDrawingOnLeave = false;

  onMount(() => {
    ctx = canvasEl.getContext('2d');
    resizeCanvas();
    // initialize background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    // detect whether the pointer is inside the canvas bounds — this lets us
    // emulate pointerleave/pointerenter when pointer capture is active
    const rect = canvasEl.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

    if (!inside && !isOutside) {
      // pointer just left
      if (drawing && e && typeof e.buttons !== 'undefined' && e.buttons !== 0) {
        wasDrawingOnLeave = true;
      } else {
        wasDrawingOnLeave = false;
      }
      drawing = false;
      snapshot = null;
      try { ctx.closePath(); ctx.beginPath(); } catch (err) {}
      isOutside = true;
      return;
    }

    if (inside && isOutside) {
      // pointer re-entered
      isOutside = false;
      // resume logic: if pointer was drawing when it left and the button is still pressed
      if (wasDrawingOnLeave && e && typeof e.buttons !== 'undefined' && e.buttons !== 0) {
        const p = toLocal(e);
        try { ctx.beginPath(); ctx.moveTo(p.x, p.y); } catch (err) {}
        drawing = true;
        wasDrawingOnLeave = false;
        start = { ...p };
        last = { ...p };
        // continue into drawing logic below
      } else {
        wasDrawingOnLeave = false;
        return; // nothing to do until next pointerdown
      }
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  });

  function resizeCanvas() {
    // keep device pixel ratio in mind
    const dpr = window.devicePixelRatio || 1;
    canvasEl.width = width * dpr;
    canvasEl.height = height * dpr;
    canvasEl.style.width = width + 'px';
    canvasEl.style.height = height + 'px';
    ctx = canvasEl.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function toLocal(e) {
    const rect = canvasEl.getBoundingClientRect();
    // client coordinates relative to the element
    const xClient = e.clientX - rect.left;
    const yClient = e.clientY - rect.top;
    // account for possible CSS scaling (responsive max-width) by mapping
    // from actual displayed size (rect) to the canvas styled size we set in resizeCanvas
    const styledW = parseFloat(canvasEl.style.width) || width;
    const styledH = parseFloat(canvasEl.style.height) || height;
    const scaleX = styledW / rect.width;
    const scaleY = styledH / rect.height;
    return { x: xClient * scaleX, y: yClient * scaleY };
  }

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
    // focus the canvas so keyboard shortcuts work only when the canvas is active
    try { canvasEl && canvasEl.focus && canvasEl.focus(); } catch (err) {}
  }

  function keydownHandler(e) {
    // Only act when the canvas is focused (it will be when the user clicked it)
    // ignore when modifiers are held to avoid interfering with browser shortcuts
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
      // save
      savePNG();
      e.preventDefault();
    } else if (k === 'c') {
      // clear
      clearCanvas();
      e.preventDefault();
    } else if (k === 'escape') {
      // cancel preview/shape
      if (snapshot) {
        try { ctx.putImageData(snapshot, 0, 0); } catch (err) {}
        snapshot = null;
      }
      drawing = false;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      // step brush size down
      size = Math.max(1, size - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      // step brush size up
      size = Math.min(64, size + 1);
      e.preventDefault();
    }
  }

  function pointerMove(e) {
    // release pointer capture when the gesture ends
    try { canvasEl.releasePointerCapture && canvasEl.releasePointerCapture(e.pointerId); } catch (err) {}
    // if no buttons are pressed, stop drawing (handles cases where mouse was released outside)
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
      // show preview: redraw from saved snapshot
      // We'll implement simple live preview by redrawing from saved pixels if needed
      // For simplicity we clear and redraw the shape on top of snapshot
      // (snapshot logic saved on pointerDown)
      redrawPreview(p);
    }
  }

  let snapshot = null;
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

  // When the pointer leaves the canvas while drawing, mark that the user
  // was drawing so we can optionally resume when they re-enter while
  // still holding the button. We intentionally don't call pointerUp here
  // because pointerup might occur outside the canvas; resume is conditional
  // on the pointer still being pressed when re-entering.
  function pointerLeave(e) {
    if (drawing && e && typeof e.buttons !== 'undefined' && e.buttons !== 0) {
      wasDrawingOnLeave = true;
    } else {
      wasDrawingOnLeave = false;
    }
    // stop the active drawing session locally
    drawing = false;
    snapshot = null;
    try { ctx.closePath(); ctx.beginPath(); } catch (err) {}
  }

  // When pointer re-enters the canvas, cancel any in-progress drawing so
  // returning with the button still pressed doesn't continue the stroke.
  function pointerEnter(e) {
    // If the user left while drawing and now re-enters while still holding
    // the pointer (e.buttons !== 0), resume drawing from the current point
    // — otherwise cancel as before.
    if (wasDrawingOnLeave && e && typeof e.buttons !== 'undefined' && e.buttons !== 0) {
      // resume: begin a new path at the current pointer location so the
      // stroke continues from where the user re-enters (no unexpected
      // connection across the gap)
      const p = toLocal(e);
      try {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
      } catch (err) {}
      drawing = true;
      wasDrawingOnLeave = false;
      // set anchors so pointerMove continues smoothly
      start = { ...p };
      last = { ...p };
      return;
    }

    // default: cancel any in-progress drawing and reset path state
    if (drawing) drawing = false;
    wasDrawingOnLeave = false;
    snapshot = null;
    try { ctx.closePath(); ctx.beginPath(); } catch (err) {}
    start = { x: 0, y: 0 };
    last = { x: 0, y: 0 };
  }

  function redrawPreview(p) {
    if (!snapshot) return;
    // restore
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

  function beginPreview(e) {
    if (tool === 'line' || tool === 'rect') {
      snapshot = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
    }
  }

  function clearCanvas() {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }

  function savePNG() {
    const link = document.createElement('a');
    link.download = 'paint.png';
    link.href = canvasEl.toDataURL('image/png');
    link.click();
  }

  // Simple flood fill (stack-based) - not super optimized, but works for small canvases
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
    // color to fill
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
    <div class="top">
      <div class="tools-column" role="group" aria-label="Tools">
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

    <div class="bottom-bar" role="toolbar" aria-label="Tools and colors">
      <!-- controls moved to left tools column -->

      <div class="palette-row" role="list" aria-label="Color palette">
        {#each palette as c}
          <button class="swatch" class:selected={color === c} style="background:{c};" on:click={() => color = c} aria-label={c}></button>
        {/each}
      </div>
    </div>
    <!-- spacer below the palette to create extra empty space inside the Paint window -->
    <div class="bottom-spacer" aria-hidden="true"></div>
  </div>
</div>

<style>
  .paint-root { font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif; }

  /* Layout: canvas on top, bottom bar with tools and palette */
  .container { display:flex; flex-direction:column; gap:8px; }

  .canvas-wrap { flex:1; padding:6px; background: #e4e4e4; display:flex; justify-content:center; align-items:center; overflow:auto; }
  canvas { background: #fff; border: 2px solid #000; image-rendering: pixelated; cursor: crosshair; max-width:100%; height:auto; display:block; }

  .top { display:flex; gap:8px; align-items:flex-start; }
  /* slightly narrower tools column to free horizontal space */
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

  .palette-row { display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
  .swatch { width:36px; height:18px; border:1px solid #333; padding:0; margin:0; cursor:pointer; box-sizing:border-box; }
  .swatch.selected { outline: 2px solid #000; box-shadow: 0 0 0 2px #fff inset; }
  /* ensure no extra space under the palette (clamped to 0px) */
  .bottom-spacer { height: 0px; }
</style>
