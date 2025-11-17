<script>
  let display = '0';

  function press(v) {
    if (display === '0' && v !== '.') display = String(v);
    else display = display + String(v);
  }

  function clear() { display = '0'; }

  function back() { display = display.length > 1 ? display.slice(0, -1) : '0'; }

  function evalExpr() {
    try {
      // very small sandbox: allow only numbers and operators
      if (!/^[0-9+\-*/. ()]+$/.test(display)) return;
      // eslint-disable-next-line no-eval
      const val = eval(display);
      display = String(Number.isFinite(val) ? val : '0');
    } catch (e) {
      display = 'Error';
    }
  }
</script>


<div class="calc-root">
  <div class="grid">
    <!-- Display occupies the top row and spans all 4 columns -->
    <div class="display" style="grid-column:1 / -1;">{display}</div>

    <!-- Row 1: 7 8 9 / -->
    <button class="num" on:click={() => press('7')}>7</button>
    <button class="num" on:click={() => press('8')}>8</button>
    <button class="num" on:click={() => press('9')}>9</button>
    <button on:click={() => press('/')}>/</button>

    <!-- Row 2: 4 5 6 * -->
    <button class="num" on:click={() => press('4')}>4</button>
    <button class="num" on:click={() => press('5')}>5</button>
    <button class="num" on:click={() => press('6')}>6</button>
    <button on:click={() => press('*')}>*</button>

    <!-- Row 3: 1 2 3 - -->
    <button class="num" on:click={() => press('1')}>1</button>
    <button class="num" on:click={() => press('2')}>2</button>
    <button class="num" on:click={() => press('3')}>3</button>
    <button on:click={() => press('-')}>-</button>

    <!-- Row 4: C 0 . + -->
    <button on:click={clear}>C</button>
    <button class="num" on:click={() => press('0')}>0</button>
    <button on:click={() => press('.')}>.</button>
    <button on:click={() => press('+')}>+</button>

    <!-- Row 5: Back spans 3 columns, = on the right -->
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
