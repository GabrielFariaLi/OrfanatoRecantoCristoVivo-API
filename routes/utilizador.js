const Utilizador = require("../models/Utilizador");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newUtilizador = new Utilizador(req.body);

  try {
    const savedUtilizador = await newUtilizador.save();
    res.status(200).json(savedUtilizador);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:utilizadorID", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedUtilizador = await Utilizador.findByIdAndUpdate(
      req.params.utilizadorID,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUtilizador);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:utilizadorID", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Utilizador.findByIdAndDelete(req.params.utilizadorID);
    res.status(200).json("Utilizador deletado com sucesso");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET UTILIZADOR POR ID
router.get(
  "/find/:utilizadorID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const utilizador = await Utilizador.find({
        userId: req.params.utilizadorID,
      });
      res.status(200).json(utilizador);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const utilizadores = await Utilizador.find();
    res.status(200).json(utilizadores);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
