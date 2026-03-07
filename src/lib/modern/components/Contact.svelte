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
				// Reset form
				formData.name = '';
				formData.email = '';
				formData.message = '';

				// Clear success message after 4 seconds
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

<section class="contact" data-reveal id="contact">
	<div class="section-content">
		<h2 class="section-title">Contacto</h2>
		<div class="contact-grid">
			<div class="contact-info">
				<div class="contact-cards">
					<div class="contact-card">
						<div class="contact-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect width="20" height="16" x="2" y="4" rx="2" />
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
							</svg>
						</div>
						<div>
							<h3>Correo Electrónico</h3>
							<a href="mailto:{PERSONAL_INFO.email}" class="contact-detail">{PERSONAL_INFO.email}</a
							>
							<p class="contact-disclaimer">Abre tu cliente de correo</p>
						</div>
					</div>

					<div class="contact-card">
						<div class="contact-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
								/>
								<path d="M9 18c-4.51 2-5-2-7-2" />
							</svg>
						</div>
						<div>
							<h3>GitHub</h3>
							<a href={SOCIAL_LINKS.github} target="_blank" rel="noopener" class="contact-detail"
								>@Quirogama</a
							>
							<p class="contact-disclaimer">Enlace externo</p>
						</div>
					</div>

					<div class="contact-card">
						<div class="contact-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
								/>
								<rect width="4" height="12" x="2" y="9" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						</div>
						<div>
							<h3>LinkedIn</h3>
							<a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener" class="contact-detail"
								>quirogama</a
							>
							<p class="contact-disclaimer">Enlace externo</p>
						</div>
					</div>
				</div>
			</div>

			<form class="contact-form" onsubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nombre"
					required
					bind:value={formData.name}
					class="form-input"
				/>
				<input
					type="email"
					placeholder="Correo electrónico"
					required
					bind:value={formData.email}
					class="form-input"
				/>
				<textarea
					placeholder="Mensaje"
					required
					rows="6"
					bind:value={formData.message}
					class="form-textarea"
				></textarea>
				<button type="submit" class="form-submit" disabled={isSubmitting}>
					{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
				</button>
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
		background: linear-gradient(135deg, var(--secondary) 0%, #000000 100%);
		color: var(--text);
		padding: 120px 40px;
		animation: fadeIn 0.6s ease-out;
		position: relative;
		z-index: 1;
	}

	.section-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-title {
		font-size: clamp(2.5rem, 6vw, 3.5rem);
		font-weight: 700;
		margin: 0 0 60px 0;
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

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 60px;
		align-items: start;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		height: auto;
		width: 100%;
		min-width: 0;
	}

	.contact-info p {
		font-size: 1.25rem;
		margin-bottom: 24px;
		color: var(--text);
		line-height: 1.6;
	}

	.contact-cards {
		display: grid;
		grid-template-rows: repeat(3, auto);
		gap: 16px;
		flex: initial;
		align-content: start;
		width: 100%;
	}

	.contact-card {
		background: rgba(26, 26, 46, 0.4);
		border: 1px solid rgba(212, 175, 55, 0.2);
		border-radius: var(--radius-lg);
		padding: 22px 24px 16px;
		transition: all 0.3s ease;
		display: flex;
		align-items: flex-start;
		gap: 16px;
		height: auto;
		width: 100%;
	}

	.contact-card:hover {
		background: rgba(26, 26, 46, 0.6);
		border-color: rgba(212, 175, 55, 0.4);
		transform: translateX(8px);
	}

	.contact-icon {
		width: 42px;
		height: 42px;
		flex-shrink: 0;
		background: var(--primary);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--secondary);
	}

	.contact-icon :global(svg) {
		width: 20px;
		height: 20px;
	}

	.contact-card h3 {
		font-size: 1.42rem;
		font-weight: 600;
		color: var(--primary);
		margin: 0 0 4px 0;
	}

	.contact-detail {
		color: var(--text);
		text-decoration: none;
		font-size: 1.36rem;
		transition: color 0.3s ease;
		display: block;
	}

	.contact-disclaimer {
		margin: 2px 0 0 0;
		font-size: 1.02rem;
		color: var(--text-dim);
	}

	.contact-detail:hover {
		color: var(--primary);
	}

	.contact-form {
		background: rgba(26, 26, 46, 0.4);
		border: 1px solid rgba(212, 175, 55, 0.2);
		border-radius: var(--radius-lg);
		padding: 40px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		height: 100%;
		width: 100%;
		min-width: 0;
	}

	.form-input,
	.form-textarea {
		width: 100%;
		padding: 16px;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(212, 175, 55, 0.2);
		border-radius: var(--radius-md);
		color: var(--text);
		font-size: 1.5rem;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: var(--primary);
		background: rgba(0, 0, 0, 0.4);
	}

	.form-textarea {
		resize: vertical;
		min-height: 150px;
	}

	.form-submit {
		padding: 16px 32px;
		background: var(--primary);
		color: var(--secondary);
		border: none;
		border-radius: var(--radius-md);
		font-size: 1.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.form-submit:hover:not(:disabled) {
		background: #f4e5b7;
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
	}

	.form-submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.submit-message {
		text-align: center;
		font-size: 1.5rem;
		margin: 0;
		padding: 12px;
		border-radius: var(--radius-md);
	}

	.submit-message.success {
		background: rgba(16, 163, 74, 0.2);
		color: #10a34a;
		border: 1px solid rgba(16, 163, 74, 0.3);
	}

	.submit-message.error {
		background: rgba(220, 38, 38, 0.2);
		color: #dc2626;
		border: 1px solid rgba(220, 38, 38, 0.3);
	}

	.footer {
		background: #000000;
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

	/* Desktop mediano: 1600x900 / 1536x864 / 1440x900 / 1350x800 aprox */
	@media (min-width: 1281px) and (max-width: 1600px), (min-width: 1281px) and (max-height: 900px) {
		.contact {
			padding: 96px 32px;
		}

		.section-content {
			max-width: 1120px;
		}

		.section-title {
			margin: 0 0 44px 0;
		}

		.contact-grid {
			gap: 40px;
			align-items: start;
		}

		.contact-info {
			height: auto;
		}

		.contact-cards {
			grid-template-rows: repeat(3, auto);
			gap: 12px;
			flex: initial;
			align-content: start;
		}

		.contact-card {
			padding: 16px 18px 12px;
			align-items: flex-start;
			gap: 12px;
			height: auto;
		}

		.contact-icon {
			width: 38px;
			height: 38px;
		}

		.contact-icon :global(svg) {
			width: 18px;
			height: 18px;
		}

		.contact-card h3 {
			font-size: 1.15rem;
		}

		.contact-detail {
			font-size: 1.1rem;
		}

		.contact-disclaimer {
			font-size: 0.86rem;
		}

		.contact-form {
			padding: 34px;
			gap: 18px;
			height: auto;
		}

		.form-input,
		.form-textarea,
		.form-submit,
		.submit-message {
			font-size: 1.3rem;
		}

		.form-input,
		.form-textarea,
		.form-submit {
			padding: 14px 15px;
		}

		.form-textarea {
			min-height: 138px;
		}
	}

	/* Desktop pequeno: 1366x768 / 1280x720 aprox */
	@media (min-width: 1201px) and (max-width: 1280px), (min-width: 1201px) and (max-height: 760px) {
		.contact {
			padding: 84px 28px;
		}

		.section-content {
			max-width: 1040px;
		}

		.section-title {
			margin: 0 0 36px 0;
		}

		.contact-grid {
			gap: 28px;
		}

		.contact-cards {
			gap: 14px;
		}

		.contact-card {
			padding: 20px 18px 14px;
			gap: 14px;
		}

		.contact-icon {
			width: 40px;
			height: 40px;
		}

		.contact-icon :global(svg) {
			width: 19px;
			height: 19px;
		}

		.contact-card h3 {
			font-size: 1.4rem;
		}

		.contact-detail {
			font-size: 1.34rem;
		}

		.contact-disclaimer {
			font-size: 1rem;
		}

		.contact-form {
			padding: 22px;
			gap: 12px;
		}

		.form-input,
		.form-textarea,
		.form-submit {
			padding: 11px 12px;
		}

		.form-textarea {
			min-height: 108px;
		}
	}

	/* Sincroniza alturas de ambas columnas en desktop para evitar descuadre vertical */
	@media (min-width: 1201px) {
		.contact-grid {
			align-items: stretch;
		}

		.contact-info,
		.contact-form {
			height: 100%;
		}

		.contact-cards {
			height: 100%;
			grid-template-rows: repeat(3, minmax(0, 1fr));
		}

		.contact-card {
			height: 100%;
		}
	}

	@media (max-width: 1200px) {
		.contact {
			padding: 96px 32px;
		}

		.section-content {
			max-width: 1080px;
		}

		.section-title {
			font-size: clamp(2.3rem, 5vw, 3.2rem);
			margin: 0 0 50px 0;
		}

		.contact-grid {
			gap: 48px;
		}

		.contact-info p {
			font-size: 1.15rem;
		}

		.contact-card {
			padding: 28px;
		}

		.contact-card h3,
		.contact-detail,
		.form-input,
		.form-textarea,
		.form-submit,
		.submit-message {
			font-size: 1.4rem;
		}
	}

	@media (max-width: 968px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.contact-form {
			padding: 32px 24px;
		}
	}

	@media (max-width: 768px) {
		.contact {
			padding: 60px 20px;
		}
	}
</style>
