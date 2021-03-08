import {actions} from './actions'
import {fromJS} from 'immutable'

const defaultState = fromJS({
    loading: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actions.CHANGE_STATE:
            return state.merge(fromJS(action.payload))
        default:
            return state
    }
}
