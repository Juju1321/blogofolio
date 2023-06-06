import React from "react";

import styles from "./Success.module.scss"
import classNames from "classnames";
import {Theme, useThemeContext} from "../../context/Theme/Context";
import Button from "../../components/Button";
import {ButtonType} from "../../utils/@globalTypes";
import RegistrationContainer from "../RegistrationContainer";
import {useNavigate} from "react-router-dom";
import {RoutesList} from "../Router";

const Success = () => {
    const { theme } = useThemeContext()
    const isDark = theme === Theme.Dark;
    const navigation = useNavigate();

    const onHomeClick = () => {
        navigation(RoutesList.Home)
    }

    return (
        <RegistrationContainer title={"Success"}>
                <div className={classNames(styles.emailConfirmed, {
                    [styles.darkEmailConfirmed]: isDark,
                })}>
                    Email confirmed. <br/>
                    Your registration is now completed.
                </div>
                <Button
                    title={"Go to home"}
                    onClick={onHomeClick}
                    type={ButtonType.Primary}
                    className={styles.registrationButton}
                />
        </RegistrationContainer>
    )
}

export default Success