const express = require("express");
const Producto = require("../models/producto");

const router = express.Router();

// Consultar todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al consultar productos" });
  }
});

// Agregar un producto
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({
      mensaje: "No se pudo crear el producto",
      error: error.message,
    });
  }
});

// Editar un producto
router.put("/:id", async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo actualizar el producto" });
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo eliminar el producto" });
  }
});

module.exports = router;