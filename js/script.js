document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#00ff9d" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00ff9d", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });

    // Elementos del DOM
    const analyzeBtn = document.getElementById('analyzeBtn');
    const mediaUrlInput = document.getElementById('mediaUrl');
    const formatOptions = document.getElementById('formatOptions');
    const formatsContainer = document.getElementById('formatsContainer');
    const downloadProgress = document.getElementById('downloadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const playerModal = document.getElementById('playerModal');
    const closeModal = document.querySelector('.close-modal');
    const saveFileBtn = document.getElementById('saveFileBtn');
    const playBtn = document.getElementById('playBtn');
    const videoPlayer = document.getElementById('mediaPlayer');
    const audioPlayer = document.getElementById('audioPlayer');
    const playerPlaceholder = document.getElementById('playerPlaceholder');

    // Variables de estado
    let currentMedia = null;
    let mediaBlob = null;
    let mediaFilename = '';

    // Analizar URL
    analyzeBtn.addEventListener('click', async function() {
        const url = mediaUrlInput.value.trim();
        
        if (!url) {
            showAlert('Por favor ingresa una URL válida');
            return;
        }
        
        if (!isValidUrl(url)) {
            showAlert('La URL ingresada no es válida');
            return;
        }
        
        try {
            // Simular análisis (en producción usarías una API)
            analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            analyzeBtn.disabled = true;
            
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mostrar formatos disponibles (simulado)
            showAvailableFormats(url);
            
        } catch (error) {
            showAlert('Error al analizar la URL: ' + error.message);
        } finally {
            analyzeBtn.innerHTML = '<i class="fas fa-search"></i>';
            analyzeBtn.disabled = false;
        }
    });
    
    // Mostrar formatos disponibles (simulación)
    function showAvailableFormats(url) {
        formatOptions.style.display = 'block';
        formatsContainer.innerHTML = '';
        
        // Detectar tipo de contenido (simulación)
        const isVideo = url.includes('youtube.com') || url.includes('vimeo.com') || Math.random() > 0.5;
        
        const formats = isVideo ? [
            { type: 'video', format: 'mp4', quality: '720p', label: 'MP4 (720p)' },
            { type: 'video', format: 'mp4', quality: '480p', label: 'MP4 (480p)' },
            { type: 'audio', format: 'mp3', quality: '128kbps', label: 'MP3' },
            { type: 'audio', format: 'aac', quality: '192kbps', label: 'AAC' }
        ] : [
            { type: 'audio', format: 'mp3', quality: '320kbps', label: 'MP3 (HQ)' },
            { type: 'audio', format: 'mp3', quality: '128kbps', label: 'MP3' },
            { type: 'audio', format: 'wav', quality: 'Lossless', label: 'WAV' },
            { type: 'audio', format: 'ogg', quality: '160kbps', label: 'OGG' }
        ];
        
        formats.forEach(format => {
            const formatEl = document.createElement('div');
            formatEl.className = 'format-option';
            formatEl.innerHTML = `
                <i class="fas ${format.type === 'video' ? 'fa-film' : 'fa-music'}"></i>
                <span class="format-name">${format.format.toUpperCase()}</span>
                <span class="format-quality">${format.quality}</span>
            `;
            
            formatEl.addEventListener('click', () => {
                startDownload(url, format);
            });
            
            formatsContainer.appendChild(formatEl);
        });
    }
    
    // Iniciar descarga
    async function startDownload(url, format) {
        try {
            formatOptions.style.display = 'none';
            downloadProgress.style.display = 'flex';
            
            // Simular descarga progresiva
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress > 100) progress = 100;
                
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}%`;
                
                if (progress === 100) {
                    clearInterval(interval);
                    onDownloadComplete(url, format);
                }
            }, 300);
            
        } catch (error) {
            showAlert('Error en la descarga: ' + error.message);
            downloadProgress.style.display = 'none';
        }
    }
    
    // Descarga completada
    function onDownloadComplete(url, format) {
        // Simular archivo descargado
        currentMedia = format.type === 'video' ? videoPlayer : audioPlayer;
        mediaFilename = `content-${Date.now()}.${format.format}`;
        
        // En un caso real, aquí cargarías el blob del archivo descargado
        mediaBlob = new Blob(['Simulated media content'], { type: format.type === 'video' ? 'video/mp4' : 'audio/mp3' });
        
        // Mostrar modal
        document.getElementById('modal-filename').textContent = mediaFilename;
        document.getElementById('modal-filesize').textContent = (Math.random() * 10 + 2).toFixed(2) + ' MB';
        document.getElementById('modal-duration').textContent = '3:45';
        
        playerModal.classList.add('active');
        downloadProgress.style.display = 'none';
        mediaUrlInput.value = '';
    }
    
    // Reproducir contenido
    playBtn.addEventListener('click', function() {
        if (!mediaBlob) return;
        
        playerPlaceholder.style.display = 'none';
        currentMedia.style.display = 'block';
        
        const mediaUrl = URL.createObjectURL(mediaBlob);
        if (currentMedia === videoPlayer) {
            videoPlayer.src = mediaUrl;
            videoPlayer.play();
        } else {
            audioPlayer.src = mediaUrl;
            audioPlayer.play();
        }
    });
    
    // Guardar archivo
    saveFileBtn.addEventListener('click', function() {
        if (!mediaBlob) return;
        
        const a = document.createElement('a');
        a.href = URL.createObjectURL(mediaBlob);
        a.download = mediaFilename;
        a.click();
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', function() {
        playerModal.classList.remove('active');
        if (currentMedia) {
            currentMedia.pause();
            currentMedia.style.display = 'none';
        }
        playerPlaceholder.style.display = 'flex';
    });
    
    // Validar URL
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    
    // Mostrar alerta
    function showAlert(message) {
        alert(message); // En producción usarías un modal mejor diseñado
    }
    
    // Mensaje en consola
    console.log('%c🔊 GREPIFY - SERVICIO LEGAL 🔊', 'color: #00ff9d; font-size: 16px; font-weight: bold;');
    console.log('%cEste servicio solo descarga contenido público sin restricciones.', 'color: #00f7ff;');
    console.log('%c100% sin ánimo de lucro | Cumplimiento estricto de términos de servicio', 'color: #00ff6a;');
});
