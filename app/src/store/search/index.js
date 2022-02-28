import { reqGetSearchInfo } from "@/api/index"
const state={
    searchList:{}
}

const actions={
    async getSearchList(context,params={}){
   
        let result=await reqGetSearchInfo(params)
        if(result.code==200){
            context.commit('GetSEARCHINFO',result.data)
        }
    }
}

const mutations={
    GetSEARCHINFO(state,value){
        state.searchList=value
    }
}

const getters={
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    total(state){
        return state.searchList.total
    }
}

export default{
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}