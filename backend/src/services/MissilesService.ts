import User, { Missile, IResources } from "../models/UserModel";
import missilesData from "../data/missiles.json";
import MissileModel,{IMissile} from "../models/MissileModel";

export const GetMissileData = async (idUser: string) => {
  try {
    const user = await User.findById(idUser);
    if (!user) {
      throw new Error("User not found");
    }
    const UserMissiles: Missile[] = [];
    user.resources.forEach((resource: IResources) => {
      UserMissiles.push(missilesData.find((m) => m.name === resource.name)!);
    });
    return UserMissiles;
  } catch (err) {
    throw err;
  }
};

export const InterceptionOptions = async (idUser: string) => {
  try {
    const UserMissiles = await GetMissileData(idUser);
    const options: string[] = [];
    UserMissiles.forEach((m) => {
      m.intercepts.filter((i) => options.push(i));
    });
    if (options.length === 0) {
      throw new Error("Interception is only for the IDF");
    }
    const optionsFiltered = [...new Set(options)];
    return optionsFiltered;
  } catch (err) {
    throw err;
  }
};
export const SubtractAmmunition = async (
  idUser: string,
  missileName: string,
  location: string
) => {
   try {
       if(!idUser || !missileName || !location){
           throw new Error("IdUser or missileName or amount or location are required");
       }
       const missile = new MissileModel({idUser,missileName,location});
       await missile.save();

       const user = await User.findById(idUser);
       if (!user) {
         throw new Error("User not found");
       }
       const missileIndex = user.resources.findIndex((r) => r.name === missileName);
       if (missileIndex === -1) {
         throw new Error("Missile not found");
       }
       if(user.resources[missileIndex].amount === 0){
           throw new Error("No ammunition left");
       }
       user.resources[missileIndex].amount -= 1;
       await user.save();
       return user;
   } catch (err) {
    throw err;
  }
};