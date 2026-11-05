const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        mensaje: "Ruta de productos funcionando correctamente 🌿"
    });
});

console.log("Rutas de productos conectadas a MongoDB 🌿");

module.exports = router;