import { useEffect, useState } from "react";

function Usuarios() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("Gel");
  const [aroma, setAroma] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");

  const API = "http://localhost:5000/api/productos";

  async function cargarProductos() {
    try {
      const respuesta = await fetch(API);
      const datos = await respuesta.json();
      setProductos(datos);
    } catch {
      setMensaje("No se pudo conectar con el servidor.");
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  async function agregarProducto(e) {
    e.preventDefault();
    setMensaje("");

    try {
      const respuesta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          tipo,
          aroma,
          precio: Number(precio),
          cantidad: Number(cantidad),
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No se pudo guardar.");
      }

      setMensaje("¡Producto agregado correctamente!");
      setNombre("");
      setTipo("Gel");
      setAroma("");
      setPrecio("");
      setCantidad("");
      cargarProductos();
    } catch (error) {
      setMensaje(error.message || "Error al agregar el producto.");
    }
  }

  async function eliminarProducto(id) {
    if (!window.confirm("¿Quieres eliminar este producto?")) return;

    try {
      const respuesta = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el producto.");
      }

      setMensaje("Producto eliminado.");
      cargarProductos();
    } catch (error) {
      setMensaje(error.message);
    }
  }

  return (
    <main style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1>Administración de Mardelino</h1>
      <p>Gestiona tus productos, precios y existencias.</p>

      <h2>Agregar producto</h2>

      <form onSubmit={agregarProducto}>
        <label>Nombre del producto</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          placeholder="Ej. Gel de algodón"
        />

        <label>Tipo de producto</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Gel">Gel</option>
          <option value="Aceite">Aceite</option>
        </select>

        <label>Aroma</label>
        <input
          value={aroma}
          onChange={(e) => setAroma(e.target.value)}
          required
          placeholder="Ej. Lavanda y romero"
        />

        <label>Precio</label>
        <input
          type="number"
          min="0"
          step="any"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <label>Cantidad disponible</label>
        <input
          type="number"
          min="0"
          step="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />

        <button type="submit">Agregar producto</button>
      </form>

      {mensaje && <p role="status">{mensaje}</p>}

      <h2>Productos registrados</h2>

      {productos.length === 0 ? (
        <p>Aún no hay productos registrados.</p>
      ) : (
        productos.map((producto) => (
          <article
            key={producto._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "12px",
            }}
          >
            <h3>{producto.nombre}</h3>
            <p>Tipo: {producto.tipo}</p>
            <p>Aroma: {producto.aroma}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Existencias: {producto.cantidad}</p>
            <p>
              Estado: {producto.cantidad > 0 ? "Disponible" : "Agotado"}
            </p>

            <button onClick={() => eliminarProducto(producto._id)}>
              Eliminar
            </button>
          </article>
        ))
      )}
    </main>
  );
}

export default Usuarios;




