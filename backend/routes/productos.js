const express = require("express");
const router = express.Router();

const Producto = require("../models/Producto");

const protegerAdmin = require("../middleware/protegerAdmin");

// 1. Obtener todos los productos activos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find({ activo: true })
    .collation({ locale: "es", strength: 1 })
    .sort({tipo: 1,nombre: 1});
    
    res.json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los productos",
      error: error.message
    });
  }
});

// 2. Guardar un producto nuevo
router.post("/",protegerAdmin,async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();

    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al guardar el producto",
      error: error.message
    });
  }
});

// 3. Editar un producto
router.put("/:id",protegerAdmin,async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el producto",
      error: error.message
    });
  }
});

// 4. Desactivar un producto
router.delete("/:id",protegerAdmin,async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.json({
      mensaje: "Producto desactivado correctamente",
      producto
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al desactivar el producto",
      error: error.message
    });
  }
});

console.log("Rutas de productos conectadas a MongoDB 🌿");

module.exports = router;