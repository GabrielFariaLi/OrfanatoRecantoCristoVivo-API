const Funcionario = require("../models/Funcionario");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newFuncionario = new Funcionario(req.body);

  try {
    const savedFuncionario = await newFuncionario.save();
    res.status(200).json(savedFuncionario);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:funcionarioID", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedFuncionario = await Funcionario.findByIdAndUpdate(
      req.params.funcionarioID,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFuncionario);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:funcionarioID", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Funcionario.findByIdAndDelete(req.params.funcionarioID);
    res.status(200).json("Funcionario deletado com sucesso");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET FUNCIONARIO POR ID
router.get(
  "/find/:funcionarioID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const funcionario = await Funcionario.find({
        userId: req.params.funcionarioID,
      });
      res.status(200).json(funcionario);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const funcionarios = await Funcionario.find();
    res.status(200).json(funcionarios);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
