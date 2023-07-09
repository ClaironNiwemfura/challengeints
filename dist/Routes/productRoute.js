"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileUpload_1 = __importDefault(require("../middleware/fileUpload"));
const productController_1 = require("../Controllers/productController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/create", fileUpload_1.default.single("image"), productController_1.createProduct);
router.get("/getproducts", productController_1.getproducts);
exports.default = router;
