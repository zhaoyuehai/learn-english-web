[哔哩哔哩视频地址](https://www.bilibili.com/video/BV18s411E7Nd)

## ES-5

1. **严格模式 strict mode**

   - 全局或者函数的第一条语句定义为：'use strict';
   - 必须使用var声明变量【防止变量污染】
   - 禁止自定义函数中的this指向window
   - 创建eval作用域【eval('xxxx')  : 解析字符串里面的js代码】
   - 对象不能有重名的属性

2. **Json对象扩展**

   - js对象/数组转换为json对象/数组: `JSON.stringify(obj/arr)` 
   - json对象/数组转换为js对象/数组: `JSON.parse(json)`

3. **Object对象扩展方法**

   - Object.create(prototype,[descriptors]):以指定对象为原型创建新对象。为新的对象指定新的属性，并对属性进行描述。

     ```javascript
     var obj1 = {name:'Tom'}
     
     var obj2 = Object.create(obj1,{
     	sex:{
     		value:'男',//指定值
     		writable:true,//标识当前属性值是否可以修改，默认false
     		configurable:true,//标识当前属性值是否可以删除，默认false 
     		enumerable:true,//标识当前属性值是否可以用for in 枚举，默认false 
     	}
     })
     
     delete obj2.sex//删除属性
     //枚举属性
     for(var i in obj2){
     	console.log(i)
     }
     ```

   - Object.defineProperties(object,descriptors):为指定对象定义扩展多个属性。

     ```javascript
     var obj1 = {firstName:'Tim',lastName:'Ducan'}
     
     var obj2 = Object.defineProperties(obj1,{
         fullName:{
            //获取扩展属性值方法自动调用
            get: function(){
                return this.firstName+' '+this.lastName
            },
            //监听扩展属性，当扩展属性发生变化时，自动调用
            set: function(data){
                var names = data.split(' ')
                this.firstName = names[0]
                this.lastName = names[1]
            }
         }
     })
     ```

   - 对象本身的get/set方法

     ```javascript
     var obj = {
     	firstName:'Tim',
     	lastName:'Ducan',
     	get fullName(){
     		return this.firstName+' '+this.lastName
     	},
     	set fullName(data){
     		var names = data.split(' ')
             this.firstName = names[0]
             this.lastName = names[1]
         }
     }
     ```

4. **数组的扩展**

   - Array.prototype.indexOf(value) :  得到值在数组中的第一个下标
   - Array.prototype.lastIndexOf(value) : 得到值在数组中的最后一个下标
   - Array.prototype.forEach(function(item,index){}) : 遍历数组
   - Array.prototype.map(function(item,index){}) : 转换【返回新的数组】
   - Array.prototype.filter(function(item,index){}) : 过滤 【返回新的数组】

5. **函数的扩展**

   - Function.prototype.bind(obj) : 将函数内的this绑定为obj，并将函数返回
   - bind() / call() / apply()区别：
     - 都能指定函数中的this;
     -  call() /  apply()是立即调用函数; bind()是将函数返回。
     - call和apply的传参形式不同：```function  foo(data){}; foo.call(obj,33);foo.apply(obj,[33]) ``` apply第二个参数必须是数组。
     - bind()传参方式同call一样

## ES6

1. **let关键字**：块作用域内有效；不能重复声明；不会预处理，不存在变量提升；

   - 预处理：js预解析：提前寻找var function 
   - 应用：循环遍历、监听

2. **const关键字**：定义一个常量。不能修改，其他同let。

3. **变量的解构赋值**：从对象或者数组中提取数据，并赋值给变量（一个或者多个）

   ```javascript
   //对象的解构赋值
   let obj = {name:'kobe', age:39}
   let {name, age} = obj 
   //数组的解构赋值
   let arr = [1, 'hi', true]
   let [a, b] = arr
   let [,,c] = arr //,,占位置 【根据位置匹配值】
   ```

4. **模板字符串** ```  let name = 'kobe'; let s= `你好，我是${name}!` ```

5. **简化的对象写法** 

   ```javascript
   let name = 'kobe'
   let age =39
   let obj = {
   	name,//同名的属性可以省略不写
   	age,
   	getName(){//可以省略函数的function
   		return this.name
   	}
   }
   ```

6. **箭头函数**

   - 特点
     - 简洁
     - 没有自己的this，在定义的时候所处的对象就是它的this

   ```javascript
   //箭头函数
   //let fun = function(){
   //     console.log('hello')
   //}
   let fun1 = () => console.log('hello')//当函数体只有一条语句或者表达式的时候，{}大括号可省略，此时会自动return
   let fun2 = a => console.log(a)//只有一个形参时候()括号可以省略，两个及以上形参时候不可省略
   ```

7. **...运算符**

   ```javascript
   //1.rest(可变)参数，用来取代arguments
   function fun(...values){//function fun(a, ...values){   
   }
   fun(1,2,3)
   //2.扩展运算符
   let arr1 = [1,3,5]
   let arr2 = [2,...arr1,6]
   arr2.push(...arr1)
   console.log(...arr1)
   ```

8. **形参默认值**

   `function fun(x=0, y=0){ ... }//当不传入参数的时候，使用默认值0`

9. **Promise**

   - ES6的Promise是一个构造函数，用来生成promise实例
   - 代表了未来某个将要发生的事件【通常是一个异步操作】
   - promise对象可以将异步操作以同步的流程表达出来，避免了回调地狱

10. **Symbol**

    - ES5的对象的属性名都是字符串，容易重名，污染环境

    - ES6添加了原始数据类型Symbol【String,Number,Boolean,null,undefined】+【对象】

    - Symbol是唯一的，解决命名冲突

    - Symbol不能与其他数据进行计算、字符串拼接

    - for in, for of 不会遍历Symbol属性

    - 定义常量

      ```javascript
      let symbol = Symbol()
      let obj = {}
      obj[symbol] = 'hello'
      ```

11. **Iterator遍历器**

    - iterator是一种接口机制，为各种不同的数据提供统一的访问机制
    - 使得数据结构的成员能够按某种次序排列
    - ES6创造了for...of遍历命令，Iterator接口主要供for...of消费
      ```
      let set = Set([1,3,3,5])
      for(let i of set){
        console.log(i)  //1 3 5
      }
      ```  
    - Iterator:
      ```javascript
        function myIterator(arr){
          let nextIndex = 0
          return{
              next:function (){
                  return nextIndex<arr.length? {value:arr[nextIndex++], done:false} : {value:undefined, done:true}
              }
          }  
      }
      ```
    - Symbol.iterator
    - 对象的Symbol.iterator属性指向遍历器对象
        ```javascript
        let obj = {}
        obj[Symbol.iterator] = function* f(){
                yield 1
                yield 3
                yield 5
            }
        for(x of obj){
            console.log(x)
        }
        ```
 
12. **Generator函数**
    
    - ES6提供的解决异步编程的方案之一
    - Generator函数是一个状态机，内部封装了不同状态的数据
    - 用来生成遍历器对象
    - 可暂停函数（惰性求值），yield可暂停，next可启动，每次返回的是yield后的表达式结果
        ```javascript
        function* myGenerator(){
            let result = yield 'hello'
            yield 'generator' //reslut => 123
            return '结果'
        }
        let mG = myGenerator()//返回的是指针对象
        let res1 = mG.next()
        let res2 = mG.next('123')//
        mG.next()
        ```
13. **async await【ES-8】**
    
    - ES2017，Generator的语法糖，真正意义上解决异步回调的问题，同步流程表达异步操作
    - 语法：
        ```javascript
          async function foo(){
              await console.log('...')//异步操作    
              await console.log('...')//异步操作    
          }
          foo().then(value=>{})
        ```
    - async函数返回的总是Promise对象，可以用then方法进行下一步
    - async不需要调用next方法
    
14. **class**

    - class定义类
    - constructor定义构造方法
    - new 来创建类的实例
    - extends 来实现类的继承
    - super 调用父类的构造方法
    - 子类重写父类的方法
    
15. **module**
    
16. **字符串扩展**
    
    - includes(str) 判断是否包含指定的字符串
    - startWitch(str) 判断是否以指定字符串开头
    - endWitch(str) 判断是否以指定字符串结尾
    - repeat(count) 重复指定次数 `let str = 'ab'; console.log(str.repeat(2));//abab`
    
17. **数值扩展**
    
    - 二进制0b 八进制0o //0b1010 : 10 ; 0o56 : 46
    - Number.isFinite(i) 判断是否是有限大的数
    - Number.isNaN(i) 判断是否是NaN
    - Number.isInteger(i) 判断是否是整数 
    - Number.parseInt(str) 将字符串转换为对应的数值
    - Math.trunc(i) 去除小数部分
        ```javascript
        Number.isInteger(123.0)//-> true 
        Number.parseInt('123abc123')//-> 123
        Number.parseInt('a123abc123')//-> NaN
        ```
    
18. **数组的扩展**
    
    - Array.from(v) 将伪数组对象或者可遍历对象转换为真数组
    - Array.of(v1,v2,v3) 将一系列值转换成数组
    - arr.find(function(value,index){... return ture}) 找出第一个满足条件返回true的元素
    - arr.findIndex(function(value,index){... return ture}) 找出第一个满足条件返回true的元素下标
    
19. **对象的扩展**
    
    - Object.is(v1,v2) 判断两个值是否是相同的值【其实是以字符串形式比较】
        ```javascript
            0 == -0 //true
            NaN == NaN //false
            Object.is(0,-1) //false  
            Object.is(NaN,NaN) //true  
        ```
    - Object.assign(target, source1, source2..) 将源对象的属性复制到目标对象上
    - 直接操作 `__proto__` 属性
        ```javascript
            let obj1 = {}
            let obj2 = {name : 'Tom'}
            obj1.__proto__ = obj2 //obj2是obj1的父类【原型】
        ```
20. **深度克隆**
    
    -  拷贝数据的方法：
        - 直接赋值给一个变量【基本数据类型时，修改不会影响原数据】【浅拷贝】
        - Object.assign()【浅拷贝】
        - Array.prototype.concat()【浅拷贝】
        - Array.prototype.slice()【浅拷贝】
        - JSON.parse(JSON.stringify()) **【深拷贝】** 深拷贝的数据里不能有函数（支持obj和arr）。函数拷贝过去是null
            ```javascript
            let obj1 = {}
            let obj2 = Object.assign(obj1)
            let arr1 = []
            let arr2 = arr.concat()//连接个空
            let arr3 = arr.slice()//相当于截取整个数组
            ```
        - typeof判断数据类型：String,Number,Boolean,Undefined,Object,Function
        - Object.prototype.toString().call(obj)
            ```javascript
            let result ='abcd'
            console.log(Object.prototype.toString.call(result).slice(8,-1))//String
            //String.prototype.slice(x,-1)//-1 指最后一个元素，-2 指倒数第二个元素
            ```
        - for in 遍历对象(属性名)/数组(下标)
            ```javascript
            let obj ={name: 'Tom', age: 20}
            for(let x in obj){//打印属性：name age
              console.log(x)  
            }
            ```
        -   深度克隆实现：
            ```javascript
            function checkedType(target){
                return Object.prototype.toString.call(target).slice(8,-1)
            }   
            function clone(target) {
              let result, targetType =checkedType(target)
              if(targetType === 'Object'){
                result = {}
              }else if(targetType === 'Array'){
                result = []
              }else {
                return target
              }
              for(let x in target){
                let value = target[x]
                if(checkedType(value) === 'Object' || checkedType(value) === 'Array'){
                    result[x]= clone(value)
                }else{
                    result[x] = value
                }
              }
              return result  
            }
            ```
21. **Set,Map容器**
    
    - Set:无序不可重复
        - Set(array)
        - add(value)
        - delete(value)
        - has(value)
        - clear()
        - size
    -Map:无序的key,key-value
        - Map(array)
            `new Map([['name','Tom'],[1,'hh'']])`//二维数组
        - set(key,value)
        - get(key)
        - delete(key)
        - has(key)
        - clear()
        - size

## ES-7

1. **ES7**
    - 指数运算符 `console.log(3 ** 3)`
    - `Array.pototype.includes(value) //判断数组中是否包含指定value`
