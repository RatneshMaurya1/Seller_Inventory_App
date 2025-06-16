const express = require("express");
const Order = require("../models/order.schema");
const Product = require("../models/product.schema");
const userAuth = require("../middlewares/userAuth");

const orderRouter = express.Router();

orderRouter.get("/order", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const orders = await Order.find({ userId })
      .populate("buyerId")
      .populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

orderRouter.post("/order", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const { buyerId, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ error: "Order must include at least one item" });
    }

    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product not found: ${item.productId}` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          error: `Not enough stock for product: ${product.name}`,
        });
      }
    }

    for (let item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -item.quantity },
      });
    }

    const newOrder = new Order({
      buyerId: buyerId || null,
      items,
      userId
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = orderRouter;
