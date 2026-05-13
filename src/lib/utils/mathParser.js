// ============================================================================
// MATH PARSER - Parser matemático seguro sin eval()
// ============================================================================
// Tokeniza, reconoce precedencia de operadores y paréntesis
// Reutilizable en cualquier componente que necesite evaluar expresiones

export function safeEval(expr) {
	// Tokenizador: extrae números, operadores y paréntesis del string
	const tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g);
	if (!tokens) return NaN; // Sin tokens válidos, error

	let index = 0;

	// Parser recursivo con precedencia: multiplicación/división antes que suma/resta
	function parseExpression() {
		// Punto de entrada: evalúa suma y resta (precedencia más baja)
		return parseAddSub();
	}

	function parseAddSub() {
		// Suma y resta: obtiene izquierda (mul/div), luego opera secuencialmente
		let left = parseMulDiv();
		while (index < tokens.length && (tokens[index] === '+' || tokens[index] === '-')) {
			const op = tokens[index++];
			const right = parseMulDiv();
			left = op === '+' ? left + right : left - right;
		}
		return left;
	}

	function parseMulDiv() {
		// Multiplicación y división: obtiene izquierda (factor), luego opera secuencialmente
		let left = parseFactor();
		while (index < tokens.length && (tokens[index] === '*' || tokens[index] === '/')) {
			const op = tokens[index++];
			const right = parseFactor();
			left = op === '*' ? left * right : left / right;
		}
		return left;
	}

	function parseFactor() {
		// Factor: número, paréntesis o unario (negativo)
		const token = tokens[index];

		// Parsea números (enteros o decimales)
		if (/^\d+\.?\d*$/.test(token)) {
			index++;
			return parseFloat(token); // Convierte a número
		}

		// Parsea paréntesis: abre, evalúa recursivamente, cierra
		if (token === '(') {
			index++; // Consume '('
			const result = parseExpression();
			index++; // Consume ')'
			return result;
		}

		// Parsea negativo unario
		if (token === '-') {
			index++;
			return -parseFactor();
		}

		// Parsea positivo unario
		if (token === '+') {
			index++;
			return parseFactor();
		}

		return NaN; // Token inválido
	}

	return parseExpression(); // Inicia el parseo desde la expresión raíz
}
