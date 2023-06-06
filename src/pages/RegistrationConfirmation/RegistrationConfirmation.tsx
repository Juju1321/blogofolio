import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import classNames from "classnames";
import {useDispatch} from "react-redux";

import Button from "src/components/Button";
import styles from "./RegistrationConfirmation.module.scss";
import {Theme, useThemeContext} from "src/context/Theme/Context";
import {ButtonType} from "src/utils/@globalTypes";
import RegistrationContainer from "../RegistrationContainer";
import {RoutesList} from "../Router";
import {activateUser} from "src/redux/reducers/authSlice";


const RegistrationConfirmation = () => {

    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { uid, token } = useParams();

    const onConfirmClick = () => {
        if (uid && token) {
            dispatch(
                activateUser({
                    data: {uid, token},
                    callback: () => navigate(RoutesList.Success)
                })
            );
        }
    };

    return (
        <RegistrationContainer title={"Registration Confirmation"}>
                    <div className={classNames(styles.emailConfirmed, {
                        [styles.darkEmailConfirmed]: isDark,
                    })}>
                        Please activate your account with the activation <br/>
                        link in the email <br/>
                        Please, check your email
                    </div>
                    <Button
                        title={"Confirm"}
                        onClick={onConfirmClick}
                        type={ButtonType.Primary}
                        className={styles.registrationButton}/>
        </RegistrationContainer>
    )
}

export default RegistrationConfirmation