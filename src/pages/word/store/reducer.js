import {fromJS} from 'immutable'
import {actions} from './actions'

const defaultState = fromJS({
    operateEnable: false,
    deleteEnable: false,
    checkAllWord: false,
    deleteLoading: false,
    getWordsLoading: false,
    pageNum: 0,
    hasMore: true,
    wordTotal: null,
    words: [],
    editWord: null,
    editWordLoading: false,
    expendWordId: null,
    addWordVisible: false,
    postWordLoading: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actions.CHANGE_STATE:
            return state.merge(fromJS(action.payload))
        case actions.LOAD_WORDS_SUCCESS:
            let dataList = action.payload.dataList
            let wordTotal = action.payload.total
            let newState = state.set('getWordsLoading', false)
                .set('hasMore', dataList.length === state.get('pageSize'))
                .set('checkAllWord', false)
                .set('wordTotal', wordTotal)
            if (wordTotal === 0) {
                newState = newState.set('operateEnable', false)
            }
            if (state.get('pageNum') > 1) {
                return newState.set('words', state.get('words').concat(dataList))
            } else {
                return newState.set('words', dataList)
                    .set('deleteEnable', false)
                    .set('checkAllWord', false)
            }
        case actions.POST_WORD_SUCCESS:
            return state.set('postWordLoading', false)
                .set('contentEN', '')
                .set('contentCN', '')
        case actions.WORDS_OPERATE_CHANGED:
            if (action.payload) {
                return state.set('operateEnable', true)
            } else {//取消操作，需要清空已选
                let words = JSON.parse(JSON.stringify(state.get('words'))).map(word => {
                    word.checked = false
                    return word
                })
                return state.set('operateEnable', false)
                    .set('deleteEnable', false)
                    .set('words', words)
                    .set('checkAllWord', false)
            }
        case actions.CHECKED_WORD:
            // let words = state.get('words')//只更新checked字段时，ui未刷新:::::直接赋值是万恶之源
            let words = JSON.parse(JSON.stringify(state.get('words')))//深copy
            let deleteEnable = false
            let checkAll = true
            if (action.payload === -1 || action.payload === -2) {//-1:全选 -2:全不选
                checkAll = action.payload === -1
                deleteEnable = checkAll
                words = words.map(word => {
                    word.checked = checkAll
                    return word
                })
            } else {
                let word = words[action.payload]
                word.checked = !word.checked
                words.forEach(element => {
                    if (element.checked) {
                        deleteEnable = true
                    } else {
                        checkAll = false
                    }
                })
            }
            return state.set('words', words)
                .set('deleteEnable', deleteEnable)
                .set('checkAllWord', checkAll)
        case actions.UPDATE_WORD_SUCCESS:
            return state.set('words', JSON.parse(JSON.stringify(state.get('words').map(word => {
                if (action.payload.id === word.id) {
                    word.contentEN = action.payload.contentEN
                    word.contentCN = action.payload.contentCN
                }
                return word
            })))).set('editWord', null)
                .set('editWordLoading', false)
        case actions.EXPAND_WORD:
            return state.set('words', JSON.parse(JSON.stringify(state.get('words').map(word => {
                if (action.payload.wordId === word.id) {
                    word.expand = action.payload.expand
                    word.lastMarkUp = action.payload.lastMarkUp
                }
                return word
            }))))
        case actions.DELETE_WORDS_SUCCESS:
            let newWords = state.get('words').filter(word => !action.payload.includes(word.id))
            let newDeleteEnable = false
            newWords.forEach(element => {
                if (element.checked) {
                    newDeleteEnable = true
                }
            })
            return state.set('words', JSON.parse(JSON.stringify(newWords)))
                .set('deleteLoading', false)
                .set('deleteEnable', newDeleteEnable)
        default:
            return state
    }
}
