import {addtoCart,deleteCart,viewincart,updateCart} from "../Controllers/cartController";
import express from "express";
const router=express.Router()
router.post("/add",addtoCart);
router.delete("/delete/:id",deleteCart);
router.get("/view",viewincart);
router.put("/update/:id",updateCart);

export default router