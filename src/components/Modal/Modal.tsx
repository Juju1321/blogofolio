import React, {FC, ReactNode} from "react";
import classNames from "classnames";

import {CloseIconModal} from "src/assets/icons/CloseIconModal";
import {Theme, useThemeContext} from "src/context/Theme/Context";
import styles from "./Modal.module.scss";

type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
}
const Modal: FC<ModalProps> = ({ isVisible, onClose, children }) => {

    const { theme } = useThemeContext();
    const isDark = theme === Theme.Dark;

    return  isVisible ? (
        <div className={styles.container}>
            <div className={classNames(styles.mainContent, {
                [styles.darkMainContent]: isDark,
            })}>
                <div
                    className={classNames(styles.closeButton, {
                        [styles.darkCloseButton]: isDark,
                    })}
                     onClick={onClose}
                >
                    <CloseIconModal/>
                </div>
                <div className={styles.infoContainer}>
                    { children }
                </div>
            </div>
        </div>
    ) : null;
};

export default Modal