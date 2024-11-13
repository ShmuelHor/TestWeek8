import e, { Request, Response ,NextFunction} from 'express';
import { CreateObjectUser, login,GetMissileData, InterceptionOptions } from '../services/userService';


export const CreateUserHandler = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, organization, location } = req.body;
        const newUser = await CreateObjectUser(username, password, organization, location);
        await newUser.save();
        res.status(201).json({ message: "User created successfully",data: newUser,success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}

export const LoginHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.body;
        

        const data = await login(username, password);
        const {token, user} = data;
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENVIORMENT === 'production',
            maxAge: 3600000, 
            sameSite: 'none',
          });
        res.status(200).json({ message: 'Login successful',data: user, token: token, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}

export const GetMissileDataHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const UserMissiles = await GetMissileData(id);
        res.status(200).json({ message: 'missiles found', data: UserMissiles, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}

export const InterceptionOptionsHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const options = await InterceptionOptions(id);
        res.status(200).json({ message: 'Interception options set',data: options, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}