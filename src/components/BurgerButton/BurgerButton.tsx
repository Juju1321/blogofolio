import React, {FC} from "react";
import Button, {ButtonType} from "../Button";
import { CloseIcon, OpenedMenu } from "../../assets/icons";

import styles from "./BurgerButton.module.scss";

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