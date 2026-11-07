import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/productos";

const formularioInicial = {
  nombre: "",
  tipo: "Aceite",
  precio: "",
  descripcion: "",
  imagen: "",
};

function GestionProducto() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const [formulario, setFormulario] = useState(formularioInicial);

  const cargarProductos = async () => {
    try {
      const respuesta = await axios.get(API);
      setProductos(respuesta.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setMensaje("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setFormulario(formularioInicial);
    setEditandoId(null);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje("");

    const datosProducto = {
      nombre: formulario.nombre,
      tipo: formulario.tipo,
      precio: Number(formulario.precio),
      descripcion: formulario.descripcion,
      imagen: formulario.imagen.trim() || "/productos/predeterminada.png",
    };

    const token = sessionStorage.getItem("tokenAdmin");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (editandoId) {
        await axios.put(`${API}/${editandoId}`, datosProducto, config);
        setMensaje("¡Producto actualizado correctamente! 🌷");
      } else {
        await axios.post(API, {
          ...datosProducto,
          activo: true,
        }, config);
        setMensaje("¡Producto agregado correctamente! 🌸");
      }

      limpiarFormulario();
      await cargarProductos();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      setMensaje("No se pudo guardar el producto. Inténtalo nuevamente.");
    } finally {
      setGuardando(false);
    }
  };

  const editarProducto = (producto) => {
    setFormulario({
      nombre: producto.nombre || "",
      tipo: producto.tipo || "Aceite",
      precio: producto.precio || "",
      descripcion: producto.descripcion || "",
      imagen: producto.imagen || "",
    });

    setEditandoId(producto._id);
    setMensaje("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarProducto = async (id, nombre) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar "${nombre}"?`
    );

    if (!confirmar) return;

    const token = sessionStorage.getItem("tokenAdmin");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`${API}/${id}`, config);
      setMensaje("Producto eliminado correctamente. 🌸");

      if (editandoId === id) {
        limpiarFormulario();
      }

      await cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setMensaje("No se pudo eliminar el producto.");
    }
  };

  return (
    <main style={{ padding: "30px", maxWidth: "850px", margin: "auto" }}>
      <h1>Gestión de productos 🌸</h1>
      <p>Panel de administración de MAR DE LINO</p>

      <h2>{editandoId ? "Editar producto" : "Agregar nuevo producto"}</h2>

      <form onSubmit={guardarProducto}>
        <div style={{ display: "grid", gap: "12px" }}>
          <input
            name="nombre"
            placeholder="Nombre del producto"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />

          <select
            name="tipo"
            value={formulario.tipo}
            onChange={manejarCambio}
          >
            <option value="Aceite">Aceite</option>
            <option value="Gel">Gel</option>
          </select>

          <input
            name="precio"
            type="number"
            placeholder="Precio en pesos colombianos"
            min="1"
            value={formulario.precio}
            onChange={manejarCambio}
            required
          />

          <textarea
            name="descripcion"
            placeholder="Descripción y beneficios del producto"
            value={formulario.descripcion}
            onChange={manejarCambio}
            required
          />

          <input
            name="imagen"
            placeholder="Ruta de imagen (opcional)"
            value={formulario.imagen}
            onChange={manejarCambio}
          />

          <button type="submit" disabled={guardando}>
            {guardando
              ? "Guardando..."
              : editandoId
                ? "Actualizar producto 🌷"
                : "Guardar producto 🌷"}
          </button>

          {editandoId && (
            <button type="button" onClick={limpiarFormulario}>
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <hr />

      <h2>Productos registrados: {productos.length}</h2>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        productos.map((producto) => (
          <article
            key={producto._id}
            style={{
              padding: "15px",
              marginBottom: "12px",
              border: "1px solid #e8cbd9",
              borderRadius: "12px",
            }}
          >
            <strong>{producto.nombre}</strong>
            <p>{producto.tipo}</p>
            <p>${producto.precio?.toLocaleString("es-CO")} COP</p>

            <button
              type="button"
              onClick={() => editarProducto(producto)}
            >
              Editar ✏️
            </button>

            <button
              type="button"
              onClick={() => eliminarProducto(producto._id, producto.nombre)}
              style={{ marginLeft: "10px" }}
            >
              Eliminar 🗑️
            </button>
          </article>
        ))
      )}
    </main>
  );
}

export default GestionProducto;