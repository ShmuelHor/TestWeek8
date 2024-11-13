import exp from 'constants';
import express, { Router } from 'express';
import { CreateUserHandler,LoginHandler,GetMissileDataHandler ,InterceptionOptionsHandler} from '../controllers/userController';


const router: Router = express.Router();

router.route('/register').post(CreateUserHandler);
router.route('/login').post(LoginHandler);
router.route('/user/:id').get(GetMissileDataHandler);
router.route('/interception/:id').get(InterceptionOptionsHandler);
export default router