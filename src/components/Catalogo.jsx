import { productos } from "../data/productos";
import ProductoCard from "./productoCard";

function Catalogo({ agregarProducto }) {
  return (
    <section id="productos" className="productos-section">

      <h2 className="section-title">
        Nuestros productos
      </h2>

      <p className="section-description">
        Encuentra el cuidado ideal para consentir y resaltar tus rizos.
      </p>

      <div className="catalogo">

        {productos.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            onAgregar={agregarProducto}
          />
        ))}

      </div>

    </section>
  );
}

export default Catalogo;