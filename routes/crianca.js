const Crianca = require("../models/Crianca");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCrianca = new Crianca(req.body);

  try {
    const savedCrianca = await newCrianca.save();
    res.status(200).json(savedCrianca);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:criancaID", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCrianca = await Crianca.findByIdAndUpdate(
      req.params.criancaID,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCrianca);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:criancaID", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Crianca.findByIdAndDelete(req.params.criancaID);
    res.status(200).json("Crianca deletado com sucesso");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Crianca POR ID
router.get(
  "/find/:criancaID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const crianca = await Crianca.find({ userId: req.params.criancaID });
      res.status(200).json(crianca);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const criancas = await Crianca.find();
    res.status(200).json(criancas);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
