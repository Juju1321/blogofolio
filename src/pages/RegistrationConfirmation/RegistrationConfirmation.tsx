import React from "react";
import styles from "../Success/Success.module.scss";
import classNames from "classnames";
import Title from "../../components/Title";
import Button, {ButtonType} from "../../components/Button";
import {Theme, useThemeContext} from "../../context/Theme/Context";
import {NavLink} from "react-router-dom";
import {RoutesList} from "../Router";

const RegistrationConfirmation = () => {

    const { theme } = useThemeContext()
    const isDark = theme === Theme.Dark;

    return (
        <div>
            <div className={styles.titleContainer}>
                <NavLink to={RoutesList.Home} className={classNames(styles.breadCrumbs, {
                    [styles.darkBreadCrumbs]: isDark,
                })}>
                    Back to home
                </NavLink>
                <Title title={"Registration Confirmation"}/>
            </div>
            <div className={styles.infoContainer}>
                <div className={classNames(styles.formContainer, {
                    [styles.darkFormContainer]: isDark,
                })}>
                    <div className={classNames(styles.emailConfirmed, {
                        [styles.darkEmailConfirmed]: isDark,
                    })}>
                        Please activate your account with the activation <br/>
                        link in the email example@gmail.com. <br/>
                        Please, check your email
                    </div>
                    <Button title={"Go to home"} onClick={()=> {}} type={ButtonType.Primary}/>
                </div>
            </div>
        </div>
    )
}

export default RegistrationConfirmation