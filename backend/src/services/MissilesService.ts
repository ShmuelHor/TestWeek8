import User, { Missile, IResources } from "../models/UserModel";
import missilesData from "../data/missiles.json";
import ThreatsModel, { IThreats } from "../models/ThreatsModel";

export const GetMissileData = async (idUser: string) => {
  try {
    const user = await User.findById(idUser);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export const SubtractAmmunition = async (
  idUser: string,
  missileName: string,
  location: string,
  status: string
) => {
  try {
    if (!idUser || !missileName || !location || !status) {
      throw new Error(
        "IdUser or missileName or amount or location are required"
      );
    }
    if (status !== "Launched") {
      throw new Error("Status must be Launched");
    }
    const speed = missilesData.find((m) => m.name === missileName)?.speed;
    const missile = new ThreatsModel({
      idUser,
      missileName,
      location,
      status,
      speed,
    });
    await missile.save();

    const user = await User.findById(idUser);
    if (!user) {
      throw new Error("User not found");
    }
    const missileIndex = user.resources.findIndex(
      (r) => r.name === missileName
    );
    if (missileIndex === -1) {
      throw new Error("Missile not found");
    }
    if (user.resources[missileIndex].amount === 0) {
      throw new Error("No ammunition left");
    }
    user.resources[missileIndex].amount -= 1;
    await user.save();
    const threats = await ThreatsModel.find();
    return threats;
  } catch (err) {
    throw err;
  }
};

export const InterceptionTest = async(idThreat: any,status: string) => {
    const threat = await ThreatsModel.findById(idThreat);
    if (!threat) {
      throw new Error("Threat not found");
    }
    threat.status = status;
    threat.save();
    const threats = await ThreatsModel.find();
    return threats;
    

};
