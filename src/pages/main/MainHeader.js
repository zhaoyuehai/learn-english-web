import React, {Component} from 'react'
import {Button, Tag} from 'antd'
import {CrownOutlined, LogoutOutlined, SmileOutlined} from '@ant-design/icons'

class MainHeader extends Component {

    render() {
        let {userName, phone, roleName} = this.props
        return <div style={{
            padding: 10,
            position: 'absolute',
            right: 0,
            top: 0,
        }}>
            <Tag color="magenta" icon={roleName === 'ROOT' ? <CrownOutlined/> : <SmileOutlined/>}>{userName}</Tag>
            <Tag color="blue">{phone}</Tag>
            <Button danger type='primary' size='small' icon={<LogoutOutlined/>} onClick={() => {
                this.props.signOut()
            }}/>
        </div>
    }
}

export default MainHeader
