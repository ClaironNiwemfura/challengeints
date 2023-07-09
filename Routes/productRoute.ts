import  imageupload from "../middleware/fileUpload";
import { createProduct,getproducts } from "../Controllers/productController";
import express from "express";
const router = express.Router();
router.post("/create",imageupload.single("image"),createProduct);
router.get("/getproducts",getproducts);

export default router;