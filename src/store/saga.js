import {all} from 'redux-saga/effects'
import {watchLogin} from '@/pages/login/store/saga'
import {watchWord} from '@/pages/word/store/saga'
import {watchMusic} from '@/pages/music/store/saga'

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchWord(),
        watchMusic()
    ])
}
