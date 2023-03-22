import React, {useState} from "react";
import RegistrationContainer from "../RegistrationContainer";
import {Theme, useThemeContext} from "../../context/Theme/Context";
import classNames from "classnames";
import styles from "./ResetPassword.module.scss";
import Button from "../../components/Button";
import {ButtonType} from "../../utils/@globalTypes";
import Input from "../../components/Input";

const ResetPassword = () => {
    const { theme } = useThemeContext()
    const isDark = theme === Theme.Dark;

    const [email, setEmail] = useState("");
    const onChangeEmail = (value: string) => setEmail(value);

    return (
        <RegistrationContainer  title={"Reset password"}>
            <Input title={"Email"} placeholder={"Your email"} onChange={onChangeEmail} value={email} type={"text"} />
            <Button title={"Reset"} onClick={()=> {}} type={ButtonType.Primary} className={styles.resetButton}/>
        </RegistrationContainer>
    )
}

export default ResetPassword