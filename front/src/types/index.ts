// types/index.ts
export interface UsersState {
  user?: UserData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  options?: optionsData | null;
  UserMissiles?: UserMissilesData | null;
}

export interface UserData {
  message: string;
  data: {
    username: string;
    password: string;
    organization: string;
    location?: string;
    resources: { name: string; amount: number }[];
    budget: number;
  };
  token?: string;
  success: boolean;
}

export interface optionsData {
  message: string;
  data: {
    options: string[] | null;
  };
  success: boolean;
}

export interface UserMissilesData {
  message: string;
  data: {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
  };
  success: boolean;
}

export interface InputRegister {
  username: string;
  password: string;
  organization: string;
  location?: string;
}

