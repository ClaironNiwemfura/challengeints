"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const productRoute_1 = __importDefault(require("../Routes/productRoute"));
const cartRoute_1 = __importDefault(require("../Routes/cartRoute"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "")));
const MongoDB_connection = process.env.MONGODB_PASSWORD || "";
async function connectToMongoDB(connectionstring) {
    await mongoose_1.default.connect(connectionstring);
    console.log("connected to the database successfully ");
}
try {
    connectToMongoDB(MongoDB_connection);
}
catch (e) {
    console.log("error occured in connecting to the database");
}
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single('image');
const port = 5500;
app.use("/products", productRoute_1.default);
app.use("/cart", cartRoute_1.default);
app.listen(port, () => {
    console.log("server is running on port" + port);
});
