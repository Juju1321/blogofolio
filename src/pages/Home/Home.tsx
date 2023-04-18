import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import classNames from "classnames";

import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import {TabsNames} from "src/components/Tabs/types";
import {getALLPosts, PostSelectors} from "src/redux/reducers/postSlice";
import SelectedPostModal from "../SelectedpostModal";
import {PER_PAGE} from "src/utils/constants";
import styles from "./Home.module.scss";
import Button from "src/components/Button";
import {ButtonType} from "src/utils/@globalTypes";
import Loader from "src/components/Loader";

export enum Order {
    Title = 'title',
    Date = 'date',
}
const Home = () => {
    const dispatch = useDispatch();
    const postsList = useSelector(PostSelectors.getALLPosts);
    const favouriteList = useSelector(PostSelectors.getLikedPosts);
    const myPostsList = useSelector(PostSelectors.getMyPosts);
    const savedList = useSelector(PostSelectors.getSavedPosts);
    const postsCount = useSelector(PostSelectors.getAllPostsCount);
    const isLoading = useSelector(PostSelectors.getAllPostsLoading);

    const pagesCount = Math.ceil(postsCount / PER_PAGE);

    const [activeTab, setActiveTab] = useState(TabsNames.All);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordering, setOrdering] = useState("")

    useEffect(() => {
        const offset = PER_PAGE * (currentPage - 1);
        dispatch(getALLPosts({offset, ordering}));
    }, [currentPage, ordering]);

    const onPageChange = ({selected}: { selected: number }) => {
        setCurrentPage(selected + 1);
    }

        const onClick = (key: TabsNames) => {
            setActiveTab(key);
            setCurrentPage(1);
        };

        const onOrderClick = (order: Order) => () => {
            order === ordering ? setOrdering("") : setOrdering(order);
            setCurrentPage(1)
        };

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
                <Title title={"Blog"}/>
                <Tabs activeTab={activeTab} onClick={onClick}/>
                { isLoading ? (
                    <Loader />
                ) : (
                    <>
                <div className={styles.orderingButton}>
                    <Button title={"Title"} className={classNames({[styles.activeButton]: ordering === "title"})} onClick={onOrderClick(Order.Title)} type={ButtonType.Secondary} />
                    <Button title={"Date"} className={classNames({[styles.activeButton]: ordering === "date"})} onClick={onOrderClick(Order.Date)} type={ButtonType.Secondary} />
                </div>
                    <CardsList cardsList={getCurrentList()} />
                {activeTab !== TabsNames.Popular &&
                    activeTab !== TabsNames.Favourites && (
                    <ReactPaginate
                    pageCount={pagesCount}
                    forcePage={currentPage - 1}
                    onPageChange={onPageChange}
                    containerClassName={styles.pagesContainer}
                    pageClassName={styles.pageNumber}
                    breakClassName={styles.pageNumber}
                    breakLinkClassName={styles.linkPage}
                    activeLinkClassName={styles.linkPage}
                    pageLinkClassName={styles.linkPage}
                    activeClassName={styles.activePageNumber}
                    nextClassName={classNames(styles.arrowButton, {
                    [styles.blockedButton]: currentPage === pagesCount,
                })}
                    previousClassName={classNames(styles.arrowButton, {
                    [styles.blockedButton]: currentPage === 1,
                })}
                    previousLinkClassName={styles.linkPage}
                    nextLinkClassName={styles.linkPage}
                    />
                    )}
                <SelectedPostModal/>
                        </>
                            )}
            </div>
        )
}

export default Home;
