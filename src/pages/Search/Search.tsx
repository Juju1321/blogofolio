import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import Title from "src/components/Title";
import {PostSelectors, getSearchedPosts} from "src/redux/reducers/postSlice";
import SearchCardList from "src/components/SearchCardList";
import { PER_PAGE } from "src/utils/constants";
import Loader from "src/components/Loader";

const Search = () => {
    const dispatch = useDispatch();

    const searchValue = useSelector(PostSelectors.getSearchValue);
    const searchList = useSelector(PostSelectors.getSearchedPosts);
    const postsCount = useSelector(PostSelectors.getSearchedPostsCount);

    const [page, setPage] = useState(1);

    useEffect(() => {
        const offset = (page - 1) * PER_PAGE;
        dispatch(getSearchedPosts({ searchValue, isOverwrite: false, offset }));
    }, [page]);

    const onNextReached = () => {
        setPage(page + 1);
    };

    return (
        <div>
            <Title title={`Search results '${searchValue}'`} />
            <InfiniteScroll
                next={onNextReached}
                hasMore={searchList.length < postsCount}
                loader={<Loader />}
                dataLength={searchList.length}
                scrollThreshold={0.8}
                scrollableTarget="scrollableDiv"
            >
                <SearchCardList cardsList={searchList} />
            </InfiniteScroll>
        </div>
    )
}

export default Search;