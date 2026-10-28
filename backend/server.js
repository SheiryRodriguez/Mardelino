const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const productosRoutes = require("./routes/productos");
app.use("/api/productos", productosRoutes);

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