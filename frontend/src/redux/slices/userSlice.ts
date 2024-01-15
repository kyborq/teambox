import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, Workspace } from "@/api/models";
import { RootState } from "@/redux/store";

interface UserState {
  current: User | null;
  workspace: Workspace | null;
}

const initialState: UserState = {
  current: null,
  workspace: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.current = action.payload;
    },
    setWorkspace: (state, action: PayloadAction<Workspace | null>) => {
      state.workspace = action.payload;
    },
  },
});

export const { setUser, setWorkspace } = userSlice.actions;

export const selectUser = (state: RootState) => state.current;
export const selectWorkspace = (state: RootState) => state.workspace;

export default userSlice.reducer;
