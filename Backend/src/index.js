const express = require("express")
require("dotenv").config()
const connectDB = require("./config/db")
const PORT = process.env.PORT
const app = express()

app.get("/",(req,res) => {
    res.send("Ratnesh Maurya")
})


connectDB()
.then(() => {
    console.log("MongoDB connected successfully...")
    app.listen(PORT,() => {
    console.log(`server is running at port: ${PORT}`)
})
})
.catch((error) => {
    console.error("Failed to connect MongoDB",error)
})