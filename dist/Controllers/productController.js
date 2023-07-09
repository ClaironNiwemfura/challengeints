"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getproducts = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../Models/productModel"));
const cloudinary_1 = require("cloudinary");
const createProduct = async (req, res) => {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        const image_url = await cloudinary_1.v2.uploader.upload(req.file.path);
        const uploads = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            image: image_url.secure_url
        };
        const data = await productModel_1.default.create(uploads);
        res.status(200).send(data);
    }
    catch (error) {
        console.error("error occured while creating product", error);
        res.sendStatus(500);
    }
    ;
};
exports.createProduct = createProduct;
const getproducts = async (req, res) => {
    try {
        const data = await productModel_1.default.find({});
        res.status(200).send(data);
    }
    catch (error) {
        console.error("error occured while getting products", error);
        res.sendStatus(500);
    }
};
exports.getproducts = getproducts;
