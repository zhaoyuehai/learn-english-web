## ajax请求

**ajax请求**是一种特别的http请求。浏览器发请求，**只有XHR或者fetch发出的才是ajax请求。**

- 一般请求：浏览器一般会直接显示响应体数据
- ajax请求：【ajax引擎发送的请求】浏览器不会对界面进行任何更新操作，只是调用监视的回调函数并传入响应相关数据。

## XMLHttpRequest

   - XHR对象是现代浏览器用于在后台与服务器交换数据。【可以使用JSON、XML、HTML和text文本等格式发送和接收数据】

   - XHR是一个对象:

        - Event handler: onloadstart | onprogress | onabort | onerror | onload | ontimeout | onloadend | onreadstatechage
        - ReadState: unsent(0) | opened(1) | headers received(2) | loading(3) | done(4)
        - Request Concept: open | setRequestHeader | timeout | send | abort | withCrendtials等都属于请求概念
        - Response Concept: responseURL | status | response 等都属于响应概念

   - XHR缺点：

        - 使用起来繁琐需要设置很多值；

        - 早期IE浏览器需要写兼容代码。

          ```javascript
          if(window.XMLHttpRequet){
              xhr = new XMLHttpRequest()
          }else if(window.ActiveXObject){
              xhr = new ActiveXObject('Microsoft.XMLHTTP')
          }
          ```

- **JQuery** 里面的ajax请求就是对XMLHttpRequest对象的封```$.ajax...``` 

  - 对原生XHR的封装做了兼容处理，简化了使用。增加了对JSONP的支持，可简单处理部分跨域。

   - **axios**是封装了XMLHttpRequest。基于Promise。

   - 如果一个XHR对象的state是opened/received/loading或者注册有 Event listeners 则不会被GC

   - axios在执行完一次请求后会对request置null，这样就可以被GC了

     ```javascript
     axios({
     	method: 'post',
     	url: 'x/xx/user',
     	data: {
     		x:'xx'
     	}
     })
     .then(res => {})
     .catch(err => {})
     ```

     ## fetch

     **fetch** 【fetch：拿来 fetching：吸引人】是XHR的一种替代方案，没有使用XMLHttpRequest对象。是原生js，使用Promise。

     - fetch 将400，500都当作成功的请求，即返回的Promise不会标记为reject，仅当网络故障或请求被阻止🚫时才会标记为reject。需要封装去处理。
     - fetch默认不带cookie。
     - fetch 无法原生检测请求进度，而XHR可以。

## ajax封装

```javascript
function axios({
    url,
    method='GET',
    params={},
    data={}
}){
	return new Promise((resolve, reject) => {
        let queryString
        Object.keys(params).forEach(keu => {
            queryString += `${key}=${params[key]}&`
        })
        if(queryString){//id=1&xx=yyy
            queryString = queryString.substring(0,queryString.length-1)
        	url += '?' + queryString
        }
        // 创建xhr对象
        let request = new XMLHttpRequest()
        // 打开连接
        request.open(method,url,true)
        // 发送请求
        if(method==='GET' || method==='DELETE'){
            request.send()
        }else if(method==='POST' || method==='PUT'){
             request.setRequestHeader('Content-Type','application/json;charset=utf-8')
             request.send(JSON.stringify(data))
        }
        // 监听状态改变
        request.onreadystatechange = function(){
            if(request.readyState!==4){ // 请求没有完成
                return 
            }
            let {status, statusText} = request
            // 如果响应状态码在[200，300]之间代表成功，否则失败
            if(status>=200 && status<=299){
                let response = {
                    data: JSON.parse(request.response),
                    status,
                    statusText
                }
                resolve(response)
            }else{
                reject(new Error('request error status is '+ status))
            }
        }
    })
}
```



- 跨域问题：【cors跨域】
  - OPTIONS 预检请求，询问服务器是否允许跨域，增删改的请求才有必要。
  - GET请求不需要预检是否跨域，GET只是获取数据不修改数据。
## axios
    专门的、轻量级的ajax请求库。
- 特点：
  - 基于Promise的异步ajax请求库
  - 浏览器/node都可以用
  - 支持请求/响应拦截器
  - 支持请求取消
  - 请求/响应数据转换
  - 批量发送多个请求
- 
