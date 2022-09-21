const mongoose = require("mongoose");

const UtilizadorSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Utilizador", UtilizadorSchema);
