const express = require("express");
const Product = require("../models/product.schema");
const userAuth = require("../middlewares/userAuth")

const productRouter = express.Router();

productRouter.get("/products",userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id
    const products = await Product.find({ userId })
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

productRouter.post("/products",userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id
    const { id, name, price, quantity, MRP, } = req.body;

    if (!id || !name || price == null || quantity == null || MRP == null || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await Product.findOne({ id });
    if (exists) {
      return res.status(409).json({ error: "Product with this ID already exists" });
    }

    const product = new Product({ id, name, price, quantity, MRP, userId });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


productRouter.patch("/products/:id",userAuth, async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


productRouter.delete("/products/:id",userAuth, async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = productRouter;
