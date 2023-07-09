"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCart = exports.viewincart = exports.deleteCart = exports.addtoCart = void 0;
const productModel_1 = __importDefault(require("../Models/productModel"));
const cartModel_1 = __importDefault(require("../Models/cartModel"));
const addtoCart = async (req, res) => {
    try {
        const data = req.body;
        console.log("data", data, req.headers);
        const found = await productModel_1.default.findOne({ name: data.name });
        if (!found) {
            res.status(400).json({
                message: "This product is not available"
            });
        }
        else {
            const { name, price, quantity } = found;
            res.status(200).json({
                message: "add to cart successfully"
            });
            const selected = new cartModel_1.default({
                name: found.name,
                price: price,
                quantity: quantity
            });
            selected.save();
        }
    }
    catch (error) {
        console.error("error occured while creating product", error);
        res.sendStatus(500);
    }
    ;
};
exports.addtoCart = addtoCart;
const deleteCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const found = await cartModel_1.default.findOne({ productId: productId });
        if (!found) {
            res.status(400).json({
                message: "This product is not available"
            });
        }
        else {
            const productId = found._id;
            await cartModel_1.default.deleteOne({ _id: productId });
            res.status(200).json({
                message: "deleted from cart successfully"
            });
        }
    }
    catch (error) {
        console.error("error occured while deleting", error);
        res.sendStatus(500);
    }
    ;
};
exports.deleteCart = deleteCart;
const viewincart = async (req, res) => {
    try {
        const data = await cartModel_1.default.find({});
        res.status(200).send(data);
    }
    catch (error) {
        console.error("error occured while viewing in cart");
        res.sendStatus(500);
    }
};
exports.viewincart = viewincart;
const updateCart = async (req, res) => {
    try {
        const data = req.body;
        const productId = req.params.productId;
        const found = await cartModel_1.default.findOne({ productId: productId });
        if (!found) {
            return res.status(400).json({
                message: "This product is not available",
            });
        }
        else {
            const name = found.name;
            let price = found.price;
            if (data.quantity && !isNaN(data.quantity)) {
                price = price * data.quantity;
            }
            console.log(price);
            const updated = await cartModel_1.default.findOneAndUpdate({ productId: productId }, { ...found.toObject(), price: price }, { new: true });
            return res.status(200).json({
                message: "updated to cart successfully", updated
            });
        }
    }
    catch (error) {
        console.error("An error occurred while updating the cart", error);
        return res.sendStatus(500);
    }
};
exports.updateCart = updateCart;
