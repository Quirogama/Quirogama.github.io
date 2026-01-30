<script>
	let { project } = $props();

	// 3D tilt para cards
	function handleCardTilt(e) {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		const rotateX = (y - centerY) / 10;
		const rotateY = (centerX - x) / 10;
		
		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
	}

	function handleCardLeave(e) {
		e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
	}
</script>

<div class="project-card glass-card"
	onmouseenter={handleCardTilt}
	onmousemove={handleCardTilt}
	onmouseleave={handleCardLeave}>
	<div class="project-header">
		<h3 class="project-title">{project.title}</h3>
	</div>
	<div class="project-problem">
		<h4>Problema</h4>
		<p>{project.problem}</p>
	</div>
	<div class="project-solution">
		<h4>Solución</h4>
		<p>{project.solution}</p>
	</div>
	<div class="project-impact">
		<h4>Impacto</h4>
		<p>{project.impact}</p>
	</div>
	<div class="project-stack">
		{#each project.stack as tech}
			<span class="stack-tag">{tech}</span>
		{/each}
	</div>
	{#if project.links.length > 0}
		<div class="project-links">
			{#each project.links as link}
				<a href={link.url} target="_blank" rel="noopener" class="project-link">
					{link.label}
					<span class="arrow">→</span>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.project-card {
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		padding: 32px;
		border-radius: 16px;
		border: 2px solid var(--glass-border);
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		flex-direction: column;
		transform-style: preserve-3d;
		will-change: transform;
	}

	.project-card:hover {
		border-color: var(--primary);
		box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
	}

	.project-header {
		margin-bottom: 20px;
	}

	.project-title {
		font-size: 1.3rem;
		font-weight: 700;
		margin: 0;
		color: var(--accent);
	}

	.project-card h4 {
		font-size: 0.95rem;
		font-weight: 700;
		margin: 16px 0 8px 0;
		color: var(--primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.project-card p {
		margin: 0;
		color: var(--text-dim);
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.project-problem,
	.project-solution,
	.project-impact {
		margin-bottom: 16px;
	}

	.project-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 16px 0;
		padding-top: 16px;
		border-top: 1px solid var(--glass-border);
	}

	.stack-tag {
		padding: 6px 12px;
		background: rgba(212, 175, 55, 0.1);
		color: var(--primary);
		border-radius: 4px;
		font-size: 0.85rem;
		font-weight: 500;
		border: 1px solid var(--glass-border);
		transition: all 0.3s ease;
	}

	.stack-tag:hover {
		background: var(--primary);
		color: var(--secondary);
		border-color: var(--primary);
	}

	.project-links {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: auto;
		padding-top: 16px;
		border-top: 1px solid var(--glass-border);
	}

	.project-link {
		color: var(--primary);
		text-decoration: none;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 8px;
		transition: all 0.3s ease;
	}

	.project-link:hover {
		gap: 12px;
		text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
	}

	.arrow {
		display: inline-block;
		transition: transform 0.3s ease;
	}

	.project-link:hover .arrow {
		transform: translateX(4px);
	}

	.glass-card {
		background: var(--glass-bg);
		backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid var(--glass-border);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}
</style>
