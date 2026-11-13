import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje("");

    try {
      const respuesta = await axios.post(
        "http://localhost:5000/api/auth/login",
        { usuario, contrasena }
      );

      sessionStorage.setItem("tokenAdmin", respuesta.data.token);
      navigate("/productos");
    } catch (error) {
      setMensaje(
        error.response?.data?.mensaje ||
        "No se pudo iniciar sesión. Inténtalo nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="admin-login">
      <div className="login-decoration login-decoration-one"></div>
      <div className="login-decoration login-decoration-two"></div>

      <section className="login-card">
        <div className="login-brand">
          <img
            src="/logo.png"
            alt="Logo de MAR DE LINO"
            className="login-brand-logo"
          />
          <p className="login-brand-name">MAR DE LINO</p>
          <span className="login-brand-line"></span>
          <p className="login-brand-subtitle">Cuidado natural para tus rizos</p>
        </div>

        <div className="login-heading">
          <span className="login-eyebrow">ESPACIO PRIVADO</span>
          <h1>Bienvenida</h1>
          <p>Ingresa tus datos para acceder al panel de administración.</p>
        </div>

        <form className="login-form" onSubmit={iniciarSesion}>
          <div className="login-field">
            <label htmlFor="usuario">Usuario</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Tu nombre de usuario"
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              required
            />
          </div>

          {mensaje && (
            <p className="login-error" role="alert">
              {mensaje}
            </p>
          )}

          <button
            className="login-button"
            type="submit"
            disabled={cargando}
          >
            {cargando ? "Verificando acceso..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="login-footer">
          <span>MAR DE LINO</span>
          <p>Administración · Acceso autorizado</p>
        </div>
      </section>
    </main>
  );
}

export default Login;