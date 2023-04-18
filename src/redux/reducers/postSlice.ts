import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "../store";
import {CardListType, CardType} from "src/utils/@globalTypes";
import {AddPostPayload, GetAllPostsPayload, SetAllPostsPayload} from "src/redux/reducers/@types";

 export enum LikeStatus {
    Like = "like",
    Dislike = "dislike,"
}

type InitialType = {
    selectedPost: CardType | null,
    isVisibleSelectedModal: boolean,
    likedPosts: CardListType,
    dislikedPosts: CardListType,
    savedPosts: CardListType,
    postsList: CardListType,
    chosenPost: CardType | null,
    myPosts: CardListType,
    searchedPosts: CardListType,
    searchValue: string,
    postsCount: number,
    isAllPostsLoading: boolean;
};

const initialState: InitialType = {
    selectedPost: null,
    isVisibleSelectedModal: false,
    likedPosts: [],
    dislikedPosts: [],
    savedPosts: [],
    postsList: [],
    chosenPost: null,
    myPosts: [],
    searchedPosts: [],
    searchValue: '',
    postsCount: 0,
    isAllPostsLoading: false,
}

const postSlice = createSlice( {
    name: "post",
    initialState,
    reducers: {
        getALLPosts: (_, __: PayloadAction<GetAllPostsPayload>) => {},
        setAllPosts: (state, {payload: { postsCount, cardList }}: PayloadAction<SetAllPostsPayload>) => {
            state.postsList = cardList;
            state.postsCount = postsCount;
        },
        getChosenPost: (_, __: PayloadAction<string>) => {},
        setChosenPost: (state, action:PayloadAction<CardType | null>) => {
            state.chosenPost = action.payload
        },
        setSelectedPost: (state, action: PayloadAction<CardType | null>) => {
            state.selectedPost = action.payload;
        },
        setPostVisibility: (state, action: PayloadAction<boolean>) => {
            state.isVisibleSelectedModal = action.payload;
        },
        getMyPosts: (_, __: PayloadAction<undefined>) => {},
        setMyPosts: (state, action: PayloadAction<CardListType>) => {
            state.myPosts = action.payload;
        },
        getSearchedPosts: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setSearchedPosts: (state, action: PayloadAction<CardListType>) => {
            state.searchedPosts = action.payload
        },
        addNewPost: (_, __: PayloadAction<AddPostPayload>) => {},
        setAllPostsLoading: (state, action: PayloadAction<boolean>) => {
            state.isAllPostsLoading = action.payload
        },
        setStatus: (state, action: PayloadAction<{status: LikeStatus, card: CardType}>) => {
            const { status, card } = action.payload;
            const likedIndex = state.likedPosts.findIndex(post => post.id === card.id);
            const dislikedIndex = state.dislikedPosts.findIndex(post => post.id === card.id);
            const isLike = status === LikeStatus.Like;

            const mainKey = isLike ? "likedPosts" : "dislikedPosts";
            const secondaryKey = isLike ? "dislikedPosts" : "likedPosts";

            const mainIndex = isLike ? likedIndex : dislikedIndex;
            const secondaryIndex = isLike ? dislikedIndex : likedIndex;

            if (mainIndex === -1) {
                state[mainKey].push(card)
            } else {
                state[mainKey].splice(mainIndex,1)
            }

            if (secondaryIndex > -1) {
                state[secondaryKey].splice(secondaryIndex, 1)
            }
        },
        setSavedPosts: (state, action: PayloadAction<{card: CardType}>) => {
            const { card } = action.payload;
            const savedIndex = state.savedPosts.findIndex(post => post.id === card.id);

            if (savedIndex === -1) {
                state.savedPosts.push(card)
            } else {
                state.savedPosts.splice(savedIndex, 1)
            }
        },
    },
});

export const {
    setSelectedPost,
    setPostVisibility,
    setStatus,
    setSavedPosts,
    getALLPosts,
    setAllPosts,
    setChosenPost,
    getChosenPost,
    getMyPosts,
    setMyPosts,
    getSearchedPosts,
    setSearchedPosts,
    addNewPost,
    setAllPostsLoading,
} = postSlice.actions;
export default postSlice.reducer;

export const PostSelectors = {
    getSelectedPost: (state: RootState) => state.posts.selectedPost,
    getVisibleSelectedModal: (state: RootState) => state.posts.isVisibleSelectedModal,
    getLikedPosts: (state: RootState) => state.posts.likedPosts,
    getDislikedPosts: (state: RootState) => state.posts.dislikedPosts,
    getSavedPosts: (state: RootState) => state.posts.savedPosts,
    getALLPosts: (state: RootState) => state.posts.postsList,
    getChosenPost: (state: RootState) => state.posts.chosenPost,
    getMyPosts: (state: RootState) => state.posts.myPosts,
    getSearchedPosts: (state: RootState) => state.posts.searchedPosts,
    getSearchValue: (state: RootState) => state.posts.searchValue,
    getAllPostsCount: (state: RootState) => state.posts.postsCount,
    getAllPostsLoading: (state: RootState) => state.posts.isAllPostsLoading,
}