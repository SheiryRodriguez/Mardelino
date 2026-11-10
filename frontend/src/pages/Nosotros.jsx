import "../App.css";
import Navbar from "../components/Navbar";
import NosotrosContenido from "../components/Nosotros";

function Nosotros() {
  return (
    <>
      <Navbar />
      <main className="app-main pagina-nosotros">
        <NosotrosContenido />
      </main>
    </>
  );
}

export default Nosotros;