import {fromJS} from "immutable";
import {actions} from './actions'

const defaultState = fromJS({
    banners:[],
    personalizedList:[],
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actions.CHANGE_STATE:
            return state.merge(fromJS(action.payload))
        default:
            return state
    }
}
