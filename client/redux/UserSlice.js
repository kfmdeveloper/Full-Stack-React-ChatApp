import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    authOtherUsers: null,
    selectedUser: null,
  },
  reducers: {
    SetAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    SetAuthOtherUsers: (state, action) => {
      state.authOtherUsers = action.payload;
    },
    SetSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const { SetAuthUser, SetAuthOtherUsers, SetSelectedUser } =
  UserSlice.actions;
export default UserSlice.reducer;
