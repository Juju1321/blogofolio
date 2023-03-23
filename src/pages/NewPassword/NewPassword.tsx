import React, {useEffect, useMemo, useState} from "react";

import RegistrationContainer from "../RegistrationContainer";
import styles from "./NewPassword.module.scss";
import Button from "../../components/Button";
import {ButtonType} from "/utils/@globalTypes";
import Input from "../../components/Input";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const onChangePassword = (value: string) => setPassword(value);
    const onChangeConfirmPassword = (value:string) => setConfirmPassword(value);

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
        return passwordError.length === 0
    }, [passwordError]);

    return (
        <RegistrationContainer  title={"Reset password"}>
            <div className={styles.input}>
                <Input title={"Password"} placeholder={"Your password"} onChange={onChangePassword} value={password} type={"text"} errorText={passwordError}/>
                <Input title={"Confirm password"} placeholder={"Confirm your password"} onChange={onChangeConfirmPassword} value={confirmPassword} type={"text"} errorText={passwordError} />
            </div>
            <Button title={"Set password"} onClick={()=> {}} type={ButtonType.Primary} className={styles.resetButton} disabled={!isValid}/>
        </RegistrationContainer>
    )
}

export default NewPassword