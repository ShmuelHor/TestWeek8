import exp from 'constants';
import express, { Router } from 'express';
import { CreateUserHandler,LoginHandler} from '../controllers/userController';
import { GetMissileDataHandler, InterceptionOptionsHandler,SubtractAmmunitionHandler } from '../controllers/MissilesController';

const router: Router = express.Router();

router.route('/register').post(CreateUserHandler);
router.route('/login').post(LoginHandler);
router.route('/Missiles/:id').get(GetMissileDataHandler);
router.route('/interception/:id').get(InterceptionOptionsHandler);
router.route('/SubtractAmmunition/:id').post(SubtractAmmunitionHandler);
export default router