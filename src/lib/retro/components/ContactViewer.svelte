<script>
	import { PERSONAL_INFO, SOCIAL_LINKS } from '$lib/config/portfolioData.js';
</script>

<div class="contact-container">
	<h3 class="contact-title">Contacto</h3>

	<div class="contact-item">
		<strong>Correo:</strong>
		<a href="mailto:{PERSONAL_INFO.email}">{PERSONAL_INFO.email}</a>
		<span class="contact-note">(abre cliente de correo)</span>
	</div>

	<div class="contact-item">
		<strong>GitHub:</strong>
		<a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">@Quirogama</a>
		<span class="contact-note">(enlace externo)</span>
	</div>

	<div class="contact-item">
		<strong>LinkedIn:</strong>
		<a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">quirogama</a>
		<span class="contact-note">(enlace externo)</span>
	</div>

</div>

<style>
	.contact-container {
		padding: 14px;
		height: 100%;
		overflow-y: auto;
		background: var(--window-face, #c0c0c0);
		color: #000;
		font-family: 'MS Sans Serif', Tahoma, Verdana, Arial, sans-serif;
		font-size: 15px;
		line-height: 1.6;
	}

	.contact-title {
		margin: 0 0 12px 0;
		font-size: 19px;
		color: #000080;
	}

	.contact-item {
		background: #ffffff;
		border-top: 2px solid #808080;
		border-left: 2px solid #808080;
		border-right: 2px solid #ffffff;
		border-bottom: 2px solid #ffffff;
		padding: 10px 12px;
		margin-bottom: 10px;
	}

	.contact-item a {
		color: #0000cc;
		text-decoration: underline;
	}

	.contact-note {
		display: block;
		font-size: 13px;
		color: #555;
		margin-top: 2px;
	}
</style>
