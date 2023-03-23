import React, {FC, ReactNode} from "react";
import classNames from "classnames";
import {NavLink} from "react-router-dom";

import styles from "./RegistrationContainer.module.scss";
import {RoutesList} from "../Router";
import {Theme, useThemeContext} from "src/context/Theme/Context";
import Title from "src/components/Title";

type RegistrationContainerProps = {
    children: ReactNode;
    title: string;
}

const RegistrationContainer: FC<RegistrationContainerProps> = ({ children, title }) => {
    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    return (
        <div>
            <div className={styles.titleContainer}>
                <NavLink to={RoutesList.Home} className={classNames(styles.breadCrumbs, {
                    [styles.darkBreadCrumbs]: isDark,
                })}>
                    Back to home
                </NavLink>
                <Title title={title}/>
            </div>
            <div className={styles.infoContainer}>
                <div className={classNames(styles.mainBlockContainer , {
                    [styles.darkMainBlockContainer]: isDark,
                })}>
                    { children }
                </div>
                </div>
            </div>
    )
}

export default RegistrationContainer