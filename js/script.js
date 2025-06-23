// 🎧 Efecto de tipeado
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

// 🌓 Tema claro / oscuro manual
const toggleTheme = document.getElementById("toggle-theme");
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// 📋 Copiar código Python
function copiarCodigo() {
  const codigo = document.getElementById("codigo-python").textContent;
  navigator.clipboard.writeText(codigo).then(() => {
    alert("¡Código copiado!");
  });
}

// 🔎 Buscador musical
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');

searchBtn.addEventListener("click", buscarMusica);

async function buscarMusica() {
  const query = searchInput.value.trim();
  if (!query) return;

  const token = "TU_ACCESS_TOKEN"; // ← Inserta aquí tu token válido

  const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  results.innerHTML = "";

  if (!data.tracks.items.length) {
    results.innerHTML = "<p>No se encontraron canciones.</p>";
    return;
  }

  data.tracks.items.forEach(track => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${track.name}</strong> - ${track.artists[0].name}</p>
      ${track.preview_url ? `<button onclick="playPreview('${track.preview_url}')">▶️ Escuchar Preview</button>` : `<em>No hay preview</em>`}
      <hr style="border: none; border-top: 1px solid #1db95444; margin: 1em 0;">
    `;
    results.appendChild(div);
  });
}

// 🔊 Reproducir preview y visualizar beats
let audioContext, sourceNode, analyser, dataArray, audioElement;
const pulseCircle = document.getElementById("pulse-circle");

function playPreview(url) {
  if (audioElement) audioElement.pause();
  audioElement = new Audio(url);
  audioElement.crossOrigin = "anonymous";
  audioElement.play();

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  sourceNode = audioContext.createMediaElementSource(audioElement);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  dataArray = new Uint8Array(analyser.frequencyBinCount);

  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);

  animarPulso();
}

function animarPulso() {
  analyser.getByteFrequencyData(dataArray);
  const bass = dataArray.slice(0, 8).reduce((a, b) => a + b, 0) / 8;
  const scale = 1 + bass / 200;

  pulseCircle.style.transform = `scale(${scale.toFixed(2)})`;
  requestAnimationFrame(animarPulso);
}
