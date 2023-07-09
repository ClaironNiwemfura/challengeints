"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createProduct = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: "your name required"
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: "the price is required"
    },
    quantity: {
        type: Number
    },
    image: {
        type: String,
        // required:"the image is required"
    }
});
exports.default = mongoose_1.default.model("createProduct", createProduct);
