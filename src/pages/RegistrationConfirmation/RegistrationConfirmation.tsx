import React from "react";
import styles from "./RegistrationConfirmation.module.scss";
import classNames from "classnames";
import Button from "../../components/Button";
import {Theme, useThemeContext} from "../../context/Theme/Context";
import {ButtonType} from "../../utils/@globalTypes";
import RegistrationContainer from "../RegistrationContainer";

const RegistrationConfirmation = () => {

    const { theme } = useThemeContext()
    const isDark = theme === Theme.Dark;

    return (
        <RegistrationContainer title={"Registration Confirmation"}>
                    <div className={classNames(styles.emailConfirmed, {
                        [styles.darkEmailConfirmed]: isDark,
                    })}>
                        Please activate your account with the activation <br/>
                        link in the email example@gmail.com. <br/>
                        Please, check your email
                    </div>
                    <Button title={"Go to home"} onClick={()=> {}} type={ButtonType.Primary} className={styles.registrationButton}/>
        </RegistrationContainer>
    )
}

export default RegistrationConfirmation