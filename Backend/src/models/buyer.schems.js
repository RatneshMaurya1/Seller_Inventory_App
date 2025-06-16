const mongoose = require("mongoose")

const buyerSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})

const Buyer = mongoose.model("Buyer",buyerSchema)

module.exports = Buyer