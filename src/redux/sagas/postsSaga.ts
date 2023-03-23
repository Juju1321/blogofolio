import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import {PayloadAction} from "@reduxjs/toolkit";

import {getALLPosts, getChosenPost, setAllPosts, setChosenPost} from "../reducers/postSlice";
import API from "../api"
import {AllPostsResponse} from "./@types";
import {CardType} from "src/utils/@globalTypes";

function* getALLPostsWorker() {
    const { ok, data, problem }:ApiResponse<AllPostsResponse> = yield call(API.getPosts);
    if (ok && data) {
        yield put(setAllPosts(data.results));
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

export default function* postsSaga() {
    yield all([takeLatest(getALLPosts, getALLPostsWorker), takeLatest(getChosenPost, getChosenPostWorker)]);
}