import React, {FC, ReactNode} from "react";

import styles from "./Modal.module.scss";
import {CloseIconModal} from "src/assets/icons/CloseIconModal";

type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
}
const Modal: FC<ModalProps> = ({ isVisible, onClose, children }) => {

    return  isVisible ? (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.closeButton} onClick={onClose}>
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