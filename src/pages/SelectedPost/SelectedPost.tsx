import React, {useEffect} from 'react';
import classNames from "classnames";

import Button from "../../components/Button";
import {BookmarkIcon, DislikeIcon, LikeIcon} from "../../assets/icons";
import {Theme,  useThemeContext} from "../../context/Theme/Context";
import styles from "./SelectedPost.module.scss";
import {ButtonType} from "../../utils/@globalTypes";
import {NavLink, useParams} from "react-router-dom";
import {RoutesList} from "../Router";
import {useDispatch, useSelector} from "react-redux";
import {getChosenPost, PostSelectors} from "../../redux/reducers/postSlice";

const SelectedPost = () => {
    const { theme } = useThemeContext();
    const { id } = useParams();

    const chosenPost = useSelector(PostSelectors.getChosenPost);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getChosenPost(id))
        }
    }, []);

    return chosenPost ? (
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
                {chosenPost?.title}
            </div>
            <div className={styles.imgTextContainer}>
                <img className={styles.imgPost} src={chosenPost?.image} alt={"post image"}/>
                <div className={classNames(styles.text, {
                    [styles.darkText]: theme === Theme.Dark
                })}
                >
                    {chosenPost?.text}
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
    ) : null
}

export default SelectedPost