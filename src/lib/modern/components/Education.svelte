<script>
	import { CERTIFICATIONS, EDUCATION } from '$lib/config/portfolioData.js';
</script>

<section class="education section-shell section-shell--soft" data-reveal id="education">
	<div class="section-content section-content-shell">
		<h2 class="section-title section-title-shell">Educación</h2>
		<div class="education-list">
			{#each EDUCATION as edu (edu.degree)}
				<div class="education-item">
					<div class="edu-header">
						<h3 class="edu-degree">{edu.degree}</h3>
						<span class="edu-period">{edu.period}</span>
					</div>
					<p class="edu-institution">{edu.institution}</p>
					<p class="edu-details">{edu.details}</p>
				</div>
			{/each}
		</div>

		<div class="certifications" aria-label="Certificados">
			<h3 class="certifications-title">Certificados</h3>
			{#if CERTIFICATIONS.length > 0}
				<div class="certifications-grid">
					{#each CERTIFICATIONS as cert (cert.id)}
						<article class="certification-item">
							<div class="cert-meta">
								<h4 class="cert-name">{cert.name}</h4>
								<p class="cert-issuer">{cert.issuer}</p>
								{#if cert.credentialType}
									<p class="cert-type">{cert.credentialType}</p>
								{/if}
								{#if cert.duration}
									<p class="cert-duration">Duración: {cert.duration}</p>
								{/if}
								<p class="cert-year">{cert.year}</p>
							</div>
							{#if cert.url}
								<a
									href={cert.url}
									target="_blank"
									rel="noopener noreferrer"
										class="cert-link action-button action-button--compact"
								>
										<span class="action-button__icon" aria-hidden="true">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<path d="M14 3h7v7" />
												<path d="M10 14 21 3" />
												<path d="M21 14v7h-7" />
												<path d="M3 10V3h7" />
												<path d="M14 10 3 21" />
											</svg>
										</span>
										<span class="action-button__label">Ver certificado</span>
										<span class="action-button__arrow" aria-hidden="true">→</span>
								</a>
							{/if}
						</article>
					{/each}
				</div>
			{:else}
				<p class="cert-empty">
					Actualmente estoy consolidando esta sección. Pronto añadiré mis certificados
					verificables.
				</p>
			{/if}
		</div>
	</div>
</section>

<style>
	.education {
		background: rgba(0, 0, 0, 0.2);
		animation: fadeIn 0.6s ease-out;
		position: relative;
		z-index: 1;
	}

	.section-content {
		max-width: var(--section-max-width);
		margin: 0 auto;
	}

	.section-title {
		font-size: var(--section-title-size);
		font-weight: 700;
		margin: 0 0 var(--section-title-gap) 0;
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

	.education-list {
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-items: center;
	}

	.education-item {
		width: min(100%, 640px);
		padding: 28px;
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		border-radius: 12px;
		border: 2px solid var(--glass-border);
		border-left: 4px solid var(--primary);
		transition: all 0.3s ease;
	}

	.education-item:hover {
		border-color: var(--primary);
		box-shadow: 0 8px 24px rgba(212, 175, 55, 0.2);
		transform: translateX(4px);
	}

	.edu-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 8px;
		gap: 16px;
	}

	.edu-degree {
		font-size: 1.8rem;
		font-weight: 700;
		margin: 0;
		color: var(--accent);
	}

	.edu-period {
		color: var(--primary);
		font-weight: 600;
		font-size: 1.5rem;
		white-space: nowrap;
	}

	.edu-institution {
		margin: 0 0 8px 0;
		color: var(--text-dim);
		font-weight: 500;
		font-size: 1.5rem;
	}

	.edu-details {
		margin: 0;
		color: var(--text-dim);
		font-size: 1.5rem;
		line-height: 1.6;
	}

	.certifications {
		margin-top: 36px;
	}

	.certifications-title {
		font-size: 1.9rem;
		font-weight: 700;
		margin: 0 0 16px 0;
		color: var(--accent);
	}

	.certifications-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 14px;
	}

	.certification-item {
		background: var(--glass-bg);
		border: 2px solid var(--glass-border);
		border-left: 4px solid var(--primary);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transition: border-color 0.2s ease, transform 0.2s ease;
	}

	.certification-item:hover {
		border-color: var(--primary);
		transform: translateY(-2px);
	}

	.cert-name {
		margin: 0;
		font-size: 1.2rem;
		color: var(--accent);
	}

	.cert-issuer,
	.cert-type,
	.cert-duration,
	.cert-year {
		margin: 0;
		font-size: 1rem;
		color: var(--text-dim);
	}

	.cert-link {
		align-self: flex-start;
		margin-top: 2px;
	}

	.cert-empty {
		margin: 0;
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--text-dim);
		background: var(--glass-bg);
		border: 2px dashed var(--glass-border);
		border-radius: 12px;
		padding: 16px;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 1200px) {
		.section-content {
			max-width: 1080px;
		}

		.edu-degree {
			font-size: 1.65rem;
		}

		.edu-period,
		.edu-institution,
		.edu-details {
			font-size: 1.4rem;
		}

		.certifications-title {
			font-size: 1.75rem;
		}
	}

	@media (max-width: 768px) {
		.education-list {
			gap: 14px;
		}

		.education-item {
			width: 100%;
			padding: 18px;
		}

		.edu-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
			margin-bottom: 6px;
		}

		.edu-degree {
			font-size: 1.25rem;
		}

		.edu-period,
		.edu-institution,
		.edu-details {
			font-size: 1.05rem;
		}

		.edu-details {
			line-height: 1.5;
		}

		.certifications {
			margin-top: 24px;
		}

		.certifications-title {
			font-size: 1.3rem;
			margin-bottom: 10px;
		}

		.certifications-grid {
			grid-template-columns: 1fr;
			gap: 10px;
		}

		.certification-item {
			padding: 14px;
		}

		.cert-name {
			font-size: 1.05rem;
		}

		.cert-issuer,
		.cert-year,
		.cert-link,
		.cert-empty {
			font-size: 0.95rem;
		}

		.cert-link {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 480px) {
		.edu-degree {
			font-size: 1.15rem;
		}

		.edu-period,
		.edu-institution,
		.edu-details {
			font-size: 0.98rem;
		}
	}
</style>
