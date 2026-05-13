<script>
	import { onMount, onDestroy } from 'svelte';
	import { safeEval } from '$lib/utils/mathParser.js';

	let display = '0'; // Pantalla de la calculadora

	// Agrega un número o símbolo a la pantalla
	function press(v) {
		// Si la pantalla está en '0' y no es un punto, reemplaza; sino concatena
		if (display === '0' && v !== '.') display = String(v);
		else display = display + String(v);
	}

	// Limpia la pantalla a '0'
	function clear() {
		display = '0';
	}

	// Elimina el último carácter (o devuelve '0' si quedaría vacío)
	function back() {
		display = display.length > 1 ? display.slice(0, -1) : '0';
	}

	// Calcula y muestra el resultado evaluando la expresión del display
	function evalExpr() {
		try {
			// Valida que el display solo contenga caracteres permitidos: dígitos, operadores, paréntesis y espacios
			if (!/^[0-9+\-*/. ()]+$/.test(display)) return; // Si hay caracteres inválidos, cancela

			// Llama al parser matemático con la expresión del display
			const val = safeEval(display);

			// Si el resultado es un número finito válido, lo muestra; si no, muestra '0'
			display = String(Number.isFinite(val) ? val : '0');
		} catch (e) {
			// Si hay error en la ejecución, muestra 'Error'
			display = 'Error';
		}
	}

	// Hook de ciclo de vida: registra escuchador de teclado cuando el componente se monta
	onMount(() => {
		// Función interna que maneja eventos de tecla presionada
		function handleKeyDown(e) {
			if (e.key >= '0' && e.key <= '9') {
				e.preventDefault(); // Evita comportamiento por defecto del navegador
				press(e.key); // Agrega el dígito al display
			}
			// Mapea operadores matemáticos (+, -, *, /) al método press()
			else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
				e.preventDefault();
				press(e.key);
			}
			// Mapea punto decimal al método press()
			else if (e.key === '.') {
				e.preventDefault();
				press('.');
			}
			// Mapea Enter o = para calcular el resultado
			else if (e.key === 'Enter' || e.key === '=') {
				e.preventDefault();
				evalExpr();
			}
			// Mapea Escape para limpiar la pantalla
			else if (e.key === 'Escape') {
				e.preventDefault();
				clear();
			}
			// Mapea Backspace para borrar el último carácter
			else if (e.key === 'Backspace') {
				e.preventDefault();
				back();
			}
		}

		// Registra el escuchador de eventos 'keydown' en la ventana global del navegador
		window.addEventListener('keydown', handleKeyDown);

		// Retorna función de limpieza que se ejecuta al desmontar el componente
		// Elimina el escuchador para evitar memory leaks
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<div class="calc-root">
	<div class="grid">
		<!-- Pantalla que ocupa toda la fila superior -->
		<div class="display" style="grid-column:1 / -1;">{display}</div>

		<!-- Fila 1: 7 8 9 / -->
		<button class="num" on:click={() => press('7')}>7</button>
		<button class="num" on:click={() => press('8')}>8</button>
		<button class="num" on:click={() => press('9')}>9</button>
		<button on:click={() => press('/')}>/</button>

		<!-- Fila 2: 4 5 6 * -->
		<button class="num" on:click={() => press('4')}>4</button>
		<button class="num" on:click={() => press('5')}>5</button>
		<button class="num" on:click={() => press('6')}>6</button>
		<button on:click={() => press('*')}>*</button>

		<!-- Fila 3: 1 2 3 - -->
		<button class="num" on:click={() => press('1')}>1</button>
		<button class="num" on:click={() => press('2')}>2</button>
		<button class="num" on:click={() => press('3')}>3</button>
		<button on:click={() => press('-')}>-</button>

		<!-- Fila 4: C 0 . + -->
		<button on:click={clear}>C</button>
		<button class="num" on:click={() => press('0')}>0</button>
		<button on:click={() => press('.')}>.</button>
		<button on:click={() => press('+')}>+</button>

		<!-- Fila 5: Back ocupa 3 columnas, = a la derecha -->
		<button class="back" style="grid-column: 1 / span 3;" on:click={back}>Back</button>
		<button class="equals" on:click={evalExpr}>=</button>
	</div>
</div>

<style>
	.calc-root {
		padding: 8px;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
	}
	:root {
		--cell-h: 48px;
	}
	.display {
		border: 1px solid #999;
		padding: 10px 8px;
		background: #fff;
		margin-bottom: 8px;
		font-family: monospace;
		font-size: 22px;
		height: var(--cell-h);
		box-sizing: border-box;
		text-align: right;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		overflow: hidden;
		white-space: nowrap;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(40px, 1fr));
		gap: 6px;
		justify-items: stretch;
		grid-auto-rows: var(--cell-h);
	}
	button {
		padding: 6px 6px;
		cursor: pointer;
		font-size: 16px;
		box-sizing: border-box;
	}
	.num {
		font-size: 18px;
		font-weight: 600;
	}
	.back {
		font-size: 15px;
	}
	.equals {
		font-size: 18px;
		font-weight: 700;
	}
	@media (max-width: 420px) {
		.grid {
			grid-template-columns: repeat(4, minmax(30px, 1fr));
		}
		button {
			font-size: 14px;
			padding: 5px;
		}
		.display {
			font-size: 22px;
		}
	}
</style>
