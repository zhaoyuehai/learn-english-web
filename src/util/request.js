import axios from 'axios'
import {loginUrl} from "@/api/login";

const instance = axios.create({baseURL: localStorage.getItem('baseUrl') || 'http://localhost', timeout: 5000})

// Add a request interceptor
//发送请求之前执行此拦截器
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        if (config.url !== loginUrl) {
            config.headers['authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        }
        return config
    },
    function (error) {
        // Do something with request =>Promise.reject(error)
        return Promise.reject(error)
    }
)

// Add a response interceptor
//  请求返回之后执行
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    }
)

export const setBaseUrl = newBaseUrl => {
    instance.defaults.baseURL = newBaseUrl
}

export const getBaseUrl = () => instance.defaults.baseURL

export const request = (url, method, headers, data) => instance.request({url, method, headers, data})

/**
 * get请求
 * @param {*} url     请求地址
 // * @param {*} params
 */
export const get = (url) => instance.get(url)
// export const get = (url,params) => instance.get(url, {params})

/**
 * post请求
 * @param {*} url     请求地址
 * @param {*} data
 */
export const post = (url, data) => instance.post(url, data)


/**
 * put请求
 * @param {*} url     请求地址
 * @param {*} data
 */
export const put = (url, data) => instance.put(url, data)


/**
 * delete请求
 * @param {*} url
 * @param {*} data
 */
export const del = (url, data) => instance.delete(url, data)

