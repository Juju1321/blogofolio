import React from "react";

import styles from "./Success.module.scss"
import classNames from "classnames";
import {Theme, useThemeContext} from "../../context/Theme/Context";
import Title from "../../components/Title";
import Button, {ButtonType} from "../../components/Button";
import {NavLink} from "react-router-dom";
import {RoutesList} from "../Router";

const Success = () => {
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
                <Title title={"Success"}/>
            </div>
            <div className={styles.infoContainer}>
            <div className={classNames(styles.formContainer, {
                [styles.darkFormContainer]: isDark,
            })}>
                <div className={classNames(styles.emailConfirmed, {
                    [styles.darkEmailConfirmed]: isDark,
                })}>
                    Email confirmed. <br/>
                    Your registration is now completed.
                </div>
                <Button title={"Go to home"} onClick={()=> {}} type={ButtonType.Primary}/>
            </div>
            </div>
        </div>
    )
}

export default Success