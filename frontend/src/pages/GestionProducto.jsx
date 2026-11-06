import { useState, useEffect } from "react";
import axios from "axios";

function GestionProducto() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/productos")
      .then((respuesta) => {
        setProductos(respuesta.data);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <main style={{ padding: "30px" }}>
      <h1>Gestión de productos 🌸</h1>
      <p>Panel de administración de MAR DE LINO</p>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <h2>Productos registrados: {productos.length}</h2>

          {productos.map((producto) => (
            <article key={producto._id}>
              <strong>{producto.nombre}</strong>
              <p>${producto.precio?.toLocaleString("es-CO")} COP</p>
            </article>
          ))}
        </>
      )}
    </main>
  );
}

export default GestionProducto;