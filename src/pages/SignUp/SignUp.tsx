import React, {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import styles from "./SignUp.module.scss";
import {Theme, useThemeContext} from "src/context/Theme/Context";
import {RoutesList} from "../Router";
import Input from "src/components/Input";
import Button from "src/components/Button";
import {ButtonType} from "src/utils/@globalTypes";
import RegistrationContainer from "../RegistrationContainer";
import {signUpUser} from "src/redux/reducers/authSlice";

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [nameTouched, setNameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    const onChangeName = (value: string) => setName(value);
    const onChangeEmail = (value: string) => setEmail(value);
    const onChangePassword = (value: string) => setPassword(value);
    const onChangeConfirmPassword = (value: string) => setConfirmPassword(value);
    const onBlurEmail = () => setEmailTouched(true);
    const onBlurPassword = () => setPasswordTouched(true);
    const onBlurName = () => setNameTouched(true);
    const onSignUpClick = () => {
        dispatch(
            signUpUser({
                data: {username: name, email, password},
                callback: () => navigate(RoutesList.SignIn)
            })
        );
    };

    useEffect(() => {
        if (name.length === 0 && nameTouched) {
            setNameError("Name is required field");
        } else {
            setNameError("");
        }
    }, [name, nameTouched]);

    useEffect(() => {
        if (email.length === 0 && emailTouched) {
            setEmailError("Email is required field");
        } else {
            setEmailError("");
        }
    }, [email, emailTouched]);

    useEffect(() => {
        if (passwordTouched) {
            if (password !== confirmPassword) {
              setPasswordError("Passwords must match");
            } else if (password.length === 0 || confirmPassword.length === 0) {
              setPasswordError("Password is required field");
            } else {
              setPasswordError("");
            }
          }
        }, [confirmPassword, password, passwordTouched]);

    const isValid = useMemo(() => {
        return (
            nameError.length === 0 &&
            emailError.length === 0 &&
            passwordError.length === 0 &&
            nameTouched &&
            emailTouched &&
            passwordTouched
        );
    }, [
        nameError,
        emailError,
        passwordError,
        nameTouched,
        emailTouched,
        passwordTouched,
    ]);

    return (
        <RegistrationContainer title={"Sign Up"}>
                    <div className={styles.inputContainer}>
                        <Input title={"Name"} onBlur={onBlurName} placeholder={"Your name"} onChange={onChangeName} value={name} type={"text"} errorText={nameError}/>
                        <Input title={"Email"} onBlur={onBlurEmail} placeholder={"Your email"} onChange={onChangeEmail} value={email} type={"text"} errorText={emailError}/>
                        <Input title={"Password"} onBlur={onBlurPassword} placeholder={"Your password"} onChange={onChangePassword} value={password} type={"password"} errorText={passwordError}/>
                        <Input title={"Confirm password"} onBlur={onBlurPassword} placeholder={"Confirm password"} onChange={onChangeConfirmPassword} value={password} type={"password"} errorText={passwordError}/>
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