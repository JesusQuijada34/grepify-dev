// Función para copiar código del bloque Python
function copiarCodigo() {
  const codigo = document.getElementById("codigo-python").textContent;
  navigator.clipboard.writeText(codigo).then(() => {
    alert("¡Código copiado al portapapeles!");
  });
}

// Animación continua del reproductor visual
const pulse = document.getElementById('pulse-circle');
setInterval(() => {
  pulse.style.animation = 'none';
  void pulse.offsetWidth; // Reflow para reiniciar la animación
  pulse.style.animation = 'pulse 2s ease-in-out infinite';
}, 4000);

// Efecto de tipeado para tagline (opcional pero cool)
const tagline = document.querySelector('.tagline');
const texto = "Por la cacería de ondas sonoras desde la terminal 🎶";
tagline.textContent = "";
let index = 0;

function typeWriter() {
  if (index < texto.length) {
    tagline.textContent += texto.charAt(index);
    index++;
    setTimeout(typeWriter, 50);
  }
}
setTimeout(typeWriter, 600); // arranca con breve delay
