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
exports.CreateUser = void 0;
const utils_1 = require("../utils/utils");
const CreateUser = (username, password, organization, location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!username || !password || !organization) {
            throw new Error("Username or password or organization are required");
        }
        const userExists = yield (0, utils_1.IfUserExists)(username);
        if (userExists.userExists) {
            throw new Error("User already exists");
        }
        const newUser = yield (0, utils_1.CreateObjectUser)(username, password, organization, location);
        // const userCreated = await newUser.save();
        // return userCreated;
    }
    catch (err) {
        throw err;
    }
});
exports.CreateUser = CreateUser;
