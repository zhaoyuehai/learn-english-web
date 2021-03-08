import {request} from '@/util/request'
import {Base64} from "js-base64";
import {stringify} from "qs";

export const loginUrl = '/api/v1/user/login'
export const login = (phone, password) =>
    request(loginUrl,
        'post',
        {'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'},
        stringify({
            phone: phone,
            password: Base64.encode(password),
        }))
