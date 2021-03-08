import {combineReducers} from 'redux'
import {reducer as commonReducer} from '@/common/store'
import {reducer as loginReducer} from '@/pages/login/store'
import {reducer as wordReducer} from '@/pages/word/store'
import {reducer as musicReducer} from '@/pages/music/store'

export default combineReducers({
    common: commonReducer,
    login: loginReducer,
    word: wordReducer,
    music: musicReducer
})
