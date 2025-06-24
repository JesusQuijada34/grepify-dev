from flask import Flask, render_template, request, redirect
import os

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/descargar", methods=["POST"])
def descargar():
    url = request.form["url"]
    # Validación ética simulada: rechazar URLs privadas o restringidas
    if "youtube.com/watch?v=" in url or "vimeo.com" in url:
        return "Solo enlaces públicos permitidos (educativo o libre acceso).", 403
    # Aquí iría la lógica de obtención de datos públicos (simulada)
    return f"Contenido público en {url} preparado para descarga (simulado)"

if __name__ == "__main__":
    app.run(debug=True)
