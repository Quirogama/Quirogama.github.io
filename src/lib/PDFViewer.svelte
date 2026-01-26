<script>
	let { src = '' } = $props();
	
	// Ensure src is a string
	const pdfUrl = String(src || '');
</script>

<div class="pdf-container">
	{#if pdfUrl}
		<iframe
			title="PDF Viewer"
			src={pdfUrl}
			width="100%"
			height="100%"
		></iframe>
	{:else}
		<div style="padding: 20px;">
			<p>No PDF file specified.</p>
		</div>
	{/if}
</div>

<style>
	.pdf-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: var(--window-face);
	}

	iframe {
		border: none;
		display: block;
	}
</style>

