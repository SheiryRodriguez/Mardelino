const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    tipo: {
      type: String,
      required: true,
      enum: ["Aceite", "Gel"]
    },

    precio: {
      type: Number,
      required: true,
      min: 0
    },

    descripcion: {
      type: String,
      required: true
    },

    imagen: {
      type: String,
      default: ""
    },

    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Producto", productoSchema);