import React, {useState} from "react";
import classNames from "classnames";

import styles from "./SignUp.module.scss";
import {Theme, useThemeContext} from "../../context/Theme/Context";
import {NavLink} from "react-router-dom";
import {RoutesList} from "../Router";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {ButtonType} from "../../utils/@globalTypes";

const SignUp = () => {
      const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChangeName = (value: string) => setName(value);
    const onChangeEmail = (value: string) => setEmail(value);
    const onChangePassword = (value: string) => setPassword(value);

    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    return (
        <div>
            <div className={styles.titleContainer}>
                <NavLink to={RoutesList.Home} className={classNames(styles.breadCrumbs, {
                    [styles.darkBreadCrumbs]: isDark,
                })}>
                    Back to home
                </NavLink>
                <Title title={"Sign In"}/>
            </div>
            <div className={styles.infoContainer}>
                <div className={classNames(styles.mainBlockContainer , {
                    [styles.darkMainBlockContainer]: isDark,
                })}>
                    <div className={styles.inputContainer}>
                        <Input title={"Name"} placeholder={"Your name"} onChange={onChangeName} value={name} type={"text"} />
                        <Input title={"Email"} placeholder={"Your email"} onChange={onChangeEmail} value={email} type={"text"}/>
                        <Input title={"Password"} placeholder={"Your password"} onChange={onChangePassword} value={password} type={"password"}/>
                        <Input title={"Confirm password"} placeholder={"Confirm password"} onChange={onChangePassword} value={password} type={"password"} />
                    </div>
                    <div>
                        <Button title={"Sign Up"} onClick={()=> {}} type={ButtonType.Primary}/>
                        <div className={classNames(styles.signUp, {
                            [styles.darkSignUp]: isDark,
                        })}>
                            Already have an account?
                            <NavLink to={RoutesList.SignIn} className={styles.navButton}>Sign In</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp