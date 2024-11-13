import User, { IUser } from "../models/UserModel";


export async function IfUserExists(
  username: string
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

