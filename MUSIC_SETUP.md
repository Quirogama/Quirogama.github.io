# 📀 Integración de Música - Media Player

## 🚀 Cómo agregar tus álbumes

### Paso 1: Organiza tus archivos

Estructura en **`static/albums/`**:

```
static/albums/
├── Mi Primer Álbum/
│   ├── cover.jpg          ← Carátula (JPG o PNG, ~300x300px)
│   ├── 01 - Canción Uno.mp3
│   ├── 02 - Canción Dos.mp3
│   └── 03 - Canción Tres.mp3
│
├── Mi Segundo Álbum/
│   ├── cover.jpg
│   ├── 01 - Track One.mp3
│   ├── 02 - Track Two.mp3
│   └── ...
```

### Paso 2: Genera la configuración

```bash
npm run albums:generate
```

El script:
- 📁 Lee todas las carpetas en `static/albums/`
- 🎵 Detecta archivos MP3 y carátulas
- ✨ Genera automáticamente `src/lib/retro/config/albums.js`

### Paso 3: (Opcional) Edita metadata

En `src/lib/retro/config/albums.js`, puedes editar:

```javascript
{
  id: 'mi-primer-album',
  title: 'Mi Primer Álbum',
  artist: 'Tu Nombre',  // ← Edita aquí
  cover: '/albums/Mi Primer Álbum/cover.jpg',
  tracks: [...]
}
```

---

## 📋 Requisitos

- ✅ Archivos MP3 válidos
- ✅ Una carátula por álbum (JPG o PNG)
- ✅ Carpeta con nombre del álbum

## 🎯 Estructura de nombres (recomendada)

```
01 - Song Title.mp3    ← El script extrae "Song Title"
02 - Track Two.mp3
...
```

También funciona:
```
Song Title.mp3         ← Usa el nombre completo
Another Song.mp3
```

---

## 🔧 Troubleshooting

### ❌ Error: "Carpeta no encontrada"
Crea la carpeta: `static/albums/`

### ❌ Sin canciones generadas
Verifica que tengas archivos `.mp3` (mayúsculas/minúsculas importan)

### ❌ Sin carátula
Agrega `cover.jpg` o `cover.png` en cada carpeta de álbum

---

## 💡 Flujo completo

1. **Descarga/Prepara MP3s** → `static/albums/Álbum 1/`
2. **Agrega carátula** → `cover.jpg`
3. **Ejecuta** → `npm run albums:generate`
4. **Abre** → Media Player en el escritorio retro
5. **Disfruta** → 🎵

---

## 🎛️ Media Player Features

- ▶️ Play/Pause
- ⏭️ Siguiente/Anterior canción
- 🔊 Control de volumen
- 📊 Barra de progreso
- 📋 Lista de canciones por álbum
- 🔀 Selector de álbumes
- 🔁 Reproducción continua (loop circular)

---

## 📝 Ejemplo de JSON generado

```javascript
export const ALBUMS = [
  {
    id: "mi-primer-album",
    title: "Mi Primer Álbum",
    artist: "Tu Nombre",
    cover: "/albums/Mi Primer Álbum/cover.jpg",
    tracks: [
      {
        id: "mi-primer-album_track1",
        title: "Canción Uno",
        duration: 180,
        url: "/albums/Mi Primer Álbum/01 - Canción Uno.mp3"
      },
      // ... más canciones
    ]
  }
];
```

---

**¿Necesitas ayuda?**
- 🎵 Convertir archivos a MP3: Usa Audacity o ffmpeg
- 📸 Extraer carátula: Busca "Extract Album Art" online
- ⏱️ Duración de canción: El script la estima en 180s, puedes editarla manualmente
