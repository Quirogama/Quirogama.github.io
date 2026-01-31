<script>
  import { onMount } from 'svelte';
  import { portfolioData } from '$lib/config/portfolioData.js';

  let stats = $state(portfolioData.stats.map(stat => ({ ...stat, currentValue: 0 })));
  let hasAnimated = $state(false);

  function animateCounter(index, target) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      stats[index].currentValue = Math.floor(current);

      if (step >= steps || current >= target) {
        stats[index].currentValue = target;
        clearInterval(timer);
      }
    }, duration / steps);
  }

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          stats.forEach((stat, index) => {
            animateCounter(index, stat.value);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  });
</script>

<section class="stats-section">
  <div class="stats-container">
    <div class="stats-grid">
      {#each stats as stat, i}
        <div class="stat-card">
          <div class="stat-icon">{stat.icon}</div>
          <div class="stat-value">{stat.currentValue}{stat.suffix}</div>
          <div class="stat-label">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .stats-section {
    padding: var(--space-8) var(--space-8) var(--space-24) var(--space-8);
    margin-top: -80px;
    position: relative;
    z-index: 2;
    background: linear-gradient(180deg, #0f0f1e 0%, #0f0f1e 18%, rgba(15, 15, 30, 0.5) 40%, rgba(26, 26, 46, 0.8) 70%, rgba(26, 26, 46, 0.6) 85%, rgba(26, 26, 46, 0.3) 100%);
  }

  .stats-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-8);
  }

  .stat-card {
    background: rgba(26, 26, 46, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 16px;
    padding: var(--space-10);
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .stat-card:hover::before {
    left: 100%;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    border-color: rgba(212, 175, 55, 0.5);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
  }

  .stat-icon {
    font-size: var(--text-4xl);
    margin-bottom: var(--space-4);
  }

  .stat-value {
    font-size: var(--text-5xl);
    font-weight: 700;
    background: linear-gradient(135deg, #D4AF37 0%, #F4E5B7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--space-2);
    line-height: 1.2;
  }

  .stat-label {
    font-size: var(--text-base);
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    .stats-section {
      padding: var(--space-12) var(--space-4);
    }

    .stats-grid {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

    .stat-value {
      font-size: var(--text-4xl);
    }
  }
</style>
