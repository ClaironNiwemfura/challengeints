import mongoose from "mongoose"

const createProduct =new mongoose.Schema({
    
    name:{
        type:String,
        required:"your name required"
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:"the price is required"
    },
    quantity:{
        type:Number
    },
    image:{
        
    }
    
});
export default mongoose.model("createProduct", createProduct);