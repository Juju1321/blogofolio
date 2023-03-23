import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "../store";
import {ActivateUserPayload, SignInUserPayload, SignUpUserPayload} from "./@types";
import {ACCESS_TOKEN_KEY} from "src/utils/constants";

const initialState = {
    isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
}

const authSlice = createSlice( {
    name: "auth",
    initialState,
    reducers: {
        signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
        activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
        signInUser: (_, __:PayloadAction<SignInUserPayload>) => {},
        setLoggedIn: (state, action:PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        logoutUser: (_, __: PayloadAction<undefined>) => {},
    },
});

export const { signUpUser, activateUser, signInUser, setLoggedIn, logoutUser } = authSlice.actions;
export default authSlice.reducer;

export const AuthSelectors = {
    getLoggedIn: (state: RootState) => state.auth.isLoggedIn
}