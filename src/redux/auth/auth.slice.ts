import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { useAppSelector } from "../hooks/useAppSelector";
import { TToken, TUserId, TUserResponse } from "./auth.type";

type AuthState = {
  token: string;
  userId: number;
  user: TUserResponse | null;
};

const initialState: AuthState = {
  token: "",
  userId: 0,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign*/
    setAuthToken: (state: AuthState, action: PayloadAction<TToken>) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },

    setAuthUserId: (state: AuthState, action: PayloadAction<TUserId>) => {
      state.userId = action.payload.userId;
      localStorage.setItem("userId", action.payload.userId.toString());
    },
    setUser: (state: AuthState, action: PayloadAction<TUserResponse>) => {
      state.user = action.payload;
    },

    logout: (state: AuthState) => {
      state.token = "";
      state.userId = 0;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { setAuthToken, setAuthUserId, setUser, logout } =
  authSlice.actions;
export default authSlice.reducer;

export const useAuthTokenSelector = () =>
  useAppSelector((state: RootState) => state.auth.token);

export const useAuthUserIdSelector = () =>
  useAppSelector((state: RootState) => state.auth.userId);

export const useAuthUserSelector = () =>
  useAppSelector((state: RootState) => state.auth.user);
