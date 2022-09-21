const mongoose = require("mongoose");

const ComodoSchema = new mongoose.Schema(
  {
    idComodo: { type: String, required: true },
    designacao: { type: String, required: true },
    ativosImportantes: [
      {
        nome: { type: String },
        quantidade: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comodo", ComodoSchema);
