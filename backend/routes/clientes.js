const express = require("express");
const router = express.Router();

const Cliente = require("../models/Cliente");

router.post("/registro", async (req, res) => {
  try {
    const { nombre, correo, celular, ciudad, aceptaTratamientoDatos } = req.body;

    if (!nombre || !correo || !celular || !ciudad) {
      return res.status(400).json({
        mensaje: "Completa todos los campos."
      });
    }

    if (aceptaTratamientoDatos !== true) {
      return res.status(400).json({
        mensaje: "Debes aceptar el tratamiento de datos."
      });
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!correoValido) {
      return res.status(400).json({
        mensaje: "Ingresa un correo electrónico válido."
      });
    }

    const clienteExistente = await Cliente.findOne({
      correo: correo.trim().toLowerCase()
    });

    if (clienteExistente) {
      return res.status(409).json({
        mensaje: "Este correo ya está registrado."
      });
    }

    const nuevoCliente = new Cliente({
      nombre,
      correo,
      celular,
      ciudad,
      aceptaTratamientoDatos
    });

    const clienteGuardado = await nuevoCliente.save();

    res.status(201).json({
      mensaje: "¡Registro exitoso! Bienvenida a MAR DE LINO.",
      cliente: {
        id: clienteGuardado._id,
        nombre: clienteGuardado.nombre,
        correo: clienteGuardado.correo
      }
    });

  } catch (error) {
    console.error("Error al registrar cliente:", error);

    res.status(500).json({
      mensaje: "No se pudo completar el registro."
    });
  }
});

module.exports = router;