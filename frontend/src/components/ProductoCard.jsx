import { useState } from "react";

function ProductoCard({ producto, onAgregar }) {
  const [cantidad, setCantidad] = useState(0);

  const disminuir = () => {
    setCantidad((actual) => Math.max(0, actual - 1));
  };

  const aumentar = () => {
    setCantidad((actual) => actual + 1);
  };

  const agregarAlPedido = () => {
    if (cantidad === 0) return;

    onAgregar({
      ...producto,
      cantidad: cantidad
    });
  };

  return (
    <article className="producto producto-botanico">

      <div className="producto-imagen-contenedor">
        <span className="producto-etiqueta">
          {producto.tipo || "Cuidado capilar"}
        </span>

        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
        />
      </div>

      <div className="producto-contenido">
        <span className="producto-subtitulo">
          MAR DE LINO · CUIDADO NATURAL
        </span>

        <h3>{producto.nombre}</h3>

        <p className="descripcion-producto">
          {producto.descripcion}
        </p>

        <div className="precio-producto">
          ${producto.precio.toLocaleString("es-CO")}
          <span>COP</span>
        </div>

        <div className="selector-cantidad">
          <span>Cantidad:</span>

          <div className="controles-cantidad">
            <button
              type="button"
              onClick={disminuir}
              disabled={cantidad === 0}
              aria-label="Disminuir cantidad"
            >
              −
            </button>

            <span>{cantidad}</span>

            <button
              type="button"
              onClick={aumentar}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          className="boton-comprar"
          onClick={agregarAlPedido}
          disabled={cantidad === 0}
        >
          Agregar al carrito
        </button>
      </div>

    </article>
  );
}

export default ProductoCard;