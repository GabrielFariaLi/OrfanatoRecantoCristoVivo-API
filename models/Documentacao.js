const mongoose = require("mongoose");

const DocumentacaoSchema = new mongoose.Schema(
  {
    idDocumentacao: { type: String, required: true },
    titulo: { type: String },
    img: { type: Array },
    dataEmitido: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Documentacao", DocumentacaoSchema);
