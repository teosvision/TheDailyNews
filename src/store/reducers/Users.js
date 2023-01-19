import { createSlice } from "@reduxjs/toolkit";
import { userEmail } from "../utils/Thunks";
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    actions: {},
  },
  reducers: {
    clearUserById: (state) => {
      state.actions = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userEmail.fulfilled, (state, action) => {
      state.actions = action.payload;
    });
  },
});
export const { clearUserById } = usersSlice.actions;
export default usersSlice.reducer;
