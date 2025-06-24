document.addEventListener('DOMContentLoaded', () => {
    const youtubeURLInput = document.getElementById('youtubeURL');
    const convertirBtn = document.getElementById('convertirBtn');
    const convertirDescripcionCheckbox = document.getElementById('convertirDescripcion');
    const resultadosDiv = document.getElementById('resultados');
    const errorMensajeDiv = document.getElementById('errorMensaje');
    const resultadosSection = document.getElementById('resultadosSection');

    function mostrarError(mensaje) {
        errorMensajeDiv.textContent = mensaje;
        errorMensajeDiv.style.display = 'block'; // Mostrar el mensaje de error
        setTimeout(() => {
            errorMensajeDiv.style.display = 'none'; // Ocultar después de unos segundos
        }, 5000); // Mostrar por 5 segundos
    }

    function extraerIdVideo(url) {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes('youtube.com')) {
                const params = new URLSearchParams(urlObj.search);
                return params.get('v');
            } else if (urlObj.hostname.includes('youtu.be')) {
                return urlObj.pathname.slice(1); // Eliminar la barra al inicio
            }
            return null; // No es una URL de YouTube válida
        } catch (e) {
            return null; // Error al parsear la URL
        }
    }


    async function obtenerInformacionVideo(videoId) {
        // Reemplaza con tu propia clave de API de YouTube Data API
        const apiKey = 'TU_CLAVE_API_AQUI'; // ¡Importante!  Debes obtener una clave de API de Google.

        if (!videoId || !apiKey) {
            return null; // No hay ID de video o no hay API Key
        }

        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error al obtener la información del video: ${response.status}`);
            }
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                return data.items[0].snippet; // Retorna la información del snippet (título, descripción, etc.)
            } else {
                return null; // Video no encontrado
            }
        } catch (error) {
            console.error('Error al obtener la información del video:', error);
            return null;
        }
    }

    convertirBtn.addEventListener('click', async () => {
        const youtubeURL = youtubeURLInput.value.trim();
        const videoId = extraerIdVideo(youtubeURL);

        if (!videoId) {
            mostrarError('Por favor, ingresa una URL válida de YouTube.');
            return;
        }

        resultadosDiv.innerHTML = '<p>Cargando...</p>'; // Muestra un mensaje de carga

        const videoInfo = await obtenerInformacionVideo(videoId);

        if (!videoInfo) {
            resultadosDiv.innerHTML = '<p>No se pudo obtener la información del video.  Verifica la URL o la clave de API.</p>';
            return;
        }

        // Mostrar el título del video
        resultadosDiv.innerHTML = `<h2>${videoInfo.title}</h2>`;

        if (convertirDescripcionCheckbox.checked) {
            resultadosDiv.innerHTML += `<p><strong>Descripción:</strong><br>${videoInfo.description}</p>`;
        }

        // Mostrar la sección de resultados
        resultadosSection.style.display = 'block';
    });
});
 
