import React, {Component} from 'react'
import {Button, message, Upload} from "antd"
import {UploadOutlined} from '@ant-design/icons'
import {getBaseUrl} from "@/util/request";

const uploadProps = {
    name: 'file',
    action: `${getBaseUrl()}/api/v1/file/upload`,
    headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
}

class Setting extends Component {
    render() {
        return <div style={{padding: '20px'}}>
            <Upload {...uploadProps} >
                <Button type='primary' icon={<UploadOutlined/>}>上传文件</Button>
            </Upload>
        </div>
    }
}

export default Setting
