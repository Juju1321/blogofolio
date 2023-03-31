import React from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import PagesContainer from "./PagesContainer";
import SignIn from "./SignIn";
import Home from "./Home";
import SignUp from "./SignUp";
import Success from "./Success";
import RegistrationConfirmation from "./RegistrationConfirmation";

export enum RoutesList {
    Home = "/",
    SinglePost = "/blog/:id",
    Search = "/blog/search",
    SignIn = "/sign-in",
    SignUp = "/sign-up",
    Confirm = "/sign-up/confirm",
    Success = "/sign-up/success",
    AddPost = "/blog/add"
}
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RoutesList.Home} element={<PagesContainer />}>
                    <Route path={RoutesList.Home} element={<Home />} />
                    <Route path={RoutesList.SignIn} element={<SignIn />} />
                    <Route path={RoutesList.SignUp} element={<SignUp />} />
                    <Route path={RoutesList.Success} element={<Success />}/>
                    <Route path={RoutesList.Confirm} element={<RegistrationConfirmation/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;