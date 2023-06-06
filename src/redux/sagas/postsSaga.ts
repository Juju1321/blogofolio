import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import {PayloadAction} from "@reduxjs/toolkit";

import {
    addNewPost,
    getALLPosts,
    getChosenPost,
    getMyPosts, getSearchedPosts,
    setAllPosts,
    setChosenPost,
    setMyPosts, setSearchedPosts
} from "../reducers/postSlice";
import API from "../api"
import {AllPostsResponse} from "./@types";
import {CardType} from "src/utils/@globalTypes";
import callCheckingAuth from "src/redux/sagas/callCheckingAuth";
import {AddPostPayload, GetAllPostsPayload} from "src/redux/reducers/@types";

function* getALLPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
    const { offset, search, ordering } = action.payload
    const { ok, data, problem }:ApiResponse<AllPostsResponse> = yield call(API.getPosts, offset, search, ordering);
    if (ok && data) {
        yield put(setAllPosts({cardList: data.results, postsCount: data.count}));
    } else {
        console.warn("Error getting all posts", problem)
    }
}
function* getChosenPostWorker(action:PayloadAction<string>) {
    const { ok, data, problem }:ApiResponse<CardType> = yield call(API.getSinglePost, action.payload);
    if (ok && data) {
        yield put(setChosenPost(data));
    } else {
        console.warn("Error getting one post", problem)
    }
}

function* getMyPostsWorker() {
    const {ok, data, problem}: ApiResponse<AllPostsResponse> = yield callCheckingAuth(API.getMyPosts);
    if (ok && data) {
        yield put(setMyPosts(data.results))
    }  else {
        console.warn("Error getting user posts", problem)
    }
}

function* getSearchedPostsWorker(action: PayloadAction<string>) {
    const { ok, data, problem }:ApiResponse<AllPostsResponse> = yield call(API.getPosts, 0, action.payload);
    if (ok && data) {
        yield put(setSearchedPosts(data.results));
    } else {
        console.warn("Error getting searched posts", problem)
    }
}

function* addNewPostWorker(action: PayloadAction<AddPostPayload>) {
    const { data, callback } = action.payload;
    const { ok, problem }: ApiResponse<undefined> = yield callCheckingAuth(
        API.addPost,
        data
    );
    if (ok) {
        callback();
    } else {
        console.warn("Error adding post", problem);
    }
}

export default function* postsSaga() {
    yield all([
        takeLatest(getALLPosts, getALLPostsWorker),
        takeLatest(getChosenPost, getChosenPostWorker),
        takeLatest(getMyPosts, getMyPostsWorker),
        takeLatest(getSearchedPosts, getSearchedPostsWorker),
        takeLatest(addNewPost, addNewPostWorker),
    ]);
}