const mongoose = require('mongoose');

const plataformaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    juegos: [{ type: mongoose.Types.ObjectId, ref: "juegos", required: false }]
  },
  {
    timestamps: true,
    collection: 'plataformas',
  });

const Plataforma = mongoose.model("plataformas", plataformaSchema, "plataformas");
module.exports = Plataforma;