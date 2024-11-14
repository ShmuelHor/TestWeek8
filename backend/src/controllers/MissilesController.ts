import { GetMissileData, InterceptionOptions,SubtractAmmunition } from "../services/MissilesService";
import e, { Request, Response ,NextFunction} from 'express';



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
export const SubtractAmmunitionHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const {missileName, location } = req.body;
        const { id } = req.params;
        const user = await SubtractAmmunition(id, missileName, location);
        res.status(200).json({ message: 'Ammunition subtracted',data: user, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}