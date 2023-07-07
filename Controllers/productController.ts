import productModel from "../Models/productModel";

const createProduct= async (req:any,res:any):Promise<any> =>{
    try{
        const data=await productModel.create(req.body);
        console.log(req.body.name);
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







