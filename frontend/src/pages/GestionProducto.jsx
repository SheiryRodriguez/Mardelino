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
        await axios.post(
          API,
          { ...datosProducto, activo: true },
          config
        );
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
    <main className="admin-dashboard">
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">MAR DE LINO · ESPACIO PRIVADO</span>
          <h1>Gestión de productos</h1>
          <p>Administra tu catálogo y mantén tu tienda siempre actualizada.</p>
        </div>

        <div className="admin-header-mark">M</div>
      </header>

      <section className="admin-summary">
        <div className="admin-summary-card">
          <span className="summary-icon">✿</span>
          <div>
            <span className="summary-label">Productos registrados</span>
            <strong>{productos.length}</strong>
          </div>
        </div>

        <div className="admin-summary-card">
          <span className="summary-icon">♡</span>
          <div>
            <span className="summary-label">Categorías</span>
            <strong>02</strong>
          </div>
        </div>
      </section>

      <section className="admin-form-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-eyebrow">CATÁLOGO</span>
            <h2>{editandoId ? "Editar producto" : "Agregar nuevo producto"}</h2>
            <p>
              {editandoId
                ? "Actualiza la información de este producto."
                : "Completa los datos para incorporar un producto a tu tienda."}
            </p>
          </div>

          <span className="admin-section-flower">✿</span>
        </div>

        <form className="admin-product-form" onSubmit={guardarProducto}>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="nombre">Nombre del producto</label>
              <input
                id="nombre"
                name="nombre"
                placeholder="Ej. Aceite de romero"
                value={formulario.nombre}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="admin-field">
              <label htmlFor="tipo">Categoría</label>
              <select
                id="tipo"
                name="tipo"
                value={formulario.tipo}
                onChange={manejarCambio}
              >
                <option value="Aceite">Aceite</option>
                <option value="Gel">Gel</option>
              </select>
            </div>

            <div className="admin-field admin-field-full">
              <label htmlFor="precio">Precio en pesos colombianos</label>
              <div className="admin-price-input">
                <span>$</span>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  placeholder="Ej. 18000"
                  min="1"
                  value={formulario.precio}
                  onChange={manejarCambio}
                  required
                />
              </div>
            </div>

            <div className="admin-field admin-field-full">
              <label htmlFor="descripcion">Descripción y beneficios</label>
              <textarea
                id="descripcion"
                name="descripcion"
                placeholder="Describe sus ingredientes, beneficios y modo de uso..."
                value={formulario.descripcion}
                onChange={manejarCambio}
                rows="4"
                required
              />
            </div>

            <div className="admin-field admin-field-full">
              <label htmlFor="imagen">Imagen del producto</label>
              <input
                id="imagen"
                name="imagen"
                placeholder="/productos/1.png"
                value={formulario.imagen}
                onChange={manejarCambio}
              />
              <span className="admin-field-help">
                Puedes dejarlo vacío para utilizar la imagen predeterminada.
              </span>
            </div>
          </div>

          <div className="admin-form-actions">
            <button
              className="admin-save-button"
              type="submit"
              disabled={guardando}
            >
              {guardando
                ? "Guardando..."
                : editandoId
                  ? "Actualizar producto"
                  : "Agregar producto"}
            </button>

            {editandoId && (
              <button
                className="admin-cancel-button"
                type="button"
                onClick={limpiarFormulario}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </section>

      {mensaje && (
        <div className="admin-feedback" role="status">
          {mensaje}
        </div>
      )}

      <section className="admin-products-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-eyebrow">INVENTARIO</span>
            <h2>Tu colección</h2>
            <p>Productos disponibles en el catálogo de MAR DE LINO.</p>
          </div>
          <span className="admin-products-count">
            {productos.length} productos
          </span>
        </div>

        {cargando ? (
          <div className="admin-empty-state">Cargando productos...</div>
        ) : productos.length === 0 ? (
          <div className="admin-empty-state">
            <span>✿</span>
            <h3>Aún no tienes productos</h3>
            <p>Agrega tu primer producto utilizando el formulario.</p>
          </div>
        ) : (
          <div className="admin-products-grid">
            {productos.map((producto) => (
              <article className="admin-product-card" key={producto._id}>
                <div className="admin-product-image">
                  <img
                    src={producto.imagen || "/productos/predeterminada.png"}
                    alt={producto.nombre}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/productos/predeterminada.png";
                    }}
                  />
                  <span className="admin-product-type">{producto.tipo}</span>
                </div>

                <div className="admin-product-info">
                  <h3>{producto.nombre}</h3>
                  <p className="admin-product-description">
                    {producto.descripcion}
                  </p>

                  <strong className="admin-product-price">
                    ${producto.precio?.toLocaleString("es-CO")} COP
                  </strong>

                  <div className="admin-product-actions">
                    <button
                      className="admin-edit-button"
                      type="button"
                      onClick={() => editarProducto(producto)}
                    >
                      Editar
                    </button>

                    <button
                      className="admin-delete-button"
                      type="button"
                      onClick={() =>
                        eliminarProducto(producto._id, producto.nombre)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default GestionProducto;