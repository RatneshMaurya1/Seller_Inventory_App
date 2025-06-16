const express = require("express");
const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")
const userRouter = express.Router();
const userAuth = require("../middlewares/userAuth")

userRouter.post("/signup", async (req, res) => {
  try {
    const { name,email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({
        message: "Email already taken",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        status: "400",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        status: "400",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user.save();
    return res.status(201).json({ message: "Sign up successfully", user:{name:user.name,email:user.email} });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during signup",
      status: "500",
      error: error.message,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password." });
    }
    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({ message: "Invalid email or password." });
    }
    const token = JWT.sign({ email }, process.env.JWT_SECRET);
    return res.json({ message: "Logged in successfully", user:{name:user.name,email:user.email}, token });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during signin",
      status: "500",
      error: error.message,
    });
  }
});

userRouter.get("/validate",userAuth,(req,res) => {
    try {
        const user = req.user
        return res.status(200).json({message:"user validated successfully",user:{name:user.name,email:user.email}})
    } catch (error) {
        res.status(401).json({ error: "Invalid token" })
    }
})

module.exports = userRouter;
