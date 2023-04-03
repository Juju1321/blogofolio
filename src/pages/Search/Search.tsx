import React from "react";
import {useSelector} from "react-redux";

import Title from "src/components/Title";
import {PostSelectors} from "src/redux/reducers/postSlice";
import SearchCardList from "src/components/SearchCardList";

const Search = () => {
    const searchValue = useSelector(PostSelectors.getSearchValue);
    const searchList = useSelector(PostSelectors.getSearchedPosts);

    return (
        <div>
            <Title title={`Search results '${searchValue}'`} />
            <SearchCardList cardsList={searchList} />
        </div>
    )
}

export default Search;