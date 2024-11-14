"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const MissilesController_1 = require("../controllers/MissilesController");
const router = express_1.default.Router();
router.route('/register').post(userController_1.CreateUserHandler);
router.route('/login').post(userController_1.LoginHandler);
router.route('/Missiles/:id').get(MissilesController_1.GetMissileDataHandler);
// router.route('/interception/:id').get(InterceptionOptionsHandler);
// router.route('/SubtractAmmunition/:id').post(SubtractAmmunitionHandler);
exports.default = router;
