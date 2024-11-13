import exp from "constants";
import User, { IUser } from "../models/UserModel";
import { v4 as uuidv4 } from "uuid";
import organizationsData from "../data/organizations.json";
import missilesData from "../data/missiles.json";
import bcrypt from "bcrypt";

export async function IfUserExists(
  username: any
): Promise<{ userExists: boolean; user: IUser | null }> {
  const users: IUser[] = await User.find();
  const userFind: IUser | undefined = users.find(
    (u) => u.username === username
  );
  if (userFind) {
    return { userExists: true, user: userFind };
  } else {
    return { userExists: false, user: null };
  }
}

export async function CreateObjectUser(
  username: string,
  password: string,
  organization: string,
  location?: string
) {
  try{if (!username || !password || !organization) {
    throw new Error("Username or password or organization are required");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: IUser = new User({
    id: uuidv4(),
    username: hashedPassword,
    password,
    organization,
    resources: [],
    budget: 0,
  });
  if (location) {
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
      missile: {
        name: missile.name,
        description: missile.description,
        speed: missile.speed,
        intercepts: missile.intercepts,
        price: missile.price,
      },
      amount: resource.amount,
    });
  });
  return newUser;}
  catch(err){
    throw err;
  }
}
