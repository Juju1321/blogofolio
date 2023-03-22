import React, {useState} from "react";
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

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    const onChangeName = (value: string) => setName(value);
    const onChangeEmail = (value: string) => setEmail(value);
    const onChangePassword = (value: string) => setPassword(value);
    const onSignUpClick = () => {
        dispatch(
            signUpUser({
                data: {username: name, email, password},
                callback: () => navigate(RoutesList.SignIn)
            })
        );
    };

    return (
        <RegistrationContainer title={"Sign Up"}>
                    <div className={styles.inputContainer}>
                        <Input title={"Name"} placeholder={"Your name"} onChange={onChangeName} value={name} type={"text"} />
                        <Input title={"Email"} placeholder={"Your email"} onChange={onChangeEmail} value={email} type={"text"}/>
                        <Input title={"Password"} placeholder={"Your password"} onChange={onChangePassword} value={password} type={"password"}/>
                        <Input title={"Confirm password"} placeholder={"Confirm password"} onChange={onChangePassword} value={password} type={"password"} />
                    </div>
                    <div>
                        <Button title={"Sign Up"} onClick={onSignUpClick} type={ButtonType.Primary}/>
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