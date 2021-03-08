import React, {Component} from 'react'
import {Button, Card, Form, Input} from 'antd'
import {connect} from 'react-redux'
import {actions} from './store/actions'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import BaseUrlForm from "./BaseUrlForm";
import {getBaseUrl} from "@/util/request";

class Login extends Component {

    render() {
        let {loading, phoneLogin} = this.props
        return (
            <div>
                <BaseUrlForm/>
                <div style={{height: 600, display: 'flex', justifyContent: 'center', justifyItems: 'center'}}>
                    <Card style={{width: 300, height: 250, marginTop: 200}}>
                        <Form
                            name='normal_login'
                            onFinish={values => {
                                localStorage.setItem('baseUrl', getBaseUrl())
                                phoneLogin(values)
                            }}
                        >
                            <Form.Item
                                name='phone'
                                rules={[{required: true, message: 'Please input your phone number!',},]}>
                                <Input
                                    prefix={<UserOutlined className='site-form-item-icon'/>}
                                    placeholder='手机号'
                                />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                rules={[{required: true, message: 'Please input your password!',},]}>
                                <Input.Password
                                    prefix={<LockOutlined className='site-form-item-icon'/>}
                                    type='password'
                                    placeholder='密码'/>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    style={{width: '100%'}}
                                    loading={loading}
                                    type='primary' htmlType='submit'>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                        <a style={{float: 'left'}} href='http://localhost:3000/'>注册</a>
                        <a style={{float: 'right'}} href='http://localhost:3000/'>忘记密码?</a>
                    </Card>
                </div>
            </div>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    phoneLogin: values => dispatch({type: actions.PHONE_LOGIN, payload: values}),
    baseUrlEditEnable: editBaseUrlEnable => dispatch({
        type: actions.CHANGE_STATE,
        payload: {editBaseUrlEnable: editBaseUrlEnable}
    }),
})

const mapStateToProps = (state) => ({
    ...state.login.toJS()
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
