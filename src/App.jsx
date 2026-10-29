import { useState } from 'react';
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import bannerImg from './assets/banner.png';
import viteLogo from './assets/vite.svg';
import "./App.css";
import img1 from "./assets/productos/1.png";
import img2 from "./assets/productos/2.png";
import img3 from "./assets/productos/3.png";
import img4 from "./assets/productos/4.png";
import img5 from "./assets/productos/5.png";
import img6 from "./assets/productos/6.png";



const productos = [
  { id: 1, nombre: "Aceite de Romero", tipo: "Aceite", precio: 18000, imagen: img1 },
  { id: 2, nombre: "Aceite de Linaza", tipo: "Aceite", precio: 18000, imagen: img2 },
  { id: 3, nombre: "Aceite de Manzanilla", tipo: "Aceite", precio: 25000, imagen: img3 },
  { id: 4, nombre: "Gel de Romero", tipo: "Gel", precio: 18000, imagen: img4 },
  { id: 5, nombre: "Gel de Manzanilla", tipo: "Gel", precio: 18000, imagen: img5 },
  { id: 6, nombre: "Aceite de Linaza", tipo: "Gel", precio: 25000, imagen: img6 },
];


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav className="navbar">
  <a href="#inicio">Inicio</a>
  <a href="#productos">Productos</a>
  <a href="#nosotros">Nosotros</a>
  <a href="#contacto">Contacto</a>
</nav>

    
<section id="inicio" className="hero-banner">  </section>
      <section id="center">
        <div className="banner">
          <img src={bannerImg} className="base" width="2000" height="1280" alt="" />
          
        </div>
      
       {/* CONTADOR OCULTO TEMPORALMENTE */}
         

      <div id="productos" className="catalogo">  </div>
        
        <div className="catalogo">
  {productos.map((producto) => (
    <div className="producto" key={producto.id}>
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio.toLocaleString("es-CO")}</p>
      <a href="https://wa.me/3012008915" target="_blank">
        Pedir por WhatsApp
      </a>
    </div>
  ))}
</div>

<section className="nosotros">
  <h2>Nosotros</h2>
  <div className="nosotros-grid">
    <article className="nosotros-card">
      <h3> Quiénes somos</h3>
      <p>En MARDELINO, nos apasiona la belleza y el cuidado del cabello. Nuestra misión es ofrecer productos de alta calidad que realcen la belleza natural de cada persona. Con una amplia gama de geles y aceites capilares, nos esforzamos por brindar soluciones efectivas para el cuidado del cabello, promoviendo la salud y el brillo en cada hebra. Creemos que cada individuo merece sentirse seguro y radiante, y estamos comprometidos a ayudar a nuestros clientes a lograrlo.</p>
    </article>

    <article className="nosotros-card">
      <h3> Nuestra misión</h3>
      <p>Aquí va tu texto sobre lo que quieren lograr con sus productos.</p>
    </article>

    <article className="nosotros-card">
      <h3> Nuestra visión</h3>
      <p>Aquí va tu texto sobre hacia dónde quieren llegar.</p>
    </article>
  </div>
</section>
          
        
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the MARDELINO community</p>
          <ul>
            <li>
              <a href="https://www.instagram.com/mar.delino?xtok=amR2YWY4b2t4amZwte" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  
                </svg>
                Instagram
              </a>
            </li>
            
            
          </ul>
        </div>
      


      <div className="ticks"></div>
      <section id="spacer"></section>

    

<section id="contacto"> </section>
      </section>
    </>
  );
}

export default App;
