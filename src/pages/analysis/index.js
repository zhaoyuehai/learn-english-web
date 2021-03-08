import React, {Component} from "react";
import {selectLearnRecords, selectMarkWords} from "@/api/word";
import {Button, DatePicker, List, Progress, Spin, Statistic, Tag} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";
import {SyncOutlined} from "@ant-design/icons";

const colors = [
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'lime',
]
const pageSize = 40
const dateFormat = 'YYYY-MM'
const startDate = '2020-05'

class Analysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dateString: null,
            pageNum: 1,
            total: 0,
            expandIds: new Set(),
            markWords: [],
            records: []
        }
    }

    componentDidMount() {
        this.loadData(this.state.pageNum, this.state.currentDate)
        selectLearnRecords().then(res => {
            if (res.code === '10000') {
                this.setState({
                    records: res.data
                })
            }
        })
    }

    disabledDate(current) {
        return (current && current < moment(startDate, dateFormat)) || current > moment().endOf('day')
    }

    loadData = (pageNum, dateString) => {
        this.setState({
            dateString: dateString,
            loading: true,
            expandIds: pageNum > 1 ? this.state.expandIds : new Set()
        })
        selectMarkWords(pageNum, pageSize, dateString).then(res => {
            if (res.code === '10000') {
                this.setState({
                    pageNum: pageNum,
                    total: res.data.total,
                    markWords: pageNum > 1 ? this.state.markWords.concat(res.data.dataList) : res.data.dataList,
                    loading: false
                })
            } else {
                this.setState({
                    loading: false
                })
            }
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }

    wordItem = (item, index, expandIds) =>
        <Button size='large' onClick={() => {
            if (!expandIds.has(item.id)) {
                expandIds.add(item.id)
                this.setState({
                    expandIds: expandIds,
                })
            }
        }}>
            <b style={{color: `rgba(255,0,0,${item.markCount / 3 > 1 ? 1 : item.markCount / 3})`}}>{item.contentEN}</b>{'\u00a0\u00a0'}
            {expandIds.has(item.id) && <Tag color={colors[index % 6]}>{item.contentCN}</Tag>}
        </Button>

    render() {
        let {loading, pageNum, total, markWords, records, dateString, expandIds} = this.state
        let hasMore = total !== 0 && markWords.length < total
        return <div style={{padding: 10, display: "flex"}}>
            <div style={{flex: 4,}}>
                <div
                    style={{display: "flex", padding: "0 10px", flexDirection: "row", justifyContent: "space-between"}}>
                    <Statistic value={`${expandIds.size} - ${total}`}/>
                    <span><Button style={{marginRight: 10}} loading={loading} type='primary' shape='circle'
                                  icon={<SyncOutlined/>}
                                  onClick={() => this.loadData(1, dateString)}/>
                    <DatePicker locale={locale} picker='month' dateFormat={dateFormat}
                                disabledDate={this.disabledDate}
                                onChange={(_date, dateString) => {
                                    this.loadData(1, dateString)
                                }}/>
                    </span>
                </div>
                <Progress className='progress' percent={total && total > 0 ? markWords.length * 100 / total : 0}
                          size='small'
                          showInfo={false} strokeWidth={2}/>
                <div style={{
                    flex: 3, overflow: 'auto',
                    height: 500,
                }}>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={() => {
                            this.loadData(pageNum + 1, dateString)
                        }}
                        hasMore={!loading && hasMore}
                        useWindow={false}>
                        <List
                            grid={{column: 5}}
                            dataSource={markWords}
                            renderItem={(item, index) => (
                                <List.Item style={{padding: 10}}>{
                                    this.wordItem(item, index, expandIds)
                                }
                                </List.Item>
                            )}>
                            {loading && hasMore && (
                                <div style={{padding: 20, textAlign: 'center'}}><Spin/></div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </div>
            <div style={{flex: 1, marginLeft: 10}}>
                <List bordered dataSource={records} renderItem={
                    item => <List.Item>{`${item.createTime.substr(0, 10)} : 学习${item.count}个单词`}</List.Item>
                }/>
            </div>
        </div>
    }
}

export default Analysis
