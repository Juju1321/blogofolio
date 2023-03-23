import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Title.module.scss"
import { Theme, useThemeContext } from "/context/Theme/Context";

type TitleProps = {
    title: string,
}
const Title: FC<TitleProps> = ({ title}) => {
    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    return (
        <h1
            className={classNames(styles.title, {
                [styles.darkTitle]: isDark,
            })}
        >
            { title }
        </h1>
    )
}

export default Title