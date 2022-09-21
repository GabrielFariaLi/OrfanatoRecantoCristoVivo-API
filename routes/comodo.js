const Comodo = require("../models/Comodo");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newComodo = new Comodo(req.body);

  try {
    const savedComodo = await newComodo.save();
    res.status(200).json(savedComodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:comodoID", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedComodo = await Comodo.findByIdAndUpdate(
      req.params.comodoID,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:comodoID", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Comodo.findByIdAndDelete(req.params.comodoID);
    res.status(200).json("Comodo deletado com sucesso");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET COMODO POR ID
router.get("/find/:comodoID", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const comodo = await Comodo.find({ userId: req.params.comodoID });
    res.status(200).json(comodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const comodos = await Comodo.find();
    res.status(200).json(comodos);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
