import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "../store";
import { CardType } from "../../components/Card";

type InitialType = {
    selectedPost: CardType | null,
    isVisibleSelectedModal: boolean,
}

const initialState: InitialType = {
    selectedPost: null,
    isVisibleSelectedModal: false,
}

const postSlice = createSlice( {
    name: "post",
    initialState,
    reducers: {
        setSelectedPost: (state, action: PayloadAction<CardType | null>) => {
            state.selectedPost = action.payload;
        },
        setPostVisibility: (state, action: PayloadAction<boolean>) => {
            state.isVisibleSelectedModal = action.payload;
        },
    },
});

export const { setSelectedPost, setPostVisibility } = postSlice.actions;
export default postSlice.reducer;

export const PostSelectors = {
    getSelectedPost: (state: RootState) => state.posts.selectedPost,
    getVisibleSelectedModal: (state: RootState) => state.posts.isVisibleSelectedModal
}