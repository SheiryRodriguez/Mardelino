import { useState } from "react";
import axios from "axios";

function FormularioPedido({ carrito, onVolver, onPedidoExitoso }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    celular: "",
    ciudad: "",
    barrio: "",
    direccion: "",
    metodoPago: "Efectivo",
    observaciones: "",
    aceptaTratamientoDatos: false
  });

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  );

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const enviarPedido = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje("");

    try {
      const respuesta = await axios.post(
        "https://mardelino.onrender.com/api/pedidos",
        {
          cliente: {
            nombre: formulario.nombre,
            correo: formulario.correo,
            celular: formulario.celular,
            ciudad: formulario.ciudad,
            aceptaTratamientoDatos: formulario.aceptaTratamientoDatos
          },
          productos: carrito.map((producto) => ({
            productoId: producto._id,
            cantidad: producto.cantidad
          })),
          direccion: formulario.direccion,
          barrio: formulario.barrio,
          ciudad: formulario.ciudad,
          metodoPago: formulario.metodoPago,
          observaciones: formulario.observaciones
        }
      );

      onPedidoExitoso(respuesta.data.pedido);
    } catch (error) {
      setMensaje(
        error.response?.data?.mensaje ||
        "No pudimos registrar tu pedido. Inténtalo nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="formulario-pedido">
      <button
        type="button"
        className="formulario-volver"
        onClick={onVolver}
      >
        ← Volver al carrito
      </button>

      <h2>Finalizar pedido</h2>
      <p>Completa tus datos para preparar tu compra.</p>

      <form onSubmit={enviarPedido}>
        <h3>Datos personales</h3>

        <label>Nombre completo</label>
        <input
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <label>Correo electrónico</label>
        <input
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={manejarCambio}
          required
        />

        <label>Celular</label>
        <input
          name="celular"
          type="tel"
          value={formulario.celular}
          onChange={manejarCambio}
          required
        />

        <label>Ciudad</label>
        <input
          name="ciudad"
          value={formulario.ciudad}
          onChange={manejarCambio}
          required
        />

        <h3>Datos de entrega</h3>

        <label>Barrio</label>
        <input
          name="barrio"
          value={formulario.barrio}
          onChange={manejarCambio}
          required
        />

        <label>Dirección completa</label>
        <input
          name="direccion"
          value={formulario.direccion}
          onChange={manejarCambio}
          placeholder="Calle, carrera, número y apartamento"
          required
        />

        <h3>Información de pago</h3>

        <label>Método de pago</label>
        <select
          name="metodoPago"
          value={formulario.metodoPago}
          onChange={manejarCambio}
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
        </select>

        <label>Observaciones (opcional)</label>
        <textarea
          name="observaciones"
          value={formulario.observaciones}
          onChange={manejarCambio}
          placeholder="Alguna indicación para tu pedido..."
        />

        <label className="formulario-consentimiento">
          <input
            type="checkbox"
            name="aceptaTratamientoDatos"
            checked={formulario.aceptaTratamientoDatos}
            onChange={manejarCambio}
            required
          />
          Autorizo el tratamiento de mis datos personales para gestionar
          mi registro y este pedido.
        </label>

        <div className="formulario-total">
          <span>Total del pedido</span>
          <strong>${total.toLocaleString("es-CO")} COP</strong>
        </div>

        {mensaje && <p role="alert">{mensaje}</p>}

        <button
          type="submit"
          disabled={cargando || carrito.length === 0}
        >
          {cargando ? "Registrando pedido..." : "Confirmar compra"}
        </button>
      </form>
    </section>
  );
}

export default FormularioPedido;