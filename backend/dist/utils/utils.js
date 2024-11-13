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
exports.IfUserExists = IfUserExists;
exports.CreateObjectUser = CreateObjectUser;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const uuid_1 = require("uuid");
const organizations_json_1 = __importDefault(require("../data/organizations.json"));
const missiles_json_1 = __importDefault(require("../data/missiles.json"));
function IfUserExists(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserModel_1.default.find();
        const userFind = users.find((u) => u.username === username);
        if (userFind) {
            return { userExists: true, user: userFind };
        }
        else {
            return { userExists: false, user: null };
        }
    });
}
function CreateObjectUser(username, password, organization, location) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = new UserModel_1.default({
            id: (0, uuid_1.v4)(),
            username,
            password,
            organization,
            resources: [],
            budget: 0,
        });
        if (location) {
            newUser.location = location;
        }
        const resourcesForUser = organizations_json_1.default.find((obj) => obj.name === (location ? `${organization} - ${location}` : organization));
        if (!resourcesForUser) {
            throw new Error("Organization not found");
        }
        newUser.budget = resourcesForUser.budget;
        resourcesForUser.resources.forEach((resource) => {
            const missile = missiles_json_1.default.find(m => m.name === resource.name);
            if (!missile) {
                throw new Error("Missile not found");
            }
            newUser.resources.push({
                missile: {
                    name: missile.name,
                    description: missile.description,
                    speed: missile.speed,
                    intercepts: missile.intercepts,
                    price: missile.price,
                },
                amount: resource.amount,
            });
        });
        //   console.log(resourcesForUser);
        console.log(newUser.resources[1].missile.intercepts);
    });
}
