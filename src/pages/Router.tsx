import React from "react";

import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import PagesContainer from "./PagesContainer";
import SignIn from "./SignIn";
import Home from "./Home";
import SignUp from "./SignUp";
import Success from "./Success";
import RegistrationConfirmation from "./RegistrationConfirmation";
import Error404NotFound from "./Error404NotFound";

export enum RoutesList {
    Home = "/",
    SinglePost = "/blog/:id",
    Search = "/blog/search",
    SignIn = "/sign-in",
    SignUp = "/sign-up",
    Confirm = "/sign-up/confirm",
    Success = "/sign-up/success",
    AddPost = "/blog/add",
    Default = "*",
}
const Router = () => {
    const isLoggedIn = false;

    return (
        <BrowserRouter>
            <Routes>
                <Route path={RoutesList.Home} element={<PagesContainer />}>
                    <Route path={RoutesList.Home} element={<Home />} />
                    <Route
                        path={RoutesList.AddPost}
                        element={isLoggedIn ? <Home/> : <Navigate to={RoutesList.SignIn}/>} />
                    <Route path={RoutesList.SignIn} element={<SignIn />} />
                    <Route path={RoutesList.SignUp} element={<SignUp />} />
                    <Route path={RoutesList.Success} element={<Success />}/>
                    <Route path={RoutesList.Confirm} element={<RegistrationConfirmation/>} />
                    <Route path={RoutesList.Default} element={<Error404NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;