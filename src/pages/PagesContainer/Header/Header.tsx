import React, {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import BurgerButton from "../../../components/BurgerButton";
import styles from "./Header.module.scss";
import User from "../../../components/User";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import Button from "../../../components/Button";
import {RoutesList} from "../../Router";
import {UserIcon} from "src/assets/icons";
import {ButtonType} from "src/utils/@globalTypes";
import {AuthSelectors, logoutUser} from "src/redux/reducers/authSlice";

const Header = () => {
    const [isOpened, setOpened] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
    const userInfo = useSelector(AuthSelectors.getUserInfo);

    const userName = userInfo?.username;

    const onBurgerClick = () => setOpened(!isOpened);
    const onAuthButtonClick = () => {
        navigate(RoutesList.SignIn)
    };

    const onLogoutClick = () => {
        dispatch(logoutUser())
    }

    const navButtonList = useMemo(() => [
        {
            title: "Home",
            key: RoutesList.Home,
        },
            ...(!isLoggedIn ? [] : [{
                title: "Add Post",
                key: RoutesList.AddPost,
            },
            ]),
        ],
        [isLoggedIn]
    );

    return (
        <>
            <div className={styles.container}>
                <BurgerButton isOpened={isOpened} onBurgerClick={onBurgerClick}/>
                {isLoggedIn ?
                    <User userName={userName}/>
                    :
                    <Button
                        title={<UserIcon/>}
                        onClick={onAuthButtonClick}
                        type={ButtonType.Primary}
                        className={styles.userBtn}
                    />}
            </div>
            {isOpened && <div className={styles.menuContainer}>
                <div className={styles.actionsContainer}>
                    {isLoggedIn && <User userName={userName}/>}
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
                    <Button
                        title={isLoggedIn ? "Log out" : "Sign In"}
                        onClick={isLoggedIn ? onLogoutClick : onAuthButtonClick}
                        type={ButtonType.Secondary}
                        className={styles.authButton}/>
                </div>
            </div>}
        </>
    )
}

export default Header