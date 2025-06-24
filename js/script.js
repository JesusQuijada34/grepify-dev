document.querySelector("form").addEventListener("submit", e => {
  const query = document.querySelector("input[name='query']").value.trim();
  if (query.length < 3) {
    e.preventDefault();
    alert("Ingresa al menos 3 caracteres para la búsqueda.");
  }
});
