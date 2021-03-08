import {call, put, takeLatest} from 'redux-saga/effects'
import {login} from '@/api/login'
import {actions} from './actions'
import {actions as commonActions} from '@/common/store/actions'
import {message} from 'antd'

//手机号登录
function* doLogin(action) {
    yield put({type: actions.CHANGE_STATE, payload: {loading: true}})
    try {
        let response = yield call(login, action.payload.phone, action.payload.password)
        let result = response.code === '10000'
        yield put({type: actions.CHANGE_STATE, payload: {loading: false}})
        if (result) {
            message.success(response.message)
            let {accessToken, refreshToken, userBean, role} = response.data
            yield put({
                type: commonActions.SAVE_USER_INFO,
                payload: {
                    accessToken: accessToken.token,
                    expiration: accessToken.expiration,
                    refreshToken: refreshToken.token,
                    userName: userBean.userName,
                    phone: userBean.phone,
                    roleCode: role.code,
                    roleName: role.name
                }
            })
        } else {
            message.error(response.message)
        }
    } catch (e) {
        yield put({type: actions.CHANGE_STATE, payload: {loading: false}})
        message.error(e.message)
    }
}

export function* watchLogin() {
    yield takeLatest(actions.PHONE_LOGIN, doLogin)
}
