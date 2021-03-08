import React, {Component} from 'react'
import {Button, Form, Input} from 'antd'

class WordEdit extends Component {

    onFinish = values => {
        this.props.updateWord({
            contentEN: values.english,
            contentCN: values.chinese,
            id: this.props.editWord.id
        })
    }

    render() {
        let {editWord, editWordLoading} = this.props
        return <div style={{
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Form onFinish={this.onFinish} autoComplete='off'>
                <Form.Item name='english' label='English' initialValue={editWord && editWord.contentEN}
                           rules={[{required: true}]} fieldContext=''>
                    <Input allowClear={true} autoFocus={editWord && editWord.contentCN != null}/>
                </Form.Item>
                <Form.Item name='chinese' label='· Chinese' initialValue={editWord && editWord.contentCN}
                           fieldContext=''>
                    <Input allowClear={true} autoFocus={editWord && editWord.contentCN == null}/>
                </Form.Item>
                <Form.Item fieldContext=''>
                    <Button htmlType='submit' type='primary' loading={editWordLoading} style={{width: '100%'}}>
                        修改
                    </Button>
                </Form.Item>
            </Form>
        </div>
    }
}

export default WordEdit
