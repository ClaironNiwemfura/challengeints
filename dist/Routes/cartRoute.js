"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartController_1 = require("../Controllers/cartController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/add", cartController_1.addtoCart);
router.delete("/delete/:id", cartController_1.deleteCart);
router.get("/view", cartController_1.viewincart);
router.put("/update/:id", cartController_1.updateCart);
exports.default = router;
