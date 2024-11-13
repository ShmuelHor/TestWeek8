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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateObjectUser = CreateObjectUser;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const utils_1 = require("../utils/utils");
const organizations_json_1 = __importDefault(require("../data/organizations.json"));
const missiles_json_1 = __importDefault(require("../data/missiles.json"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
function CreateObjectUser(username, password, organization, location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!username || !password || !organization) {
                throw new Error("Username or password or organization are required");
            }
            if (organization !== "IDF" &&
                organization !== "Hezbollah" &&
                organization !== "Hamas" &&
                organization !== "IRGC" &&
                organization !== "Houthis") {
                throw new Error("Organization not exist");
            }
            const { userExists } = yield (0, utils_1.IfUserExists)(username);
            if (userExists) {
                throw new Error("User already exists");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new UserModel_1.default({
                id: (0, uuid_1.v4)(),
                username,
                password: hashedPassword,
                organization,
                resources: [],
                budget: 0,
            });
            if (location) {
                if (location !== "North" &&
                    location !== "South" &&
                    location !== "Center" &&
                    location !== "West Bank") {
                    throw new Error("Location not exist");
                }
                newUser.location = location;
            }
            const resourcesForUser = organizations_json_1.default.find((obj) => obj.name === (location ? `${organization} - ${location}` : organization));
            if (!resourcesForUser) {
                throw new Error("Organization not found");
            }
            newUser.budget = resourcesForUser.budget;
            resourcesForUser.resources.forEach((resource) => {
                const missile = missiles_json_1.default.find((m) => m.name === resource.name);
                if (!missile) {
                    throw new Error("Missile not found");
                }
                newUser.resources.push({
                    name: missile.name,
                    amount: resource.amount,
                });
            });
            return newUser;
        }
        catch (err) {
            throw err;
        }
    });
}
