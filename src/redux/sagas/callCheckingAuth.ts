import { call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";
import API from "../api";
import { logoutUser } from "src/redux/reducers/authSlice";

function* callCheckingAuth(apiCall: any, ...params: any) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (accessToken && refreshToken) {
        const response: ApiResponse<any> = yield call(
            apiCall,
            accessToken,
            ...params
        );
        if (response.status === 401) {
            const accessResponse: ApiResponse<any> = yield call(
                API.verifyToken,
                accessToken
            );
            if (accessResponse.status === 401) {
                const refreshResponse: ApiResponse<any> = yield call(
                    API.verifyToken,
                    refreshToken
                );
                if (refreshResponse.status === 401) {
                    yield put(logoutUser());
                } else {
                    const {
                        ok: accessNewOk,
                        data: accessNewData,
                    }: ApiResponse<{ access: string }> = yield call(
                        API.refreshToken,
                        refreshToken
                    );
                    if (accessNewOk && accessNewData) {
                        localStorage.setItem(ACCESS_TOKEN_KEY, accessNewData.access);
                        const newResponse: ApiResponse<any> = yield call(
                            apiCall,
                            accessNewData.access,
                            ...params
                        );
                        return newResponse;
                    } else {
                        yield put(logoutUser());
                    }
                }
            }
        } else {
            return response;
        }
    } else {
        yield put(logoutUser());
    }
}

export default callCheckingAuth;