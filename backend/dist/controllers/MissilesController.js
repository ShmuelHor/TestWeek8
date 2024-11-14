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
exports.GetMissileDataHandler = void 0;
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
// export const InterceptionOptionsHandler = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const options = await InterceptionOptions(id);
//         res.status(200).json({ message: 'Interception options set',data: options, success: true });
//     } catch (error: any) {
//         res.status(400).json({ message: error.message, success: false });
//     }
// }
// export const SubtractAmmunitionHandler = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const {missileName, location } = req.body;
//         const { id } = req.params;
//         const user = await SubtractAmmunition(id, missileName, location);
//         res.status(200).json({ message: 'Ammunition subtracted',data: user, success: true });
//     } catch (error: any) {
//         res.status(400).json({ message: error.message, success: false });
//     }
// }
