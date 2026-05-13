<script>
	import { onMount, onDestroy } from 'svelte';
	import { playUiClick } from '../config/retroAudio.js';
	import { ALBUMS, getNextTrack } from '../config/albums.js';

	let currentAlbumId = $state(ALBUMS[0].id);
	let currentTrackId = $state(ALBUMS[0].tracks[0].id);
	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let volume = $state(70);
	let audioElement = $state(null);
	let showAlbumList = $state(false);

	// Computed
	let currentAlbum = $derived(ALBUMS.find((a) => a.id === currentAlbumId));
	let currentTrack = $derived(currentAlbum?.tracks.find((t) => t.id === currentTrackId));

	function formatTime(seconds) {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function play() {
		playUiClick();
		if (audioElement) {
			audioElement.play();
			isPlaying = true;
		}
	}

	function pause() {
		playUiClick();
		if (audioElement) {
			audioElement.pause();
			isPlaying = false;
		}
	}

	function togglePlayPause() {
		if (isPlaying) {
			pause();
		} else {
			play();
		}
	}

	function nextTrack() {
		playUiClick();
		const next = getNextTrack(currentAlbumId, currentTrackId);
		if (next) {
			currentAlbumId = next.albumId;
			currentTrackId = next.track.id;
			if (isPlaying && audioElement) {
				// El cambio de src dispara una carga; con autoplay o play() se reanuda
				audioElement.play();
			}
		}
	}

	function prevTrack() {
		playUiClick();
		const album = currentAlbum;
		if (!album) return;

		const currentIndex = album.tracks.findIndex((t) => t.id === currentTrackId);
		if (currentIndex > 0) {
			currentTrackId = album.tracks[currentIndex - 1].id;
		} else if (currentIndex === 0 && ALBUMS.length > 1) {
			// Ir al álbum anterior, última canción
			const prevAlbumIndex = (ALBUMS.findIndex((a) => a.id === currentAlbumId) - 1 + ALBUMS.length) % ALBUMS.length;
			const prevAlbum = ALBUMS[prevAlbumIndex];
			currentAlbumId = prevAlbum.id;
			currentTrackId = prevAlbum.tracks[prevAlbum.tracks.length - 1].id;
		}

		if (isPlaying && audioElement) {
			audioElement.play();
		}
	}

	function selectTrack(trackId) {
		playUiClick();
		currentTrackId = trackId;
		if (isPlaying && audioElement) {
			audioElement.play();
		}
	}

	function selectAlbum(albumId) {
		playUiClick();
		currentAlbumId = albumId;
		const album = ALBUMS.find((a) => a.id === albumId);
		if (album) {
			currentTrackId = album.tracks[0].id;
			if (isPlaying && audioElement) {
				audioElement.play();
			}
		}
		showAlbumList = false;
	}

	function handleTimeUpdate() {
		if (audioElement) {
			currentTime = audioElement.currentTime;
		}
	}

	function handleEnded() {
		nextTrack();
	}

	function handleLoadedMetadata() {
		if (audioElement) {
			duration = audioElement.duration;
		}
	}

	function seek(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		const newTime = (e.clientX - rect.left) / rect.width * duration;
		if (audioElement) {
			audioElement.currentTime = newTime;
		}
	}

	onMount(() => {
		// Obtener elemento de audio
		const audio = document.querySelector('[data-media-player-audio]');
		if (audio) {
			audioElement = audio;
		}
	});

	onDestroy(() => {
		if (audioElement) {
			audioElement.pause();
		}
	});
</script>

<div class="media-player">
	<!-- Pantalla de información -->
	<div class="display-panel">
		<div class="album-display">
			{#if currentAlbum}
				<img src={currentAlbum.cover} alt={currentAlbum.title} class="album-cover" />
				<div class="album-info">
					<div class="album-title">{currentAlbum.title}</div>
					<div class="album-artist">{currentAlbum.artist}</div>
					{#if currentTrack}
						<div class="track-name">{currentTrack.title}</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Time display -->
		<div class="time-display">
			<span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
		</div>

		<!-- Progress bar -->
		<div class="progress-bar-container" on:click={seek}>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {(currentTime / duration) * 100}%"></div>
			</div>
		</div>
	</div>

	<!-- Controles -->
	<div class="controls">
		<button on:click={prevTrack} title="Anterior" class="control-btn">
			<span class="btn-label">◄◄</span>
		</button>
		<button on:click={togglePlayPause} class="control-btn play-btn" title={isPlaying ? 'Pausar' : 'Reproducir'}>
			<span class="btn-label">{isPlaying ? '⏸' : '▶'}</span>
		</button>
		<button on:click={nextTrack} title="Siguiente" class="control-btn">
			<span class="btn-label">►►</span>
		</button>

		<!-- Volume control -->
		<div class="volume-control">
			<label for="volume">Vol:</label>
			<input
				id="volume"
				type="range"
				min="0"
				max="100"
				bind:value={volume}
				on:change={() => {
					if (audioElement) audioElement.volume = volume / 100;
				}}
			/>
		</div>

		<!-- Toggle album list -->
		<button on:click={() => (showAlbumList = !showAlbumList)} class="control-btn">
			<span class="btn-label">≡</span>
		</button>
	</div>

	<!-- Tracklist -->
	{#if !showAlbumList}
		<div class="tracklist">
			<div class="tracklist-header">PISTAS</div>
			{#if currentAlbum}
				{#each currentAlbum.tracks as track (track.id)}
					<button
						class="track-item"
						class:active={track.id === currentTrackId}
						on:click={() => selectTrack(track.id)}
					>
						<span class="track-number">0{currentAlbum.tracks.indexOf(track) + 1}</span>
						<span class="track-title">{track.title}</span>
						<span class="track-duration">{formatTime(track.duration)}</span>
					</button>
				{/each}
			{/if}
		</div>
	{:else}
		<!-- Album list -->
		<div class="album-list">
			<div class="tracklist-header">ÁLBUMES</div>
			{#each ALBUMS as album (album.id)}
				<button
					class="album-item"
					class:active={album.id === currentAlbumId}
					on:click={() => selectAlbum(album.id)}
				>
					<span class="album-item-title">{album.title}</span>
					<span class="album-item-artist">{album.artist}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<!-- Audio element -->
<audio bind:this={audioElement} data-media-player-audio on:timeupdate={handleTimeUpdate} on:ended={handleEnded} on:loadedmetadata={handleLoadedMetadata}>
	{#if currentTrack}
		<source src={currentTrack.url} type="audio/mpeg" />
	{/if}
</audio>

<style>
	.media-player {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(135deg, #c0c0c0 0%, #e0e0e0 100%);
		border: 2px solid;
		border-color: #dfdfdf #808080 #808080 #dfdfdf;
		box-sizing: border-box;
		padding: 8px;
		gap: 8px;
		font-family: 'MS Sans Serif', Arial, sans-serif;
		font-size: 12px;
	}

	.display-panel {
		background: #000;
		color: #0f0;
		border: 2px inset #0a0a0a;
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
		min-height: 150px;
		font-family: 'Courier New', monospace;
	}

	.album-display {
		display: flex;
		gap: 8px;
		align-items: flex-start;
	}

	.album-cover {
		width: 80px;
		height: 80px;
		object-fit: cover;
		border: 1px solid #0f0;
		background: #000;
	}

	.album-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.album-title {
		font-weight: bold;
		color: #0f0;
	}

	.album-artist {
		color: #080;
		font-size: 10px;
	}

	.track-name {
		color: #0f0;
		font-size: 11px;
		margin-top: 4px;
	}

	.time-display {
		color: #0f0;
		font-size: 10px;
		text-align: right;
	}

	.progress-bar-container {
		width: 100%;
		height: 12px;
		background: #000;
		border: 1px solid #0f0;
		cursor: pointer;
		margin-bottom: 4px;
	}

	.progress-bar {
		width: 100%;
		height: 100%;
		background: #1a1a1a;
		position: relative;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: #0f0;
		box-shadow: 0 0 4px #0f0;
		transition: width 0.1s linear;
	}

	.controls {
		display: flex;
		gap: 4px;
		align-items: center;
		background: linear-gradient(135deg, #dfdfdf 0%, #c0c0c0 100%);
		border: 2px outset #dfdfdf;
		padding: 4px;
	}

	.control-btn {
		width: 32px;
		height: 28px;
		background: linear-gradient(135deg, #dfdfdf 0%, #c0c0c0 100%);
		border: 2px outset #dfdfdf;
		border-color: #dfdfdf #808080 #808080 #dfdfdf;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: bold;
	}

	.control-btn:active {
		border-style: inset;
		border-color: #808080 #dfdfdf #dfdfdf #808080;
	}

	.play-btn {
		width: 40px;
	}

	.volume-control {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-left: 8px;
		flex: 1;
	}

	.volume-control label {
		font-size: 11px;
	}

	.volume-control input {
		width: 60px;
		height: 16px;
	}

	.tracklist,
	.album-list {
		background: #c0c0c0;
		border: 2px inset #dfdfdf;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		min-height: 120px;
		max-height: 200px;
	}

	.tracklist-header {
		background: linear-gradient(90deg, #000080 0%, #1084d7 100%);
		color: white;
		padding: 2px 4px;
		font-weight: bold;
		font-size: 11px;
		position: sticky;
		top: 0;
	}

	.track-item,
	.album-item {
		background: none;
		border: none;
		padding: 4px;
		text-align: left;
		cursor: pointer;
		font-size: 11px;
		display: flex;
		gap: 8px;
		align-items: center;
		color: #000;
	}

	.track-item:hover,
	.album-item:hover {
		background: #000080;
		color: white;
	}

	.track-item.active,
	.album-item.active {
		background: #000080;
		color: white;
	}

	.track-number {
		min-width: 24px;
		text-align: right;
		font-size: 10px;
		opacity: 0.7;
	}

	.track-title {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.track-duration {
		font-size: 10px;
		opacity: 0.7;
		min-width: 30px;
		text-align: right;
	}

	.album-item-title {
		flex: 1;
		font-weight: bold;
	}

	.album-item-artist {
		font-size: 10px;
		opacity: 0.7;
	}

	/* Scrollbar style */
	::-webkit-scrollbar {
		width: 16px;
	}

	::-webkit-scrollbar-track {
		background: #c0c0c0;
		border-left: 2px inset #dfdfdf;
	}

	::-webkit-scrollbar-thumb {
		background: linear-gradient(90deg, #dfdfdf 0%, #c0c0c0 100%);
		border: 2px outset #dfdfdf;
	}

	::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(90deg, #e0e0e0 0%, #d0d0d0 100%);
	}
</style>
