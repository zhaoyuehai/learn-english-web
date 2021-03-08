import React, {Component} from 'react'
import {
    Button,
    Checkbox,
    DatePicker,
    List,
    Modal,
    Popconfirm,
    Popover,
    Progress,
    Select,
    Space,
    Spin,
    Statistic,
    Tag
} from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {actions} from './store/actions'
import {connect} from 'react-redux'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import {
    AppstoreAddOutlined,
    BorderOutlined,
    CaretLeftFilled,
    CaretRightFilled,
    CheckSquareTwoTone,
    createFromIconfontCN,
    DeleteOutlined,
    EditOutlined,
    FrownOutlined,
    PieChartOutlined,
    PlusSquareOutlined,
    QuestionCircleOutlined,
    RollbackOutlined,
    SmileOutlined,
    SyncOutlined
} from '@ant-design/icons'
import iconFont from '../../../assets/fonts/iconfont'
import './style.less'
import WordEdit from "./WordEdit";
import WordAdd from "./WordAdd";

const IconFont = createFromIconfontCN({
    scriptUrl: iconFont
})
const dateFormat = 'YYYY-MM'
const startDate = '2020-05'
const colors = [
    'pink',
    'red',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
]

class WordStudy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateString: localStorage.getItem('word-dateString') || '2020-05',
            randomEnable: localStorage.getItem('word-randomEnable') !== 'false',
            showEN: localStorage.getItem('word-showEN') !== 'false',
        }
    }

    disabledDate(current) {
        return (current && current < moment(startDate, dateFormat)) || current > moment().endOf('day')
    }

    componentDidMount() {
        this.loadData({})
    }

    loadData({pageNum, dateString, randomEnable}) {
        let pn = pageNum ? pageNum : 1
        let dateStr
        if (dateString != null) {
            dateStr = dateString
            localStorage.setItem('word-dateString', dateStr)
        } else {
            dateStr = this.state.dateString
        }
        let enable
        if (randomEnable != null) {
            enable = randomEnable
            localStorage.setItem('word-randomEnable', enable)
        } else {
            enable = this.state.randomEnable
        }
        if (dateString != null || randomEnable != null) {
            this.setState({dateString: dateStr, randomEnable: enable})
        }
        this.props.loadWords(pn, dateStr, enable)
    }

    wordItem = (item, index, operateEnable, deleteLoading, checkedWord, showEN) => {
        let first = showEN ? item.contentEN : item.contentCN ? item.contentCN : item.contentEN
        let second = showEN ? item.contentCN : item.contentCN ? item.contentEN : null
        return operateEnable ?
            <Popover placement='right' trigger='hover' content={
                <span>
                    <Button type='primary' shape='circle' icon={<EditOutlined/>}
                            onClick={() => this.props.showEditWordModal(item)}/>
                    {'\u00a0\u00a0'}
                    <Button type='primary' icon={<AppstoreAddOutlined/>} onClick={() => {
                        this.props.showAddWordModal(item.id)
                    }}/>
                    {'\u00a0\u00a0'}
                    <Button loading={deleteLoading} type='danger' icon={<DeleteOutlined/>}
                            onClick={() => {
                                this.props.deleteWords([item.id])
                            }}/>
                </span>}>
                <Button icon={item.checked ? <CheckSquareTwoTone/> : <BorderOutlined/>}
                        size='large' onClick={() => {
                    checkedWord(index)
                }}>
                    {item.contentEN}{'\u00a0\u00a0'}{item.contentCN &&
                <Tag color={colors[index % 12]}>{item.contentCN}</Tag>}
                </Button>
            </Popover>
            :
            <Popover placement='right' trigger='click' content={
                item.expand ?
                    <Button type='primary' shape='circle' icon={<RollbackOutlined/>} onClick={() => {
                        this.props.expandWord(item.id, false, null)
                        let markUp = item.lastMarkUp
                        markUp != null && this.props.markWord(item.id, item.createTime, !markUp)
                    }}/>
                    :
                    <span>
                        <Button type='primary' shape='circle' icon={<SmileOutlined/>} onClick={() => {
                            this.props.expandWord(item.id, true, false)
                            this.props.loadExpandWord(item.id)
                            this.props.markWord(item.id, item.createTime, false)
                        }}/>
                        {'\u00a0\u00a0'}
                        <Button type='danger' shape='circle' icon={<FrownOutlined/>} onClick={() => {
                            this.props.expandWord(item.id, true, true)
                            this.props.loadExpandWord(item.id)
                            this.props.markWord(item.id, item.createTime, true)
                        }}/>
                    </span>}>
                <Button size='large' danger={item.lastMarkUp} onClick={() => {
                    if (item.expand) {
                        this.props.loadExpandWord(item.id)
                    }
                }}>
                    <b>{first}</b>{'\u00a0\u00a0'}{item.expand && second &&
                <Tag color={colors[index % 12]}>{second}</Tag>}
                </Button>
            </Popover>
    }

    render() {
        let {randomEnable, showEN, dateString,} = this.state
        let {
            pageNum, operateEnable, deleteEnable, changeOperateEnableState,
            getWordsLoading, hasMore, wordTotal, words, checkedWord,
            checkAllWord, deleteLoading, deleteWords, expendWordId,
            addWordVisible, showAddWordModal, hideAddWordModal, postWord, postWordLoading,
            editWord, editWordLoading, updateWord
        } = this.props
        let currentDate = moment(dateString, dateFormat)
        let leftBtnDisable = currentDate <= moment(startDate, dateFormat)
        let rightBtnDisable = currentDate >= moment(moment().format('YYYY-MM'), dateFormat)
        return (
            <div style={{background: 'white'}}>
                <div className='top-operate'>
                    <Space className='top-left'>
                        <Button icon={<IconFont type={randomEnable ? 'iconsuiji' : 'iconpaixu'}/>}
                                onClick={() => this.loadData({randomEnable: !randomEnable})}>
                            {randomEnable ? '随机展示' : '顺序展示'}</Button>
                        {!operateEnable &&
                        <Select defaultValue={showEN ? 'en' : 'cn'} style={{width: 120}} onChange={value => {
                            let isEN = value === 'en'
                            localStorage.setItem('word-showEN', isEN.toString())
                            this.setState({showEN: isEN})
                        }}>
                            <Select.Option value='en'>English</Select.Option>
                            <Select.Option value='cn'>中文</Select.Option>
                        </Select>}
                        <Button loading={getWordsLoading} type='primary' shape='circle' icon={<SyncOutlined/>}
                                onClick={() => this.loadData({})}/>
                    </Space>
                    <span>
                        <Button disabled={leftBtnDisable} shape='circle' icon={<CaretLeftFilled/>} onClick={() => {
                            this.loadData({dateString: currentDate.subtract(1, 'months').format(dateFormat)})
                        }}/>
                        <DatePicker style={{marginLeft: 10, marginRight: 10}} locale={locale} allowClear={false}
                                    dateFormat={dateFormat} picker='month' disabledDate={this.disabledDate}
                                    value={currentDate} onChange={(_date, dateString) => {
                            this.loadData({dateString: dateString})
                        }}/>
                        <Button disabled={rightBtnDisable} shape='circle' icon={<CaretRightFilled/>} onClick={() => {
                            this.loadData({dateString: currentDate.add(1, 'months').format(dateFormat)})
                        }}/>
                    </span>
                    <Statistic value={wordTotal ? `${words.length}/${wordTotal}` : words.length}
                               prefix={<PieChartOutlined/>}/>
                    <span className='top-right'>
                        {!operateEnable &&
                        <Button type='primary' shape='round' icon={<PlusSquareOutlined/>} style={{marginRight: 10}}
                                onClick={() => showAddWordModal()}>新增</Button>}
                        {!operateEnable && words.length > 0 &&
                        <Button type='primary' shape='round' icon={<EditOutlined/>} onClick={() => {
                            changeOperateEnableState(true)
                        }}>编辑</Button>}
                        {operateEnable && words.length > 0 && <span>
                            <Checkbox checked={checkAllWord} onChange={e => {
                                checkedWord(e.target.checked ? -1 : -2)
                            }}>全选</Checkbox>
                            <Popconfirm
                                disabled={!deleteEnable}
                                title='你确定要删除吗？'
                                placement='bottom'
                                icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                                onConfirm={() => {
                                    deleteWords(words.filter(word => word.checked).map(word => word.id))
                                }}
                                okText='确定'
                                cancelText='取消'
                            >
                                <Button danger type='primary' loading={deleteLoading} disabled={!deleteEnable}
                                        icon={<DeleteOutlined/>}
                                        style={{marginLeft: 10, marginRight: 10}}>删除
                                </Button>
                            </Popconfirm>
                            <Button onClick={() => {
                                changeOperateEnableState(false)
                            }}>取消</Button>
                        </span>}
                    </span>
                </div>
                <Progress className='progress' percent={wordTotal && wordTotal > 0 ? words.length * 100 / wordTotal : 0}
                          size='small'
                          showInfo={false} strokeWidth={2}/>
                <div className='list'>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={() => {
                            this.loadData({pageNum: pageNum + 1})
                        }}
                        hasMore={!getWordsLoading && hasMore}
                        useWindow={false}
                    >
                        <List
                            grid={{column: 5}}
                            dataSource={words}
                            renderItem={(item, index) => (
                                <List.Item style={{padding: 10}}>{
                                    this.wordItem(item, index, operateEnable, deleteLoading, checkedWord, showEN)
                                }
                                </List.Item>
                            )}
                        >
                            {getWordsLoading && hasMore && (
                                <div style={{padding: 20, textAlign: 'center'}}><Spin/></div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
                <Modal visible={editWord != null} destroyOnClose={true} closable={true} footer={null}
                       onCancel={() => {
                           this.props.showEditWordModal(null)
                       }}>
                    <WordEdit editWord={editWord} editWordLoading={editWordLoading} updateWord={updateWord}/>
                </Modal>
                <Modal visible={addWordVisible || expendWordId != null} title={addWordVisible ? '新增单词' : '派生联想'}
                       destroyOnClose={true} closable={true}
                       footer={null}
                       onCancel={() => hideAddWordModal()}>
                    <WordAdd
                        expendWordId={expendWordId}
                        postWordLoading={postWordLoading}
                        postWord={postWord}
                        dateString={dateString}
                        reloadParams={addWordVisible ? {
                            pageSize: pageSize, pageNum: 1,
                            dateString: dateString,
                            randomEnable: randomEnable
                        } : null}/>
                </Modal>
            </div>
        )
    }
}

const pageSize = 50

const mapDispatchToProps = (dispatch) => ({
    loadWords: (pageNum, dateString, randomEnable) => dispatch({
        type: actions.LOAD_WORDS, payload: {
            pageSize: pageSize,
            pageNum: pageNum,
            dateString: dateString,
            randomEnable: randomEnable
        }
    }),
    expandWord: (wordId, expand, lastMarkUp) => dispatch({
        type: actions.EXPAND_WORD, payload: {
            wordId: wordId,
            expand: expand,
            lastMarkUp: lastMarkUp
        }
    }),
    loadExpandWord: wordId => dispatch({type: actions.LOAD_EXPAND_WORD, payload: wordId}),
    changeOperateEnableState: operateEnable => dispatch({type: actions.WORDS_OPERATE_CHANGED, payload: operateEnable}),
    checkedWord: index => dispatch({type: actions.CHECKED_WORD, payload: index}),
    deleteWords: words => dispatch({type: actions.DELETE_WORDS, payload: words}),
    showEditWordModal: word => dispatch({
        type: actions.CHANGE_STATE, payload: {
            editWord: word
        }
    }),
    showAddWordModal: (wordId = null) => dispatch({
        type: actions.CHANGE_STATE, payload: {
            expendWordId: wordId,
            addWordVisible: wordId == null
        }
    }),
    hideAddWordModal: () => dispatch({
        type: actions.CHANGE_STATE, payload: {
            expendWordId: null,
            addWordVisible: false
        }
    }),
    markWord: (wordId, createTime, markUp) => dispatch({
        type: actions.MARK_WORD, payload: {
            wordId: wordId,
            createTime: createTime,
            markUp: markUp
        }
    }),
    postWord: (params, reloadParams, isExpandWord = false) => dispatch({
        type: actions.POST_WORD, payload: {
            isExpandWord: isExpandWord,
            params: params,
            reloadParams: reloadParams,
        }
    }),
    updateWord: params => dispatch({
        type: actions.UPDATE_WORD, payload: params
    }),
})

const mapStateToProps = (state) => ({
    ...state.word.toJS()
})

export default connect(mapStateToProps, mapDispatchToProps)(WordStudy)
