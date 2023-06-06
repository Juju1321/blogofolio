import React, {FC} from "react";

import { CloseIcon, OpenedMenu } from "src/assets/icons";
import styles from "./BurgerButton.module.scss";
import Button from "../Button";
import {ButtonType} from "src/utils/@globalTypes";

type BurgerButtonProps = {
    isOpened: boolean,
    onBurgerClick: () => void,
}
const BurgerButton: FC<BurgerButtonProps> = ({isOpened, onBurgerClick}) => {
    return (
        <Button
            title={ !isOpened ? <OpenedMenu /> : <CloseIcon /> }
            onClick={onBurgerClick}
            type={ButtonType.Primary}
            className={styles.burgerButton}
        />
    );
}

export default BurgerButton