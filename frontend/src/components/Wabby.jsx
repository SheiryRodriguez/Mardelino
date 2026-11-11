import { useState } from "react";
import "../App.css";

function Wabby() {
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([
    {
      tipo: "wabby",
      texto: "¡Holaaa! 🌸 Soy Wabby, tu asistente de MAR DE LINO. ¿Cómo puedo ayudarte a cuidar tus rizos?"
    }
  ]);
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!mensaje.trim() || cargando) return;

    const texto = mensaje.trim();
    setMensajes((actuales) => [
      ...actuales,
      { tipo: "cliente", texto }
    ]);
    setMensaje("");
    setCargando(true);

    try {
      const respuesta = await fetch("http://localhost:5000/api/wabby/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: texto })
      });

      const datos = await respuesta.json();

      setMensajes((actuales) => [
        ...actuales,
        {
          tipo: "wabby",
          texto: datos.respuesta || "No pude generar una respuesta."
        }
      ]);
    } catch (error) {
      setMensajes((actuales) => [
        ...actuales,
        {
          tipo: "wabby",
          texto: "¡Ups! No pude conectarme. Comprueba que el servidor esté funcionando 🌸"
        }
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="wabby-widget">
      {abierto && (
        <section className="wabby-ventana">
          <header className="wabby-encabezado">
            <div className="wabby-avatar">
              <img src="/public/logo.png" alt="Logo de Mar de Lino" />
            </div>

            <div className="wabby-identidad">
              <h3>Wabby</h3>
              <span>Tu asistente capilar</span>
            </div>

            <button
              className="wabby-cerrar"
              onClick={() => setAbierto(false)}
            >
              ×
            </button>
          </header>

          <div className="wabby-mensajes">
            {mensajes.map((item, indice) => (
              <div
                key={indice}
                className={`wabby-mensaje ${item.tipo === "cliente" ? "wabby-cliente" : "wabby-wabby"}`}
              >
                {item.texto}
              </div>
            ))}

            {cargando && (
              <div className="wabby-mensaje wabby-wabby">
                Wabby está escribiendo... 🌸
              </div>
            )}
          </div>

          <form className="wabby-formulario" onSubmit={enviarMensaje}>
            <input
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Pregúntame sobre tus rizos..."
            />
            <button type="submit" disabled={cargando}>
              ➤
            </button>
          </form>

          <p className="wabby-pie">Hecho con amor para tus rizos 🌷</p>
        </section>
      )}

      <button
        className="wabby-boton-flotante"
        onClick={() => setAbierto(!abierto)}
        aria-label="Abrir chat con Wabby"
      >
        {abierto ? (
          "×"
        ) : (
          <img src="/public/logo.png" alt="Abrir Wabby" />
        )}
      </button>
    </div>
  );
}

export default Wabby;