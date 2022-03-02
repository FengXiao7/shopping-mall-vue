import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import router from '@/router'
import TypeNav from '@/components/TypeNav'  
import Carousel from '@/components/Carousel'  
import Pagination from '@/components/Pagination'
import store from '@/store'
import '@/mock/mockServe'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/加载.gif'
import * as API from '@/api/index' 
import "@/plugins/vee-validate"  //引入表单验证文件
// console.log(API);
import { Button, MessageBox } from 'element-ui';//按需引入
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 注册全局组件。第一个参数组件名，第二个参数组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
// //测试axios
// import {reqGetSearchInfo} from '@/api'
// reqGetSearchInfo({})
Vue.use(VueLazyload, {
  loading: loading,
  // 懒加载图片
})
Vue.use(VueRouter)
new Vue({
  el:'#app',
  render: h => h(App),
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
    Vue.prototype.$API=API//统一引入接口
	},
  //注册路由信息，这是组件上都有一个$router（同一个）,$route属性了
  router,
  //注册仓库，组件实例上会多一个$store属性
  store
})
