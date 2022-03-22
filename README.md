









# 说明：

**npm install请切换到app目录下安装**

# 视频：

[黑马程序员Node.js全套入门教程，nodejs最新教程含es6模块化+npm+express+webpack+promise等_Nodejs实战案例详解_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1a34y167AZ?spm_id_from=333.337.search-card.all.click)

# 配套资料：

尚品汇：

https://gitee.com/jch1011/shangpinhui_0415.git

[Swagger UI](http://39.98.123.211:8216/swagger-ui.html)



# 疑问&需要改进的地方

#### 1.二次封装axios

[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=15)

#### 2.Promise awit async

[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=19)5:50秒左右 

#### 3.能自己写原生的节流和抖动

#### 4.引用animate.css模块快速划过“全部商品”，然后停留，就鬼畜了……

#### 6.search组件里面如果keyword面包屑和其他面包屑冲突咋办？

#### 7.分页器全局组件中间部分，同时使用了v-for和v-if。怎么避免？

#### 8.手写分页器

#### 9.重写VueRouter.prototype原型对象身上的push|replace方法

#### 10.实现放大镜

[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=67&spm_id_from=pageDriver)

#### 11.向响应头添加数据

[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=74&spm_id_from=pageDriver) 36分开始

很想知道后台是如何实现的

#### 12.array.forEach，array.every

#### 14.delete请求

#### 15.$event,event

#### 16.后台根据手机号如何向用户发送验证码？

#### 17.后台是怎么在用户登录后发送token进行标识的？

#### 18.务必重点看看uuid和token在本项目中的应用

#### 19.微信支付后台如何实现？

#### 20.务必重点看看微信支付弹出二维码那一节

#### 22.关于地址栏的问题

如何防止用户通过地址栏进入不该进入的页面。见第十一天第二点bug描述

#### 23.vue基础还要认真学习学习，还有很多地方不清楚原理，很多指令不知道怎么用，一定要坚持写笔记！



#### （复习时发现的问题）

#### 1.什么时候把静态资源放在public文件夹下？

#### 2.关于对外暴露的问题

#### 4.节点dataset属性

#### **5.search组件里,watch监听$route属性，为什么searchParams在控制台内始终显示为空？**



# 第一天

#### 1.脚手架搭建项目

vue create 项目名即可创建一个vue项目,前提是配好webpack+node.js环境详见

[尚硅谷Vue2.0+Vue3.0全套教程丨vuejs从入门到精通_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=61)

#### 2.分析项目结构

node_modules:放置项目依赖的地方

public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面

src：程序员源代码文件夹

 -----assets文件夹：经常放置一些静态资源（一般为全局静态资源），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）

 -----components文件夹:一般放置非路由组件（或者项目共用的组件）

​    App.vue 唯一的根组件

​    main.js 入口文件【程序最先执行的文件】

​    babel.config.js:babel配置文件

​    package.json：看到项目描述、项目依赖、项目运行指令

​    README.md:项目说明文件

#### 3.项目的其它配置

##### 3.1项目启动自动打开浏览器：

package.json下

```JS
 "scripts": {

  "serve": "vue-cli-service serve --open",这个地方加上--open

  "build": "vue-cli-service build",

  "lint": "vue-cli-service lint"

 },
```

##### 3.2关闭eslint校验工具:

根目录下创建vueconfig.js文件

```JS
module.exports = {
   lintOnSave:false,
}
```

##### 3.3src文件夹的别名的设置：

因为项目大的时候src（源代码文件夹）：里面目录会很多，找文件不方便，设置src文件夹的别名的好处，找文件会方便一些

创建jsconfig.json文件

```JS
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"以后@就相当于src了
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist" 在这两个文件夹下面不能使用@别名
    ]
}
```

注意如果在css里要用到别名，要在别名前加一个~





#### 4.路由配置

**一般路由组件写在pages文件夹下(view)需要自己创建。**

安装路由:

 cnpm install --save vue-router          --save:可以让你安装的依赖，在package.json文件当中进行记录.

**关于npm和cnpm的说明**

[npm 和 cnpm 的区别，你真的搞懂了嘛 - 爱看星星的稻草人 - 博客园 (cnblogs.com)](https://www.cnblogs.com/chase-star/p/10455703.html)

**然后我们在src下创建router/index.js在里面写我们的路由配置。(后期路由配置太多，也可以把index.js拆开。比如当前项目就拆开了一个routes.js)**

#### 5.less

项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法

##### 5.1安装less less-loader@5

切记less-loader安装5版本的，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义

##### 5.2需要在style标签的身上加上lang="less",不添加样式不生效

#### 6.路由元信息

定义路由的时候可以配置 `meta` 字段：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

我们可以用这个meta字段里面配置的键值对来进行v-if或者v-show判断是否显示组件

使用的时候：

```xml
<Footer v-show="this.$route.meta.show"></Footer>这样就可以根据元信息里的show键判断该不该显示foot组件了
```

#### 7.路由传参



简单说**params参数通过网址反映就是一连串/来传参**

**query就是?后接参数，=连接多个参数**

路由传递参数先关面试题

   1、路由传递参数（对象写法）path是否可以结合params参数一起使用?

   不可以：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！



   2、如何指定params参数可传可不传

   配置路由的时候在占位符后面加一个?

详见[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=9)

10:00开始



   3、params参数可以传递也可以不传递，但是如果传递是空串，如何解决？

   如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题。这个时候可以用undefine解决

​	

```JS
this.$router.push({
        name:'search',//注意这个地方需要路由组件配置name属性
        params:{
          keyword:""||undefine
        },
        query:{
          k:this.keyword.toUpperCase()
        }
      })
```



​    4、路由组件能不能传递props数据?

可以，有三种写法

```JS
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}
	
	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	 //第三种写法很强大，有简写形式详见
	 //   https://www.bilibili.com/video/BV1Zy4y1K7SH?p=124 13:30左右
	props(route){//route这个参数是$route
		return {
			id:route.query.id,
			title:route.query.title
		}
	}

}
```

   这部分详见[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=9)

# 第二天

#### 1.编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?

![image-20211218161028743](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211218161028743.png)

注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。

这种异常，对于程序没有任何影响的。

为什么会出现这种现象:

由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,

第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调

第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

解决方法见[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=10&spm_id_from=pageDriver)

说实话我感觉没必要解决这个问题的

#### 2.将Home组件的静态组件拆分

##### 2.1静态页面（样式）

##### 2.2拆分静态组件

##### 2.3发请求获取服务器数据进行展示

##### 2.4开发动态业务

拆分组件：结构+样式+图片资源

一共要拆分为七个组件

#### 3.postman测试接口：

#### 4.二次封装axios：

axios二次封装:
XMLHttpRequest、fetch、JQ、axios
为什么需要进行二次封装axios?
请求拦截器、响应拦截器：请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器，当服务器数据返回以后，可以处理一些事情
在项目当中经常API文件夹【axios】
接口当中：路径都带有/api
baseURL:"/api" I
有的同学axios基础不好，可以参考git|NPM关于axios文档

**在src下创建api文件夹，在里面创建request.js**

```JS
//对于axios进行二次封装
import axios from "axios";


//1：利用axios对象的方法create，去创建一个axios实例
//2:request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
  //要在vue.config里配置好代理服务器
    //代表请求超时的时间5S
    timeout:5000,
});


//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
//config：配置对象，对象里面有一个属性很重要，header请求头
    return config;
})


requests.interceptors.response.use((res)=>{
//成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
},(error)=>{
//失败的回调函数
    return Promise.reject(new Error("faile"));
})


//对外暴露
export default requests;

```

#### 5.接口统一管理

项目很小：完全可以在组件的生命周期函数中发请求项目大：axios.get('xxx') I

##### 5.1跨域问题

什么是跨域：协议、域名、端口号不同请求，称之为跨域

在vue.config.js配置下

![image-20211220133706249](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220133706249.png)

#### 6.nprogress进度条的使用

##### 6.1安装

cnpm install --save nprogress 

##### 6.2使用

app\src\api\request.js下

```JS
import nprogress from "nprogress"

//如果出现进度条没有显示：一定是你忘记了引入样式了

import "nprogress/nprogress.css";

//start表示进度条开始 done表示结束
```

在请求拦截器里面：

```JS
requests.interceptors.request.use((config)=>{
  nprogress.start()//进度条开始
  return config;
})
```

响应拦截器里面：

```JS
requests.interceptors.response.use((res)=>{
//成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
  nprogress.done()//进度条结束
  return res.data;
},(error)=>{
//失败的回调函数
  return Promise.reject(new Error("faile"));
})
```

这样我们每次请求开始就会有进度条，响应开始进度条就结束

![image-20211218183314480](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211218183314480.png)

##### 6.3修改样式

进度条样式可以改的，但是需要改别人的源码nprogress/nprogress.css的样式

![image-20211218183849675](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211218183849675.png)

#### 7.vuex模块使用

##### 7.1安装

cnpm install --save vuex

##### 7.2创建

创建src/store/index.js

##### 7.3编写

```JS
import Vue from "vue";
import Vuex from 'vuex'
//使用Vuex插件一次
Vue.use(Vuex)
//state (厨房)存储数据的地方
const state={}
//actions (服务员)处理action,可以在这里书写自己的业务逻辑，也可以处理异步
const actions={}
//mutations (厨师)处理state数据的唯一手段
// 一般把mutations里写的方法写成大写，用于区分actions中的方法
const mutations={}
//getters 理解为计算属性，用于简化仓库数据,让组件获取仓库数据更方便
const getters={}
//对外暴露Store类的一个实例
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
```

##### 7.4注册

![image-20211219154829683](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211219154829683.png)

##### 7.5模块化开发

###### 7.5.1拆分小仓库

分别创建store/home/index.js和store/search/index.js,内容一样

```JS
const state={}

const actions={}

const mutations={}

const getters={}

export default{
    state,
    actions,
    mutations,
    getters
}
```

###### 7.5.2整合小仓库

```JS
import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)
//引入小仓库
import home from './home'
import search from './search'
export default new Vuex.Store({
    modules:{
        home,
        search
    }
})
```

#### 8.完成TypeNav三级联动展示数据

##### 8.1编写小仓库home

```JS
import {reqCategoryList} from '@/api/index'
const state={
    //这个地方的数据类型不要乱写，要根据接口文档写合适的数据类型
    categoryList:[]
}
const actions={
    //这个地方的 async await还不清楚作用
    async categoryList(context){
        let result=await reqCategoryList();
      //这个地方的result本质就是：前台通过axios传递给后台的这条请求的结果
        if(result.code==200){
            //如果请求成功，那么服务员把后端请求到的数据交给大厨
            context.commit('CATEGORYLIST',result.data)
        }
    }
}
const mutations={
    CATEGORYLIST(state,value){
        state.categoryList=value
    }
}
const getters={}
export default{
    namespaced:true,//开启命名空间
    state,
    actions,
    mutations,
    getters
}
```

![image-20211219180748465](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211219180748465.png)

##### 8.2TypeNav发出请求

###### 8.2.1把作为全局组件的TypeNav移动到compents下

###### 8.2.2编写TypeNav组件

```html
<script>
import {mapState} from 'vuex'
export default {
    name:'TypeNav',
    //组件一挂载完毕，就向服务器发送请求
    mounted() {
      this.$store.dispatch('home/categoryList')//使用命名空间后一定要指明是向哪个模块的服务员发送
    },
    computed:{
      ...mapState('home',['categoryList'])//使用命名空间后一定要指明是向哪个模块的服务员发送
    }
};
</script>
```

##### 8.3用v-for改写html

![image-20211219194033386](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211219194033386.png)

# 第三天

#### 1.TypeNav一级分类鼠标响应添加背景色

##### 1.1用css

![image-20211219195424715](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211219195424715.png)

##### 1.2用JS

![image-20211219202934211](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211219202934211.png)

![image-20211219202802957](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211219202802957.png)

![image-20211219202852170](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211219202852170.png)

#### 2.控制2,3级分类的显示与隐藏

![image-20211219203454173](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211219203454173.png)

改用js

![image-20211219204057585](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211219204057585.png)

#### 3.函数抖动

##### 3.1问题

![image-20211220134425799](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220134425799.png)

如果业务逻辑过多，浏览器就会来不及计算，出现卡顿现象

##### 3.2防抖

防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发,只会执行最后一次

使用Lodash插件解决

官方文档[lodash.debounce | Lodash 中文文档 | Lodash 中文网 (lodashjs.com)](https://www.lodashjs.com/docs/lodash.debounce)

![image-20211220140023635](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220140023635.png)

##### 3.3节流

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

![image-20211220140755918](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220140755918.png)

![image-20211220140915519](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220140915519.png)

官方文档：[lodash.throttle | Lodash 中文文档 | Lodash 中文网 (lodashjs.com)](https://www.lodashjs.com/docs/lodash.throttle)



#### 4.完成三级联动节流

##### 4.1引入lodash

这个插件node_modules下已经有了，最好按需引入

##### 4.2编写

![image-20211220141902698](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220141902698.png)

#### 5.三级联动路由传参到search

##### 5.1第一种声明式导航:为什么使用router-link组件的时候，会出现卡顿那？

这种方法相当于给每一个商品类别绑定了一个rotuer-link

router-link是一个组件：相当于VueComponent类的实例对象。快速滑动鼠标，一瞬间new VueComponent很多实例（1000+），很消耗内存，因此导致卡顿。

##### 5.2第二种编程式导航

这种方法相当于给每一个商品类别绑定了一个a标签

通过给a标签绑定事件，在事件里面进行push。这种也不是最好，因为有很多个a标签，链接过多

##### 5.3编程式导航+事件委派

![image-20211220143622640](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220143622640.png)

但这样也有很多问题，我们一个一个解决

有两个问题

![image-20211220143920025](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220143920025.png)

###### 5.3.1自定义属性解决

我们给一二三级联动都加上两个自定义属性：data-categoryName和data-categoryId1(这里只演示一级的，二三级改下名字)

![image-20211220152552976](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220152552976.png)

![image-20211220152813991](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220152813991.png)

![image-20211220153132429](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220153132429.png)

由此解决了a标签的问题。

参数问题通过第二个属性data-categoryId1拼接下也可以解决

```js
//路由跳转到search
      //1.如何确定点击a标签才会跳转
      //2.如何给这些a标签传参，以获取不同路由参数
      goSearch(event){
        //获取当前事件节点
        let element=event.target
        //节点有个dataset属性，可以获取节点的自定义属性和自定义值
        let {categoryname,categoryid1,categoryid2,categoryid3}=element.dataset
        //如果标签上有categoryName肯定是a标签，有categoryid1肯定是一级联动，二三级同理
        let location={name:'search'}
        let query={categoryName:categoryname}
        
        if(categoryname){
          if(categoryid1){
              //注意大小写问题
           query.categoryId1=categoryid1
          }else if(categoryid2){
            query.categoryId2=categoryid2
          }else{
            query.categoryId3=categoryid3
          }
        }
        //整理完参数
        location.query=query
        this.$router.push(location)
        // console.log(location);
      }
```

![image-20211220153318794](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211220153318794.png)

#### 6.为search路由组件集成TypeNav全局组件

##### 6.1直接使用

##### 6.2出现问题

![image-20211221171454161](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211221171454161.png)

##### 6.3解决问题

###### 6.3.1增加show属性

![image-20211221172554607](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211221172554607.png)

###### 6.3.2动态使用show

![image-20211221172635590](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211221172635590.png)

这样我们的TypeNav在home里就会直接显示，在search里会隐藏

![image-20211221172700558](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211221172700558.png)

###### 6.3.3鼠标滑动移除后TypeNav隐藏问题

我们希望在home里，鼠标滑动移除后TypeNav显示，而在search里的TypeNav鼠标滑动移除后隐藏

![image-20211221173036873](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211221173036873.png)

![image-20211221173348883](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211221173348883.png)

!(C:\Users\18284\AppData\Roaming\Typora\typora-user-images\image-20211221173111367.png)

最后达成的效果就是home里的TypeNav一上来就展示，而且鼠标划出一级标题后，TypeNav不会隐藏

而在search里的TypeNav一上来不展示一级标题，而且鼠标划出一级标题后，TypeNav会隐藏

##### 6.4过渡动画

我们想在TypeNav一级目录显示时，有一段动画效果。这个地方我使用的是第三方的animate.css库，和老师不一样。注意只有有v-show或v-if的标签才能使用动画

详见[尚硅谷Vue2.0+Vue3.0全套教程丨vuejs从入门到精通_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=94)

##### 6.4.1安装

cnpm install --save animate.css

##### 6.4.2使用

引用

```JS
import 'animate.css'
```

![image-20211221181151770](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211221181151770.png)

#### 7.TypeNav三级联动性能优化

发现一个问题来回跳转home和search组件会不断发送请求

![image-20211221182215723](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211221182215723.png)

我们把这行代码写在根组件App的mounted里就行了

# 第四天

#### 1.合并query和params参数

我们希望得到的效果是这样，用户在搜索框搜索的数据(用的params)和在三级联动(用的query)中选择的数据，可以一起作为参数传过去，这就需要合并参数。

![image-20211222131038188](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222131038188.png)

![image-20211222131112118](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222131112118.png)

这两个if不用也行。而且注意，由于这两个location他们的name都是search，并且分别写了

```JS
location.query = this.$route.query;和
location.params = this.$route.params;
```

所以才会更新

#### 2.开发ListContainer

##### 2.1使用mockjs模拟数据

###### 2.1.1安装

cnpm install --save mockjs

###### 2.1.2创建文件

![image-20211222135820578](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222135820578.png)

###### 2.1.3准备图片

把mock数据需要的图片放到public文件夹中，（public文件夹打包的时候，会把相应的资源原封不动打包到dist文件夹中）

###### 2.1.4创建mockServe.js文件



```js
//先引入mockjs模块
import Mock from 'mockjs';
//把JSON数据格式引入进来[JSON数据格式根本没有对外暴露，但是可以引入]
//webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json';
import floor from './floor.json';

//mock数据:第一个参数请求地址   第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大的轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor});

```

###### 2.1.5引用一次

main.js里面import

###### 2.1.6准备封装axios

新建文件

![image-20211222142158378](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222142158378.png)

```JS
//这个文件和request.js几乎一样，只改了baseURL和对外暴露名
import axios from "axios";
import nprogress from "nprogress"
import "nprogress/nprogress.css";

const mockRequests = axios.create({
    baseURL:"/mock",
    timeout:5000,
});
mockRequests.interceptors.request.use((config)=>{
    nprogress.start()//进度条开始
    return config;
})
mockRequests.interceptors.response.use((res)=>{
    nprogress.done()//进度条结束
    return res.data;
},(error)=>{
    return Promise.reject(new Error("faile"));
})


//对外暴露
export default mockRequests;
```

不要忘记修改api下的index.js

```JS
import requests from './request'
import mockRequests from './mockAxios'
//三级联动接口
///api/product/getBaseCategoryList get 无参数
export const reqCategoryList=()=>{
    //这里就不用写全api/product/getBaseCategoryList因为requests已经处理好基础路径了
    return requests({url:'product/getBaseCategoryList',method:'get'})
}

export const reqGetBannerList=()=>{
    return mockRequests({url:'/banner',method:'get'})
}
```

###### 2.1.7使用一下mock封装的假请求

我们在ListContainer里发送请求到仓库的服务员那里

![image-20211222144601078](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222144601078.png)

在仓库里写好对应的函数名

![image-20211222144706652](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222144706652.png)

![image-20211222144801914](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222144801914.png)

接下来，我们和以前一样把vuex完善好，最好不要忘记使用mapState取出来，这部分就不截图了，和以前一样的

##### 2.2准备开发轮播图

###### 2.2.1使用swipper插件

测试一下(这是在官网抄的)[Swiper使用方法 - Swiper中文网](https://www.swiper.com.cn/usage/index.html)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/swiper.js"></script>
    <link rel="stylesheet" href="css/swiper.min.css">
    <style>
        .swiper-container{
            width: 600px;
            height: 300px;
        }  
    </style>
</head>

<body>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
    </div>
    <script>
        							//这个参数
        var mySwiper = new Swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        })
    </script>
</body>

</html>
```



![image-20211222180754841](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222180754841.png)

也就是说第一个参数也可以是真实dom

###### 2.2.2安装

cnpm install --save swiper@5

###### 2.2.3使用

我们在ListContainer里面写好v-for,写好对应的swiper所需的必要结构，正确引入swiper

![image-20211222163254602](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222163254602.png)

正确引入swiper,要引入相关js和css

![image-20211222161345749](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222161345749.png)

在写必要的swiper js代码时，遇见了一个问题，不知道在什么时机写，因为涉及到异步请求数据和v-for遍历数据的问题。

具体来说是因为swiper需要等待页面结构初始化完成，才生效。但是我们有一个v-for里面在用axios获取后台数据，这就产生了问题。

![1](https://gitee.com/feng-chengxiang/picture/raw/master/img/1.png)

我们目前用两个不是很好的办法解决。

1、写在update里，这样如果有其他数据发生改变会重复使用js代码不好 

2、写在定时器里，这样也不好，因为不好确定异步请求时间

###### 2.2.4解决问题

使用watch发现还是不行

使用watch只能保证数据由空变化到有数组，但不能保证v-for执行完了

![image-20211222164147517](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222164147517.png)

![image-20211222164555010](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222164555010.png)

#### 3.开发floor组件

和开发ListContainer组件差不多，也是使用mockjs请求假数据，然后vuex。这里有个不同的地方，就是我们发给仓库服务员dispatch的方法要写在home组件里不能写在floor组件里，因为我们用了两次floor组件。然后我们mockjs里面也是传的两套结构一样内容不一样的json，所以在home使用floor组件时用v-for遍历，再使用props传递参数给子组件floor，以便于后续操作。

![image-20211222173101914](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222173101914.png)

###### 3.1动态展示数据

可以看到请求返回的数据结构，（我们用的mockjs，其实就是我们floor.json里面的数据）下面我们一个一个替换(这里只展示关键的)。

我们都是通过父组件穿给我们的list也就是props属性来收数据

![image-20211222181314560](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222181314560.png)

![image-20211222181517415](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222181517415.png)

原因是因为，我们是通过props来接收数据的，这和以前不同，swiper需要的结构一定是建立好了的，所以可以直接卸载mouted里，不用像以前用watch+$nextTick的方式

![image-20211222182906298](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222182906298.png)

![image-20211222182953028](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211222182953028.png)

#### 4.提取出公共的轮播图组件

我们发现在ListContainer和floor中都会用到轮播图，于是我们把它抽取出来做成一个公共组件。注意红字部分

![image-20211223153340175](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211223153340175.png)

![image-20211223154000264](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211223154000264.png)

![image-20211223154049637](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211223154049637.png)

# 第五天

**有两个地方可以到达search模块，一个是公共组件TypeNav里面的三级联动，这部分是传递的query参数；**

**另一个地方是header组件的搜索按钮，它传递的是params参数**

详见第四天第1节内容

#### 1.search模块开发

还是那几套路

###### 1.1.先静态页面+拆分静态组件

这个老师都拆分好了

###### 1.2.发请求api

注意这次请求要传参数

```JS
//这个请求要传参数,默认参数至少是一空对象
export const reqGetSearchInfo = (params) => {
    return requests({ url: '/list', method: 'post', data:params })
}
```



###### 1.3.vuex三连环

和以前一样，但这次我们为了简化仓库数据，用了getters

```JS
const getters={
    goodsList(state){
        return state.searchList.goodsList
    },
    attrsList(state){
        return state.searchList.attrsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    }
}
```



###### 1.4.动态展示数据

和以前一样用v-for，把mapGetters里面的数据遍历出来

###### 1.5注意事项

![image-20211224175130576](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211224175130576.png)

![image-20211224175252209](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211224175252209.png)

Object.assign:这个就是把this.$route.query和this.$route.params的键值对转到this.searchParams上

这个发请求的问题我们后面跟着再解决。

**然后就是params单词不要拼错了！！！！！！！！我找了好久的错**

###### 1.6完成search子组件SearchSelector开发

这里老师都封装好了，我们只需动态展示数据就行。我们直接到仓库里捞数据就行，不用发请求了。然后v-for遍历出来就行

###### 1.7解决search发送请求次数问题

我们之前写的只能发送1次请求，但是我们的参数是在动态发生变化的，这部分逻辑见**第四天第一点**

![image-20211224182706156](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211224182706156.png)

![image-20211225013404843](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211225013404843.png)

注意请求发完以后，一定要把3个商品ID清空，防止出现这种情况：用户第一次点击一个一级联动，正确返回结果：如果用户再点击一个二级联动，那么searchParms里上一次的categoryId1就还存在，这一次的categoryId2也存在，这显然是一种错误的情况。我们在这里清空后，具体工作流程是这样的：

用户第一次点进来(通过搜索栏或者home的三级联动)，这个时候路由信息正确改变，详见第四天第一点。首先会触发beforeMount里的内容，也就是把路由参数合并下(注意不要把params写错了！！！)，searchParams参数正确。然后会触发mounted函数内容，也就是发送一次请求。这个地方要注意，如果用户不刷新，或者点出去又点进来search路由组件，beforeMount和mounted两个生命周期函数就不执行了。那么接下来，如果用户再次点击搜索框或者三级联动，就会触发watch监听函数，因为$route里面的params或者query改变了。watch函数先再次合并一下正确的参数searchParams，然后发送请求，接着把searchParams的三个商品ID清空。注意这个地方如果用户下次再次点击搜索框或者三级联动触发watch时，searchParams就不会有上一次searchParams残留的商品ID了，就只含有新的的parms或者新的query的参数了，这就是把searchParams的三个商品ID清空的作用

#### 2.分类面包屑

就是这个东西

![image-20211227164829659](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227164829659.png)

![image-20211227165018693](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227165018693.png)

![image-20211227165041570](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227165041570.png)

这里我们还可以顺便改变地址栏

![image-20211227170527506](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227170527506.png)

#### 3.关键字面包屑

这个地方大部分和分类面包屑一样

![image-20211227171716781](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227171716781.png)

![image-20211227171742927](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227171742927.png)

但是我们还想加一个需求，就是用户点击删除关键字后，搜索框里的内容置空。这就涉及到serach组件与header组件两个兄弟组件之间的通讯，这里我们使用全局事件总线$bus解决

###### 3.1注册全局事件总线

![image-20211227172137094](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227172137094.png)

###### 3.2使用$bus

在search组件里

![image-20211227174555719](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227174555719.png)

在header组件里

![image-20211227174624703](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227174624703.png)

在header组件里

![image-20211227181534064](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227181534064.png)

最后我们像在分类面包屑一样，处理下地址栏就行了

![image-20211227182022187](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211227182022187.png)

#### 4.点击品牌重发请求

需求:我们点击search子组件searchSelector中的品牌，可以正确向后台发送请求

###### 4.1绑定单击事件

![image-20211229143246598](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229143246598.png)

###### 4.2子向父传数据

![image-20211229143343963](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229143343963.png)

父组件触发回调

![image-20211229143419059](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229143419059.png)

![image-20211229143446843](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229143446843.png)

演示

![image-20211229143547513](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229143547513.png)

###### 4.3父组件发送请求

格式

![image-20211229143946008](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229143946008.png)

整理参数

![image-20211229144957978](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229144957978.png)

处理品牌面包屑

![image-20211229145053245](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229145053245.png)

![image-20211229145114279](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229145114279.png)

品牌面包屑必须用v-if不用v-show。原因:删除品牌后trademark是undefined，而undefined肯定不能split进行分割。所以这段逻辑直接v-if不予渲染代码，v-show虽然也能不进行展示，但是代码还是存在会报错。因为v-show只是display:none

#### 5.点击售卖属性发送请求

###### 5.1注意参数

接口格式

![image-20211229150240663](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229150240663.png)

![image-20211229150416923](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229150416923.png)

代码查看3个参数

![image-20211229150929348](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229150929348.png)

![image-20211229150949383](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229150949383.png)

![image-20211229151022272](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229151022272.png)

###### 5.2传参

这个地方和4.1大体一样也是用自定义事件的方法传参，这里我就只展示父组件search自定义事件的回调了

![image-20211229153018651](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229153018651.png)

###### 5.3面包屑处理



![image-20211229155122579](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229155122579.png)

测试时发现错误

props数组不能有重复元素

![image-20211229155208324](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229155208324.png)

![image-20211229155229103](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229155229103.png)

又发现一个错误，删除分类面包屑之后也要把，售卖属性和品牌置空。这样更符合逻辑

![image-20211229155630653](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229155630653.png)

# 第六天

#### 1.排序

###### 1.1参数

![image-20211229163344499](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229163344499.png)

也就是说总共只有4种：

1:desc,1:asc,2:desc,2:asc

###### 1.2优化显示

![image-20211229165820913](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229165820913.png)

![image-20211229165856671](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229165856671.png)

接下来我们优化下箭头样式，在阿里图标里面找

详细操作见

[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=50&spm_id_from=pageDriver)24分10秒

![image-20211229171944987](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229171944987.png)

![image-20211229172014442](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229172014442.png)

isOne判断order里面有无1，如果有那么就是综合可以给综合添加背景色，综合的箭头也可以显示，isTwo同理

isAsc判断order里面有无asd，如果有那么就是升序，对应箭头显示升序，isDesc同理

###### 1.3点击综合或价格可触发请求

![image-20211229175340621](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229175340621.png)

![image-20211229175400389](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211229175400389.png)

#### 2.分页器

概述：
为什么很多项目采用分页功能：比如电商平台同时展示的数据有很多(1万+)，采用分页功能.ElementUI是有相应的分页组件，使用起来超级简单，但是咱们前台项目目前不用【掌握自定义分页功能】
分页器展示，需要哪些数据(条件)？
需要知道当前是第几个：pageNo字段代表当前页数
需要知道每一个需要展示多少条数据：pagesize字段进行代表
需要知道整个分页器一共有多少条数据：total字段进行代表---[获取另外一条信息：一共多少页]需要知道分页器连续页码的个数：5|7【奇数】，以为奇数对称(好看)
总结：对于分页器而言，自定义前提需要知道四个前提条件。
pageNo：当前第几个
pageSize：代表每一页展示多少条数据
total：代表整个分页一共要展示多少条数据
continues:代表分页连续页码个数
举例子：每一页3条数据 一共91条数据 【一共是31页】





我们把分页器做成一个全局组件，拆分全局组件步骤和以前一样，见

静态资源见下

```vue
<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>
    
    <button>···</button>
    <button>9</button>
    <button>下一页</button>
    
    <button style="margin-left: 30px">共 60 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>


```

###### 2.1分页器参数计算

![image-20211230163024204](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211230163024204.png)

子组件计算参数步骤:(父子组件通过props传参数)

```js
 export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
      //总共多少页
      totalPage(){
        //向上取整
        return Math.ceil(this.total/this.pageSize)
      },
      //连续页码的起始页和终止页
      startAndEndPage(){
          // 先定义两个变量
          let start=0,end=0;
          //非正常现象1：连续页比总页数多
          if(this.continues>this.totalPage){
            start=1,
            end=this.totalPage
          }else{
            start=this.pageNo-parseInt(this.continues/2)
            end=this.pageNo+parseInt(this.continues/2)
            // 非正常现象2：start出现非正数
            if(start<1){
              start=1,
              end=this.continues
            }
            // 非正常现象3：end>总页数
            if(end>this.totalPage){
              end=this.totalPage,
              start=this.totalPage-this.continues+1
            }
          }
          return {start,end}
      }
    }
  }
```

###### 2.2动态展示分页器

![image-20211230165825517](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211230165825517.png)

###### 2.3发送请求

设计子(全局分页组件)父(search组件)通信，使用自定义事件

父组件search里

![image-20211230180215720](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211230180215720.png)

![image-20211230180324351](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211230180324351.png)

子组件全局分页组件里

![image-20211230180630347](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211230180630347.png)

完整代码

```vue
<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startAndEndPage.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startAndEndPage.start > 2">···</button>

    <!-- 中 -->
    <button
      v-for="(page, index) in startAndEndPage.end"
      :key="index"
      v-if="page >= startAndEndPage.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startAndEndPage.end < totalPage - 1">···</button>
    <button
      v-if="startAndEndPage.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //连续页码的起始页和终止页
    startAndEndPage() {
      // 先定义两个变量
      let start = 0,
        end = 0;
      //非正常现象1：连续页比总页数多
      if (this.continues > this.totalPage) {
        (start = 1), (end = this.totalPage);
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        // 非正常现象2：start出现非正数
        if (start < 1) {
          (start = 1), (end = this.continues);
        }
        // 非正常现象3：end>总页数
        if (end > this.totalPage) {
          (end = this.totalPage), (start = this.totalPage - this.continues + 1);
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
 
}
</style>


```

# 第七天

#### 1.详情组件开发

老师都写好了，直接引入进来

###### 1.1路由相关

![image-20211231163320496](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231163320496.png)

我们希望点击search组件的商品图片可以跳转到详情页，为此必须传参(用params参数)，所以要加一个占位符

![image-20211231163521516](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231163521516.png)

使用的时候声明式导航就可以了

我们发现路由信息太多把它拆分出去

![image-20211231164112738](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231164112738.png)

![image-20211231164142175](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231164142175.png)

###### 1.2滚动行为

我们发现一个问题，在search组件点击图片经过路由跳转到detail组件时，滚轮和之前的位置持平，在靠下的位置。而我们希望，点过来后，默认在最上边，这个时候就可以使用VueRouter的进阶操作：滚动行为.



详见官方文档

[滚动行为 | Vue Router (vuejs.org)](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)

###### 1.3请求相关

接口文档

![image-20211231165745096](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231165745096.png)

添加api

![image-20211231170112001](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231170112001.png)

vuex三件套

![image-20211231170824906](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231170824906.png)

小仓库

![image-20211231170850389](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231170850389.png)

dispatch发送时机,当detail组件挂载完毕就发送

![image-20211231171643078](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231171643078.png)

###### 1.4分析detail组件结构

![image-20211231172244724](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231172244724.png)

![image-20211231172604395](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231172604395.png)

###### 1.5动态展示数据

我们用getters简化仓库数据

![image-20211231173848766](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231173848766.png)

使用

![image-20211231173917713](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231173917713.png)

![image-20211231173945245](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231173945245.png)

发现报错

![image-20211231173816259](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231173816259.png)

原因是因为我们的getters写的还不够完善.当服务器数据还没传过来时，categoryView是undefine，取categoryView里面的category1Name这些数据时自然就报错了，但是当后面服务器数据传过来时，就没这个问题了。所以说这个报错是一个假报错

解决办法：

![image-20211231174230793](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231174230793.png)

我们接着动态展示数据

在放大镜效果这里，我们需要把skuInfo.skuImageList的数据传给子组件

![image-20211231181146948](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20211231181146948.png)

###### 1.6售卖属性展示

![image-20220101163511645](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101163511645.png)

![image-20220101163607168](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101163607168.png)

v-for去取

![image-20220101163732360](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101163732360.png)

![image-20220101163753423](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101163753423.png)

###### 1.7放大镜和轮播图图片处理

![image-20220101171004252](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101171004252.png)

我们使用swiper，并让其一次展示3张图

![image-20220101171103542](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101171103542.png)

需求：点击轮播图小图，放大镜展示。

由于轮播图ImageList组件和放大镜Zoom组件是兄弟组件，我们用全局时间总线解决

![image-20220101171327483](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101171327483.png)

![image-20220101171354501](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101171354501.png)

###### 1.8实现放大镜

![image-20220101174705508](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101174705508.png)

完整代码

```js
 methods: {
      //这里event不写也有
      handler(event){
        let mask=this.$refs.mask
        let big=this.$refs.big
        //计算并修改left和top
        let left=event.offsetX-mask.offsetWidth/2
        let top=event.offsetY-mask.offsetHeight/2
        //约束范围
        if(left<=0)left=0;
        if(left>=mask.offsetWidth) left=mask.offsetWidth
        if(top<=0) top=0
        if(top>=mask.offsetHeight) top=mask.offsetHeight
        mask.style.left=left+'px'
        mask.style.top=top+'px'
        //放大效果,这里要看样式调整放大倍数
        big.style.left=-2*left+'px'
        big.style.top=-2*top+'px'
      }
    },
```

![image-20220319174745551](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220319174745551.png)

###### 1.9加入购物车按钮

![image-20220101175544481](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101175544481.png)

![image-20220101181150297](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101181150297.png)

![image-20220101181212456](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101181212456.png)

![image-20220101181226806](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220101181226806.png)

#### 2.添加购物车相关



###### 2.1将购物车数据写入服务器

![image-20220102150344398](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102150344398.png)

![image-20220102152916614](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102152916614.png)

![image-20220102152938863](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102152938863.png)

![image-20220102153002164](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102153002164.png)

![image-20220102153129510](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102153129510.png)

###### 2.2判断写入服务器是否成功

我们将购物车数据写入服务器成功后，需要进行路由跳转。在此之前，在组件里如何判断写入服务器是否成功呢？有两个办法，我们在actions里判断，成功或者失败，新创造一个参数存储在state里，detail组件里去取就行了。第二个办法使用Promise，这个地方详细步骤

见[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=71&spm_id_from=pageDriver)16分钟开始

大概意思就是我们的async函数最后返回的一定是个Promise，我们再用trycatch判断就行了



actions

![image-20220102162548116](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102162548116.png)

detail组件

![image-20220102162622501](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102162622501.png)

###### 2.3添加购物车成功路由

组件老师已写好，注册使用即可

![image-20220102163355449](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102163355449.png)



![image-20220102163331390](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102163331390.png)

###### 2.4传递参数给AddCartSuccess组件

（这个组件只是用来提示用户，添加购物车成功。然后也可以跳转到结算购物车和商品详情页面）

我们跳转路由的时候需要传递参数给AddCartSuccess组件，可以使用路由query传参的方式把产品详细信息(对象，数据很多)和产品数目传过去，虽然可以办到，但是这样地址栏不美观(因为有产品详细信息这个对象做参数)，于是我们想到路由传参只传产品数目，产品详细信息存储在浏览器上。

我们这里选择使用会话存储，不使用本地存储。本地存储是持久化存储，我们这个只需要存储产品详细信息，会话存储足够了。

注意浏览器本地存储只能存储字符串，使用JSON.stringfy,取得时候用JSON.parse



Detail组件

![image-20220102165651142](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102165651142.png)

AddCartSuccess组件

![image-20220102165726454](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102165726454.png)

接下来就把computed里的数据动态展示就行了

![image-20220102170322230](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102170322230.png)

效果

![image-20220102170340425](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102170340425.png)

###### 2.5实现跳转回产品详情页的功能

需要带参数说明是哪一个商品

AddCartSuccess组件

![image-20220102171123483](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102171123483.png)

###### 2.6实现跳转到购物车功能

老师已写好ShopCart组件，记得注册路由

# 第八天

#### 1.购物车组件开发

###### 1.1接口

![image-20220102173139793](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102173139793.png)

![image-20220102175517153](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102175517153.png)

![image-20220102175611406](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102175611406.png)

shopCart组件

![image-20220102175637514](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102175637514.png)

![image-20220102175913797](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102175913797.png)

###### 1.2游客UUID

![image-20220102181802267](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102181802267.png)

在store/detail/index.vue  也就是小仓库下调用

![image-20220102181903741](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102181903741.png)

把这个uuid_token写在响应头里，要和后台商量好

![image-20220102182024739](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220102182024739.png)

带上uuid后，便可正常获取购物车数据

###### 1.3vuex三连环

actions里result格式

![image-20220103155522438](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220103155522438.png)

![image-20220103162524485](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220103162524485.png)

使用

![image-20220103162548358](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220103162548358.png)

###### 1.4动态展示数据

这个地方太简单了，就不写了……

###### 1.5购物车产品数量

用户每次在购物车里增加，减少或者直接修改产品数我们都要向后台发送请求，这个请求我们已经写了

![image-20220103163748959](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220103163748959.png)

注意skuNum参数是新的产品数-原来产品数。比如以前是4台手机，新的是7台，那么skuNum就是3；再比如以前是4台，新的是2台，那么skuNum就是-2

![image-20220103164020891](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220103164020891.png)

![image-20220103163611305](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220103163611305.png)

(这个地方如果我们购买同一产品，后台会自动加上产品数的)

![image-20220103180433397](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220103180433397.png)

```JS
  //改变产品数量
    //type有三种，对应+,-和直接输入; cartInfo商品信息，disNum相对改变数目
    hander(type, cartInfo, disNum) {
      //该标志位为false时，不必发送请求
      let flag = true;
      switch (type) {
        //直接加最简单
        case "plus":
          break;
        case "minus":
          if (cartInfo.skuNum <= 1) {
            //小于1不发请求
            flag = false;
          }
          break;
        case "change":
          if (isNaN(disNum) || disNum < 0) {
            //负数和非数字不发请求,但是要再次获取购物车数据
            flag = false;
            this.getData()
          } else {
            //要考虑小数
            disNum = parseInt(disNum) - cartInfo.skuNum;
          }
          break;
      }
      try {
        if (flag) {
          //修改成功后，要再次获取购物车数据
          this.$store.dispatch("detail/AddOrUpdateShopCart", {
            skuId: cartInfo.skuId,
            skuNum: disNum,
          });
          this.getData()
        }
      } catch (error) {
        alert(error.message)
      }
    },
```

###### 1.6删除购物车商品

![image-20220105161114447](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105161114447.png)

接口

![image-20220105153705806](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105153705806.png)

api

![image-20220105155731859](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105155731859.png)

vuex

![image-20220105155747890](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105155747890.png)

使用

![image-20220105155805499](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105155805499.png)

1.7修改购物车商品状态

![image-20220105161044457](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105161044457.png)

接口

![image-20220105161005273](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105161005273.png)

api

![image-20220105163935345](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105163935345.png)

vuex

![image-20220105164024479](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105164024479.png)

使用

![image-20220105164049434](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105164049434.png)

![image-20220105164105830](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105164105830.png)

###### 1.7删除所选商品

没有接口，我们要利用之前写的根据ID删除商品的方法

使用

![image-20220105172915858](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220105172915858.png)

vuex

```JS
    //删除所有选中的商品
    deleteAllselected({ dispatch, getters }) {
        //获取当前购物车中全部的产品
        let PromiseArray = []
        getters.cartList.cartInfoList.forEach(cartInfo => {
            //把选中的商品，调用deleteCart方法
            let promise = cartInfo.isChecked == 1 ? dispatch("deleteCart", cartInfo.skuId) : ""
            //将每次返回的promise写入数组
            PromiseArray.push(promise)
            //console.log(promise);
        });
        //只有当PromiseArray中所有的Promise都成功，返回结果才成功
        return Promise.all(PromiseArray)
    }
```

###### 1.8全选

这个地方也没有接口，逻辑上和1.7删除所选商品很像



![image-20220106154627420](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106154627420.png)

使用

![image-20220106154851186](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106154851186.png)

注意如果没有购物车没有商品，全选按钮会有bug

![image-20220106154738267](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106154738267.png)

![image-20220106154716673](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106154716673.png)

![image-20220106154819406](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106154819406.png)

# 第九天

我们最后一天再解决电话，密码这些格式问题，现在注重业务逻辑

#### 1.注册组件开发

登录注册组件老师已写好，直接引用。注意引用照片路径问题，在css使用别名要加一个~

![image-20220106165408784](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106165408784.png)

###### 1.1验证码

接口

![image-20220106165456512](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106165456512.png)

api

![image-20220106173500934](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106173500934.png)

vuex三连环

我们把登录注册业务再注册一个小仓库

![image-20220106173324141](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106173324141.png)

使用

![image-20220106173418178](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106173418178.png)

###### 1.2完成注册

接口

![image-20220106173624000](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106173624000.png)

api

![image-20220106173852297](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220106173852297.png)

vuex

![image-20220107154750563](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220107154750563.png)

使用

![image-20220107154824298](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220107154824298.png)

注册完毕记得跳转路由，目前还只是做了一半，还没有做验证。最后一天做

#### 2.登录

接口

![image-20220107163629177](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220107163629177.png)

api

![image-20220107163715332](https://gitee.com/feng-chengxiang/picture/raw/master/img/image-20220107163715332.png)

vuex（这次要存token）

![2](https://gitee.com/feng-chengxiang/picture/raw/master/img/2.png)

token一般来说就是识别用户的唯一标志符，我们注册成功后后台会为我们的账号添加一个token。在前台我们想要获取特定用户的信息往往只需要向后台发出token就可以了。本质上token和我们项目里的uuid功能是一样的，不同的是uuid是我们发送给后台，token是后台发送给我们

使用

![3](https://gitee.com/feng-chengxiang/picture/raw/master/img/3.png)

注意阻止一下form标签默认行为

![4](https://gitee.com/feng-chengxiang/picture/raw/master/img/4.png)

登录成功后台显示的数据

![5](https://gitee.com/feng-chengxiang/picture/raw/master/img/5.png)



#### 3.完善登录成功的首页

不完善的地方

![7](https://gitee.com/feng-chengxiang/picture/raw/master/img/7.png)

由此需要新的接口

接口

![6](https://gitee.com/feng-chengxiang/picture/raw/master/img/6.png)



api



![8](https://gitee.com/feng-chengxiang/picture/raw/master/img/8.png)

vuex



![9](https://gitee.com/feng-chengxiang/picture/raw/master/img/9.png)

请求拦截器



![10](https://gitee.com/feng-chengxiang/picture/raw/master/img/10.png)

验证



![11](https://gitee.com/feng-chengxiang/picture/raw/master/img/11.png)

观察



![12](https://gitee.com/feng-chengxiang/picture/raw/master/img/12.png)

完善vuex



![13](https://gitee.com/feng-chengxiang/picture/raw/master/img/13.png)



![14](https://gitee.com/feng-chengxiang/picture/raw/master/img/14.png)

完善登录成功后header组件展示信息



![15](https://gitee.com/feng-chengxiang/picture/raw/master/img/15.png)



![16](https://gitee.com/feng-chengxiang/picture/raw/master/img/16.png)

#### 4.解决bug

###### 4.1.登录成功后，用户一刷新页面，header组件又变为未登录状态。

原因，刷新后vuex仓库数据清空，没有token了。

解决方法:持久化存储token

vuex



![17](https://gitee.com/feng-chengxiang/picture/raw/master/img/17.png)



![18](https://gitee.com/feng-chengxiang/picture/raw/master/img/18.png)

但这样还是有问题：用户一旦离开home组件，再次刷新header组件还是变成未登录状态

这是因为header组件要想变成登录状态，要靠vuex仓库中的userInfo。这个userInfo又需要

actions中的getuserInfo，而我们只在home组件mounted时dispatch了，所以离开home组件时再刷新

就会出现问题。这个我们以后用导航守卫解决。

###### 4.2用户登录后就不能再到登录页了

我们需要再写一个退出登录的功能，这个退出功能也是有接口的

接口api就不截屏了

vuex

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/19.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/20.png)

使用



![](https://gitee.com/feng-chengxiang/picture/raw/master/img/21.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/22.png)

完成退出功能后，再使用导航守卫解决bug

在router/index.js里配置全局前置守卫



```js
router.beforeEach(async (to,from,next)=>{
  
    let token=store.state.user.token
    let name=store.state.user.userInfo.name
    // console.log(store.state.user.userInfo,"userInfo");
    // console.log(store.state.user.token,"token");
    // 用户已登录
    if(token){
        //用户已登录还想去登录
        if(to.path=='/login'){
            //直接回首页，或者写/home也行
            next('/')
            // console.log("用户已登录还想去登录");
        }else{
            //用户有name信息
            if(name){
                //放行
                next()
                // console.log("用户已登录且有用户名");
            }//没有用户信息，dispatch后再放行
            else{
                try {
                    await store.dispatch("user/getUserInfo")
                    next()
                    // console.log("用户已登录但没有用户名");
                    // console.log(store.state.user.userInfo,"userInfo");
                    // console.log(store.state.user.token,"token");
                } catch (error) {
                    //token失效，需要用户重新登录
                    //首先清空用户信息
                    await store.dispatch("user/userLogout")
                    next('/login')
                    // console.log("用户已登录但token失效");
                }
            }
        }
    }
    //未登录放行
    else{
        //这里的逻辑较多，日后再写
        next()
        // console.log("用户还未登录");
    }
})
```

这下就可以完美解决bug

# 第十天

**注意这部分必须用老师账号登录才有数据**

账号:13700000000 密码：11111111

账号:我的电话 密码：123

#### 	1.结算组件开发

点击购物车的结算按钮后可跳转到结算页面

页面开发，接口api，vuex就不截图了

###### 1.1收件人及其地址信息数据格式：



![](https://gitee.com/feng-chengxiang/picture/raw/master/img/23.png)

###### 1.2获取商品清单格式

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/24.png)

###### 1.3动态展示数据

收件人及其地址信息：

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/25.png)

获取商品清单格式:纯粹动态展示，没啥好说的

#### 2.支付组件开发

页面编写，配api，router……

###### 2.1提交订单

看看接口参数有点多

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/26.png)

例子

```JSON
{
    "consignee": "admin",
    "consigneeTel": "15011111111",
    "deliveryAddress": "北京市昌平区2",
    "paymentWay": "ONLINE",
    "orderComment": "xxx",
    "orderDetailList": [
        {
            "id": null,
            "orderId": null,
            "skuId": 6,
            "skuName": " Apple iPhone 11 (A2223) 128GB 红色 移动联通电信22",
            "imgUrl": "http://182.92.128.115:8080//rBFUDF6V0JmAG9XGAAGL4LZv5fQ163.png",
            "orderPrice": 4343,
            "skuNum": 2,
            "hasStock": null
        },
        {
            "id": null,
            "orderId": null,
            "skuId": 4,
            "skuName": "Apple iPhone 11 (A2223) 128GB 红色",
            "imgUrl": "http://182.92.128.115:80800/rBFUDF6VzaeANzIOAAL1X4gVWEE035.png",
            "orderPrice": 5999,
            "skuNum": 1,
            "hasStock": null
        }
    ]
}
```

```JSON
{
    "code": 200,
    "message": "成功",
    "data": 71,   // orderId 订单号
    "ok": true
}
```

**常理接下来就是vuex三连环，但是我们现在不用vuex**

**我们直接在组件里调用接口**

假如一个组件里需要调用很多接口，一个一个调用太麻烦了，我们进行统一调用。

在main.js中

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/28.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/27.png)

最后挂载在Vue原型上

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/29.png)

使用

```js
  async submitOrder() {
      let { tradeNo } = this.orderInfo;
      let data = {
        consignee: this.userDefault.consignee,
        consigneeTel: this.userDefault.phoneNum,
        deliveryAddress: this.userDefault.fullAddress,
        paymentWay: "ONLINE", //支付方式
        orderComment: this.msg, //买家的留言信息
        orderDetailList: this.orderInfo.detailArrayList, //商品清单
      };
      let result = await this.$API.reqSubmitOrder(tradeNo, data);
      // console.log(result);
      //成功返回订单号
      if (result.code == 200) {
        this.orderId = result.data;
        //跳转路由，并当上query参数
        this.$router.push("/pay?orderId=" + this.orderId);
      } else {
        alert(result.data);
      }
    },
```

result

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/30.png)

###### 2.2开始开发支付组件

实际上只有微信支付可以实现

获取订单信息的api

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/31.png)

注意尽量别在生命周期函数中使用async-await

使用

从query中获取orderId

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/33.png)

result格式

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/32.png)

###### 2.3点击支付弹出二维码

我们使用elementui实现

安装

cnpm install --save element-ui

按需引入

cnpm install babel-plugin-component -D

这部分可以看官网

[组件 | Element](https://element.eleme.cn/#/zh-CN/component/quickstart)

main.js中

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/34.png)

pay组件中点击立即支付

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/35.png)

接下来需要使用一个插件qrcode

npm网站上可以看到使用方式

[qrcode - npm (npmjs.com)](https://www.npmjs.com/package/qrcode)

安装

cnpm insatll i qrcode --save

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/36.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/37.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/38.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/39.png)

那么这个qrcode就是把特定的字符串(后台传过来的)变成二维码图片

接下来

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/40.png)



我们使用setInterval每隔一段时间就向服务器发送请求，直到支付成功为止

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/42.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/41.png)

最后编辑一下确认和取消按钮

```js
   this.$alert(`<img src=${url} />`, "请你微信支付", {
        dangerouslyUseHTMLString: true,
        //中间布局
        center: true,
        //是否显示取消按钮
        showCancelButton: true,
        //取消按钮的文本内容
        cancelButtonText: "支付遇见问题",
        //确定按钮的文本
        confirmButtonText: "已支付成功",
        //右上角的叉子没了
        showClose: false,
        //关闭弹出框的配置值
        beforeClose: (type, instance, done) => {
          //type:区分取消|确定按钮
          //instance：当前组件实例
          //done:关闭弹出框的方法
          if (type == "cancel") {
            alert("请联系管理员");
            //清除定时器
            clearInterval(this.timer);
            this.timer = null;
            //关闭弹出框
            done();
          } else {
            //判断是否真的支付了
            //开发人员：为了自己方便，这里判断可以先不要了
            if (this.code == 200) {
              clearInterval(this.timer);
              this.timer = null;
              done();
              this.$router.push("/paysuccess");
            }
          }
        },
      });
```

beforeClose配置项，官网也是有的

#### 3.个人中心组件开发

###### 3.1完善多级路由

**该组件是多级路由**

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/43.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/44.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/45.png)

router文件

```JS
{
        path:'/center',
        component:Center,
        meta:{
            show:true
        },
        children:[
            {
                path:"myOrder",
                component:myOrder
            },
            {
                path:"groupOrder",
                component:groupOrder
            },
            {
                path:"/center",
                redirect:"/center/myOrder"
                // 重定向，访问center时，改为访问/center/myOrder
            }
        ]
    },
```

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/46.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/47.png)

###### 3.2开发我的订单

这个地方也只有老师的账号可以获取数据

api

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/48.png)

成功实例

```JS
{
    "code": 200,
    "message": "成功",
    "data": {
        "records": [
            {
                "id": 70,
                "consignee": "admin",
                "consigneeTel": "15011111111",
                "totalAmount": 29495,
                "orderStatus": "UNPAID",
                "userId": 2,
                "paymentWay": "ONLINE",
                "deliveryAddress": "北京市昌平区2",
                "orderComment": "",
                "outTradeNo": "ATGUIGU1584247289311481",
                "tradeBody": "Apple iPhone 11 (A2223) 128GB手机 双卡双待 A",
                "createTime": "2020-03-15 12:41:29",
                "expireTime": "2020-03-16 12:41:29",
                "processStatus": "UNPAID",
                "trackingNo": null,
                "parentOrderId": null,
                "imgUrl": null,
                "orderDetailList": [
                    {
                        "id": 81,
                        "orderId": 70,
                        "skuId": 2,
                        "skuName": "Apple iPhone 11 (A2223) 64GB 红色",
                        "imgUrl": "http://192.168.200.128:8080/xxx.jpg",
                        "orderPrice": 5499,
                        "skuNum": 1,
                        "hasStock": null
                    },
                    …
                ],
                "orderStatusName": "未支付",
                "wareId": null
            },
            …
        ],
        "total": 41,
        "size": 2,
        "current": 1,
        "pages": 21
    },
    "ok": true
}
```

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/49.png)

剩下的就简单了，请求成功(用this.$API发请求)。存储在组件的data中，动态展示数据就行了

这里数据格式比较复杂，一定要注意。

就不展示截图了



涉及到表格合并问题

见本机

C:\语言学习\Java学习\JavaWeb\01-html&CSS\代码\JavaWeb\01_html_css\html



![](https://gitee.com/feng-chengxiang/picture/raw/master/img/50.png)

处理一下分页器

这部分详细可见第六天分页器的内容

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/51.png)





# 第十一天

#### 1.完善未登录逻辑

主要在全局导航守卫里完成

```JS
    //未登录
    else{
        let path=to.path
        //未登录不能去结算组件，支付组件，和个人中心组件相关页面
        if(path.indexOf("/trade")!=-1||path.indexOf("/pay")!=-1||path.indexOf("/center")!=-1){
            alert("请登录")
          //我们创造一个query参数配合login使用
            next("/login?redirect="+path)
        }
        next()

    }
```



![](https://gitee.com/feng-chengxiang/picture/raw/master/img/52.png)





这样就可以拦截用户在未登录的情况下取不该去的页面，同时自动跳到登录页面。用户登录后又可以自动跳到自己原先想去的页面

#### 2.完善登录逻辑

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/53.png)



我们希望用户要进入结算组件只能通过购物车组件进入。这里可以用独享守卫。但是这样依然有一个bug：用户在购物车组件，但是

通过地址栏输入/trade依然能进入结算组件。

类似的可以完成到达pay组件只能从trade组件，进入paysuccess组件只能从pay组件进入。但他们都有同一个bug

#### 3.图片懒加载

npm网址

[vue-lazyload - npm (npmjs.com)](https://www.npmjs.com/package/vue-lazyload)

下载

cnpm install --save vue-lazyload

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/54.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/55.png)



[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=106&spm_id_from=pageDriver)  11分钟开始讲自定义插件

这个了解一下，平常用的不是很多。

# 第十二天

#### 1.表单验证

使用vee-validate（这个其实不是很好用，费力不讨好，大概看的懂就行。我们以后用elementUi替代它

网址 [组件 | Element](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)）

网址:[vee-validate - npm (npmjs.com)](https://www.npmjs.com/package/vee-validate)

安装

```
cnpm install vee-validate@2 --save
```

我们安装一个低版本的，版本2

使用

编写app\src\plugins\vee-validate.js

```JS
//vee-validate插件：表单验证区域’
import Vue from "vue";
import VeeValidate from "vee-validate";
//中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

//表单验证
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: {
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password1: "确认密码",
    agree:'协议'
  },
});

//自定义校验规则
VeeValidate.Validator.extend("tongyi", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});

```

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/56.png)



![](https://gitee.com/feng-chengxiang/picture/raw/master/img/57.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/58.png)

![](https://gitee.com/feng-chengxiang/picture/raw/master/img/59.png)

没有必要深究，看的懂就行

#### 2.路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

见官网[路由懒加载 | Vue Router (vuejs.org)](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

我们也把routes文件改写一下

以前的：需要import

```JS
import Home from '@/pages/Home'

{
        path: '/home',
        // 懒加载，其他组件类似
        component: Home,
        meta: {
            show: true
        }
    },
```

现在

```JS
{
        path: '/home',
        // 懒加载，其他组件类似
        component: ()=>import('@/pages/Home'),
        meta: {
            show: true
        }
    },
```

#### 3.打包上线

项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。有了 map 就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
所以该文件如果项目不需要是可以去除掉

可以在vue.config.js 配置
productionSourceMap:false

可在打包时不生成map文件



