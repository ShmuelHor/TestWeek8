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
exports.SubtractAmmunitionHandler = exports.InterceptionOptionsHandler = exports.GetMissileDataHandler = void 0;
const MissilesService_1 = require("../services/MissilesService");
const GetMissileDataHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const UserMissiles = yield (0, MissilesService_1.GetMissileData)(id);
        res.status(200).json({ message: 'missiles found', data: UserMissiles, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
exports.GetMissileDataHandler = GetMissileDataHandler;
const InterceptionOptionsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const options = yield (0, MissilesService_1.InterceptionOptions)(id);
        res.status(200).json({ message: 'Interception options set', data: options, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
exports.InterceptionOptionsHandler = InterceptionOptionsHandler;
const SubtractAmmunitionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { missileName, location } = req.body;
        const { id } = req.params;
        const user = yield (0, MissilesService_1.SubtractAmmunition)(id, missileName, location);
        res.status(200).json({ message: 'Ammunition subtracted', data: user, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
exports.SubtractAmmunitionHandler = SubtractAmmunitionHandler;
