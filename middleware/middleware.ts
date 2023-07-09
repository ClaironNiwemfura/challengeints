import express from 'express';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import ProductModel  from "../Models/productModel";

const router = express.Router();

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// Route to handle product image upload
router.post('/product', upload, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // Create a new instance of the product model
    const product = new ProductModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      image: {
        data: file.buffer, // Store the image data in the 'data' field
        contentType: file.mimetype, // Store the image content type
      },
    });

    // Save the product to the database
    await product.save();

    res.status(200).json({ message: 'Product image uploaded successfully' });
  } catch (error) {
    console.error('An error occurred while saving the product', error);
    res.sendStatus(500);
  }
});

export default router;