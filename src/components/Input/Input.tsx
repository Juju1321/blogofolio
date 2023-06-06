import React, {ChangeEvent, FC} from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";
import {Theme, useThemeContext} from "src/context/Theme/Context";

type InputProps = {
    title: string;
    placeholder: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    value: string;
    errorText?: string;
    type: string
}

const Input: FC<InputProps> = ({title, placeholder, onChange, disabled, value, errorText,type}) => {

    const onChangeInputText = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    return (
        <div className={styles.container}>
            <div className={classNames(styles.title, {
                [styles.darkTitle]: isDark,
            })}>{title}</div>
            <input
                className={classNames(styles.input, {
                    [styles.disableInput]:disabled,
                    [styles.errorInput]: errorText
                })}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChangeInputText}
                type={type}
            />
            {errorText && <div className={styles.errorText}>{ errorText }</div>}
        </div>
    )
};

export default Input