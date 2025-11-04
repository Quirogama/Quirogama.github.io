<script>
  export let content = '';
  // derive paragraphs from the content text
  let paragraphs = content ? content.split(/\n\n+/).map(p => p.trim()) : [];

  // If the first paragraph begins with the full name, strip just the name so
  // it doesn't appear next to the avatar (keeps the rest of the line).
  if (paragraphs.length) {
    paragraphs[0] = paragraphs[0].replace(/^Andr[eé]s Quiroga\s*[—-]?\s*/i, '');
  }

  // safer linkifier: single-pass regex that matches either http(s)://... or www....
  // This avoids double-wrapping URLs (which produced malformed nested anchors during prerender).
  function linkify(text) {
    if (!text) return '';
    // escape HTML chars to avoid accidental injection
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return escaped.replace(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g, (match, p1, p2) => {
      const url = p1 || ('http://' + p2);
      // match is taken from escaped string so it's safe to inject
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
  }

  // Render paragraph as HTML. If paragraph is a known section title, wrap it
  // in a title element for bold styling; otherwise run through linkify.
  function renderParagraphHTML(p) {
    if (!p) return '';
    const titles = [
      'About me',
      'Tech stack',
      'Selected projects',
      'Experience (brief)',
      'Links',
      'Contact',
      'Note'
    ];
    const trimmed = p.trim();
    // case-insensitive compare
    if (titles.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      // escape trimmed and wrap
      const escaped = trimmed.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<div class="about-title">${escaped}</div>`;
    }
    return linkify(p);
  }
  // small tech list - you can expand this later or generate from content
  const tech = ['Python', 'SQL', 'Power BI', 'Pandas', 'Svelte', 'JavaScript', 'Java', 'HTML/CSS', 'RStudio'];

  // map tech name -> colors (background, text, border)
  function chipStyle(name) {
    if (!name) return '';
    const key = name.toLowerCase();
    const map = {
      python: { bg: '#FFD43B', text: '#000', border: '#D1A700' }, // yellow
      sql: { bg: '#CC3B3B', text: '#fff', border: '#9e2c2c' }, // red
      'power bi': { bg: '#FFB400', text: '#000', border: '#b37a00' }, // adjusted to be distinct from python
      pandas: { bg: '#1f4b99', text: '#fff', border: '#15386d' },
      svelte: { bg: '#FF3E00', text: '#fff', border: '#b02b00' },
      javascript: { bg: '#F7DF1E', text: '#000', border: '#d6c717' },
      java: { bg: '#5382a1', text: '#fff', border: '#3f6176' },
      'html/css': { bg: '#e44d26', text: '#fff', border: '#b03a1f' },
      rstudio: { bg: '#276DC3', text: '#fff', border: '#1f4f90' }
    };
    const c = map[key] || { bg: '#e0e0e0', text: '#000', border: '#808080' };
    return `background:${c.bg};color:${c.text};border:1px solid ${c.border};`;
  }
</script>

<div class="about-root">
  <!-- ensure .about-title selector is recognized by the compiler (used via {@html}) -->
  <div class="about-title" style="display:none" aria-hidden="true"></div>
  <div class="about-left">
    <div class="image-box">
      <img src="/icons/sobremi.png" alt="avatar" class="avatar" />
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

  /* left column floats so text can flow beside/under it */
  .about-left {
    float: left;
    width: 140px;
    margin-right: 12px;
    display: block;
  }

  .avatar {
    width: 72px;
    height: 72px;
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
    /* allow text to wrap under the floated left column */
    overflow: visible;
    padding-right: 6px;
    font-size: 22px;
    line-height: 1.5;
    color: #111;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  .about-right p {
    margin: 0 0 10px 0;
    white-space: pre-wrap;
  }

  :global(.about-title) {
    font-weight: 700;
    font-size: 1.05em;
    margin: 8px 0 6px 0;
    color: #000;
    /* underline delineation to make titles stand out */
    text-decoration: underline;
    text-decoration-color: rgba(0,0,0,0.9);
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }

  .image-box {
    margin-top: 8px;
    border: 1px solid #999;
    background: #f4f4f4;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-box img {
    width: 120px;
    max-width: 100%;
    height: auto;
    display: block;
    border: 1px solid #666;
    background: #fff;
  }

  /* Responsive: stack columns on narrow screens */
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
    .image-box img { width: 160px; }
  }
</style>
