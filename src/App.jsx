import "./App.css";

import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Catalogo from "./components/Catalogo";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";

function App() {
  return (
    <>
      <Navbar />

      <main className="app-main">

        <Banner />

        <Catalogo />

        <Nosotros />

        <Contacto />

      </main>
    </>
  );
}

export default App;