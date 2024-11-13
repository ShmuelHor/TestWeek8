"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const http_1 = __importDefault(require("http"));
const userService_1 = require("./services/userService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, userService_1.CreateUser)("aa", "12345", "IDF", "North");
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
