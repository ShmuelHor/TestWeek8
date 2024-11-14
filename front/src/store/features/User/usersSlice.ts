import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState, UserData } from "../../../types";

const initialState: UsersState = {
  user: null,
  status: "idle",
  error: null,
  options: null,
  UserMissiles: null,
};

export const fetchRegisterUserIDF = createAsyncThunk<
  UserData,
  {
    username: string;
    password: string;
    organization: string;
    location: string;
  },
  { rejectValue: string }
>("users/fetchRegisterIDF", async (newUser, thunkAPI) => {
  try {
    const { username, password, organization, location } = newUser;
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, organization, location }),
    });

    const data: UserData = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

export const fetchRegisterUser = createAsyncThunk<
  UserData,
  { username: string; password: string; organization: string },
  { rejectValue: string }
>("users/fetchRegister", async (newUser, thunkAPI) => {
  try {
    const { username, password, organization } = newUser;
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, organization }),
    });

    const data: UserData = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

export const fetchLoginUser = createAsyncThunk<
  UserData,
  { username: string; password: string },
  { rejectValue: string }
>("users/fetchLogin", async (newUser, thunkAPI) => {
  try {
    const { username, password } = newUser;
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data: UserData = await response.json();
    if (!response.ok || !data.token || !data.data) {
      throw new Error(data.message);
    }

    localStorage.setItem("Token", data.token.toString());
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

export const fetchMissiles = createAsyncThunk<
UserData,
  null,
  { rejectValue: string }
>("users/fetchMissiles", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("Token");
    if (!token) throw new Error("No token found");

    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.userId) throw new Error("User ID not found in token");

    const response = await fetch(
      `http://localhost:3000/api/Missiles/${payload.userId}`,
      { method: "GET" }
    );
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.statusText}`);

    const data: UserData = await response.json();
    if (!data || !data.data)
      throw new Error(data?.message || "Failed to fetch missiles data");

    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

export const fetchSubtractAmmunition = createAsyncThunk<
  UserData,
  { missileName: string; location: string },
  { rejectValue: string }
>("users/fetchSubtractAmmunition", async (ammunition, thunkAPI) => {
  try {
    const token = localStorage.getItem("Token");
    if (!token) throw new Error("No token found");

    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.userId) throw new Error("User ID not found in token");

    const response = await fetch(
      `http://localhost:3000/api/SubtractAmmunition/${payload.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          missileName: ammunition.missileName,
          location: ammunition.location,
        }),
      }
    );
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.statusText}`);

    const data: UserData = await response.json();
    if (!data || !data.data)
      throw new Error(data?.message || "Failed to fetch ammunition data");
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});
// לזכור מחר להכין את פונקציה בשרת שמבצ את הפעולה
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    LogOut: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.UserMissiles = null;
    },
    updateUsers: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUserIDF.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRegisterUserIDF.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchRegisterUserIDF.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      })
      .addCase(fetchMissiles.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMissiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchMissiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      })
      .addCase(fetchSubtractAmmunition.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSubtractAmmunition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchSubtractAmmunition.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      });
  },
});

export const selectUser = (state: { users: UsersState }) => state.users.user;

export const selectUserMissiles = (state: { users: UsersState }) =>
  state.users.UserMissiles;

export const { LogOut, updateUsers } = usersSlice.actions;

export default usersSlice.reducer;
