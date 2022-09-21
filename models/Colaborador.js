const mongoose = require("mongoose");

const ColaboradorSchema = new mongoose.Schema(
  {
    idColaborador: { type: String, required: true },
    nome: { type: String, required: true },
    doacao: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Colaborador", ColaboradorSchema);
