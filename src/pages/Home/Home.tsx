import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import { TabsNames } from "/components/Tabs/types";
import {getALLPosts, PostSelectors} from "/redux/reducers/postSlice";
import SelectedPostModal from "../SelectedpostModal";


const TABS_LIST = [
    {
        title: 'All',
        disabled: false,
        key: TabsNames.All,
    },
    {
        title: 'My favorites',
        disabled: false,
        key: TabsNames.Favorites,
    },
    {
        title: 'Popular',
        disabled: false,
        key: TabsNames.Popular,
    },
]

const Home = () => {
    const dispatch = useDispatch();
    const postsList = useSelector(PostSelectors.getALLPosts)
    const [activeTab, setActiveTab] = useState(TabsNames.All);

    useEffect(() => {
        dispatch(getALLPosts())
    }, []);

    const onClick = (key: TabsNames) => setActiveTab(key);

    return (
        <div>
            <Title title={"Blog"} />
            <Tabs tabsList={TABS_LIST} activeTab={activeTab} onClick={onClick}/>
            <CardsList cardsList={postsList}/>
            <SelectedPostModal/>
        </div>
    )
}

export default Home
