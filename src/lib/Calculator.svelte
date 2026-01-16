<script>
  let display = '0'; // Pantalla de la calculadora

  // Agrega un número o símbolo a la pantalla
  function press(v) {
    if (display === '0' && v !== '.') display = String(v);
    else display = display + String(v);
  }

  // Limpia la pantalla
  function clear() { display = '0'; }

  // Elimina el último carácter
  function back() { display = display.length > 1 ? display.slice(0, -1) : '0'; }

  // Parser matemático seguro sin eval()
  function safeEval(expr) {
    // Tokenizador: convierte la expresión en tokens
    const tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g);
    if (!tokens) return NaN;

    let index = 0;

    // Parser recursivo con precedencia de operadores
    function parseExpression() {
      return parseAddSub();
    }

    function parseAddSub() {
      let left = parseMulDiv();
      while (index < tokens.length && (tokens[index] === '+' || tokens[index] === '-')) {
        const op = tokens[index++];
        const right = parseMulDiv();
        left = op === '+' ? left + right : left - right;
      }
      return left;
    }

    function parseMulDiv() {
      let left = parseFactor();
      while (index < tokens.length && (tokens[index] === '*' || tokens[index] === '/')) {
        const op = tokens[index++];
        const right = parseFactor();
        left = op === '*' ? left * right : left / right;
      }
      return left;
    }

    function parseFactor() {
      const token = tokens[index];
      
      // Números
      if (/^\d+\.?\d*$/.test(token)) {
        index++;
        return parseFloat(token);
      }
      
      // Paréntesis
      if (token === '(') {
        index++; // consume '('
        const result = parseExpression();
        index++; // consume ')'
        return result;
      }
      
      // Operadores unarios (negativo)
      if (token === '-') {
        index++;
        return -parseFactor();
      }
      
      if (token === '+') {
        index++;
        return parseFactor();
      }
      
      return NaN;
    }

    return parseExpression();
  }

  // Calcula y muestra el resultado
  function evalExpr() {
    try {
      // Valida que solo haya números y operadores permitidos
      if (!/^[0-9+\-*/. ()]+$/.test(display)) return;
      const val = safeEval(display);
      display = String(Number.isFinite(val) ? val : '0');
    } catch (e) {
      display = 'Error';
    }
  }
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
  .calc-root{ padding:8px;width:100%;box-sizing:border-box; display:flex; justify-content:center }
  :root { --cell-h: 48px; }
  .display{ border:1px solid #999;padding:10px 8px;background:#fff;margin-bottom:8px;font-family:monospace;font-size:22px; height:var(--cell-h); box-sizing:border-box; text-align:right; display:flex; align-items:center; justify-content:flex-end }
  .grid{ display:grid; grid-template-columns: repeat(4, minmax(40px, 1fr)); gap:6px; justify-items:stretch; grid-auto-rows: var(--cell-h) }
  button{ padding:6px 6px; cursor:pointer; font-size:16px; box-sizing:border-box }
  .num{ font-size:18px; font-weight:600 }
  .back{ font-size:15px }
  .equals{ font-size:18px; font-weight:700 }
  @media (max-width:420px){ .grid{ grid-template-columns: repeat(4,minmax(30px,1fr)) } button{ font-size:14px; padding:5px } .display{ font-size:22px } }
</style>
