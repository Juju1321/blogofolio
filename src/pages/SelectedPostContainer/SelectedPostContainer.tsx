import React, {useEffect} from "react";
import SelectedPost from "../SelectedPost";
import {useDispatch, useSelector} from "react-redux";
import {getChosenPost, PostSelectors} from "../../redux/reducers/postSlice";
import {useParams} from "react-router-dom";

const SelectedPostContainer = () => {
    const chosenPost = useSelector(PostSelectors.getChosenPost);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getChosenPost(id))
    }, []);

    return (chosenPost && <SelectedPost chosenPost={chosenPost}/>)
};

export default SelectedPostContainer