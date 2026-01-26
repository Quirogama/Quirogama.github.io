<script>
  // gallery will show images from static/icons as a demo
  const imgs = ['/icons/solitaire.png','/icons/proyectos.png','/icons/sobremi.png','/icons/github.png'];
  let idx = 0;
  function next(){ idx = (idx+1) % imgs.length }
  function prev(){ idx = (idx-1 + imgs.length) % imgs.length }
</script>

<div style="padding:8px;display:flex;flex-direction:column;gap:8px;align-items:center;">
  <div style="width:320px;height:220px;border:1px solid #999;display:flex;align-items:center;justify-content:center;background:#fff;">
    <img src={imgs[idx]} alt="gallery" style="max-width:100%;max-height:100%;object-fit:contain;image-rendering:pixelated;" />
  </div>
  <div style="display:flex;gap:8px;">
    <button on:click={prev}>Prev</button>
    <button on:click={next}>Next</button>
  </div>
</div>

<style>
  button{ cursor:pointer }
</style>

