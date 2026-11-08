const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Pedido = require("../models/Pedido");
const Cliente = require("../models/Cliente");
const Producto = require("../models/Producto");

router.post("/", async (req, res) => {
  try {
    const {
      cliente,
      productos,
      direccion,
      barrio,
      ciudad,
      metodoPago,
      observaciones
    } = req.body;

    if (
      !cliente?.nombre?.trim() ||
      !cliente?.correo?.trim() ||
      !cliente?.celular?.trim() ||
      !cliente?.ciudad?.trim() ||
      cliente.aceptaTratamientoDatos !== true
    ) {
      return res.status(400).json({
        mensaje: "Completa tus datos y autoriza su tratamiento."
      });
    }

    const correo = cliente.correo.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return res.status(400).json({
        mensaje: "Ingresa un correo válido."
      });
    }

    if (
      !Array.isArray(productos) ||
      productos.length === 0 ||
      !direccion?.trim() ||
      !barrio?.trim() ||
      !ciudad?.trim() ||
      !["Efectivo", "Transferencia"].includes(metodoPago)
    ) {
      return res.status(400).json({
        mensaje: "Revisa los datos del pedido."
      });
    }

    const clienteGuardado = await Cliente.findOneAndUpdate(
      { correo },
      {
        $set: {
          nombre: cliente.nombre.trim(),
          correo,
          celular: cliente.celular.trim(),
          ciudad: cliente.ciudad.trim(),
          aceptaTratamientoDatos: true
        }
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    const productosPedido = [];
    let total = 0;

    for (const item of productos) {
      if (
        !item.productoId ||
        !mongoose.Types.ObjectId.isValid(item.productoId) ||
        !Number.isInteger(item.cantidad) ||
        item.cantidad < 1 ||
        item.cantidad > 100
      ) {
        return res.status(400).json({
          mensaje: "Hay un producto o una cantidad inválida."
        });
      }

      const producto = await Producto.findOne({
        _id: item.productoId,
        activo: true
      });

      if (!producto) {
        return res.status(400).json({
          mensaje: "Uno de los productos ya no está disponible."
        });
      }

      productosPedido.push({
        productoId: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: item.cantidad
      });

      total += producto.precio * item.cantidad;
    }

    const nuevoPedido = new Pedido({
      cliente: clienteGuardado._id,
      productos: productosPedido,
      direccion: direccion.trim(),
      barrio: barrio.trim(),
      ciudad: ciudad.trim(),
      metodoPago,
      observaciones: observaciones?.trim() || "",
      total
    });

    const pedidoGuardado = await nuevoPedido.save();

    res.status(201).json({
      mensaje: "¡Tu pedido fue registrado correctamente!",
      pedido: pedidoGuardado
    });

  } catch (error) {
    console.error("Error al registrar pedido:", error);

    res.status(500).json({
      mensaje: "No se pudo registrar el pedido."
    });
  }
});

module.exports = router;