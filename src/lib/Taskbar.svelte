<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  
  // tasks: Array<{ id: number, label: string, icon?: string }>
  export let tasks = [];
  export let activeWindowId = null;

  let clock = '';
  let timer;
  let startPressed = false;
  let startMenuOpen = false;
  let menuEl;
  let buttonEl;

  const dispatch = createEventDispatcher();

  function handleTaskClick(taskId) {
    dispatch('taskclick', { id: taskId });
  }

  // Menú Start con las aplicaciones reales del portfolio
  const startMenuItems = [
    { id: 'about', label: 'About Me', icon: '/icons/sobremi.png', isImage: true },
    { id: 'paint', label: 'Paint', icon: '/icons/paint.png', isImage: true },
    { id: 'cv', label: 'Resume', icon: '/icons/cv.png', isImage: true },
    { id: 'projects', label: 'Projects', icon: '/icons/proyectos.png', isImage: true },
    { id: 'github', label: 'GitHub', icon: '/icons/github.png', isImage: true },
    { id: 'linkedin', label: 'LinkedIn', icon: '/icons/linkedin.png', isImage: true },
    { id: 'contact', label: 'Contact', icon: '/icons/contacto.png', isImage: true },
    { id: 'separator', separator: true },
    { id: 'shutdown', label: 'Shut Down...', icon: '🔌' }
  ];

  function toggleStart() {
    startMenuOpen = !startMenuOpen;
    startPressed = startMenuOpen;
  }

  function selectMenuItem(item) {
    if (item.separator) return;
    startMenuOpen = false;
    startPressed = false;
    dispatch('menuselect', item);
  }

  function handleClickOutside(e) {
    if (startMenuOpen && menuEl && buttonEl) {
      if (!menuEl.contains(e.target) && !buttonEl.contains(e.target)) {
        startMenuOpen = false;
        startPressed = false;
      }
    }
  }

  function updateClock() {
    const d = new Date();
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    clock = `${hours}:${minutes} ${ampm}`;
  }

  onMount(() => {
    updateClock();
    timer = setInterval(updateClock, 1000);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div class="taskbar">
  <div class="start">
    <button bind:this={buttonEl} class="inicio-wrap" class:pressed={startPressed} on:click={toggleStart}>
      <!-- Icono del botón de inicio -->
      <svg class="inicio-icon" width="20" height="20" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="1" y="1" width="14" height="14" fill="#c0c0c0" stroke="#000" stroke-width="0.5" />
        <rect x="3" y="3" width="4" height="4" fill="#008080" />
        <rect x="9" y="3" width="4" height="4" fill="#ff0000" />
        <rect x="3" y="9" width="4" height="4" fill="#ffff00" />
        <rect x="9" y="9" width="4" height="4" fill="#0000ff" />
      </svg>
      <span class="inicio">Start</span>
    </button>

    <!-- Menú Start -->
    {#if startMenuOpen}
      <div bind:this={menuEl} class="start-menu">
        {#each startMenuItems as item}
          {#if item.separator}
            <div class="menu-separator"></div>
          {:else}
            <button 
              class="menu-item" 
              on:click={() => selectMenuItem(item)}
              on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectMenuItem(item);
                }
              }}
            >
              {#if item.isImage}
                <img class="menu-icon" src={item.icon} alt="" />
              {:else}
                <span class="menu-icon">{item.icon}</span>
              {/if}
              <span class="menu-label">{item.label}</span>
            </button>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
  <!-- Barra separadora -->
  <div class="separator"></div>
  <div class="tasks">
    {#each tasks as t}
      <button 
        class="task" 
        class:active={t.id === activeWindowId}
        title={t.label}
        on:click={() => handleTaskClick(t.id)}
      >
        {#if t.icon}
          <img class="task-icon" src={t.icon} alt="" aria-hidden="true" />
        {/if}
        <span class="task-label">{t.label}</span>
      </button>
    {/each}
  </div>
  <div class="tray">
    <!-- clock is display-only -->
    <span class="clock" aria-hidden="false">
      <!-- Icono del reloj -->
      <svg class="clock-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="#000" stroke-width="0.8" />
        <line x1="8" y1="8" x2="8" y2="4.5" stroke="#000" stroke-width="1" />
        <line x1="8" y1="8" x2="10.5" y2="8" stroke="#000" stroke-width="0.8" />
        <circle cx="8" cy="8" r="0.8" fill="#000" />
      </svg>
      {clock}
    </span>
    <!-- right-side "inicio" removed as requested -->
  </div>
</div>

<style>
  .taskbar { /* Barra de tareas inferior */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px; /* ajustado a 50px como pediste */
    min-height: 50px;
    max-height: 50px;
    display:flex;
    align-items:center;
    padding:4px 6px;
    gap:8px;
    background: var(--window-frame, #c0c0c0);
    /* aumentar el resaltado blanco superior a 2px para mayor definición */
    box-shadow: inset 0 2px 0 #fff;
    z-index: 1000;
    box-sizing: border-box;
    overflow: hidden; /* prevent children from expanding the bar */
  }
  .start { display:flex; align-items:center }
  .inicio-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 38px; /* un poco más alto */
    padding: 0 10px; /* más espacio horizontal */
    /* reducir el borde exterior a 1px para quitar 1px blanco/negro alrededor */
    border-top: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    border-right: 1px solid #363636;
    border-bottom: 1px solid #363636;
    background: var(--window-frame, #c0c0c0);
    cursor: pointer;
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    outline: none;
    transition: none;
  }
  .inicio-wrap:hover {
    background: #d4d4d4;
  }
  .inicio-wrap.pressed {
    /* Bordes invertidos para efecto presionado */
    border-top: 1px solid #363636;
    border-left: 1px solid #363636;
    border-right: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    /* Keep padding the same to avoid width jumps; use a translate for visual press */
    padding: 0 10px;
    transform: translateY(1px);
  }
  .inicio-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  .inicio { /* Botón de inicio */
    font-weight: bold;
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    font-size: 17px; /* un poquito más grande */
    display: inline-flex;
    align-items: center;
    height: 38px;
    box-sizing: border-box;
    overflow: hidden;
    min-width: 48px; /* ensure button keeps a sensible size on narrow screens */
    justify-content: center;
  }
  
  /* Barra separadora */
  .separator {
    width: 2px;
    height: 78%;
    background: linear-gradient(to right, #808080, #ffffff);
    margin: 0 4px;
    flex-shrink: 0;
  }
  
  .tasks { display:flex; gap:6px; flex:1; padding-left:4px; align-items:center; overflow-x:auto; overflow-y:hidden; white-space:nowrap; }
  .task { 
    display:flex; 
    align-items:center; 
    gap:6px; 
    padding: 4px 8px;
    height: 32px;
    line-height: 32px;
    white-space:nowrap; 
    text-overflow:ellipsis; 
    overflow:hidden; 
    border-top: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    border-right: 1px solid #363636;
    border-bottom: 1px solid #363636;
    background: var(--window-frame, #c0c0c0);
    cursor: pointer;
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    font-size: 14px; /* aumentar un poco el texto de los botones */
    flex: 0 0 auto;
    box-sizing: border-box;
  }
  .task:hover {
    background: #d4d4d4;
  }
  .task:active,
  .task.active {
    /* Estado presionado/activo */
    border-top: 2px solid #363636;
    border-left: 2px solid #363636;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    padding: 5px 7px 4px 9px;
  }
  .task-icon { width:16px; height:16px; image-rendering: pixelated; flex-shrink: 0; }
  .task-label { max-width: 12ch; overflow:hidden; text-overflow: ellipsis; display: inline-block; vertical-align: middle; }
  /* allow horizontal scrolling without scrollbar styling interfering */
  .tasks::-webkit-scrollbar { height: 6px; }
  .tasks::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
  .tray { padding-right: 2px; display:flex; align-items:center }

  /* Reloj */
  .clock {
    /* Texto */
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    font-weight: 500;
    font-size: 19px; /* un poquito más grande */
    color: #000;

    /* Caja del reloj */
    display: flex;
    align-items: center;
    justify-content: center; /* centrar icono + texto horizontalmente */
    gap: 10px; /* separar más el icono del número */
    padding: 0 6px;
  min-width: 110px; /* un poco más ancho para dar espacio horizontal */
  height: 36px;
  display:inline-flex;
  align-items:center;

    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: auto;
    text-rendering: optimizeSpeed;
    font-variant-numeric: tabular-nums;
    -webkit-text-stroke: 0.2px rgba(0,0,0,0.06);

    border-top: 2px solid #a1a1a1; /* gray top */
    border-left: 2px solid #a1a1a1; /* gray left */
    border-right: 2px solid #ffffff; /* white right */
    border-bottom: 2px solid #ffffff; /* white bottom */
    /* Allow easy override via --clock-bg; fallback to window frame gray */
    background: var(--clock-bg, var(--window-frame, #c0c0c0)); /* sunken window color */

    cursor: default;
  }

  .clock-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  /* Menú Start estilo Windows 98 */
  .start-menu {
    position: fixed;
    bottom: 60px;
    left: 6px;
    width: 220px;
    background: var(--window-frame, #c0c0c0);
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-right: 2px solid #363636;
    border-bottom: 2px solid #363636;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    z-index: 10000;
    padding: 4px 0;
  }

  /* Responsive tweaks: reduce labels on very small screens */
  @media (max-width: 420px) {
    .task-label { display: none; }
    /* Keep heights consistent to avoid layout jumps. Reduce font sizes but preserve box sizes. */
    .inicio { font-size: 14px; }
  .inicio-wrap .inicio-icon { width: 18px; height: 18px; }
    .clock { min-width: 90px; font-size: 14px; height: 36px; }
    .inicio-wrap { padding: 0 8px; }
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 8px 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    font-size: 16px;
    text-align: left;
    outline: none;
  }

  .menu-item:hover {
    background: #000080;
    color: #ffffff;
  }

  .menu-icon {
    font-size: 18px;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    object-fit: contain;
    image-rendering: pixelated;
  }

  .menu-label {
    flex: 1;
  }

  .menu-separator {
    height: 2px;
    margin: 4px 8px;
    background: linear-gradient(to bottom, #808080, #ffffff);
  }
</style>
