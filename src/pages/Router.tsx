import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

import PagesContainer from "./PagesContainer";
import SignIn from "./SignIn";
import Home from "./Home";
import SignUp from "./SignUp";
import Success from "./Success";
import RegistrationConfirmation from "./RegistrationConfirmation";
import Error404NotFound from "./Error404NotFound";
import SelectedPost from "./SelectedPost";
import ResetPassword from "./ResetPassword";
import NewPassword from "./NewPassword";
import {AuthSelectors} from "src/redux/reducers/authSlice";


export enum RoutesList {
    Home = "/",
    SinglePost = "/blog/:id",
    Search = "/blog/search",
    SignIn = "/sign-in",
    SignUp = "/sign-up",
    Confirm = "/activate/:uid/:token",
    Success = "/sign-up/success",
    AddPost = "/blog/add",
    Reset = "/sign-in/reset",
    NewPassword = "/sign-in/reset/new-password",
    Default = "*",
}
const Router = () => {
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={RoutesList.Home} element={<PagesContainer />}>
                    <Route path={RoutesList.Home} element={<Home />} />
                    <Route
                        path={RoutesList.AddPost}
                        element={isLoggedIn ? <Home/> : <Navigate to={RoutesList.SignIn}/>} />
                    <Route path={RoutesList.SinglePost} element={<SelectedPost />} />
                    <Route path={RoutesList.SignIn} element={<SignIn />} />
                    <Route path={RoutesList.SignUp} element={<SignUp />} />
                    <Route path={RoutesList.Success} element={<Success />}/>
                    <Route path={RoutesList.Confirm} element={<RegistrationConfirmation />} />
                    <Route path={RoutesList.Reset} element={<ResetPassword />} />
                    <Route path={RoutesList.NewPassword} element={<NewPassword />} />
                    <Route path={RoutesList.Default} element={<Error404NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;