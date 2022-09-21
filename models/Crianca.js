const mongoose = require("mongoose");

const CriancaSchema = new mongoose.Schema(
  {
    idCrianca: { type: String, required: true },
    nome: { type: String, required: true },
    telefoneContacto: { type: String, required: true },
    img: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crianca", CriancaSchema);
