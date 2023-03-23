import React, {useEffect, useMemo, useState} from "react";

import RegistrationContainer from "../RegistrationContainer";
import styles from "./ResetPassword.module.scss";
import Button from "../../components/Button";
import {ButtonType} from "../../utils/@globalTypes";
import Input from "../../components/Input";

const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const onChangeEmail = (value: string) => setEmail(value);

    useEffect(() => {
        if (email.length === 0) {
            setEmailError("Email is required field");
        } else {
            setEmailError("");
        }
    }, [email]);

    const isValid = useMemo(() => {
        return (
            emailError.length === 0
        );
    }, [emailError]);

    return (
        <RegistrationContainer  title={"Reset password"}>
            <Input title={"Email"} placeholder={"Your email"} onChange={onChangeEmail} value={email} type={"text"} errorText={emailError}/>
            <Button title={"Reset"} onClick={()=> {}} type={ButtonType.Primary} className={styles.resetButton} disabled={!isValid}/>
        </RegistrationContainer>
    )
}

export default ResetPassword