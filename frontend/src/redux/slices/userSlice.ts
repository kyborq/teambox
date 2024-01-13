import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../api/models";
import { RootState } from "../store";

interface UserState {
  current: User | null;
}

const initialState: UserState = {
  current: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.current = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.current;

export default userSlice.reducer;
