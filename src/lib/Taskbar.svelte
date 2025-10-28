<script>
  import { onMount, onDestroy } from 'svelte';
  
  // tasks: Array<{ id: number, label: string, icon?: string }>
  export let tasks = [];

  let clock = '';
  let timer;

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
    <div class="inicio-wrap">
      <span class="inicio">Start</span>
    </div>
  </div>
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
    <span class="task clock" aria-hidden="false">{clock}</span>
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
  .inicio-wrap
  .inicio { /* Botón de inicio */
    font-weight: bold;
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    font-size: 24px;

    display:inline-block;
    padding: 6px 10px;
    min-width: 80px;    /* altura horizontal */
    height: 5%;       /* altura vertical */
    text-align: center;
    line-height: 30px;
    border-top: 3px solid #ffffff; /* dark top */
    border-left: 3px solid #ffffff; /* dark left */
    border-right: 3px solid #363636; /* white right */
    border-bottom: 3px solid #363636; /* white bottom */
    background: var(--window-frame, #c0c0c0);
    cursor: default;
  }
  .tasks { display:flex; gap:6px; flex:1; padding-left:8px; align-items:center; overflow:hidden }
  .task { display:flex; align-items:center; gap:6px; padding:4px 8px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; border:1px solid #808080; background: linear-gradient(#f3f3f3,#e9e9e9); }
  .task-icon { width:16px; height:16px; image-rendering: pixelated; }
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
    padding: 0 8px;
    min-width: 120px;    /* altura horizontal */
    height: 44px;       /* altura vertical */

    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: auto;
    text-rendering: optimizeSpeed;
    font-variant-numeric: tabular-nums;
    -webkit-text-stroke: 0.2px rgba(0,0,0,0.06);

    border-top: 2px solid #a1a1a1; /* gray top */
    border-left: 3px solid #a1a1a1; /* gray left */
    border-right: 3px solid #ffffff; /* white right */
    border-bottom: 3px solid #ffffff; /* white bottom */
    background: var(--window-frame, #c0c0c0); /* sunken window color */

    cursor: default;
  }
</style>
