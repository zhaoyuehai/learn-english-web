import {call, put, takeLatest} from 'redux-saga/effects'
import {actions} from './actions'
import {delWords, insertExpandWord, insertWord, markWord, selectExpandWord, selectWord, updateWord} from '@/api/word'
import {message, notification} from 'antd'

function* loadWords(action) {
    yield put({type: actions.CHANGE_STATE, payload: {...action.payload, getWordsLoading: true}})
    try {
        let response = yield call(selectWord, action.payload.pageNum, action.payload.pageSize, action.payload.dateString)
        if (response.code === '10000') {
            yield put({
                type: actions.LOAD_WORDS_SUCCESS,
                payload: {
                    total: response.data.total,
                    dataList: action.payload.randomEnable ? response.data.dataList.sort(randomSort) : response.data.dataList
                }
            })
        } else {
            yield put({type: actions.CHANGE_STATE, payload: {getWordsLoading: false}})
            message.error(response.message)
        }
    } catch (e) {
        yield put({type: actions.CHANGE_STATE, payload: {getWordsLoading: false}})
        message.error(e.message)
    }
}

function randomSort(_a, _b) {
    return Math.random() > .5 ? -1 : 1
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

/**
 *添加单词
 * isExpandWord? 新增联想扩展单词 : 新增学习单词
 */
function* addWord(action) {
    yield put({type: actions.CHANGE_STATE, payload: {postWordLoading: true}})
    try {
        let response = yield call(action.payload.isExpandWord ? insertExpandWord : insertWord, action.payload.params)
        if (response.code === '10000') {
            message.success('添加成功')
            yield put({type: actions.POST_WORD_SUCCESS, payload: action.payload})
            let p = action.payload.reloadParams
            if (p != null) {
                yield put({type: actions.LOAD_WORDS, payload: p})
            }
        } else {
            message.error(response.message)
            yield put({type: actions.CHANGE_STATE, payload: {postWordLoading: false}})
        }
    } catch (e) {
        message.error(e.message)
        yield put({type: actions.CHANGE_STATE, payload: {postWordLoading: false}})
    }
}

/**
 *修改单词
 */
function* editWord(action) {
    yield put({type: actions.CHANGE_STATE, payload: {editWordLoading: true}})
    try {
        let response = yield call(updateWord, action.payload)
        if (response.code === '10000') {
            message.success('修改成功')
            yield put({type: actions.UPDATE_WORD_SUCCESS, payload: action.payload})
        } else {
            message.error(response.message)
            yield put({type: actions.CHANGE_STATE, payload: {editWordLoading: false}})
        }
    } catch (e) {
        message.error(e.message)
        yield put({type: actions.CHANGE_STATE, payload: {editWordLoading: false}})
    }
}

/**
 *批量删除
 */
function* deleteWords(action) {
    yield put({type: actions.CHANGE_STATE, payload: {deleteLoading: true}})
    try {
        let response = yield call(delWords, action.payload)
        if (response.code === '10000') {
            message.success('删除成功')
            yield put({type: actions.DELETE_WORDS_SUCCESS, payload: action.payload})
        } else {
            message.error(response.message)
            yield put({type: actions.CHANGE_STATE, payload: {deleteLoading: false}})
        }
    } catch (e) {
        message.error(e.message)
        yield put({type: actions.CHANGE_STATE, payload: {deleteLoading: false}})
    }
}

/**
 *标记单词
 */
function* mark(action) {
    try {
        yield call(markWord, action.payload)
    } catch (e) {
    }
}

/**
 *获取派生联想
 */
function* expandWord(action) {
    try {
        let response = yield call(selectExpandWord, action.payload)
        if (response.code === '10000') {
            let content = ''
            response.data.forEach(word => {
                content = content + word.contentEN + ':' + word.contentCN + ';\u00a0\u00a0\u00a0\u00a0\u00a0'
            })
            content && notification.open({
                message: '派生联想',
                placement: 'bottomRight',
                description: content
            })
        }
    } catch (e) {
    }
}

export function* watchWord() {
    yield takeLatest(actions.LOAD_WORDS, loadWords)
    yield takeLatest(actions.POST_WORD, addWord)
    yield takeLatest(actions.DELETE_WORDS, deleteWords)
    yield takeLatest(actions.UPDATE_WORD, editWord)
    yield takeLatest(actions.LOAD_EXPAND_WORD, expandWord)
    yield takeLatest(actions.MARK_WORD, mark)
}
