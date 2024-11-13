import User, { IUser, IResources, IMissile } from "../models/UserModel";
import { IfUserExists,CreateObjectUser } from "../utils/utils";


export const CreateUser = async (
  username: string,
  password: string,
  organization: string,
  location?: string
) => {
  try {
    if (!username || !password || !organization) {
      throw new Error("Username or password or organization are required");
    }
    const userExists = await IfUserExists(username);
    if (userExists.userExists) {
      throw new Error("User already exists");
    }
    

    const newUser = await CreateObjectUser(username, password, organization, location);
    // const userCreated = await newUser.save();
    // return userCreated;

  } catch (err) {
    throw err;
  }
};
