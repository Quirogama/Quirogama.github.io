<script>
	import { PERSONAL_INFO, SOCIAL_LINKS, PROFESSIONAL_INTERESTS } from '$lib/config/portfolioData.js';
</script>

<section class="contact" data-reveal id="contact">
	<div class="section-content">
		<h2 class="section-title">Contacto</h2>
		<div class="contact-info">
			<p>Me interesa participar en proyectos de {PROFESSIONAL_INTERESTS.roles.join(', ')}.</p>
			<div class="contact-links">
				<a href={SOCIAL_LINKS.github} target="_blank" rel="noopener" class="contact-link">GitHub</a>
				<a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener" class="contact-link">LinkedIn</a>
				<a href="mailto:{PERSONAL_INFO.email}" class="contact-link">{PERSONAL_INFO.email}</a>
			</div>
		</div>
	</div>
</section>

<footer class="footer">
	<p>© 2025 {PERSONAL_INFO.name}. Diseño & código hecho con ❤️</p>
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

	.contact-info {
		text-align: center;
	}

	.contact-info p {
		font-size: 1.25rem;
		margin-bottom: 32px;
		color: var(--text);
	}

	.contact-links {
		display: flex;
		gap: 24px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.contact-link {
		padding: 12px 28px;
		border: 2px solid var(--primary);
		color: var(--primary);
		text-decoration: none;
		border-radius: var(--radius-md);
		font-weight: 600;
		font-size: 1.05rem;
		transition: all 0.3s ease;
	}

	.contact-link:hover {
		background: var(--primary);
		color: var(--secondary);
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
	}

	.footer {
		background: #000000;
		color: var(--text-dim);
		padding: 40px;
		text-align: center;
		font-size: 0.95rem;
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

	@media (max-width: 768px) {
		.contact {
			padding: 60px 20px;
		}

		.contact-links {
			flex-direction: column;
		}

		.contact-link {
			width: 100%;
			text-align: center;
		}
	}
</style>
