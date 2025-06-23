// 🎧 1. Tipeo dinámico del tagline
const tagline = document.querySelector('.tagline');
const textoIntro = "Por la cacería de ondas sonoras desde la terminal 🎶";
let i = 0;
function typeWriter() {
  if (i < textoIntro.length) {
    tagline.textContent += textoIntro.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
}
setTimeout(typeWriter, 600);

// 🌓 2. Modo Claro/Oscuro
const toggleTheme = document.getElementById("toggle-theme");
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// 📋 3. Copiar bloque de código
function copiarCodigo() {
  const codigo = document.getElementById("codigo-python").textContent;
  navigator.clipboard.writeText(codigo).then(() => {
    alert("¡Código copiado!");
  });
}

// 🔎 4. Buscador Spotify (requiere token)
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');

searchBtn.addEventListener("click", buscarMusica);

async function buscarMusica() {
  const query = searchInput.value.trim();
  if (!query) return;

  // ❗️ Reemplaza con tu token de Spotify válido
  const token = "7edce1fd97734d2e9588c975e57f5e87";

  const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  results.innerHTML = "";

  if (data.tracks.items.length === 0) {
    results.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  data.tracks.items.forEach(track => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${track.name}</strong> - ${track.artists[0].name}</p>
      ${track.preview_url ? `<button onclick="playPreview('${track.preview_url}')">▶️ Escuchar Preview</button>` : `<em>No preview disponible</em>`}
      <hr style="border-color:#1db95455; margin:1em 0;">
    `;
    results.appendChild(div);
  });
}

// 🔊 5. Reproducir preview + beats visuales sincronizados
let audioContext, sourceNode, analyser, bufferLength, dataArray, audioElement;

function playPreview(url) {
  if (audioElement) {
    audioElement.pause();
  }

  audioElement = new Audio(url);
  audioElement.crossOrigin = "anonymous";
  audioElement.play();

  // Inicia beat visual
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  sourceNode = audioContext.createMediaElementSource(audioElement);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);

  animateBeats();
}

// 🔄 6. Beat visual en círculo
const pulseCircle = document.getElementById("pulse-circle");

function animateBeats() {
  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);
  const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
  const scale = 1 + bass / 200;

  pulseCircle.style.transform = `scale(${scale})`;

  requestAnimationFrame(animateBeats);
}
