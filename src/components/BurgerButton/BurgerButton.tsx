import React, {FC} from "react";
import Butt from "../Button";
import { CloseIcon, OpenedMenu } from "../../assets/icons";

import styles from "./BurgerButton.module.scss";
import Button from "../Button";
import {ButtonType} from "../../utils/@globalTypes";

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