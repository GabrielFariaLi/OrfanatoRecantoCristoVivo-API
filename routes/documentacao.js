const Documentacao = require("../models/Documentacao");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newDocumentacao = new Documentacao(req.body);

  try {
    const savedDocumentacao = await newDocumentacao.save();
    res.status(200).json(savedDocumentacao);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:documentacaoID", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedDocumentacao = await Documentacao.findByIdAndUpdate(
      req.params.documentacaoID,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedDocumentacao);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:documentacaoID", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Documentacao.findByIdAndDelete(req.params.documentacaoID);
    res.status(200).json("Documentacao deletado com sucesso");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET DOCUMENTACAO POR ID
router.get(
  "/find/:documentacaoID",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const documentacao = await Documentacao.find({
        userId: req.params.documentacaoID,
      });
      res.status(200).json(documentacao);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const documentacoes = await Documentacao.find();
    res.status(200).json(documentacoes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
