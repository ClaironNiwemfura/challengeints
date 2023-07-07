import { createProduct,getproducts } from "../Controllers/productController";
import express from "express";
const router = express.Router();
router.post("/create",createProduct);
router.get("/getproducts",getproducts);

export default router;