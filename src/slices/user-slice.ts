import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { stat } from "fs";

export interface UserState {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  admin: boolean;
  lang1: string;
  lang2: string;
  lang3: string;
  lang4: string;
  signedIn: boolean;
  signInType: string;
  error: string;
  loginFor: string;
}

const initialState: UserState = {
  id: "",
  displayName: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  admin: false,
  lang1: "",
  lang2: "",
  lang3: "",
  lang4: "",
  signedIn: false,
  signInType: "",
  error: "",
  loginFor: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.admin = action.payload.admin;
      state.lang1 = action.payload.lang1;
      state.lang2 = action.payload.lang2;
      state.lang3 = action.payload.lang3;
      state.lang4 = action.payload.lang4;
      state.signedIn = action.payload.signedIn;
      state.signInType = action.payload.signInType;
      state.error = action.payload.error;
    },
    loginFor: (state, action: PayloadAction<string>) => {
      state.loginFor = action.payload;
    },
  },
});

export const { updateUser, loginFor } = userSlice.actions;
// export const selectSearch = (state: RootState) => state.posts;
export default userSlice.reducer;
