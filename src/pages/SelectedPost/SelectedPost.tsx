import React, {useEffect} from 'react';
import classNames from "classnames";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Button from "src/components/Button";
import {BookmarkIcon, DislikeIcon, LikeIcon, SaveBookmarkIcon} from "src/assets/icons";
import {Theme, useThemeContext} from "src/context/Theme/Context";
import styles from "./SelectedPost.module.scss";
import {ButtonType} from "src/utils/@globalTypes";
import {RoutesList} from "../Router";
import {getChosenPost, LikeStatus, PostSelectors, setSavedPosts, setStatus} from "src/redux/reducers/postSlice";

const SelectedPost = () => {
    const { theme } = useThemeContext();
    const { id } = useParams();
    const dispatch = useDispatch();

    const chosenPost = useSelector(PostSelectors.getChosenPost);
    const likedPosts = useSelector(PostSelectors.getLikedPosts);
    const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
    const savedPosts = useSelector(PostSelectors.getSavedPosts);

    const likedIndex = likedPosts.findIndex(post => post.id === chosenPost?.id);
    const dislikedIndex = dislikedPosts.findIndex(post => post.id === chosenPost?.id);
    const savedIndex = savedPosts.findIndex(post => post.id === chosenPost?.id);

    useEffect(() => {
        if (id) {
            dispatch(getChosenPost(id))
        }
    }, []);

    const onStatusClick = (status: LikeStatus) => () => {
        if (chosenPost) {
            dispatch(setStatus({status, card: chosenPost}))
        }
    };

    const onSaveClick = () => {
        if (chosenPost) {
            dispatch(setSavedPosts({card: chosenPost}))
        }
    };

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
                    <Button
                        title={
                        <div className={styles.likeNumber}>
                            <LikeIcon />
                            {likedIndex > -1 && 1}
                        </div>
                    }
                        onClick={onStatusClick(LikeStatus.Like)}
                        type={ButtonType.Secondary}
                    />
                    <Button
                        title={
                        <div className={styles.likeNumber}>
                            <DislikeIcon />
                            {dislikedIndex > -1 && 1}
                        </div>
                    }
                        onClick={onStatusClick(LikeStatus.Dislike)}
                        type={ButtonType.Secondary}
                    />
                </div>
                <Button
                    title=
                        {
                    <div className={styles.rightBtn} onClick={onSaveClick}>
                        { savedIndex === -1 ? <BookmarkIcon /> : <SaveBookmarkIcon /> }
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