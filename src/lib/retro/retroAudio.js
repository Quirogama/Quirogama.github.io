let audioContext;

function getAudioContext() {
	if (typeof window === 'undefined') return null;
	const AudioContextClass = window.AudioContext || window.webkitAudioContext;
	if (!AudioContextClass) return null;
	if (!audioContext) {
		audioContext = new AudioContextClass();
	}
	if (audioContext.state === 'suspended') {
		audioContext.resume().catch(() => {});
	}
	return audioContext;
}

function tone({
	freq = 880,
	duration = 0.06,
	type = 'square',
	volume = 0.035,
	whenOffset = 0,
	slideTo = null
}) {
	const ctx = getAudioContext();
	if (!ctx) return;

	const now = ctx.currentTime + whenOffset;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();

	osc.type = type;
	osc.frequency.setValueAtTime(freq, now);
	if (slideTo) {
		osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), now + duration);
	}

	gain.gain.setValueAtTime(0.0001, now);
	gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
	gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

	osc.connect(gain);
	gain.connect(ctx.destination);

	osc.start(now);
	osc.stop(now + duration + 0.01);
}

export function playUiClick() {
	tone({ freq: 980, duration: 0.045, type: 'square', volume: 0.026 });
}

export function playUiOpen() {
	tone({ freq: 740, duration: 0.05, type: 'square', volume: 0.03 });
	tone({ freq: 1040, duration: 0.06, type: 'square', volume: 0.03, whenOffset: 0.045 });
}

export function playUiClose() {
	tone({ freq: 980, duration: 0.055, type: 'triangle', volume: 0.03, slideTo: 420 });
}

export function playSnakeEat() {
	tone({ freq: 900, duration: 0.035, type: 'square', volume: 0.028 });
	tone({ freq: 1220, duration: 0.045, type: 'square', volume: 0.028, whenOffset: 0.03 });
}

export function playSnakeCrash() {
	tone({ freq: 320, duration: 0.15, type: 'sawtooth', volume: 0.03, slideTo: 120 });
}

export function playMinesweeperFlag(isFlagged) {
	if (isFlagged) {
		tone({ freq: 860, duration: 0.045, type: 'square', volume: 0.025 });
	} else {
		tone({ freq: 680, duration: 0.04, type: 'square', volume: 0.024 });
	}
}

export function playMinesweeperLose() {
	tone({ freq: 180, duration: 0.18, type: 'sawtooth', volume: 0.032, slideTo: 70 });
}

export function playMinesweeperWin() {
	tone({ freq: 520, duration: 0.06, type: 'triangle', volume: 0.03 });
	tone({ freq: 740, duration: 0.07, type: 'triangle', volume: 0.03, whenOffset: 0.05 });
	tone({ freq: 980, duration: 0.08, type: 'triangle', volume: 0.03, whenOffset: 0.1 });
}