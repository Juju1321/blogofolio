import React, {useEffect, useMemo, useState} from "react";
import classNames from "classnames";

import styles from "./SignUp.module.scss";
import {Theme, useThemeContext} from "../../context/Theme/Context";
import {NavLink, useNavigate} from "react-router-dom";
import {RoutesList} from "../Router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {ButtonType} from "../../utils/@globalTypes";
import RegistrationContainer from "../RegistrationContainer";
import {useDispatch} from "react-redux";
import {signUpUser} from "../../redux/reducers/authSlice";

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    const onChangeName = (value: string) => setName(value);
    const onChangeEmail = (value: string) => setEmail(value);
    const onChangePassword = (value: string) => setPassword(value);
    const onChangeConfirmPassword = (value: string) => setConfirmPassword(value);
    const onSignUpClick = () => {
        dispatch(
            signUpUser({
                data: {username: name, email, password},
                callback: () => navigate(RoutesList.SignIn)
            })
        );
    };

    useEffect(() => {
        if (name.length === 0) {
            setNameError("Name is required field");
        } else {
            setNameError("");
        }
    }, [name]);

    useEffect(() => {
        if (email.length === 0) {
            setEmailError("Email is required field");
        } else {
            setEmailError("");
        }
    }, [email]);

    useEffect(() => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords must match");
        } else if (password.length === 0 || confirmPassword.length === 0) {
            setPasswordError("Password is required field");
        } else {
            setPasswordError("");
        }
    }, [confirmPassword, password]);

    const isValid = useMemo(() => {
        return (
            nameError.length === 0 &&
            emailError.length === 0 &&
            passwordError.length === 0
        );
    }, [nameError, emailError, passwordError]);

    return (
        <RegistrationContainer title={"Sign Up"}>
                    <div className={styles.inputContainer}>
                        <Input title={"Name"} placeholder={"Your name"} onChange={onChangeName} value={name} type={"text"} errorText={nameError}/>
                        <Input title={"Email"} placeholder={"Your email"} onChange={onChangeEmail} value={email} type={"text"} errorText={emailError}/>
                        <Input title={"Password"} placeholder={"Your password"} onChange={onChangePassword} value={password} type={"password"} errorText={passwordError}/>
                        <Input title={"Confirm password"} placeholder={"Confirm password"} onChange={onChangeConfirmPassword} value={password} type={"password"} errorText={passwordError}/>
                    </div>
                    <div>
                        <Button title={"Sign Up"} onClick={onSignUpClick} type={ButtonType.Primary} disabled={!isValid}/>
                        <div className={classNames(styles.signUp, {
                            [styles.darkSignUp]: isDark,
                        })}>
                            Already have an account?
                            <NavLink to={RoutesList.SignIn} className={styles.navButton}>Sign In</NavLink>
                        </div>
                    </div>
        </RegistrationContainer>
    )
}

export default SignUp