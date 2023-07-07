import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoute from "../Routes/productRoute"
import cartRoute from "../Routes/cartRoute"

dotenv.config ();

const MongoDB_connection = process.env.MONGODB_PASSWORD||""
async function connectToMongoDB(connectionstring:string) {
    await mongoose.connect(connectionstring);
    console.log("connected to the database successfully ");
}
try{
    connectToMongoDB(MongoDB_connection)
}catch(e){
    console.log("error occured in connecting to the database");
}
const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(cookieParser());

const port = 5500;

app.use("/product",productRoute);
app.use("/cart",cartRoute);
app.listen(port,()=>{
    console.log("server is running on port"+port)
})