"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHandler = exports.CreateUserHandler = void 0;
const userService_1 = require("../services/userService");
const CreateUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, organization, location } = req.body;
        const newUser = yield (0, userService_1.CreateObjectUser)(username, password, organization, location);
        yield newUser.save();
        res.status(201).json({ message: "User created successfully", data: newUser, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
exports.CreateUserHandler = CreateUserHandler;
const LoginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const data = yield (0, userService_1.login)(username, password);
        const { token, user } = data;
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIORMENT === 'production',
            maxAge: 3600000,
            sameSite: 'none',
        });
        res.status(200).json({ message: 'Login successful', data: user, token: token, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
exports.LoginHandler = LoginHandler;
