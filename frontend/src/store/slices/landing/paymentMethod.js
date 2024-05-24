import { createSlice } from "@reduxjs/toolkit";

const paymentMethod = createSlice({
  name: "payment",
  initialState: {
    activePayment: "wooppay",
    payFooter: false,
  },
  reducers: {
    paymentComponent: (state, action) => {
      state.activePayment = action.payload;
    },
    paymentFooter: (state, action) => {
      state.payFooter = action.payload;
    },
  },
});
export const { paymentComponent, paymentFooter } = paymentMethod.actions;
export default paymentMethod.reducer;
