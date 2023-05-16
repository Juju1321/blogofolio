import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import {PayloadAction} from "@reduxjs/toolkit";

import {
    addNewPost,
    getALLPosts,
    getChosenPost,
    getMyPosts, getSearchedPosts,
    setAllPosts, setAllPostsLoading,
    setChosenPost,
    setMyPosts, setSearchedPosts
} from "../reducers/postSlice";
import API from "../api"
import {AllPostsResponse} from "./@types";
import {CardType} from "src/utils/@globalTypes";
import callCheckingAuth from "src/redux/sagas/callCheckingAuth";
import {AddPostPayload, GetAllPostsPayload, GetSearchPostsPayload} from "src/redux/reducers/@types";

function* getALLPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
    yield put(setAllPostsLoading(true));
    const { offset, search, ordering } = action.payload
    const { ok, data, problem }:ApiResponse<AllPostsResponse> = yield call(API.getPosts, offset, search, ordering);
    if (ok && data) {
        yield put(setAllPosts({cardList: data.results, postsCount: data.count}));
    } else {
        console.warn("Error getting all posts", problem)
    }
    yield put(setAllPostsLoading(false));
}
function* getChosenPostWorker(action:PayloadAction<string>) {
    yield put(setAllPostsLoading(true));
    const { ok, data, problem }:ApiResponse<CardType> = yield call(API.getSinglePost, action.payload);
    if (ok && data) {
        yield put(setChosenPost(data));
    } else {
        console.warn("Error getting one post", problem)
    }
    yield put(setAllPostsLoading(false));
}

function* getMyPostsWorker() {
    const {ok, data, problem}: ApiResponse<AllPostsResponse> = yield callCheckingAuth(API.getMyPosts);
    if (ok && data) {
        yield put(setMyPosts(data.results))
    }  else {
        console.warn("Error getting user posts", problem)
    }
}

function* getSearchedPostsWorker(action: PayloadAction<GetSearchPostsPayload>) {
    const { searchValue, isOverwrite, offset } = action.payload;
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    offset,
    searchValue
  );
  if (ok && data) {
    yield put(
      setSearchedPosts({
        cardList: data.results,
        postsCount: data.count,
        isOverwrite,
      })
    );
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