import React, {Component} from 'react'
import Login from '@/pages/login'
import {connect} from 'react-redux'
import MainHeader from './MainHeader'
import {actions as commonActions} from '@/common/store/actions'
import {Layout, Menu} from 'antd'
import {Link, Switch, withRouter} from 'react-router-dom'
import moment from 'moment'
import {FlagOutlined, HeartOutlined, SettingOutlined, StockOutlined} from '@ant-design/icons'
import {Redirect} from "react-router";
import RouterConfig from "@/common/routers";
import './index.less'

const {Header} = Layout

class Main extends Component {
    render() {
        const accessToken = localStorage.getItem('accessToken') || ''
        const expiration = localStorage.getItem('expiration') || ''
        if (accessToken && expiration && moment().isBefore(moment(Number(expiration)))) {//token未过期
            let selectedKey = '/'
            let pathname = this.props.history.location.pathname
            if (pathname.length > 1) selectedKey += pathname.split('/').filter(e => e)[0]
            return <Layout className='main'>
                <Header className='main-header'>
                    <Menu theme="dark" mode="horizontal"
                          selectedKeys={[selectedKey]}>
                        <Menu.Item key="/" icon={<FlagOutlined/>}><Link
                            to='/'>学习</Link></Menu.Item>
                        <Menu.Item key="/analysis" icon={<StockOutlined/>}><Link
                            to='/analysis'>记录</Link></Menu.Item>
                        <Menu.Item key="/music" icon={<HeartOutlined/>}><Link
                            to='/music'>网抑云</Link></Menu.Item>
                        <Menu.Item key="/setting" icon={<SettingOutlined/>}><Link
                            to='/setting'>设置</Link></Menu.Item>
                    </Menu>
                </Header>
                <MainHeader {...this.props} />
                <div className='main-content'>
                    <Switch>
                        {RouterConfig}
                        <Redirect from='/*' to='/'/>
                    </Switch>
                </div>
            </Layout>
        } else {
            return <Login/>
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch({type: commonActions.CLEAR_USER_INFO}),
})

const mapStateToProps = (state) => ({
    ...state.common.toJS()
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
