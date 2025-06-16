const express = require("express");
const Buyer = require("../models/buyer.schems");
const userAuth = require("../middlewares/userAuth");
const buyerRouter = express.Router();

buyerRouter.post("/buyer", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const { id, name, mobileNumber } = req.body;
    if (!id || !name || !mobileNumber || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const exists = await Buyer.findOne({id})
    if(exists){
        return res.status(409).json({ error: "Buyer with this ID already exists" });
    }
    const buyer = new Buyer({
        id,
        name,
        mobileNumber,
        userId
    })
    await buyer.save()
    return res.status(201).json({message:"Buyer created successfully.",buyer})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

buyerRouter.get("/buyer",userAuth, async (req,res) => {
    try {
        const user = req.user
        const userId = user.id

        const buyers = await Buyer.find({userId})
        if(!buyers){
            return res.status(200).json({message:"No buyers"})
        }
        res.status(200).json({message:"buyers fetched successfully.",buyers})
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

buyerRouter.patch("/buyer/:id",userAuth, async (req, res) => {
  try {
    const updated = await Buyer.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Buyer not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

buyerRouter.delete("/buyer/:id",userAuth, async (req, res) => {
  try {
    const deleted = await Buyer.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: "Buyer not found" });
    }
    res.json({ message: "Buyer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = buyerRouter;
