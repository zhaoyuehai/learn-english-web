import {actions} from './actions'
import {fromJS} from 'immutable'

const defaultState = fromJS({
    userName: localStorage.getItem('userName'),
    phone: localStorage.getItem('phone'),
    roleCode: localStorage.getItem('roleCode'),
    roleName: localStorage.getItem('roleName'),
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actions.SAVE_USER_INFO:
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('expiration', action.payload.expiration)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            localStorage.setItem('userName', action.payload.userName)
            localStorage.setItem('phone', action.payload.phone)
            localStorage.setItem('roleName', action.payload.roleName)
            localStorage.setItem('roleCode', action.payload.roleCode)
            return state.merge(fromJS(action.payload))
        case actions.CLEAR_USER_INFO:
            localStorage.removeItem('accessToken')
            localStorage.removeItem('expiration')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userName')
            localStorage.removeItem('phone')
            localStorage.removeItem('roleName')
            localStorage.removeItem('roleCode')
            return state.set('phone', '').set('roleCode', '').set('userName', '')
        default:
            return state
    }
}
