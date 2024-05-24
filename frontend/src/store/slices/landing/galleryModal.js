import { createSlice } from "@reduxjs/toolkit";

const changeGallery = createSlice({
  name: "gallery",
  initialState: {
    modalStatus: "block",
  },
  reducers: {
    modalGallery: (state, action) => {
      state.modalStatus = action.payload;
    },
  },
});
export const { modalGallery } = changeGallery.actions;
export default changeGallery.reducer;
