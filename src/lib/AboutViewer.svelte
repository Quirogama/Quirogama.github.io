<script>
  // Recibe el contenido del About desde windowsConfig
  let { content = '' } = $props();
  // Divide el contenido en párrafos (ya tiene saltos quemados)
  let paragraphs = content ? content.split('\n').filter(p => p.trim()) : [];

  // Linkificador seguro: convierte http(s)/www/mailto a <a>, evitando anidar anchors
  function linkify(text) {
    if (!text) return ''; // Si no hay texto, devuelve vacío
    
    // Escapa caracteres HTML para evitar inyecciones
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Busca patrones de URL/mailto y envuelve en <a> con target="_blank"
    return escaped.replace(/(https?:\/\/[^\s]+)|(mailto:[^\s]+)|(www\.[^\s]+)/g, (match, p1, p2, p3) => {
      const url = p1 || p2 || ('http://' + p3); // Resuelve la URL completa
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${match}</a>`; // Envuelve el match
    });
  }

  // Renderiza párrafo como HTML: títulos conocidos usan .about-title, resto pasa por linkify
  function renderParagraphHTML(p) {
    if (!p) return ''; // Si no hay párrafo, devuelve vacío
    
    const titles = [
      'Sobre mí',
      'Qué hago',
      'Proyectos destacados',
      'Más sobre mí',
      '¿Contacto?'
    ]; // Lista de títulos conocidos
    
    const trimmed = p.trim(); // Limpia espacios al inicio/fin
    
    // Compara case-insensitive contra la lista de títulos
    if (titles.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      // Escapa el título y lo envuelve en <div class="about-title">
      const escaped = trimmed.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<div class="about-title">${escaped}</div>`;
    }
    
    // Si no es título, aplica linkify para convertir URLs
    return linkify(p);
  }
  // Lista de tecnologías en about me
  const tech = ['Python', 'SQL', 'Power BI', 'Pandas', 'Svelte', 'JavaScript', 'Java', 'HTML/CSS', 'RStudio', 'AWS'];

  // Mapea nombre de tecnología a colores (fondo/texto/borde)
  function chipStyle(name) {
    if (!name) return ''; // Si no hay nombre, devuelve vacío
    
    const key = name.toLowerCase(); // Convierte a minúsculas para búsqueda
    
    // Mapa de colores: key → {bg, text, border}
    const map = {
      python: { bg: '#3776ab', text: '#fff', border: '#254668' },
      sql: { bg: '#e23a3a', text: '#fff', border: '#b22e2e' },
      'power bi': { bg: '#f25022', text: '#fff', border: '#c23e1c' },
      pandas: { bg: '#6c3fb3', text: '#fff', border: '#4a2680' },
      svelte: { bg: '#16a34a', text: '#fff', border: '#0f7a2a' },
      javascript: { bg: '#f7df1e', text: '#222', border: '#d4b000' },
      java: { bg: '#0078d4', text: '#fff', border: '#005a9e' },
      'html/css': { bg: '#0891b2', text: '#fff', border: '#065f73' },
      rstudio: { bg: '#9333ea', text: '#fff', border: '#6b21a8' },
      aws: { bg: '#ff9900', text: '#000', border: '#e68000' }
    };
    
    // Busca en el mapa o usa fallback gris
    const c = map[key] || { bg: '#e0e0e0', text: '#000', border: '#808080' };
    
    // Devuelve string de estilos CSS inline
    return `background:${c.bg};color:${c.text};border:1px solid ${c.border};`;
  }
</script>

<div class="about-root">
  <!-- Dummy para que el compilador reconozca .about-title usada en {@html} -->
  <div class="about-title" style="display:none" aria-hidden="true"></div>
  <div class="about-left">
    <div class="image-box">
      <img src="/icons/andres1.jpeg" alt="avatar" class="avatar" />
    </div>
    <div class="tech-row">
      {#each tech as t}
        <span class="chip" style={chipStyle(t)}>{t}</span>
      {/each}
    </div>
  </div>

  <div class="about-right">
    {#if paragraphs.length}
      {#each paragraphs as p}
  <p>{@html renderParagraphHTML(p)}</p>
      {/each}
    {:else}
      <p>No hay información disponible.</p>
    {/if}
  </div>

  <div style="clear: both"></div>
</div>

<style>
  .about-root {
    position: relative;
    padding: 8px;
    color: #000;
  }

  /* Columna izquierda flotada para que el texto fluya a la derecha/abajo */
  .about-left {
    float: left;
    width: 250px;
    margin-right: 12px;
    display: block;
  }

  .avatar {
    width: 220px;
    height: 220px;
    object-fit: cover;
    border: 2px solid #000000;
    background: #fff;
    display: block;
    margin: 0 auto;
  }

  .tech-row {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
  }

  .chip {
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 3px;
    box-shadow: 1px 1px 0 rgba(255,255,255,0.6) inset;
  }

  .about-right {
    /* Permitir que el texto envuelva la columna flotada */
    overflow: visible;
    padding-right: 6px;
    font-size: 17px;
    line-height: 1.8;
    color: #111;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  .about-right p {
    margin: 0 0 16px 0;
    white-space: pre-wrap;
  }

  /* Resaltar números y porcentajes en negrita y color */
  .about-right p:global(:has(+ p)) {
    font-weight: 400;
  }

  :global(.about-title) {
    font-weight: 900;
    font-size: 18px;
    margin: 16px 0 10px 0;
    color: #fff;
    background: linear-gradient(90deg, #000080 0%, #0066cc 100%);
    padding: 6px 12px;
    border: 2px outset #dfdfdf;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
  }

  .image-box {
    margin-top: 8px;
    border: 1px solid #999;
    background: #f4f4f4;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 230px;
  }

  .image-box img {
    width: 220px;
    max-width: 100%;
    height: auto;
    display: block;
    border: 1px solid #666;
    background: #fff;
  }

  /* Responsive: apilar columnas en pantallas angostas */
  @media (max-width: 720px) {
    .about-left {
      float: none;
      width: 100%;
      margin-right: 0;
      display: flex;
      justify-content: center;
    }
    .about-right {
      margin-top: 8px;
      font-size: 18px;
    }
    .image-box img { width: 220px; }
  }
</style>

