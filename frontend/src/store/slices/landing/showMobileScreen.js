import { createSlice } from "@reduxjs/toolkit";

const mobileScreen = createSlice({
  name: "settings",
  initialState: {
    status: false,
  },
  reducers: {
    changeMobile: (state, action) => {
      state.status = action.payload;
    },
  },
});
export const { changeMobile } = mobileScreen.actions;
export default mobileScreen.reducer;
