import React, {useMemo, useState} from "react";
import BurgerButton from "../../../components/BurgerButton";

import styles from "./Header.module.scss";
import User from "../../../components/User";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import Button, {ButtonType} from "../../../components/Button";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {RoutesList} from "../../Router";
import classNames from "classnames";

const Header = () => {
    const [isOpened, setOpened] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const onBurgerClick = () => setOpened(!isOpened)

    const onAuthButtonClick = () => {
        navigate(RoutesList.SignIn)
    }

    const navButtonList = useMemo(() => [
        {
            title: "Home",
            key: RoutesList.Home,
        },
        {
            title: "Add Post",
            key: RoutesList.AddPost,
        },
    ], [])

    return (
        <>
            <div className={styles.container}>
                <BurgerButton isOpened={isOpened} onBurgerClick={onBurgerClick}/>
                <User userName={"Artem Malkin"}/>
            </div>
            {isOpened && <div className={styles.menuContainer}>
                <div className={styles.actionsContainer}>
                    <User userName={"Artem Malkin"}/>
                    {navButtonList.map(({title, key}) => {
                        return (
                        <NavLink to={key} key={key} className={classNames(styles.navButton, {
                            [styles.activeNavButton]: location.pathname === key,
                        })}>
                            {title}
                        </NavLink>
                    )
                    })}
                </div>
                <div>
                    <ThemeSwitcher/>
                    <Button title={"Sign In"} onClick={onAuthButtonClick} type={ButtonType.Secondary} className={styles.authButton}/>
                </div>
            </div>}
        </>
    )
}

export default Header