const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const productosRoutes = require("./routes/productos.js");
const wabbyRoutes = require("./routes/wabby.js");
const authRoutes = require("./routes/auth.js");
const clientesRoutes = require("./routes/clientes.js");
const pedidosRoutes = require("./routes/pedidos.js");


console.log("Router de productos:", typeof productosRoutes);
console.log("Router de Wabby:", typeof wabbyRoutes);
console.log("Router de Clientes:", typeof clientesRoutes);
console.log("Router de Pedidos:", typeof pedidosRoutes);

app.use("/api/productos", productosRoutes);
app.use("/api/wabby", wabbyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/pedidos", pedidosRoutes);

app.get("/", (req, res) => {
  res.send("Servidor de Mardelino funcionando 🌿");
});

async function iniciarServidor() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado correctamente");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Servidor de Mardelino iniciado");
    });
  } catch (error) {
    console.error("Error al conectar:", error.message);
  }
}

iniciarServidor();