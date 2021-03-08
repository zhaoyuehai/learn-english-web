import React, {Component} from 'react'
import {Button, Form, Input} from 'antd'
import 'moment/locale/zh-cn'

class WordAdd extends Component {

    onFinish = values => {
        let expendWordId = this.props.expendWordId
        if (expendWordId != null) {
            this.props.postWord({
                wordId: expendWordId,
                contentEN: values.english,
                contentCN: values.chinese
            }, this.props.reloadParams, true)
        } else {
            this.props.postWord({
                contentEN: values.english,
                contentCN: values.chinese,
                createTime: `${this.props.dateString}-01`
            }, this.props.reloadParams)
        }
        this.formRef.resetFields()
        this.inputRef.focus()
    }

    render() {
        let {expendWordId, postWordLoading} = this.props
        return <div style={{
            height: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Form ref={formRef => this.formRef = formRef} onFinish={this.onFinish} autoComplete='off'>
                <Form.Item name='english' label='English' rules={[{required: true}]} fieldContext=''>
                    <Input allowClear={true} ref={inputRef => this.inputRef = inputRef} autoFocus={true}/>
                </Form.Item>
                <Form.Item name='chinese' label='· Chinese' rules={[{required: expendWordId != null}]} fieldContext=''>
                    <Input allowClear={true}/>
                </Form.Item>
                <Form.Item fieldContext=''>
                    <Button htmlType='submit' type='primary' loading={postWordLoading} style={{width: '100%'}}>
                        添加
                    </Button>
                </Form.Item>
            </Form>
        </div>
    }
}

export default WordAdd
