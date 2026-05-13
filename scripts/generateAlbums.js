#!/usr/bin/env node

/**
 * ============================================================================
 * ALBUM GENERATOR - Genera albums.js desde estructura de carpetas
 * ============================================================================
 * 
 * Uso:
 *   npm run albums:generate
 * 
 * Estructura esperada en static/albums/:
 *   albums/
 *   ├── Álbum 1/
 *   │   ├── cover.jpg
 *   │   ├── 01 - Song Title.mp3
 *   │   ├── 02 - Another Song.mp3
 *   │   └── ...
 *   ├── Álbum 2/
 *   │   └── ...
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const ALBUMS_DIR = path.join(__dirname, '../static/albums');
const OUTPUT_FILE = path.join(__dirname, '../src/lib/retro/config/albums.js');

/**
 * Lee estructura de carpetas y genera configuración de álbumes
 */
async function generateAlbumsConfig() {
	if (!fs.existsSync(ALBUMS_DIR)) {
		console.error(`❌ Carpeta no encontrada: ${ALBUMS_DIR}`);
		console.error('Crea: static/albums/');
		process.exit(1);
	}

	const albumDirs = fs.readdirSync(ALBUMS_DIR).filter((file) => {
		const stat = fs.statSync(path.join(ALBUMS_DIR, file));
		return stat.isDirectory();
	});

	if (albumDirs.length === 0) {
		console.error('❌ No hay carpetas de álbumes en static/albums/');
		process.exit(1);
	}

	const albums = [];

	for (const albumDir of albumDirs) {
		const albumPath = path.join(ALBUMS_DIR, albumDir);
		const coverPath = path.join(albumPath, 'cover.jpg');

		// Validar que existe cover.jpg (o cover.png)
		const hasCover = fs.existsSync(coverPath) || fs.existsSync(path.join(albumPath, 'cover.png'));
		if (!hasCover) {
			console.warn(`⚠️  Sin cover.jpg/png en: ${albumDir}, saltando...`);
			continue;
		}

		// Obtener cobertura real
		const coverExt = fs.existsSync(coverPath) ? 'jpg' : 'png';

		// Obtener MP3s del álbum
		const files = fs.readdirSync(albumPath);
		const mp3Files = files
			.filter((f) => f.toLowerCase().endsWith('.mp3'))
			.sort();

		if (mp3Files.length === 0) {
			console.warn(`⚠️  Sin MP3s en: ${albumDir}, saltando...`);
			continue;
		}

		console.log(`📀 Procesando: ${albumDir} (${mp3Files.length} canciones)`);

		// Generar tracks
		const tracks = [];
		for (let i = 0; i < mp3Files.length; i++) {
			const mp3File = mp3Files[i];

			// Parsear número y título (ej: "01 - Song Name.mp3" → "Song Name")
			const nameWithoutExt = mp3File.replace(/\.mp3$/i, '');
			let title = nameWithoutExt;

			// Si tiene formato "NN - Title", extraer título
			const match = nameWithoutExt.match(/^\d+\s*-\s*(.+)$/);
			if (match) {
				title = match[1];
			}

			// Estimar duración (aproximadamente)
			// Nota: Para duración exacta, necesitarías ffprobe o metadatos de archivo
			const duration = 180; // Placeholder: 3 minutos por defecto

			console.log(`  ✓ ${i + 1}. ${title}`);

			tracks.push({
				id: `${sanitizeId(albumDir)}_track${i + 1}`,
				title: title,
				duration: duration,
				url: `/albums/${albumDir}/${mp3File}`
			});
		}

		// Crear objeto álbum
		const album = {
			id: sanitizeId(albumDir),
			title: albumDir,
			artist: 'Tu Nombre o Artista',
			cover: `/albums/${albumDir}/cover.${coverExt}`,
			tracks: tracks
		};

		albums.push(album);
	}

	if (albums.length === 0) {
		console.error('❌ No se generó ningún álbum');
		process.exit(1);
	}

	// Generar contenido del archivo
	const content = `// ============================================================================
// ALBUMS CONFIG - Auto-generado por npm run albums:generate
// ============================================================================
// INSTRUCCIONES DE EDICIÓN:
// 1. Edita 'artist' para cada álbum si lo deseas
// 2. Edita 'duration' si tienes valores exactos (en segundos)
// 3. Si agregaste más álbumes después, ejecuta nuevamente:
//    npm run albums:generate

export const ALBUMS = ${JSON.stringify(albums, null, 2)};

// Getter de pistas: retorna todas las pistas de todos los álbumes
export function getAllTracks() {
	return ALBUMS.flatMap((album) => album.tracks);
}

// Getter de álbum por ID
export function getAlbumById(albumId) {
	return ALBUMS.find((album) => album.id === albumId);
}

// Getter de siguiente pista (para reproducción continua)
export function getNextTrack(currentAlbumId, currentTrackId) {
	const album = getAlbumById(currentAlbumId);
	if (!album) return null;

	const currentIndex = album.tracks.findIndex((t) => t.id === currentTrackId);
	if (currentIndex === -1) return null;

	// Si hay siguiente en el mismo álbum, devuélvela
	if (currentIndex < album.tracks.length - 1) {
		return {
			albumId: currentAlbumId,
			track: album.tracks[currentIndex + 1]
		};
	}

	// Si es el último, pasa al siguiente álbum (circular)
	const nextAlbumIndex = (ALBUMS.findIndex((a) => a.id === currentAlbumId) + 1) % ALBUMS.length;
	const nextAlbum = ALBUMS[nextAlbumIndex];
	return {
		albumId: nextAlbum.id,
		track: nextAlbum.tracks[0]
	};
}
`;

	// Escribir archivo
	fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
	console.log(`\n✅ Generado: ${OUTPUT_FILE}`);
	console.log(`📀 Total álbumes: ${albums.length}`);
	console.log(`🎵 Total canciones: ${albums.reduce((sum, a) => sum + a.tracks.length, 0)}`);
}

/**
 * Convierte nombre de carpeta a ID válido
 */
function sanitizeId(name) {
	return name
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

// Ejecutar
generateAlbumsConfig().catch((err) => {
	console.error('❌ Error:', err.message);
	process.exit(1);
});
