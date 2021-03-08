[哔哩哔哩视频地址](https://www.bilibili.com/video/BV1GA411x7z1)
## 理解：
   - Promise是ES6规范里的新技术
   - 是JS进行异步编程的新解决方案【旧方案是单纯使用回调函数】
   - 从语法讲：Promise是一个构造函数
   - 从功能讲：用Promise对象来封装一个异步操作并获取他的最后结果 
   - Promise支持链式调用，解决回调地狱的问题。【回调地狱：不便于阅读；不便于异常处理，出现重复代码】
## 进行异步编程：【回调函数】
   - fs文件操作
   ```
    require('fs').readFile('./index.html',(error,data)=>{}) 
   ```
   - 数据库操作
   - Ajax
   ```
    $.get('api/v1/xxx',(data)=>{})
   ```   
   - 定时器
   ```
    setTimeout(()=>{},2000) 
   ```
## 使用：
   用Promise封装一个异步操作，在成功的时候调用resolve,失败调用reject   
   ```
    let p = new Promise((resolve,reject=>{
        setTimeout(()=>{
            let n = rand(1,100)
            if(n<=30){
                resolve(n) //把Promise对象的状态设置为成功
            }else{
                reject(n) //把Promise对象的状态设置为失败
            }
        }，1000)
    })
    //调用then方法
    p.then( value => {
        alert('中奖了')
    }, reason => {
        alert('谢谢惠顾')
    }) 
   ```
## Promise的状态属性【PromiseState】
   - **pending** 未决定的【初始化状态】
   - **resolved** / **fullfilled** 成功状态
   - **rejected** 失败状态
   - 状态只能改变一次

## Promise对象的值 【PromiseResult】
   - 保存着对象 成功/失败 的结果
   - resolve
   - reject
## Promise构造函数
   - executor函数：执行器 (resolve,reject)=>{}
   - resolve函数：内部定义成功时我们调用的函数
   - reject函数：内部定义失败时我们调用的函数
## Promise.prototype.then方法：
   - (onResolved,onRejected)=>{}
## Promise.prototype.catch方法：
   - (onRejected)=>{}
## Promise.resolve
## Promise.reject
## Promise.all
## Promise.race

## async函数和await表达式
   - async
        - 函数的返回值为Promise对象
        - Promise对象的结果由async函数执行的返回值决定
   - await
        - await右侧的表达式一般为Promise对象，但也可以是其他的值
        - 如果表达式是Promise对象，await返回的是Promise成功的值
        - 如果表达式是其他值，直接将此值作为await的返回值
   - await必须写在async函数中，但是async函数中可以没有await
   - 如果await的Promise失败了，就会抛出异常，需要try catch
   ```javascript
    const util = require('util')
    const mineReadFile = util.promisify(fs.readFile)
    
    async function main() {
      try {
        let data1 = await mineReadFile('./1.text') 
        let data2 = await mineReadFile('./2.text') 
        console.log(data1,data2)    
      }catch (e) {
        console.log(e)
      }
    }
    
    main()
   ```

