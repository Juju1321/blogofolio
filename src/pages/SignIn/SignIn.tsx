import React, {useState} from "react";
import classNames from "classnames";
import {NavLink} from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {Theme, useThemeContext} from "../../context/Theme/Context";
import {RoutesList} from "../Router";
import {ButtonType} from "../../utils/@globalTypes";
import RegistrationContainer from "../RegistrationContainer";
import styles from "./SignIn.module.scss"

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChangeEmail = (value: string) => setEmail(value);
    const onChangePassword = (value: string) => setPassword(value);

    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    return (
        <RegistrationContainer title={"Sign In"}>
                    <div className={styles.inputContainer}>
                        <Input title={"Email"} placeholder={"Your email"} onChange={onChangeEmail} value={email} type={"text"}/>
                        <Input title={"Password"} placeholder={"Your password"} onChange={onChangePassword} value={password} type={"password"}/>
                    </div>
                    <div className={classNames(styles.forgotPass, {
                        [styles.darkForgotPass]: isDark,
                    })}>
                        Forgot password?
                    </div>
                    <div>
                        <Button title={"Sign In"} onClick={()=> {}} type={ButtonType.Primary}/>
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