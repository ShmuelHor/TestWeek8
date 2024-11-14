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
exports.SubtractAmmunition = exports.GetMissileData = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const missiles_json_1 = __importDefault(require("../data/missiles.json"));
const ThreatsModel_1 = __importDefault(require("../models/ThreatsModel"));
const GetMissileData = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findById(idUser);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.GetMissileData = GetMissileData;
// export const InterceptionOptions = async (idUser: string) => {
//   try {
//     const user = await GetMissileData(idUser);
//     const options: string[] = [];
//     user.resources.forEach((m) => {
//       m.intercepts.filter((i) => options.push(i));
//     });
//     if (options.length === 0) {
//       throw new Error("Interception is only for the IDF");
//     }
//     const optionsFiltered = [...new Set(options)];
//     return optionsFiltered;
//   } catch (err) {
//     throw err;
//   }
// };
const SubtractAmmunition = (idUser, missileName, location, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!idUser || !missileName || !location || !status) {
            throw new Error("IdUser or missileName or amount or location are required");
        }
        if (status !== "Launched") {
            throw new Error("Status must be Launched");
        }
        const speed = (_a = missiles_json_1.default.find((m) => m.name === missileName)) === null || _a === void 0 ? void 0 : _a.speed;
        const missile = new ThreatsModel_1.default({
            idUser,
            missileName,
            location,
            status,
            speed,
        });
        yield missile.save();
        const user = yield UserModel_1.default.findById(idUser);
        if (!user) {
            throw new Error("User not found");
        }
        const missileIndex = user.resources.findIndex((r) => r.name === missileName);
        if (missileIndex === -1) {
            throw new Error("Missile not found");
        }
        if (user.resources[missileIndex].amount === 0) {
            throw new Error("No ammunition left");
        }
        user.resources[missileIndex].amount -= 1;
        yield user.save();
        const threats = yield ThreatsModel_1.default.find();
        return threats;
    }
    catch (err) {
        throw err;
    }
});
exports.SubtractAmmunition = SubtractAmmunition;
