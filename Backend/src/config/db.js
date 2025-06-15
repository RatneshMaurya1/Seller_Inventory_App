const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:process.env.DB_NAME
        })
    } catch (error) {
        console.error("Failed to connect MongoDB",error)
        process.exit(1)
    }
}

module.exports = connectDB