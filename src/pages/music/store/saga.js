import {actions} from "./actions";
import {call, put, takeLatest} from "redux-saga/effects";
import {musicBanners,musicPersonalized} from '@/api/music'

function* loadData() {
    let res1 = yield call(musicBanners)
    yield put({type: actions.CHANGE_STATE, payload: {banners: res1.data.banners}})
    let res2 = yield call(musicPersonalized)
    yield put({type: actions.CHANGE_STATE, payload: {personalizedList: res2.data.result}})
}

export function* watchMusic() {
    yield takeLatest(actions.LOAD_DATA, loadData)
}
