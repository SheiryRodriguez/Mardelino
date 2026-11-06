const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");
const Producto = require("../models/Producto");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje || typeof mensaje !== "string" || !mensaje.trim()) {
      return res.status(400).json({
        respuesta: "¡Hola! Cuéntame qué necesitas para cuidar tus rizos 🌸",
      });
    }

    const productos = await Producto.find({ activo: true });

    const catalogo = productos.map((producto) => ({
      nombre: producto.nombre,
      tipo: producto.tipo,
      precio: producto.precio,
      descripcion: producto.descripcion,
    }));

    const prompt = `
Eres Wabby, la asistente virtual de MAR DE LINO,
una marca especializada en productos para el cuidado del cabello rizado.

Tu personalidad es dulce, cercana, alegre y profesional.
Hablas en español colombiano natural.

Tus funciones son:
- Orientar sobre el cuidado cosmético del cabello rizado.
- Recomendar productos según las necesidades del cliente.
- Explicar beneficios y precios.
- Crear rutinas capilares sencillas.
- Ayudar a elegir productos.

CATÁLOGO REAL:
${JSON.stringify(catalogo, null, 2)}

REGLAS:
- Recomienda únicamente productos del catálogo.
- No inventes precios ni ingredientes.
- Si no tienes información suficiente, dilo.
- No diagnostiques enfermedades.
- Responde de manera clara, cálida y breve.

MENSAJE DEL CLIENTE:
${mensaje}
`;

    const respuestaGemini = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt,
      store: false,
    });

    res.json({
      respuesta: respuestaGemini.output_text,
    });

  } catch (error) {
    console.error("Error de Wabby:", error.message);

    res.status(500).json({
      respuesta: "¡Ups! Tuve un pequeño problema. Inténtalo nuevamente 🌸",
    });
  }
});

module.exports = router;