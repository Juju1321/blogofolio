import React, {ChangeEvent, FC, KeyboardEvent} from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";
import {Theme, useThemeContext} from "src/context/Theme/Context";

type InputProps = {
    title?: string;
    placeholder: string;
    onChange: (value: string) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    value: string;
    errorText?: string;
    type: string;
    inputClassName?: string;
    onBlur?: () => void;
}

const Input: FC<InputProps> = ({
                                   title,
                                   placeholder,
                                   onChange,
                                   onKeyDown,
                                   disabled,
                                   value,
                                   errorText,
                                   type,
                                   inputClassName,
                                   onBlur,
}) => {

    const onChangeInputText = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    return (
        <div className={styles.container}>
            {title && <div className={classNames(styles.title, {
                [styles.darkTitle]: isDark,
            })}>{title}</div>}
            <input
                className={classNames(styles.input, inputClassName, {
                    [styles.disableInput]:disabled,
                    [styles.errorInput]: errorText
                })}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChangeInputText}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                type={type}
            />
            {errorText && <div className={styles.errorText}>{ errorText }</div>}
        </div>
    )
};

export default Input