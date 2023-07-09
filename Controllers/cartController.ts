import product from "../Models/productModel";
import cart from "../Models/cartModel";

const addtoCart=async (req:any,res:any):Promise<any> =>{
    try{
        const data= req.body;
        console.log("data",data,req.headers);
        const found =await product.findOne({name:data.name})
        if(!found){
            res.status(400).json({
                message:"This product is not available"
            }) 
        }else{
            const {name,price,quantity}= found
            res.status(200).json({
              message:"add to cart successfully"
            })
            const selected=new cart({
                name:found.name,
                price:price,
                quantity:quantity
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
       const productId = req.params.productId;
        const found = await cart.findOne({ productId: productId });
        if(!found){
            res.status(400).json({
                message:"This product is not available"
            }) 
        }else{
            const productId =found._id;
            await cart.deleteOne({_id:productId})
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
const updateCart = async (req: any, res: any): Promise<any> => {
    try {
      const data = req.body;
      const productId = req.params.productId;
      const found = await cart.findOne({ productId: productId });
      if (!found) {
        return res.status(400).json({
          message: "This product is not available",
        });
      } else {
        const name = found.name;
        let price: any = found.price;
        if (data.quantity && !isNaN(data.quantity)) {
          price = price * data.quantity;
        }
        console.log(price);
        const updated = await cart.findOneAndUpdate(
            { productId: productId },
            { ...found.toObject(), price: price },
            { new: true }
        );
        return res.status(200).json({
          message: "updated to cart successfully",updated
        
        });
        
      }
    } catch (error) {
      console.error("An error occurred while updating the cart", error);
      return res.sendStatus(500);
    }
  };
export{addtoCart,deleteCart,viewincart,updateCart}