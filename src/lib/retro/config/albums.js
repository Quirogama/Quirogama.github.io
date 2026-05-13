// ============================================================================
// ALBUMS CONFIG - Auto-generado por npm run albums:generate
// ============================================================================
// INSTRUCCIONES DE EDICIÓN:
// 1. Edita 'artist' para cada álbum si lo deseas
// 2. Edita 'duration' si tienes valores exactos (en segundos)
// 3. Si agregaste más álbumes después, ejecuta nuevamente:
//    npm run albums:generate

export const ALBUMS = [
  {
    "id": "igor",
    "title": "IGOR",
    "artist": "Tu Nombre o Artista",
    "cover": "/albums/IGOR/cover.jpg",
    "tracks": [
      {
        "id": "igor_track1",
        "title": "01 IGOR'S THEME",
        "duration": 180,
        "url": "/albums/IGOR/01 IGOR'S THEME.mp3"
      },
      {
        "id": "igor_track2",
        "title": "02 EARFQUAKE",
        "duration": 180,
        "url": "/albums/IGOR/02 EARFQUAKE.mp3"
      },
      {
        "id": "igor_track3",
        "title": "03 I THINK",
        "duration": 180,
        "url": "/albums/IGOR/03 I THINK.mp3"
      },
      {
        "id": "igor_track4",
        "title": "04 EXACTLY WHAT YOU RUN FROM YOU END UP CHASING",
        "duration": 180,
        "url": "/albums/IGOR/04 EXACTLY WHAT YOU RUN FROM YOU END UP CHASING.mp3"
      },
      {
        "id": "igor_track5",
        "title": "05 RUNNING OUT OF TIME",
        "duration": 180,
        "url": "/albums/IGOR/05 RUNNING OUT OF TIME.mp3"
      },
      {
        "id": "igor_track6",
        "title": "06 NEW MAGIC WAND",
        "duration": 180,
        "url": "/albums/IGOR/06 NEW MAGIC WAND.mp3"
      },
      {
        "id": "igor_track7",
        "title": "07 A BOY IS A GUN",
        "duration": 180,
        "url": "/albums/IGOR/07 A BOY IS A GUN.mp3"
      },
      {
        "id": "igor_track8",
        "title": "08 PUPPET",
        "duration": 180,
        "url": "/albums/IGOR/08 PUPPET.mp3"
      },
      {
        "id": "igor_track9",
        "title": "09 WHAT'S GOOD",
        "duration": 180,
        "url": "/albums/IGOR/09 WHAT'S GOOD.mp3"
      },
      {
        "id": "igor_track10",
        "title": "10 GONE GONE - THANK YOU",
        "duration": 180,
        "url": "/albums/IGOR/10 GONE GONE - THANK YOU.mp3"
      },
      {
        "id": "igor_track11",
        "title": "11 I DON'T LOVE YOU ANYMORE",
        "duration": 180,
        "url": "/albums/IGOR/11 I DON'T LOVE YOU ANYMORE.mp3"
      },
      {
        "id": "igor_track12",
        "title": "12 ARE WE STILL FRIENDS",
        "duration": 180,
        "url": "/albums/IGOR/12 ARE WE STILL FRIENDS.mp3"
      }
    ]
  }
];

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
