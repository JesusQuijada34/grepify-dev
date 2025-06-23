// Simulación de audio-reactividad simple
const pulse = document.getElementById('pulse-circle');

setInterval(() => {
  pulse.style.animation = 'none';
  void pulse.offsetWidth; // Trigger reflow
  pulse.style.animation = 'pulse 2s ease-in-out infinite';
}, 4000);
