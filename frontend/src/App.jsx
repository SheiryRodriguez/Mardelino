import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./Admin.css";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import GestionProducto from "./pages/GestionProducto";
import Login from "./pages/Login";

function RutaProtegida({ children }) {
  const token = sessionStorage.getItem("tokenAdmin");

  return token ? children : <Navigate to="/admin" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          
        <Route path="/nosotros" element={<Nosotros />} />

        <Route path="/admin" element={<Login />} />

        <Route
          path="/productos"
          element={
            <RutaProtegida>
              <GestionProducto />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;