import { useState } from "react";
import "./App.css";

import bannerImg from "./assets/banner.png";

import img1 from "./assets/productos/1.png";
import img2 from "./assets/productos/2.png";
import img3 from "./assets/productos/3.png";
import img4 from "./assets/productos/4.png";
import img5 from "./assets/productos/5.png";
import img6 from "./assets/productos/6.png";

const productos = [
  {
    id: 1,
    nombre: "Aceite de Romero",
    tipo: "Aceite",
    precio: 18000,
    descripcion: "Un aliado para el cuidado capilar que ayuda a mantener el cuero cabelludo en buenas condiciones, aportando suavidad y brillo al cabello.",
    imagen: img1
  },
  {
    id: 2,
    nombre: "Aceite de Linaza",
    tipo: "Aceite",
    precio: 18000,
    descripcion: "Ideal para complementar tu rutina capilar. Ayuda a nutrir el cabello, mejorar su apariencia y mantenerlo suave y manejable.",
    imagen: img2
  },
  {
    id: 3,
    nombre: "Aceite de Manzanilla",
    tipo: "Aceite",
    precio: 25000,
    descripcion: "Una opción para consentir tu cabello con un cuidado suave. Ayuda a aportar brillo, suavidad y una apariencia saludable.",
    imagen: img3
  },
  {
    id: 4,
    nombre: "Gel de Romero",
    tipo: "Gel",
    precio: 18000,
    descripcion: "Define tus rizos y ayuda a mantenerlos en su lugar. Ideal para conseguir una apariencia organizada, con movimiento y definición.",
    imagen: img4
  },
  {
    id: 5,
    nombre: "Gel de Manzanilla",
    tipo: "Gel",
    precio: 18000,
    descripcion: "Acompaña tu rutina de definición con una textura pensada para ayudar a controlar el cabello y realzar la forma natural de tus rizos.",
    imagen: img5
  },
  {
    id: 6,
    nombre: "Gel de Linaza",
    tipo: "Gel",
    precio: 25000,
    descripcion: "Un favorito para el cuidado de los rizos. Ayuda a definir, controlar el frizz y mantener los rizos con una apariencia natural y flexible.",
    imagen: img6
  }
];

function App() {
  const [cantidades, setCantidades] = useState({});

  const cambiarCantidad = (id, cambio) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + cambio)
    }));
  };

  return (
    <>
      {/* NAVEGACIÓN */}
      <nav className="navbar" aria-label="Navegación principal">
        <a href="#inicio">Inicio</a>
        <a href="#productos">Productos</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <main className="app-main">

        {/* BANNER PRINCIPAL */}
        <section id="inicio" className="hero-banner">
          <div className="banner">
            <img
              src={bannerImg}
              alt="MARDELINO - Cuidado natural para tus rizos"
            />
          </div>
        </section>

        {/* CATÁLOGO */}
        <section id="productos" className="productos-section">
          <h2 className="section-title">Nuestros productos</h2>

          <p className="section-description">
            Encuentra el cuidado ideal para consentir y resaltar tus rizos.
          </p>

          <div className="catalogo">
            {productos.map((producto) => (
              <article className="producto" key={producto.id}>

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

                <div className="contador-cantidad">
                  <span>Cantidad</span>

                  <div className="contador-controles">
                    <button
                      type="button"
                      onClick={() => cambiarCantidad(producto.id, -1)}
                      aria-label={`Disminuir cantidad de ${producto.nombre}`}
                    >
                      −
                    </button>

                    <strong>
                      {cantidades[producto.id] || 0}
                    </strong>

                    <button
                      type="button"
                      onClick={() => cambiarCantidad(producto.id, 1)}
                      aria-label={`Aumentar cantidad de ${producto.nombre}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <a
                  className="boton-comprar"
                  href={`https://wa.me/3012008915?text=${encodeURIComponent(
                    `Hola, quiero comprar ${cantidades[producto.id] || 1} unidad(es) de ${producto.nombre}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Comprar producto
                </a>

              </article>
            ))}
          </div>
        </section>

        {/* NOSOTROS */}
        <section id="nosotros" className="nosotros">

          <h2>Nosotros</h2>

          <div className="nosotros-grid">

            <article className="nosotros-card">
              <h3>Quiénes somos</h3>
              <p>
                En MARDELINO, nos apasiona la belleza y el cuidado del
                cabello. Nuestra misión es ofrecer productos de alta
                calidad que realcen la belleza natural de cada persona.
                Con una amplia gama de geles y aceites capilares, nos
                esforzamos por brindar soluciones efectivas para el
                cuidado del cabello, promoviendo la salud y el brillo
                en cada hebra. Creemos que cada individuo merece
                sentirse seguro y radiante, y estamos comprometidos
                a ayudar a nuestros clientes a lograrlo.
              </p>
            </article>

            <article className="nosotros-card">
              <h3>Nuestra misión</h3>
              <p>
                En Mar de Lino tenemos la misión de ofrecer productos
                para el cuidado del cabello rizado que nutran, hidraten
                y resalten su belleza natural. Buscamos brindar
                experiencias de cuidado que fortalezcan la confianza
                y el amor propio, a través de alternativas pensadas
                para las necesidades de cada tipo de rizo.
              </p>
            </article>

            <article className="nosotros-card">
              <h3>Nuestra visión</h3>
              <p>
                Ser una marca referente en el cuidado del cabello
                rizado, reconocida por la calidad de nuestros productos,
                la innovación y nuestro compromiso con la belleza
                natural. Aspiramos a crecer y llegar a más personas,
                creando una comunidad que celebre la diversidad,
                autenticidad y libertad de llevar sus rizos con orgullo.
              </p>
            </article>

          </div>
        </section>

        {/* CONTACTO Y REDES SOCIALES */}
        <section id="contacto" className="contacto">

          <div className="contacto-contenido">
            <h2>Conecta con MARDELINO</h2>

            <p>
              Únete a nuestra comunidad y descubre más sobre
              el cuidado y la belleza natural de tus rizos.
            </p>

            <a
              href="https://www.instagram.com/mar.delino/"
              target="_blank"
              rel="noopener noreferrer"
              className="boton-instagram"
            >
              Síguenos en Instagram
            </a>
          </div>

        </section>

      </main>
    </>
  );
}

export default App;