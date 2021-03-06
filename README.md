#### SPA
* SPA 是 single page web application 的简称，译为单页Web应用。
* 简单的说 SPA 就是一个WEB项目只有一个 HTML 页面，一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转。 
* 取而代之的是利用 JS 动态的变换 HTML 的内容，从而来模拟多个视图间跳转。

#### 前端路由
* 作用
> 更改浏览器中的url，并修改页面内容。不会向后端发起请求(即url的改变不引起刷新,当然了,用户手动刷新是我们阻挡不了的)。
* 关键
> URL变化时，只是执行对应 js 代码，从而在前端渲染HTML内容，从而保证不同URL展示不同内容。也就是说浏览器在url变化时不需要向服务器发送任何请求。这与SSR（后端服务器直接渲染并返回完整的HTML页面）相反。具体参考[这里](https://www.zhihu.com/question/308792091/answer/573586609)
* 注意
> SPA下，浏览器不在URL变化时向后端发送请求，但是接口请求肯定还是要向后端发送的。

#### 刷新页面意味着什么?
> 向后端（服务器）发送了请求

#### hash模式
1. 任何情况下都能做前端路由
2. 作用
```
baidu.com/#1 展示1内容
baidu.com/#2 展示2内容

且由#1变为#2不会刷新页面(即只是路由变化,不发送请求)
```
3. 缺陷:SEO不友好
谷歌浏览器会认为
```
baidu.com/#1
baidu.com/#2
```
等效于
```
baidu.com
```
也就是说谷歌浏览器会把#后面的内容吃掉,导致服务器压根儿收不到请求及hash值(除非对服务器做特殊配置)

#### history模式
1. 只有一种情况下能做前端路由:后端将所有前端路由都渲染到同一个页面
2. IE8以下不支持history模式

#### 两种模式对比 
```
<a href="#1">go to 1</a> // hash模式，浏览器不会跳转页面
<a href="/1">go to 1</a> // history模式，浏览器会默认跳转页面
```

#### memory模式
* 适合非浏览器(比如APP),url不可分享
* 内容不由url决定,而是将路径存在localStorage(移动端会放在本地数据库)里面

#### 为什么使用history模式的前提是后端将所有前端路由都渲染到同一个页面
1. 前端路由是不同的url对应不同的展示内容，不需要服务器参与。
2. 但是当用户进行刷新时,浏览器并不知道运行的是SPA，它还默认为是传统的web应用——不同页面对应不同html。所以当用户进行刷新时，浏览器依然会向服务器发起请求，
3. 对于history模式,后端必须保证将所有前端路由都渲染到同一个页面，如 "http://www.abc.com/book/id"。如果后端缺少对"/book/id" 的路由处理，将返回 404 错误。Vue-Router 官网里如此描述：“不过这种模式要玩好，还需要后台配置支持……所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。”
如果后端不能做到这一点，就会有一种很尴尬的情况:我们在前端路由中设计url为http://www.abc.com/1,用于展示1对应内容，但是后端只登记了"http://www.abc.com/" 一种路由,没有登记"http://www.abc.com/1",那么将返回404页面。那么用户在"http://www.abc.com/1"这个url下手动刷新后，就会很生气了“明明我只是刷新了一下，咋就404了呢?垃圾网站”
5. 对于hash模式,不会有上述烦恼，因为浏览器在发送请求时会默认把#后面的内容吞掉，所以"http://www.abc.com#1"下执行刷新等价于"http://www.abc.com"。也就是说后端没有必要登记前端路由，反正传给服务器的都长一个样。


#### window.history.pushState();
1. [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)
2. 作用是修改 url 内容
2. 与 e.preventDefault(); 搭配在一起，在 history 模式下实现前端路由
```
<a class="link" href="/1">go to 1</a>
<a class="link" href="/2">go to 2</a>
<a class="link" href="/3">go to 3</a>
```
```
for(let a of allA){
  a.addEventListener('click',e=>{
    // 阻止a标签的默认行为（页面跳转）
    e.preventDefault();
    const href=a.getAttribute('href');
    // 修改 url 
    window.history.pushState(null,`page ${href}`,href);
    // 根据 url 动态渲染页面内容
    onStateChange(route);
  })
}
```



