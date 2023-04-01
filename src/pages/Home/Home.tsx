import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import {TabsNames} from "src/components/Tabs/types";
import {getALLPosts, PostSelectors} from "src/redux/reducers/postSlice";
import SelectedPostModal from "../SelectedpostModal";

const Home = () => {
    const dispatch = useDispatch();
    const postsList = useSelector(PostSelectors.getALLPosts);
    const favouriteList = useSelector(PostSelectors.getLikedPosts);
    const myPostsList = useSelector(PostSelectors.getMyPosts);
    const savedList = useSelector(PostSelectors.getSavedPosts)
    const [activeTab, setActiveTab] = useState(TabsNames.All);

    useEffect(() => {
        dispatch(getALLPosts())
    }, []);

    const onClick = (key: TabsNames) => setActiveTab(key);

    const getCurrentList = () => {
        switch (activeTab) {
            case TabsNames.Popular:
                return favouriteList;
            case TabsNames.MyPosts:
                return myPostsList;
            case TabsNames.Favourites:
                return savedList;
            case TabsNames.All:
            default:
                return postsList;
        }
    }

    return (
        <div>
            <Title title={"Blog"} />
            <Tabs activeTab={activeTab} onClick={onClick}/>
            <CardsList cardsList={getCurrentList()}/>
            <SelectedPostModal/>
        </div>
    )
}

export default Home
