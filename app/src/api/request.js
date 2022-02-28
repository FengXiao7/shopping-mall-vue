//对于axios进行二次封装
import axios from "axios";
import nprogress from "nprogress"
import store from "@/store";
import {getToken} from "@/utils/token"
//如果出现进度条没有显示：一定是你忘记了引入样式了
import "nprogress/nprogress.css";
//start表示进度条开始 done表示结束

//1：利用axios对象的方法create，去创建一个axios实例
//2:request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    //代表请求超时的时间5S
    timeout:5000,
});


//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
//config：配置对象，对象里面有一个属性很重要，header请求头
    nprogress.start()//进度条开始
    if(store.state.detail.uuid_token){
        //请求头添加一个字段userTempId(要和后台商量好)
        config.headers.userTempId=store.state.detail.uuid_token
    }
    //需要携带token传送给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    return config;
})


requests.interceptors.response.use((res)=>{
//成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done()//进度条结束
    return res.data;
},(error)=>{
//失败的回调函数
    return Promise.reject(new Error("faile"));
})


//对外暴露
export default requests;