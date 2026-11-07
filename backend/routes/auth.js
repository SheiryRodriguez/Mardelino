const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Inicio de sesión exclusivo de la administradora
router.post("/login", async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return res.status(400).json({
        mensaje: "Debes ingresar usuario y contraseña"
      });
    }

    if (usuario !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    const contrasenaValida = await bcrypt.compare(
      contrasena,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!contrasenaValida) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    const token = jwt.sign(
      { rol: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token
    });

  } catch (error) {
    console.error("Error en el inicio de sesión:", error);

    res.status(500).json({
      mensaje: "Error al iniciar sesión"
    });
  }
});

module.exports = router;