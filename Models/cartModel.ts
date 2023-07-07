import mongoose from "mongoose";
const cartSchema =new mongoose.Schema({
    name:{
      type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    }
})

export default mongoose.model("cart",cartSchema)