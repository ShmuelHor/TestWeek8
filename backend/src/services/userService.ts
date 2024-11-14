import User, { IUser, IResources, Missile } from "../models/UserModel";
import { IfUserExists } from "../utils/utils";
import organizationsData from "../data/organizations.json";
import missilesData from "../data/missiles.json";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const Jwt_Secret = process.env.JWT_SECRET;

export async function CreateObjectUser(
  username: string,
  password: string,
  organization: string,
  location?: string
) {
  try {
    if (!username || !password || !organization) {
      throw new Error("Username or password or organization are required");
    }
    if (
      organization !== "IDF" &&
      organization !== "Hezbollah" &&
      organization !== "Hamas" &&
      organization !== "IRGC" &&
      organization !== "Houthis"
    ) {
      throw new Error("Organization not exist");
    }
    const userExists = await IfUserExists(username);
    if (userExists.userExists) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      username,
      password: hashedPassword,
      organization,
      resources: [],
      budget: 0,
    });
    if (location) {
      if (
        location !== "North" &&
        location !== "South" &&
        location !== "Center" &&
        location !== "West Bank"
      ) {
        throw new Error("Location not exist");
      }
      newUser.location = location;
    }
    const resourcesForUser = organizationsData.find(
      (obj) =>
        obj.name === (location ? `${organization} - ${location}` : organization)
    );
    if (!resourcesForUser) {
      throw new Error("Organization not found");
    }
    newUser.budget = resourcesForUser.budget;

    resourcesForUser.resources.forEach((resource) => {
      const missile = missilesData.find((m) => m.name === resource.name);
      if (!missile) {
        throw new Error("Missile not found");
      }
      newUser.resources.push({
        name: missile.name,
        amount: resource.amount,
      });
    });
    return newUser;
  } catch (err) {
    throw err;
  }
}

export const login = async (username: string, password: string) => {
  try {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    const userFind = await IfUserExists(username);
    if (!userFind.userExists) {
      throw new Error("One of the details is wrong");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      userFind.user!.password
    );
    if (!isPasswordValid) {
      throw new Error("One of the details is wrong");
    }
    const token = jwt.sign(
      { userId: userFind.user!._id },
      Jwt_Secret as string,
      { expiresIn: "1h" }
    );

    return { token: token, user: userFind.user };
  } catch (err) {
    throw err;
  }
};


