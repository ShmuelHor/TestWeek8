import exp from 'constants';
import express, { Router } from 'express';
import { CreateUserHandler,LoginHandler } from '../controllers/userController';


const router: Router = express.Router();

router.route('/register').post(CreateUserHandler);
router.route('/login').post(LoginHandler);


export default router