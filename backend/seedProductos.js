const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Producto = require("./models/Producto");

dotenv.config();

const productos = [
  {
    nombre: "Aceite de Romero",
    tipo: "Aceite",
    precio: 18000,
    descripcion: "Un aliado para el cuidado capilar que ayuda a mantener el cuero cabelludo en buenas condiciones, aportando suavidad y brillo al cabello.",
    imagen: "/productos/1.png"
  },
  {
    nombre: "Aceite de Linaza",
    tipo: "Aceite",
    precio: 18000,
    descripcion: "Ideal para complementar tu rutina capilar. Ayuda a nutrir el cabello, mejorar su apariencia y mantenerlo suave y manejable.",
    imagen: "/productos/2.png"
  },
  {
    nombre: "Aceite de Manzanilla",
    tipo: "Aceite",
    precio: 18000,
    descripcion: "Una opción para consentir tu cabello con un cuidado suave. Ayuda a aportar brillo, suavidad y una apariencia saludable.",
    imagen: "/productos/3.png"
  },
  {
    nombre: "Gel de Romero",
    tipo: "Gel",
    precio: 24000,
    descripcion: "Define tus rizos y ayuda a mantenerlos en su lugar. Ideal para conseguir una apariencia organizada, con movimiento y definición.",
    imagen: "/productos/4.png"
  },
  {
    nombre: "Gel de Manzanilla",
    tipo: "Gel",
    precio: 25000,
    descripcion: "Acompaña tu rutina de definición con una textura pensada para ayudar a controlar el cabello y realzar la forma natural de tus rizos.",
    imagen: "/productos/5.png"
  },
  {
    nombre: "Gel de Linaza",
    tipo: "Gel",
    precio: 25000,
    descripcion: "Un favorito para el cuidado de los rizos. Ayuda a definir, controlar el frizz y mantener los rizos con una apariencia natural y flexible.",
    imagen: "/productos/6.png"
  },
  {
    nombre: "Aceite de Orégano",
    tipo: "Aceite",
    precio: 17000,
    descripcion: "Un aliado para el cuidado capilar que ayuda a mantener el cuero cabelludo en buenas condiciones, aportando suavidad y brillo al cabello.",
    imagen: "/productos/7.png"
  },
  {
    nombre: "Aceite de Cebolla",
    tipo: "Aceite",
    precio: 17000,
    descripcion: "Nutre el cabello y ayuda a mejorar su apariencia, suavidad y brillo.",
    imagen: "/productos/8.png"
  },
  {
    nombre: "Aceite de Anís Estrellado",
    tipo: "Aceite",
    precio: 17000,
    descripcion: "Aporta suavidad, brillo y ayuda a mantener el cabello hidratado. Ideal para complementar tu rutina capilar y mantenerlo saludable.",
    imagen: "/productos/9.png"
  },
  {
    nombre: "Gel de Orégano",
    tipo: "Gel",
    precio: 24000,
    descripcion: "Ayuda a definir los rizos, controlar el frizz y mantener la fijación. Ideal para conseguir una apariencia natural y flexible.",
    imagen: "/productos/10.png"
  },
  {
    nombre: "Gel de Cebolla",
    tipo: "Gel",
    precio: 24000,
    descripcion: "Aporta suavidad, facilita el peinado y ayuda a definir los rizos. Acompaña tu rutina de definición y realza la forma natural de tus rizos.",
    imagen: "/productos/11.png"
  },
  {
    nombre: "Gel de Anís Estrellado",
    tipo: "Gel",
    precio: 25000,
    descripcion: "Ayuda a definir los rizos, aportando brillo, suavidad y control.",
    imagen: "/productos/12.png"
  }
];

async function cargarProductos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const operaciones = productos.map((producto) => ({
      updateOne: {
        filter: {
          nombre: producto.nombre,
          tipo: producto.tipo
        },
        update: {
          $set: producto,
          $setOnInsert: { activo: true }
        },
        upsert: true
      }
    }));

    await Producto.bulkWrite(operaciones);

    const total = await Producto.countDocuments();

    console.log("Productos cargados correctamente 🌸");
    console.log("Total de productos en MongoDB:", total);
  } catch (error) {
    console.error("Error al cargar productos:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

cargarProductos();