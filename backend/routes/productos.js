const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        mensaje: "Ruta de productos funcionando correctamente 🌿"
    });
});

console.log("PRODUCTOS ROUTES CARGADO");

module.exports = router;