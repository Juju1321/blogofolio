import React, { FC } from 'react';
import classNames from "classnames";

import Button from "../../components/Button";
import {BookmarkIcon, DislikeIcon, LikeIcon} from "../../assets/icons";
import {Theme,  useThemeContext} from "../../context/Theme/Context";
import styles from "./SelectedPost.module.scss";
import {ButtonType, CardType} from "../../utils/@globalTypes";
import {NavLink} from "react-router-dom";
import {RoutesList} from "../Router";

type SelectedPostProps = {
    chosenPost: CardType,
}

const SelectedPost: FC<SelectedPostProps> = ({chosenPost}) => {
    const { theme } = useThemeContext();
    const { id, title, image, text } = chosenPost;

    return (
        <div className={classNames(styles.container, {
            [styles.darkContainer]: theme === Theme.Dark,
        })}
        >
            <div className={styles.breadCrumbs}>
                <NavLink to={RoutesList.Home} className={classNames(styles.home, {
                    [styles.darkText]: theme === Theme.Dark
                })
                }>
                    Home
                </NavLink>
                <div className={styles.pipe}>|</div>
                <div className={styles.postNumber}>Post {id}</div>
            </div>
            <div className={classNames(styles.title, {
                [styles.darkTitle]: theme === Theme.Dark
            })}>
                {title}
            </div>
            <div className={styles.imgTextContainer}>
                <img className={styles.imgPost} src={image} alt={"post image"}/>
                <div className={classNames(styles.text, {
                    [styles.darkText]: theme === Theme.Dark
                })}
                >
                    {text}
                </div>
            <div className={styles.buttonContainer}>
                <div className={styles.leftBtn}>
                    <Button title={<LikeIcon />} onClick={() => {}} type={ButtonType.Secondary}/>
                    <Button title={<DislikeIcon />} onClick={() => {}} type={ButtonType.Secondary}/>
                </div>
                <Button
                    title=
                        {
                    <div className={styles.rightBtn}>
                        {<BookmarkIcon/>}
                        <div>Add to favorites</div>
                    </div>
                        }
                    onClick={() => {}}
                    type={ButtonType.Secondary}/>
            </div>
            </div>
        </div>
    )
}

export default SelectedPost