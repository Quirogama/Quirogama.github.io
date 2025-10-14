<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let tasks = [];

  // Filtramos cualquier task llamada "welcome" (case-insensitive)
  $: visibleTasks = (tasks || []).filter(t => {
    try {
      return String(t).trim().toLowerCase() !== 'welcome';
    } catch {
      return true;
    }
  });

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
      <span class="inicio">Inicio</span>
    </div>
  </div>
  <div class="tasks">
    {#each visibleTasks as t}
      <button class="task">{t}</button>
    {/each}
  </div>
  <div class="tray">
    <!-- clock is display-only; not interactive -->
    <span class="task clock" aria-hidden="false">{clock}</span>
    <!-- right-side "inicio" removed as requested -->
  </div>
</div>

<style>
  .taskbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display:flex;
    align-items:center;
    padding:4px 6px;
    gap:8px;
    background: var(--window-frame, #c0c0c0);
    box-shadow: inset 0 1px 0 #fff;
    z-index: 1000;
  }
  .start { display:flex; align-items:center }
  .inicio-wrap { padding-left: 6px }
  .inicio {
    display:inline-block;
    padding: 6px 10px;
    min-width: 72px;    /* altura horizontal */
    height: 30px;       /* altura vertical */
    text-align: center;
    line-height: 30px;
    border-top: 2px solid #ffffff; /* dark top */
    border-left: 2px solid #ffffff; /* dark left */
    border-right: 2px solid #363636; /* white right */
    border-bottom: 2px solid #363636; /* white bottom */
    background: var(--window-frame, #c0c0c0);
    font-weight: bold;
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    cursor: default;
  }
  .tasks { display:flex; gap:6px; flex:1; padding-left:8px; align-items:center; overflow:hidden }
  .task { padding:4px 8px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; border:1px solid #808080; background: linear-gradient(#f3f3f3,#e9e9e9); }
  .tray { padding-right: 8px; display:flex; align-items:center }

  /* Reloj */
  .clock {
    /* Texto */
    font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: #000;

    /* Caja del reloj */
    padding: 0 8px;
    min-width: 96px;    /* altura horizontal */
    height: 42px;       /* altura vertical */
    line-height: 34px;
    text-align: center;

    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: auto;
    text-rendering: optimizeSpeed;
    font-variant-numeric: tabular-nums;
    -webkit-text-stroke: 0.2px rgba(0,0,0,0.06);

    border: 1px solid #808080;
    box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #404040;
    background: var(--window-frame, #c0c0c0);

    margin-left: 6px;
    cursor: default;
  }
</style>
