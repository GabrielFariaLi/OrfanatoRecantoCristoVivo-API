const mongoose = require("mongoose");

const FuncionarioSchema = new mongoose.Schema(
  {
    idFuncionario: { type: String, required: true },
    nome: { type: String, required: true },
    cargo: { type: String, required: true },
    dataContratado: { type: String },
    dataDispensado: { type: String },
    img: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Funcionario", FuncionarioSchema);
