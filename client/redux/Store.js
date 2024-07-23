import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MessageSlice from "./MessageSlice";

const Store = configureStore({
  reducer: {
    user: UserSlice,
    message: MessageSlice,
  },
});
export default Store;
