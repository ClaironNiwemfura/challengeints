import product from "../Models/productModel";
import cart from "../Models/cartModel";

const addtoCart=async (req:any,res:any):Promise<any> =>{
    try{
        const data= req.body;
        const found =await product.findOne({name:data.name})
        if(!found){
            res.status(400).json({
                message:"This product is not available"
            }) 
        }else{
            const name =found.name;
            const price=found.price;
            res.status(200).json({
              message:"add to cart successfully"
            })
            const selected=new cart({
                name:found.name,
                price:price
            })
            selected.save()
        }
    }catch(error){
        console.error("error occured while creating product",error);
        res.sendStatus(500);
    };
};
const deleteCart=async (req:any,res:any):Promise<any> =>{
    try{
        const data= req.body;
        const found =await cart.findOne({name:data.name})
        if(!found){
            res.status(400).json({
                message:"This product is not available"
            }) 
        }else{
            const id =found._id;
            await cart.deleteOne({_id:id})
            res.status(200).json({
                 message:"deleted from cart successfully"
            })
        }
    }catch(error){
        console.error("error occured while deleting",error);
        res.sendStatus(500);
    };
};
const viewincart=async (req:any,res:any):Promise<any> =>{
    try{
        const data=await cart.find({});
        res.status(200).send(data)
    }catch(error){
        console.error("error occured while viewing in cart");
        res.sendStatus(500);
    }
}
const updateCart=async (req:any,res:any):Promise<any> =>{
    try{
        const data= req.body;
        const found =await cart.findOne({name:data.name})
        if(!found){
            res.status(400).json({
                message:"This product is not available"
            }) 
        }else{
            const name =found.name;
            let price:any =found.price;
            if (data.quantity&&!isNaN(data.quantity)){
                price *= data.quantity
            }
            console.log(price);
            const selected=new cart({
                name:name,
                price:price
            })
            selected.save()
            res.status(200).json({
                message:"add to cart successfully",selected
                
            });
        }
    }catch(error){
        console.error("error occured while creating product",error);
        res.sendStatus(500);
    };
};
export{addtoCart,deleteCart,viewincart,updateCart}