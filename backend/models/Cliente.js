const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    correo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    celular: {
      type: String,
      required: true,
      trim: true
    },

    ciudad: {
      type: String,
      required: true,
      trim: true
    },

    aceptaTratamientoDatos: {
      type: Boolean,
      required: true,
      validate: {
        validator: (valor) => valor === true,
        message: "Debes autorizar el tratamiento de tus datos."
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Cliente", clienteSchema);