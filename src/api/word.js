import {get, post, put} from '@/util/request'

export const selectWord = (pageNum, pageSize, dateString) => get(`/api/v1/word/words/${pageNum}/${pageSize}/${dateString}`)
export const selectExpandWord = wordId => get(`/api/v1/word/expand/${wordId}`)
export const insertWord = data => post('/api/v1/word', data)
export const insertExpandWord = data => post('/api/v1/word/expand', data)
export const updateWord = data => put('/api/v1/word', data)
export const delWords = data => put('/api/v1/word/delete', data)
export const markWord = data => post('/api/v1/word/mark', data)
export const selectMarkWords = (pageNum, pageSize, dateString) => get(`api/v1/word/marks/${pageNum}/${pageSize}${dateString ? `/${dateString}` : ''}`)
export const selectLearnRecords = () => get('api/v1/word/learn/records')
