import { useEffect, useState } from "react";
import ProductoCard from "./ProductoCard";

function Catalogo({ agregarProducto }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/productos")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los productos");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        console.error(error);
        setError("No pudimos cargar los productos.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <section id="productos" className="productos-section">
      <h2 className="section-title">
        Nuestros productos
      </h2>

      <p className="section-description">
        Encuentra el cuidado ideal para consentir y resaltar tus rizos.
      </p>

      {cargando && <p>Cargando productos...</p>}

      {error && <p>{error}</p>}

      <div className="catalogo">
        {productos.map((producto) => (
          <ProductoCard
            key={producto._id}
            producto={producto}
            onAgregar={agregarProducto}
          />
        ))}
      </div>
    </section>
  );
}

export default Catalogo;