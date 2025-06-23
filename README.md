# 🎧 grepify – Shell & Sonido en Sintonía

**grepify** convierte tu terminal en una consola musical. Es una aplicación de código abierto que te permite buscar canciones directamente desde la línea de comandos utilizando la API de Spotify, todo mientras ofrece una experiencia web alternativa repleta de visuales, animaciones neón, reproductores sincronizados y un entorno envolvente tipo hacker.

---

## 🧠 ¿Qué es grepify?

**grepify** es más que un buscador musical. Es un concepto que une la eficiencia del entorno de terminal con la magia de la música en streaming. Si alguna vez pensaste “quiero escuchar algo mientras programo, sin salir del shell”, entonces grepify es tu nuevo mejor compañero.

Desde la terminal puedes:

- Buscar canciones, artistas o álbumes
- Obtener previews auditivos y metadatos clave
- Mantenerte enfocado en tu trabajo sin distracciones gráficas

Y desde la web puedes:

- Experimentar una interfaz animada que late al ritmo del audio
- Cambiar entre tema claro y oscuro
- Ver código de ejemplo, copiarlo y entender cómo funciona
- Controlar la reproducción y explorar la API de forma interactiva

---

## 🔍 Características clave

| Terminal | Web App Visual |
|----------|----------------|
| 🎵 Buscar música vía Spotify API | 🧑‍🎨 Estética inspirada en el mundo hacker |
| ⚙️ Integración con Bash/Zsh/Fish | 💫 Animaciones neón y gradientes dinámicos |
| 🧪 Código en Python para extender | 🔊 Visualizador de beats sincronizados con Web Audio API |
| 🔐 Autenticación Client Credentials | 🌗 Soporte para modo claro / modo oscuro |
| 📋 Resultados con nombre, artista y duración | 🖼️ Portadas, botones de preview y efectos visuales |
| ⌨️ Compatible con Mac, Linux, WSL | 🎛️ Visualizador circular, pulsante y personalizable |

---

## ⚙️ Requisitos

### Terminal

- `curl`, `bash` o `python`
- Token de acceso generado desde [Spotify Developers](https://developer.spotify.com/dashboard/)
- Conexión a internet

### Web

- Navegador moderno (Chromium, Firefox, Safari, Edge)
- Acceso a un token temporal de Spotify (puede ser configurado en `script.js`)
- No requiere backend (100% frontend interactivo)

---

## 🔧 Instalación

1\. Clona el repositorio

```bash
git clone https://github.com/jesusquijada34/grepify-dev.git
cd grepify-dev
