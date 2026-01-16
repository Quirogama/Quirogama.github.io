<script>
  import { onMount, onDestroy } from 'svelte';

  // Configuración del juego
  const GRID_SIZE = 14;
  const CELL_SIZE = 26;
  const INITIAL_SPEED = 120; // paso base
  const SPEED_INCREMENT = 5;
  const MIN_SPEED = 70;

  // Estado del juego
  let snake = $state([{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }]);
  let direction = $state({ x: 1, y: 0 });
  let nextDirection = $state({ x: 1, y: 0 });
  let food = $state({ x: 15, y: 10 });
  let score = $state(0);
  let gameOver = $state(false);
  let gameStarted = $state(false);
  let speed = $state(INITIAL_SPEED);
  let isPaused = $state(false);
  let inputQueue = $state([]);

  // rAF loop
  let rafId = null;
  let accumulator = 0;
  let lastTime = 0;

  function generateFood() {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }

  function startGame() {
    snake = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    food = generateFood();
    score = 0;
    gameOver = false;
    gameStarted = true;
    isPaused = false;
    speed = INITIAL_SPEED;
    inputQueue = [];
    accumulator = 0;
    lastTime = 0;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function togglePause() {
    if (gameOver || !gameStarted) return;
    isPaused = !isPaused;
  }

  function update() {
    if (gameOver || !gameStarted || isPaused) return;

    // Aplica la siguiente dirección en cola para giros rápidos suaves
    if (inputQueue.length > 0) {
      direction = inputQueue.shift();
      nextDirection = { ...direction };
    } else {
      direction = { ...nextDirection };
    }

    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      endGame();
      return;
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      endGame();
      return;
    }

    snake = [head, ...snake];

    if (head.x === food.x && head.y === food.y) {
      score++;
      food = generateFood();
      
      if (score % 5 === 0 && speed > MIN_SPEED) {
        speed = Math.max(MIN_SPEED, speed - SPEED_INCREMENT);
      }
    } else {
      snake = snake.slice(0, -1);
    }
  }

  function endGame() {
    gameOver = true;
    if (rafId) cancelAnimationFrame(rafId);
  }

  function handleKeyDown(e) {
    if (!gameStarted && e.key.startsWith('Arrow')) {
      startGame();
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      togglePause();
      return;
    }

    if (gameOver) return;

    function isOpposite(a, b) {
      return a.x === -b.x && a.y === -b.y;
    }

    const lastDir = inputQueue.length ? inputQueue[inputQueue.length - 1] : direction;

    switch (e.key) {
      case 'ArrowUp': {
        const nd = { x: 0, y: -1 };
        if (!isOpposite(nd, lastDir) && !(nd.x === lastDir.x && nd.y === lastDir.y)) {
          nextDirection = nd;
          inputQueue = [...inputQueue, nd].slice(-2);
        }
        break;
      }
      case 'ArrowDown': {
        const nd = { x: 0, y: 1 };
        if (!isOpposite(nd, lastDir) && !(nd.x === lastDir.x && nd.y === lastDir.y)) {
          nextDirection = nd;
          inputQueue = [...inputQueue, nd].slice(-2);
        }
        break;
      }
      case 'ArrowLeft': {
        const nd = { x: -1, y: 0 };
        if (!isOpposite(nd, lastDir) && !(nd.x === lastDir.x && nd.y === lastDir.y)) {
          nextDirection = nd;
          inputQueue = [...inputQueue, nd].slice(-2);
        }
        break;
      }
      case 'ArrowRight': {
        const nd = { x: 1, y: 0 };
        if (!isOpposite(nd, lastDir) && !(nd.x === lastDir.x && nd.y === lastDir.y)) {
          nextDirection = nd;
          inputQueue = [...inputQueue, nd].slice(-2);
        }
        break;
      }
    }
  }

  function loop(ts) {
    if (!lastTime) lastTime = ts;

    if (!gameStarted || gameOver) {
      lastTime = ts;
      rafId = requestAnimationFrame(loop);
      return;
    }

    if (isPaused) {
      lastTime = ts;
      rafId = requestAnimationFrame(loop);
      return;
    }

    const delta = ts - lastTime;
    lastTime = ts;
    accumulator += delta;

    const step = speed;
    while (accumulator >= step) {
      update();
      accumulator -= step;
    }

    rafId = requestAnimationFrame(loop);
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (rafId) cancelAnimationFrame(rafId);
    };
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
  });
</script>

<div class="snake-container">
  <div class="info-panel">
    <div class="score">Score: {score}</div>
    <div class="status">
      {#if !gameStarted}
        <button class="start-btn" onclick={startGame}>Start Game</button>
      {:else if gameOver}
        <div class="game-over">
          <span class="game-over-text">Game Over!</span>
          <button class="start-btn" onclick={startGame}>Reiniciar</button>
        </div>
      {:else if isPaused}
        <span class="paused-text">PAUSA</span>
      {/if}
    </div>
  </div>

  <div class="game-board-wrapper">
    <div class="game-board" style="width: {GRID_SIZE * CELL_SIZE}px; height: {GRID_SIZE * CELL_SIZE}px;">
      {#each Array(GRID_SIZE) as _, row}
        {#each Array(GRID_SIZE) as _, col}
          <div 
            class="grid-cell" 
            class:light={(row + col) % 2 === 0}
            class:dark={(row + col) % 2 === 1}
            style="left: {col * CELL_SIZE}px; top: {row * CELL_SIZE}px; width: {CELL_SIZE}px; height: {CELL_SIZE}px;"
          ></div>
        {/each}
      {/each}

      <div 
        class="food" 
        style="left: {food.x * CELL_SIZE}px; top: {food.y * CELL_SIZE}px; width: {CELL_SIZE}px; height: {CELL_SIZE}px;"
      ></div>

      {#each snake as segment, i}
        <div 
          class="snake-segment {i === 0 ? 'head' : ''}" 
          style="transform: translate({segment.x * CELL_SIZE}px, {segment.y * CELL_SIZE}px); width: {CELL_SIZE}px; height: {CELL_SIZE}px;"
        ></div>
      {/each}
    </div>
  </div>
</div>

<style>
  .snake-container {
    padding: 12px;
    background: var(--win98-face, #c0c0c0);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    user-select: none;
  }

  .info-panel {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #fff;
    border: 2px inset;
  }

  .score {
    font-size: 18px;
    font-weight: bold;
    font-family: 'Courier New', monospace;
    color: #000;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .game-over {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .game-over-text {
    font-weight: bold;
    font-size: 16px;
    color: #c00;
  }

  .paused-text {
    font-size: 16px;
    font-weight: bold;
    color: #00c;
  }

  .start-btn {
    padding: 4px 12px;
    font-size: 13px;
    font-weight: bold;
  }

  .game-board-wrapper {
    padding: 20px;
    background: #9eb99e;
    border: 2px solid #808080;
    border-top-color: #000;
    border-left-color: #000;
    border-right-color: #dfdfdf;
    border-bottom-color: #dfdfdf;
  }

  .game-board {
    position: relative;
    border: 1px solid #4a774a;
  }

  .grid-cell {
    position: absolute;
    pointer-events: none;
  }

  .grid-cell.light {
    background: #aad751;
  }

  .grid-cell.dark {
    background: #a2d149;
  }

  .snake-segment {
    position: absolute;
    left: 0;
    top: 0;
    background: #008000;
    border: 1px solid #006000;
    transition: transform 0.115s linear;
    z-index: 10;
  }

  .snake-segment.head {
    background: #00a000;
    border: 2px solid #005000;
  }

  .food {
    position: absolute;
    background: #ff0000;
    border-radius: 50%;
    border: 2px solid #c00;
    z-index: 5;
  }
</style>
