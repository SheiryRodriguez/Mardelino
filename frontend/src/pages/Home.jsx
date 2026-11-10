import { useState } from "react";
import "../App.css";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Catalogo from "../components/Catalogo";
import Contacto from "../components/Contacto";
import Carrito from "../components/carrito";

function Home() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const agregarProducto = (producto) => {
    setCarrito((actual) => {
      const existe = actual.find(
        (item) => item._id === producto._id
      );

      if (existe) {
        return actual.map((item) =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }

      return [...actual, producto];
    });

    setCarritoAbierto(true);
  };

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      setCarrito((actual) =>
        actual.filter((producto) => producto._id !== id)
      );
      return;
    }

    setCarrito((actual) =>
      actual.map((producto) =>
        producto._id === id ? { ...producto, cantidad } : producto
      )
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((actual) =>
      actual.filter((producto) => producto._id !== id)
    );
  };

  const cantidadTotal = carrito.reduce(
    (suma, producto) => suma + producto.cantidad,
    0
  );

  return (
    <>
      <Navbar
        cantidadCarrito={cantidadTotal}
        abrirCarrito={() => setCarritoAbierto(true)}
      />

      <main className="app-main">
        <Banner />
        <Catalogo agregarProducto={agregarProducto} />
        <Contacto />
      </main>

      <Carrito
        abierto={carritoAbierto}
        carrito={carrito}
        onCerrar={() => setCarritoAbierto(false)}
        onCambiarCantidad={cambiarCantidad}
        onEliminar={eliminarProducto}
      />
    </>
  );
}

export default Home;