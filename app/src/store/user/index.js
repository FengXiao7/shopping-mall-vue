import { reqVerificationCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api";
import {setToken,getToken,clearToken} from '@/utils/token'

const state={
    verificationCode:"",
    token:getToken(),
    userInfo:{}
}
const actions={
    //获取验证码
    async getVerificationCode(context,phoneNumber){
        let result=await reqVerificationCode(phoneNumber)
        // console.log(result);
        if(result.code==200){
            context.commit('GETVERIFICATIONCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    //用户注册
    async userRegister(context,user){
        let result=await reqUserRegister(user)
        //console.log(result,"注册信息");
        if(result.code=200){
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 用户登录
    async userLogin(context,user){
        let result=await reqUserLogin(user)
        //console.log(result,"登录信息");
        if(result.code=200){
            //我们这里把token存储在vuex的state里(不是持久化存储)
            context.commit('USERLOGIN',result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"))
        }   
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result =await reqUserInfo();
        //console.log(result,"登录成功后获取的用户信息");
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }
        else{
            return Promise.reject(new Error("faile"))
        }
    },
    //用户退出登录
    async userLogout({commit}){
        let result=await reqLogout()
        ////console.log(result,"退出登录");
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }
        else{
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations={
    GETVERIFICATIONCODE(state,value){
        state.verificationCode=value
    },
    USERLOGIN(state,value){
        state.token=value
    },
    GETUSERINFO(state,value){
        state.userInfo=value
    },
    CLEAR(state){
        state.userInfo={}
        state.token=""
        clearToken()
    }
}
const getters={}
export default{
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}