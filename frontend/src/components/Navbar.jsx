import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar({ cantidadCarrito = 0, abrirCarrito }) {
  const navigate = useNavigate();
  const location = useLocation();

  const irASeccion = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { seccionDestino: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const id = location.state?.seccionDestino;

    if (location.pathname === "/" && id) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });

        navigate("/", { replace: true, state: null });
      });

      return () => cancelAnimationFrame(frame);
    }
  }, [location.pathname, location.state, navigate]);

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <a href="/" className="navbar-marca">
        <img
          src="/public/Logo.png"
          alt="Logo de MAR DE LINO"
          className="navbar-logo"
        />

        <span className="navbar-nombre">
          MAR DE LINO
          <small>LINO · BELLEZA · VIDA</small>
        </span>
      </a>

      <div className="navbar-enlaces">
        <a href="/">Inicio</a>

        <a
          href="/#productos"
          onClick={(e) => {
            e.preventDefault();
            irASeccion("productos");
          }}
        >
          Productos
        </a>

        <a href="/nosotros">Nosotros</a>

        <a
          href="/#contacto"
          onClick={(e) => {
            e.preventDefault();
            irASeccion("contacto");
          }}
        >
          Contacto
        </a>
      </div>

      {abrirCarrito && (
        <button
          type="button"
          className="navbar-carrito"
          onClick={abrirCarrito}
          aria-label={`Abrir carrito. ${cantidadCarrito} productos`}
        >
          <svg
            className="carrito-icono"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 8h14l1 13H4L5 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>

          <span>Mi carrito</span>

          {cantidadCarrito > 0 && (
            <span className="carrito-contador">
              {cantidadCarrito}
            </span>
          )}
        </button>
      )}
    </nav>
  );
}

export default Navbar;