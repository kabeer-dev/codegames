import { createSlice } from "@reduxjs/toolkit";

const Email = createSlice({
    name: "Email",
    initialState: {
        email: null,
        emailError: false
    },
    reducers: {
        addEmail: (state, action) => {
            state.email = action.payload
        },
        setEmailError: (state, action) => {
            state.emailError = action.payload
        }
    }
});

export const { addEmail, setEmailError } = Email.actions
export default Email.reducer

