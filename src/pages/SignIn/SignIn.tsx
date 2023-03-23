import React, {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {NavLink, useNavigate} from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {Theme, useThemeContext} from "src/context/Theme/Context";
import {RoutesList} from "../Router";
import {ButtonType} from "src/utils/@globalTypes";
import RegistrationContainer from "../RegistrationContainer";
import styles from "./SignIn.module.scss";
import {useDispatch} from "react-redux";
import {signInUser} from "src/redux/reducers/authSlice";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeEmail = (value: string) => setEmail(value);
    const onChangePassword = (value: string) => setPassword(value);

    useEffect(() => {
        if (email.length === 0) {
            setEmailError("Email is required field");
        } else {
            setEmailError("");
        }
    }, [email]);

    useEffect(() => {
        if (password.length === 0) {
            setPasswordError("Password is required field");
        } else {
            setPasswordError("");
        }
    }, [password]);

    const isValid = useMemo(() => {
        return (
            emailError.length === 0 &&
            passwordError.length === 0
        );
    }, [emailError, passwordError]);

    const onSignInClick = () => {
        dispatch(signInUser({data: {email, password}, callback: () => navigate(RoutesList.Home)}))
    }

    return (
        <RegistrationContainer title={"Sign In"}>
                    <div className={styles.inputContainer}>
                        <Input title={"Email"} placeholder={"Your email"} onChange={onChangeEmail} value={email} type={"text"} errorText={emailError}/>
                        <Input title={"Password"} placeholder={"Your password"} onChange={onChangePassword} value={password} type={"password"} errorText={passwordError}/>
                    </div>
                    <NavLink to={RoutesList.Reset} className={classNames(styles.forgotPass, {
                        [styles.darkForgotPass]: isDark,
                    })}>
                        Forgot password?
                    </NavLink>
                    <div>
                        <Button title={"Sign In"} onClick={onSignInClick} type={ButtonType.Primary} disabled={!isValid}/>
                        <div className={classNames(styles.signUp, {
                            [styles.darkSignUp]: isDark,
                        })}>
                            Don’t have an account?
                            <NavLink to={RoutesList.SignUp} className={styles.navButton}>Sign Up</NavLink>
                        </div>
                    </div>
        </RegistrationContainer>
    )
}

export default SignIn