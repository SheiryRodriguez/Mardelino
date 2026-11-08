import { useState } from "react";
import FormularioPedido from "./FormularioPedido";

function Carrito({
  abierto,
  carrito,
  onCerrar,
  onCambiarCantidad,
  onEliminar
}) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  );

  const cerrarCarrito = () => {
    setMostrarFormulario(false);
    setPedidoConfirmado(null);
    onCerrar();
  };

  if (!abierto) return null;

  return (
    <div className="carrito-overlay" onClick={cerrarCarrito}>
      <aside
        className="carrito-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Tu carrito de compras"
      >
        {pedidoConfirmado ? (
          <div className="carrito-confirmacion">
            <span>♡</span>
            <h2>¡Gracias por tu compra!</h2>
            <p>
              Tu pedido fue registrado correctamente en MAR DE LINO.
            </p>
            <p>
              Número de pedido: {pedidoConfirmado._id}
            </p>
            <p>
              Total: ${pedidoConfirmado.total?.toLocaleString("es-CO")} COP
            </p>
            <button type="button" onClick={cerrarCarrito}>
              Cerrar
            </button>
          </div>
        ) : mostrarFormulario ? (
          <FormularioPedido
            carrito={carrito}
            onVolver={() => setMostrarFormulario(false)}
            onPedidoExitoso={setPedidoConfirmado}
          />
        ) : (
          <>
            <div className="carrito-encabezado">
              <div>
                <span className="carrito-etiqueta">MAR DE LINO</span>
                <h2>Tu carrito</h2>
              </div>

              <button
                className="carrito-cerrar"
                type="button"
                onClick={cerrarCarrito}
                aria-label="Cerrar carrito"
              >
                ×
              </button>
            </div>

            {carrito.length === 0 ? (
              <div className="carrito-vacio">
                <span>♡</span>
                <h3>Tu carrito está vacío</h3>
                <p>¡Descubre nuestros productos y consiente tus rizos!</p>
                <button type="button" onClick={cerrarCarrito}>
                  Seguir explorando
                </button>
              </div>
            ) : (
              <>
                <div className="carrito-productos">
                  {carrito.map((producto) => (
                    <article
                      className="carrito-producto"
                      key={producto._id}
                    >
                      <img
                        src={producto.imagen || "/productos/predeterminada.png"}
                        alt={producto.nombre}
                      />

                      <div className="carrito-producto-info">
                        <h3>{producto.nombre}</h3>
                        <p>
                          ${producto.precio.toLocaleString("es-CO")} COP
                        </p>

                        <div className="carrito-controles">
                          <button
                            type="button"
                            onClick={() =>
                              onCambiarCantidad(
                                producto._id,
                                producto.cantidad - 1
                              )
                            }
                          >
                            −
                          </button>

                          <span>{producto.cantidad}</span>

                          <button
                            type="button"
                            onClick={() =>
                              onCambiarCantidad(
                                producto._id,
                                producto.cantidad + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="carrito-producto-final">
                        <strong>
                          ${(producto.precio * producto.cantidad).toLocaleString("es-CO")}
                        </strong>
                        <button
                          type="button"
                          onClick={() => onEliminar(producto._id)}
                        >
                          Quitar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="carrito-resumen">
                  <div>
                    <span>Subtotal</span>
                    <strong>${total.toLocaleString("es-CO")} COP</strong>
                  </div>

                  <p>El costo del envío se coordinará al confirmar el pedido.</p>

                  <button
                    type="button"
                    onClick={() => setMostrarFormulario(true)}
                  >
                    Finalizar pedido
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </aside>
    </div>
  );
}

export default Carrito;