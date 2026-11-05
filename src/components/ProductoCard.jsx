function ProductoCard({ producto, onAgregar }) {
  return (
    <article className="producto">

      <img
        src={producto.imagen}
        alt={producto.nombre}
        loading="lazy"
      />

      <h3>{producto.nombre}</h3>

      <p className="descripcion-producto">
        {producto.descripcion}
      </p>

      <div className="precio-producto">
        ${producto.precio.toLocaleString("es-CO")}
        <span>COP</span>
      </div>

      <button
        type="button"
        className="boton-comprar"
        onClick={() => onAgregar(producto)}
      >
        Agregar al pedido
      </button>

    </article>
  );
}

export default ProductoCard;