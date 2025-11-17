<script>
  let url = 'https://example.com';
  let src = url;
  function isProbablyURL(v){
    try{ new URL(v); return true }catch(e){ return /^\S+\.\S+/.test(v) }
  }

  function go(){
    const v = url.trim();
    if (!v) return;
    if (isProbablyURL(v)) {
      // add protocol if missing
      const final = v.match(/^https?:\/\//i) ? v : `https://${v}`;
      src = final;
    } else {
      // treat as search query -> use Google
      const q = encodeURIComponent(v);
      src = `https://www.google.com/search?q=${q}`;
    }
  }
</script>

<div style="padding:8px;display:flex;flex-direction:column;gap:8px;">
  <div style="display:flex;gap:8px;">
    <input bind:value={url} style="flex:1;padding:6px;" placeholder="Search or enter URL" />
    <button on:click={go}>Go</button>
  </div>
  <div style="border:1px solid #999;height:340px;background:#fff;overflow:hidden;">
  <iframe title="Mini browser preview" src={src} style="width:100%;height:100%;border:0;" sandbox="allow-same-origin allow-forms allow-scripts"></iframe>
  </div>
</div>

<style>button{cursor:pointer}</style>
