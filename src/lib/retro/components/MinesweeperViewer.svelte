<script>
	import { onMount } from 'svelte';
	import {
		playMinesweeperFlag,
		playMinesweeperLose,
		playMinesweeperWin,
		playUiClick
	} from '../config/retroAudio.js';

	let rows = 9;
	let cols = 9;
	let mineCount = 10;
	let board = [];
	let gameOver = false;
	let gameWon = false;
	let showGameOverOverlay = false;
	let flagsPlaced = 0;
	let timeElapsed = 0;
	let timerInterval = null;
	let lossOverlayTimeout = null;
	let firstClick = true;
	let explodedMine = null;
	let mineRevealDelays = {};

	function initBoard() {
		board = Array(rows)
			.fill()
			.map(() =>
				Array(cols)
					.fill()
					.map(() => ({
						isMine: false,
						isRevealed: false,
						isFlagged: false,
						neighborMines: 0
					}))
			);
		gameOver = false;
		gameWon = false;
		showGameOverOverlay = false;
		flagsPlaced = 0;
		timeElapsed = 0;
		firstClick = true;
		explodedMine = null;
		mineRevealDelays = {};
		clearInterval(timerInterval);
		timerInterval = null;
		clearTimeout(lossOverlayTimeout);
		lossOverlayTimeout = null;
	}

	function placeMines(excludeRow, excludeCol) {
		let minesPlaced = 0;
		while (minesPlaced < mineCount) {
			const row = Math.floor(Math.random() * rows);
			const col = Math.floor(Math.random() * cols);

			// Don't place mine on first click or already mined cell
			if ((row === excludeRow && col === excludeCol) || board[row][col].isMine) {
				continue;
			}

			board[row][col].isMine = true;
			minesPlaced++;
		}

		// Calculate neighbor mines
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (!board[r][c].isMine) {
					board[r][c].neighborMines = countNeighborMines(r, c);
				}
			}
		}
	}

	function countNeighborMines(row, col) {
		let count = 0;
		for (let dr = -1; dr <= 1; dr++) {
			for (let dc = -1; dc <= 1; dc++) {
				if (dr === 0 && dc === 0) continue;
				const nr = row + dr;
				const nc = col + dc;
				if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
					count++;
				}
			}
		}
		return count;
	}

	function revealCell(row, col) {
		if (row < 0 || row >= rows || col < 0 || col >= cols) return;
		if (board[row][col].isRevealed || board[row][col].isFlagged) return;

		board[row][col].isRevealed = true;

		if (board[row][col].neighborMines === 0 && !board[row][col].isMine) {
			// Reveal neighbors
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					if (dr === 0 && dc === 0) continue;
					revealCell(row + dr, col + dc);
				}
			}
		}
	}

	function handleCellClick(row, col) {
		if (gameOver || gameWon) return;
		if (board[row][col].isFlagged) return;

		playUiClick();

		if (firstClick) {
			placeMines(row, col);
			firstClick = false;
			startTimer();
		}

		if (board[row][col].isMine) {
			// Game over
			playMinesweeperLose();
			gameOver = true;
			clearInterval(timerInterval);
			revealAllMines(row, col);
			return;
		}

		revealCell(row, col);
		checkWin();
		board = board; // Trigger reactivity
	}

	function handleRightClick(event, row, col) {
		event.preventDefault();
		if (gameOver || gameWon) return;
		if (board[row][col].isRevealed) return;

		board[row][col].isFlagged = !board[row][col].isFlagged;
		playMinesweeperFlag(board[row][col].isFlagged);
		flagsPlaced += board[row][col].isFlagged ? 1 : -1;
		board = board;
	}

	function revealAllMines(triggerRow = -1, triggerCol = -1) {
		explodedMine = triggerRow >= 0 && triggerCol >= 0 ? `${triggerRow}-${triggerCol}` : null;
		showGameOverOverlay = false;

		const mineCells = [];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (board[r][c].isMine) {
					mineCells.push({ r, c });
				}
			}
		}

		mineCells.sort((a, b) => {
			if (a.r === triggerRow && a.c === triggerCol) return -1;
			if (b.r === triggerRow && b.c === triggerCol) return 1;
			return 0;
		});

		mineRevealDelays = {};
		mineCells.forEach((m, i) => {
			mineRevealDelays[`${m.r}-${m.c}`] = i * 80;
		});

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (board[r][c].isMine) {
					board[r][c].isRevealed = true;
				}
			}
		}
		board = board;

		const finalDelay = Math.max(1000, mineCells.length * 80 + 300);
		clearTimeout(lossOverlayTimeout);
		lossOverlayTimeout = setTimeout(() => {
			showGameOverOverlay = true;
		}, finalDelay);
	}

	function checkWin() {
		let revealedCount = 0;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (board[r][c].isRevealed && !board[r][c].isMine) {
					revealedCount++;
				}
			}
		}

		if (revealedCount === rows * cols - mineCount) {
			gameWon = true;
			playMinesweeperWin();
			clearInterval(timerInterval);
		}
	}

	function startTimer() {
		timerInterval = setInterval(() => {
			if (timeElapsed < 999) {
				timeElapsed++;
			}
		}, 1000);
	}

	function reset() {
		playUiClick();
		initBoard();
	}

	onMount(() => {
		initBoard();
		return () => {
			clearInterval(timerInterval);
			clearTimeout(lossOverlayTimeout);
		};
	});

	function getCellContent(cell) {
		if (gameOver && cell.isMine) return '💣';
		if (cell.isFlagged) return '🚩';
		if (!cell.isRevealed) return '';
		if (cell.isMine) return '💣';
		if (cell.neighborMines === 0) return '';
		return cell.neighborMines;
	}

	function getCellClass(cell, row, col) {
		if (!cell.isRevealed) return 'cell unrevealed';
		if (cell.isMine) {
			const key = `${row}-${col}`;
			if (gameOver && explodedMine === key) return 'cell mine exploded-mine';
			if (gameOver) return 'cell mine revealed-mine';
			return 'cell mine';
		}
		return 'cell revealed';
	}

	function getMineRevealDelay(row, col) {
		return mineRevealDelays[`${row}-${col}`] ?? 0;
	}

	function getNumberClass(num) {
		return `number-${num}`;
	}

	$: minesRemaining = mineCount - flagsPlaced;
	$: faceEmoji = gameOver ? '😵' : gameWon ? '😎' : '🙂';
	$: safeCellsRevealed = board.flat().filter((cell) => cell.isRevealed && !cell.isMine).length;
</script>

<div class="minesweeper">
	<div class="top-panel">
		<div class="counter">
			{String(Math.max(0, minesRemaining)).padStart(3, '0')}
		</div>
		<button class="face-button" on:click={reset}>
			{faceEmoji}
		</button>
		<div class="counter">
			{String(timeElapsed).padStart(3, '0')}
		</div>
	</div>

	<div class="board">
		{#each board as row, r}
			<div class="row">
				{#each row as cell, c}
					<button
						class={getCellClass(cell, r, c)}
						style={`--explode-delay:${getMineRevealDelay(r, c)}ms`}
						on:click={() => handleCellClick(r, c)}
						on:contextmenu={(e) => handleRightClick(e, r, c)}
					>
						<span
							class={cell.isRevealed && cell.neighborMines > 0
								? getNumberClass(cell.neighborMines)
								: ''}
						>
							{getCellContent(cell)}
						</span>
					</button>
				{/each}
			</div>
		{/each}

		{#if gameOver && showGameOverOverlay}
			<div class="result-overlay game-over-overlay">
				<div class="result-box">
					<div class="result-title">💥 Fin de partida</div>
					<div class="result-stats">
						Tiempo: {timeElapsed}s · Banderas: {flagsPlaced}/{mineCount}
					</div>
					<div class="result-stats">
						Casillas seguras: {safeCellsRevealed}/{rows * cols - mineCount}
					</div>
					<button class="retry-button" on:click={reset}>Reintentar</button>
				</div>
			</div>
		{/if}

		{#if gameWon}
			<div class="result-overlay win-overlay">
				<div class="result-box win-box">
					<div class="result-title win-title">🎉 ¡Ganaste!</div>
					<div class="result-stats">Tiempo final: {timeElapsed}s</div>
					<div class="result-stats">Banderas usadas: {flagsPlaced}/{mineCount}</div>
					<button class="retry-button" on:click={reset}>Jugar de nuevo</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.minesweeper {
		padding: 8px;
		background: #c0c0c0;
		border: 3px solid;
		border-color: #fff #808080 #808080 #fff;
		display: inline-block;
		font-family: 'MS Sans Serif', Arial, sans-serif;
	}

	.top-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px;
		margin-bottom: 8px;
		background: #c0c0c0;
		border: 3px solid;
		border-color: #808080 #fff #fff #808080;
	}

	.counter {
		background: #000;
		color: #ff0000;
		font-family: 'Courier New', monospace;
		font-weight: bold;
		font-size: 30px;
		padding: 4px 8px;
		border: 2px solid;
		border-color: #808080 #fff #fff #808080;
		min-width: 60px;
		text-align: center;
	}

	.face-button {
		width: 40px;
		height: 40px;
		font-size: 24px;
		background: #c0c0c0;
		border: 3px solid;
		border-color: #fff #808080 #808080 #fff;
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.face-button:active {
		border-color: #808080 #fff #fff #808080;
		padding: 2px 0 0 2px;
	}

	.board {
		position: relative;
		background: #c0c0c0;
		border: 3px solid;
		border-color: #808080 #fff #fff #808080;
		padding: 13px;
		display: inline-block;
	}

	.row {
		display: flex;
		line-height: 0;
	}

	.cell {
		width: 24px;
		height: 24px;
		min-width: 24px;
		min-height: 24px;
		max-width: 24px;
		max-height: 24px;
		border: 2px solid;
		background: #c0c0c0;
		cursor: pointer;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		font-weight: bold;
		font-family: Arial, sans-serif;
		box-sizing: border-box;
		flex-shrink: 0;
	}

	.cell.unrevealed {
		border-color: #fff #808080 #808080 #fff;
	}

	.cell.unrevealed:active {
		border-color: #808080 #fff #fff #808080;
	}

	.cell.revealed {
		border: 1px solid #808080;
		background: #c0c0c0;
	}

	.cell.mine {
		background: #ff0000;
		border: 1px solid #808080;
	}

	.cell.mine.revealed-mine {
		background: #a40000;
		animation: mine-reveal 360ms ease-out both;
		animation-delay: var(--explode-delay, 0ms);
	}

	.cell.mine.exploded-mine {
		background: #ff0000;
		animation:
			explode-flash 760ms ease-out both,
			mine-reveal 360ms ease-out both;
		animation-delay:
			0ms,
			var(--explode-delay, 0ms);
	}

	.number-1 {
		color: #0000ff;
	}
	.number-2 {
		color: #008000;
	}
	.number-3 {
		color: #ff0000;
	}
	.number-4 {
		color: #000080;
	}
	.number-5 {
		color: #800000;
	}
	.number-6 {
		color: #008080;
	}
	.number-7 {
		color: #000000;
	}
	.number-8 {
		color: #808080;
	}

	.message {
		text-align: center;
		margin-top: 12px;
		font-weight: bold;
		font-size: 17px;
		color: #ff0000;
	}

	.message.win {
		color: #008000;
	}

	.result-overlay {
		position: absolute;
		inset: 8px;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 20;
	}

	.win-overlay {
		background: rgba(0, 60, 0, 0.68);
	}

	.result-box {
		text-align: center;
		background: #c0c0c0;
		border: 3px solid;
		border-color: #fff #808080 #808080 #fff;
		padding: 10px 14px;
		max-width: 90%;
		animation: pop-in 240ms ease-out;
	}

	.result-title {
		font-size: 17px;
		font-weight: bold;
		margin-bottom: 8px;
		color: #ff0000;
	}

	.win-title {
		color: #008000;
	}

	.result-stats {
		font-size: 13px;
		margin-bottom: 4px;
		color: #000;
	}

	.retry-button {
		margin-top: 8px;
		padding: 5px 12px;
		font-size: 13px;
		font-weight: bold;
		background: #c0c0c0;
		border: 2px solid;
		border-color: #fff #808080 #808080 #fff;
		cursor: pointer;
		animation: pulse 1.2s ease-in-out infinite;
	}

	.retry-button:active {
		border-color: #808080 #fff #fff #808080;
	}

	@keyframes pop-in {
		from {
			transform: scale(0.92);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	@keyframes mine-reveal {
		0% {
			transform: scale(0.4);
			opacity: 0;
		}
		70% {
			transform: scale(1.08);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes explode-flash {
		0% {
			box-shadow: 0 0 0 rgba(255, 230, 80, 0);
			filter: brightness(1);
		}
		30% {
			box-shadow: 0 0 20px rgba(255, 230, 80, 0.95);
			filter: brightness(1.45);
		}
		100% {
			box-shadow: 0 0 0 rgba(255, 230, 80, 0);
			filter: brightness(1);
		}
	}
</style>
