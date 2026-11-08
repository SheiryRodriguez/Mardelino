function Navbar({ cantidadCarrito = 0, abrirCarrito }) {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <a href="#inicio">Inicio</a>
      <a href="#productos">Productos</a>
      <a href="#nosotros">Nosotros</a>
      <a href="#contacto">Contacto</a>

      <button
        type="button"
        className="navbar-carrito"
        onClick={abrirCarrito}
        aria-label={`Abrir carrito. ${cantidadCarrito} productos`}
      >
        <span className="carrito-icono">🛍️</span>
        <span>Carrito</span>

        {cantidadCarrito > 0 && (
          <span className="carrito-contador">
            {cantidadCarrito}
          </span>
        )}
      </button>
    </nav>
  );
}

export default Navbar;