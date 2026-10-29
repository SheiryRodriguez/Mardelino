import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Usuarios from './usuarios/usuarios.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav className="navbar">
      <a href="#center">Inicio</a>
      <a href="#next-steps">Productos</a>
      <a href="#nosotros">Nosotros</a>
      <a href="#contacto">Contacto</a>
    </nav>

      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="170" alt="" />
          
        </div>
        <div>
          <h1>MARDELINO</h1>
          <p>
          Donde tu belleza florece y tu cabello resplandece.
          </p>
        </div>
       {/* CONTADOR OCULTO TEMPORALMENTE */}
          <div>
          <h2>NOSOTROS</h2>
          <p>
          En MARDELINO, nos apasiona la belleza y el cuidado del cabello. Nuestra misión es ofrecer productos de alta calidad que realcen la belleza natural de cada persona. Con una amplia gama de geles y aceites capilares, nos esforzamos por brindar soluciones efectivas para el cuidado del cabello, promoviendo la salud y el brillo en cada hebra. Creemos que cada individuo merece sentirse seguro y radiante, y estamos comprometidos a ayudar a nuestros clientes a lograrlo.
          </p>
        </div>
       
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Productos</h2>
          <p> Explora nuestra linea variada de geles y aceites capilares.</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
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
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>

      <Usuarios />
    </>
  )
}

export default App
