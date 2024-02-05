const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "puzzles",
        "acción",
        "miedo",
        "coches",
        "plataformas",
        "fútbol",
        "granjas"
      ]
    },
    verified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    collection: "juegos"
  });

const Juego = mongoose.model("juegos", juegoSchema, "juegos");
module.exports = Juego;