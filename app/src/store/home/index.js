import {reqCategoryList, reqGetBannerList,reqGetFloorList} from '@/api/index'
const state={
    //这个地方的数据类型不要乱写，要根据接口文档写合适的数据类型
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const actions={
    async categoryList(context){
        let result=await reqCategoryList();
        // console.log(result);
        if(result.code==200){
            //如果请求成功，那么服务员把后端请求到的数据交给大厨
            context.commit('CATEGORYLIST',result.data)
        }
    },
    async bannerList(context){
        let result=await reqGetBannerList();
        if(result.code==200){
            context.commit('BANNERLIST',result.data)
        }
    },
    async floorList(context){
        let result=await reqGetFloorList();
        if(result.code==200){
            context.commit('FLOORLIST',result.data)
        }
    }
}
const mutations={
    CATEGORYLIST(state,value){
        state.categoryList=value
    },
    BANNERLIST(state,value){
        state.bannerList=value
    },
    FLOORLIST(state,value){
        state.floorList=value
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