import productModel from "../Models/productModel";
import formdata from "form-data"
import fs from "fs"
import { v2 as cloudinary } from 'cloudinary';

const createProduct= async (req:any,res:any):Promise<any> =>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUDNAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
        const image_url= await cloudinary.uploader.upload(req.file.path)
        const uploads= {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            image: image_url.secure_url
            }
        const data=await productModel.create(uploads);
       
        
        res.status(200).send(data);
    }catch(error){
        console.error("error occured while creating product",error);
        res.sendStatus(500);
    };
};

const getproducts=async(req:any,res:any):Promise<any>=>{
    try{
        const data = await productModel.find({});
        res.status(200).send(data);
    }catch(error){
        console.error("error occured while getting products",error);
        res.sendStatus(500);
    }
}

export {createProduct, getproducts} ;







