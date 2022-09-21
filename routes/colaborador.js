const Colaborador = require("../models/Colaborador");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newColaborador = new Colaborador(req.body);

  try {
    const savedColaborador = await newColaborador.save();
    res.status(200).json(savedColaborador);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:colaboradorID", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedColaborador = await Colaborador.findByIdAndUpdate(
      req.params.colaboradorID,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedColaborador);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete(
  "/:colaboradorID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await Colaborador.findByIdAndDelete(req.params.colaboradorID);
      res.status(200).json("Colaborador foi deletado");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//GET Colaborador por ID
router.get(
  "/find/:colaboradorID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const colaborador = await Colaborador.findOne({
        idColaborador: req.params.colaboradorID,
      });
      res.status(200).json(colaborador);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const colaboradores = await Colaborador.find();
    res.status(200).json(colaboradores);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
