import React, {useState} from "react";


import RegistrationContainer from "../RegistrationContainer";
import styles from "./NewPassword.module.scss";
import Button from "../../components/Button";
import {ButtonType} from "../../utils/@globalTypes";
import Input from "../../components/Input";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const onChangePassword = (value: string) => setPassword(value);

    return (
        <RegistrationContainer  title={"Reset password"}>
            <div className={styles.input}>
                <Input title={"Password"} placeholder={"Your password"} onChange={onChangePassword} value={password} type={"text"} />
                <Input title={"Confirm password"} placeholder={"Confirm your password"} onChange={onChangePassword} value={password} type={"text"}  />
            </div>
            <Button title={"Set password"} onClick={()=> {}} type={ButtonType.Primary} className={styles.resetButton}/>
        </RegistrationContainer>
    )
}

export default NewPassword