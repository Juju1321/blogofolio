import React from "react"
import classNames from "classnames";
import {NavLink} from "react-router-dom";

import {RoutesList} from "../Router";
import styles from "./Error404NotFound.module.scss"
import {Theme, useThemeContext} from "/context/Theme/Context";

const Error404NotFound = () => {
    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    return (
        <div className={styles.container}>
            <div className={classNames(styles.error, {
                [styles.darkError]: isDark
            })}>
                404
            </div>
            <div className={classNames(styles.text, {
                [styles.darkText]: isDark
            })}>
                PAGE NOT FOUND
            </div>
            <NavLink
                to={RoutesList.Home}
                className={styles.btnHome}
                >
                Back to home
            </NavLink>
        </div>
    )
}

export default Error404NotFound