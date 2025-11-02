<script>
  import { onMount, onDestroy } from 'svelte';
  
  // tasks: Array<{ id: number, label: string, icon?: string }>
  export let tasks = [];

  let clock = '';
  let timer;
  let startPressed = false;

  function toggleStart() {
    startPressed = !startPressed;
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
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div class="taskbar">
  <div class="start">
    <button class="inicio-wrap" class:pressed={startPressed} on:click={toggleStart}>
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
  </div>
  <!-- Barra separadora -->
  <div class="separator"></div>
  <div class="tasks">
    {#each tasks as t}
      <button class="task" title={t.label}>
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
    height: 5%;
    display:flex;
    align-items:center;
    padding:4px 6px;
    gap:8px;
    background: var(--window-frame, #c0c0c0);
    box-shadow: inset 0 1px 0 #fff;
    z-index: 1000;
  }
  .start { display:flex; align-items:center }
  .inicio-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-right: 2px solid #363636;
    border-bottom: 2px solid #363636;
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
    border-top: 2px solid #363636;
    border-left: 2px solid #363636;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    padding: 7px 9px 5px 11px; /* Desplazar contenido ligeramente */
  }
  .inicio-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  .inicio { /* Botón de inicio */
    font-weight: bold;
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    font-size: 24px;
    line-height: 30px;
  }
  
  /* Barra separadora */
  .separator {
    width: 2px;
    height: 80%;
    background: linear-gradient(to right, #808080, #ffffff);
    margin: 0 4px;
    flex-shrink: 0;
  }
  
  .tasks { display:flex; gap:6px; flex:1; padding-left:4px; align-items:center; overflow:hidden }
  .task { 
    display:flex; 
    align-items:center; 
    gap:6px; 
    padding: 6px 10px;
    min-height: 45px;
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
    font-size: 16px;
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
    padding: 7px 9px 5px 11px;
  }
  .task-icon { width:16px; height:16px; image-rendering: pixelated; flex-shrink: 0; }
  .task-label { max-width: 16ch; overflow:hidden; text-overflow: ellipsis; }
  .tray { padding-right: 8px; display:flex; align-items:center }

  /* Reloj */
  .clock {
    /* Texto */
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    font-weight: 500;
    font-size: 24px;
    color: #000;

    /* Caja del reloj */
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    min-width: 120px;
    height: 44px;

    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: auto;
    text-rendering: optimizeSpeed;
    font-variant-numeric: tabular-nums;
    -webkit-text-stroke: 0.2px rgba(0,0,0,0.06);

    border-top: 2px solid #a1a1a1; /* gray top */
    border-left: 3px solid #a1a1a1; /* gray left */
    border-right: 3px solid #ffffff; /* white right */
    border-bottom: 3px solid #ffffff; /* white bottom */
  /* Allow easy override via --clock-bg; fallback to window frame gray */
  background: var(--clock-bg, var(--window-frame, #c0c0c0)); /* sunken window color */

    cursor: default;
  }

  .clock-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
</style>
