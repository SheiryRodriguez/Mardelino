const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true
    },

    productos: [
      {
        productoId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },

        nombre: {
          type: String,
          required: true
        },

        precio: {
          type: Number,
          required: true,
          min: 0
        },

        cantidad: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],

    direccion: {
      type: String,
      required: true,
      trim: true
    },

    barrio: {
      type: String,
      required: true,
      trim: true
    },

    ciudad: {
      type: String,
      required: true,
      trim: true
    },

    metodoPago: {
      type: String,
      enum: ["Efectivo", "Transferencia"],
      required: true
    },

    observaciones: {
      type: String,
      trim: true,
      default: ""
    },

    total: {
      type: Number,
      required: true,
      min: 0
    },

    estado: {
      type: String,
      enum: ["Pendiente", "Confirmado", "En preparación", "Entregado", "Cancelado"],
      default: "Pendiente"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pedido", pedidoSchema);