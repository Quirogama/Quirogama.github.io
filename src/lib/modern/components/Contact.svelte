<script>
	import { PERSONAL_INFO, SOCIAL_LINKS, FORMSPREE_ID } from '$lib/config/portfolioData.js';

	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state(''); // 'success', 'error', or ''

	async function handleSubmit(e) {
		e.preventDefault();
		isSubmitting = true;
		submitStatus = '';

		try {
			const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					message: formData.message
				})
			});

			if (response.ok) {
				submitStatus = 'success';
				formData.name = '';
				formData.email = '';
				formData.message = '';

				setTimeout(() => {
					submitStatus = '';
				}, 4000);
			} else {
				submitStatus = 'error';
				setTimeout(() => {
					submitStatus = '';
				}, 4000);
			}
		} catch (error) {
			console.error('Error:', error);
			submitStatus = 'error';
			setTimeout(() => {
				submitStatus = '';
			}, 4000);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<section class="contact section-shell section-shell--soft" data-reveal id="contact">
	<div class="contact-glow contact-glow--left" aria-hidden="true"></div>
	<div class="contact-glow contact-glow--right" aria-hidden="true"></div>

	<div class="section-content section-content-shell">
		<div class="contact-header">
			<p class="contact-kicker">Contacto directo</p>
			<h2 class="section-title section-title-shell">Hablemos</h2>
			<p class="contact-intro">Si te interesa trabajar juntos, escríbeme!</p>
		</div>

		<div class="contact-grid">
			<div class="contact-rail">
				<div class="contact-cards">
					<a class="contact-card" href="mailto:{PERSONAL_INFO.email}">
						<div class="contact-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect width="20" height="16" x="2" y="4" rx="2" />
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
							</svg>
						</div>
						<div class="contact-card-body">
							<p class="contact-card-label">Correo electrónico</p>
							<h3>{PERSONAL_INFO.email}</h3>
							<p class="contact-detail">Ideal para propuestas, briefs y seguimiento formal.</p>
						</div>
					</a>

					<a class="contact-card" href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
						<div class="contact-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
								<path d="M9 18c-4.51 2-5-2-7-2" />
							</svg>
						</div>
						<div class="contact-card-body">
							<p class="contact-card-label">GitHub</p>
							<h3>@Quirogama</h3>
							<p class="contact-detail">Perfil de trabajo, proyectos y repositorios.</p>
						</div>
					</a>

					<a class="contact-card" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
						<div class="contact-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
								<rect width="4" height="12" x="2" y="9" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						</div>
						<div class="contact-card-body">
							<p class="contact-card-label">LinkedIn</p>
							<h3>quirogama</h3>
							<p class="contact-detail">Conexiones, experiencia y contexto profesional.</p>
						</div>
					</a>
				</div>
			</div>

			<form class="contact-form" onsubmit={handleSubmit}>
				<label class="field">
					<span>Nombre</span>
					<input type="text" required bind:value={formData.name} class="form-input" placeholder="Tu nombre" />
				</label>

				<label class="field">
					<span>Correo electrónico</span>
					<input type="email" required bind:value={formData.email} class="form-input" placeholder="tu@correo.com" />
				</label>

				<label class="field field--message">
					<span>Mensaje</span>
					<textarea
						required
						rows="6"
						bind:value={formData.message}
						class="form-textarea"
						placeholder="Cuéntame qué necesitas, en qué etapa estás y qué sería un buen resultado."
					></textarea>
				</label>

				<div class="form-actions">
					<button type="submit" class="form-submit" disabled={isSubmitting}>
						{isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
					</button>
				</div>

				{#if submitStatus === 'success'}
					<p class="submit-message success">✓ ¡Mensaje enviado! Te contactaré lo antes posible.</p>
				{/if}
				{#if submitStatus === 'error'}
					<p class="submit-message error">✗ Hubo un error al enviar. Intenta nuevamente.</p>
				{/if}
			</form>
		</div>
	</div>
</section>

<footer class="footer">
	<p>© 2026 {PERSONAL_INFO.name}. Todos los derechos reservados.</p>
</footer>

<style>
	.contact {
		position: relative;
		overflow: hidden;
		color: var(--text);
		background:
			radial-gradient(circle at 0% 42%, rgba(212, 175, 55, 0.1), transparent 28%),
			radial-gradient(circle at right center, rgba(124, 58, 237, 0.12), transparent 28%),
			linear-gradient(135deg, rgba(8, 9, 18, 0.98), rgba(15, 16, 34, 0.98));
		animation: fadeIn 0.6s ease-out;
	}

	.contact-glow {
		position: absolute;
		border-radius: 999px;
		filter: blur(18px);
		pointer-events: none;
		opacity: 0.8;
		mix-blend-mode: screen;
	}

	.contact-glow--left {
		width: 180px;
		height: 180px;
		left: -64px;
		top: clamp(220px, 34vh, 360px);
		background: radial-gradient(
			circle,
			rgba(212, 175, 55, 0.3) 0%,
			rgba(212, 175, 55, 0.14) 28%,
			rgba(212, 175, 55, 0) 60%
		);
		opacity: 0.65;
	}

	.contact-glow--right {
		width: 280px;
		height: 280px;
		right: -100px;
		bottom: 60px;
		background: rgba(124, 58, 237, 0.16);
		opacity: 0.45;
	}

	.section-content {
		width: 100%;
		max-width: var(--section-max-width);
		margin: 0 auto;
	}

	.contact-header {
		max-width: 760px;
		margin-bottom: 32px;
	}

	.contact-kicker {
		margin: 0 0 10px 0;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 0.88rem;
		color: var(--primary-light);
	}

	.section-title {
		font-size: var(--section-title-size);
		font-weight: 700;
		margin: 0 0 14px 0;
		letter-spacing: -0.01em;
		position: relative;
		display: inline-block;
		color: var(--accent);
	}

	.section-title::after {
		content: '';
		position: absolute;
		bottom: -12px;
		left: 0;
		width: 60px;
		height: 4px;
		background: linear-gradient(90deg, var(--primary), transparent);
		border-radius: 2px;
	}

	.contact-intro {
		margin: 0;
		max-width: 58ch;
		color: var(--text-dim);
		font-size: var(--text-lg);
		line-height: var(--line-height-normal);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 32px;
		align-items: start;
	}

	.contact-rail {
		display: flex;
		flex-direction: column;
		gap: 14px;
		min-width: 0;
	}

	.contact-card-label {
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--primary-light);
	}

	.contact-detail {
		margin: 0;
		line-height: var(--line-height-normal);
		color: var(--text-dim);
	}

	.contact-cards {
		display: grid;
		gap: 14px;
	}

	.contact-card {
		display: flex;
		gap: 16px;
		align-items: center;
		padding: 22px 24px;
		border-radius: var(--radius-lg);
		border: 1px solid rgba(212, 175, 55, 0.18);
		background: rgba(255, 255, 255, 0.035);
		color: inherit;
		text-decoration: none;
		transition:
			transform 0.3s ease,
			border-color 0.3s ease,
			background 0.3s ease,
			box-shadow 0.3s ease;
	}

	.contact-card:hover {
		transform: translateY(-3px);
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(212, 175, 55, 0.42);
		box-shadow: var(--shadow-gold);
	}

	.contact-card:focus-visible {
		outline: 2px solid var(--primary-light);
		outline-offset: 3px;
	}

	.contact-icon {
		width: 48px;
		height: 48px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
		background: linear-gradient(180deg, var(--primary-light), var(--primary));
		color: var(--secondary);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
	}

	.contact-icon :global(svg) {
		width: 20px;
		height: 20px;
	}

	.contact-card-body {
		min-width: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.contact-card h3 {
		margin: 0 0 4px 0;
		font-size: var(--text-lg);
		font-weight: 700;
		line-height: 1.2;
		color: var(--accent);
	}

	.contact-card-label {
		font-size: 0.88rem;
		margin-bottom: 8px;
	}

	.contact-detail {
		font-size: var(--text-base);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 28px;
		border-radius: var(--radius-lg);
		border: 1px solid rgba(212, 175, 55, 0.2);
		background: rgba(255, 255, 255, 0.04);
		box-shadow: var(--shadow-md);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field span {
		font-size: 0.92rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--primary-light);
	}

	.form-input,
	.form-textarea {
		width: 100%;
		padding: 16px 18px;
		border-radius: var(--radius-md);
		border: 1px solid rgba(212, 175, 55, 0.22);
		background: rgba(4, 4, 10, 0.46);
		color: var(--text);
		font-size: var(--text-base);
		font-family: inherit;
		transition: all 0.3s ease;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: var(--primary);
		background: rgba(4, 4, 10, 0.64);
		box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.12);
	}

	.form-textarea {
		resize: vertical;
		min-height: 136px;
	}

	.field--message .form-textarea {
		min-height: 180px;
	}

	.form-actions {
		display: flex;
		justify-content: center;
	}

	.form-submit {
		padding: 16px 24px;
		border-radius: var(--radius-full);
		border: 1px solid var(--button-border);
		background: var(--button-bg);
		color: var(--button-text);
		font-size: var(--text-base);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	.form-submit:hover:not(:disabled) {
		transform: translateY(-2px);
		background: var(--button-bg-hover);
		color: var(--button-text-hover);
		border-color: var(--button-border-hover);
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(212, 175, 55, 0.18);
	}

	.form-submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.submit-message {
		margin: 0;
		padding: 12px;
		border-radius: var(--radius-md);
		text-align: center;
		font-size: var(--text-sm);
	}

	.submit-message.success {
		background: rgba(16, 163, 74, 0.2);
		border: 1px solid rgba(16, 163, 74, 0.3);
		color: #10a34a;
	}

	.submit-message.error {
		background: rgba(220, 38, 38, 0.2);
		border: 1px solid rgba(220, 38, 38, 0.3);
		color: #dc2626;
	}

	.footer {
		background: #000;
		color: var(--text-dim);
		padding: 40px;
		text-align: center;
		font-size: 1rem;
	}

	.footer p {
		margin: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@media (min-width: 1281px) and (max-width: 1600px), (min-width: 1281px) and (max-height: 900px) {
		.section-content {
			max-width: 1120px;
		}

		.contact-header {
			margin-bottom: 24px;
		}

		.contact-grid {
			gap: 28px;
		}

		.contact-card {
			padding: 18px 20px;
		}

		.contact-icon {
			width: 44px;
			height: 44px;
		}

		.contact-form {
			padding: 24px;
		}
	}

	@media (min-width: 1201px) and (max-width: 1280px), (min-width: 1201px) and (max-height: 760px) {
		.contact-grid {
			gap: 24px;
		}

		.contact-card {
			padding: 16px 18px;
		}

		.contact-form {
			padding: 20px;
		}

		.form-textarea {
			min-height: 112px;
		}
	}

	@media (min-width: 1201px) {
		.contact-grid {
			align-items: stretch;
		}

		.contact-rail,
		.contact-form {
			height: 100%;
		}

		.contact-cards {
			height: 100%;
		}

		.contact-card {
			height: 100%;
		}
	}

	@media (max-width: 1200px) {
		.contact-grid {
			gap: 24px;
		}

		.contact-header {
			margin-bottom: 24px;
		}

		.contact-form {
			padding: 24px;
		}
	}

	@media (max-width: 968px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}

		.contact-form {
			padding: 22px 18px;
		}
	}

	@media (max-width: 768px) {
		.contact-header {
			margin-bottom: 18px;
		}

		.contact-intro {
			font-size: var(--text-base);
		}

		.contact-form {
			padding: 18px 14px;
		}

		.contact-cards {
			gap: 10px;
		}

		.contact-card {
			padding: 14px;
			gap: 12px;
		}

		.contact-icon {
			width: 38px;
			height: 38px;
		}

		.contact-icon :global(svg) {
			width: 16px;
			height: 16px;
		}

		.form-textarea {
			min-height: 118px;
		}

		.form-submit {
			width: 100%;
		}

		.contact-glow {
			opacity: 0.45;
		}
	}

	@media (max-width: 480px) {
		.contact-intro {
			font-size: 0.98rem;
		}

		.contact-card h3 {
			font-size: 1.06rem;
		}

		.contact-detail {
			font-size: 0.98rem;
		}

		.contact-form {
			padding: 16px 12px;
		}

		.form-input,
		.form-textarea {
			padding: 12px 14px;
		}

	}
</style>
