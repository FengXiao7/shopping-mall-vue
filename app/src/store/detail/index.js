import { reqGetGoodsInfo,reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from '@/utils/uuid'
const state={
    goodsInfo:{},
    uuid_token:getUUID()
}
const actions={
    async getGoodsInfo(context,skuid){
        let result=await reqGetGoodsInfo(skuid)
        if(result.code==200){
            context.commit('GETGOODSINFO',result.data)
        }
    },
    //服务器写入数据成功，不需要返回其他数据，因此就不需要vuex三连环了
    async AddOrUpdateShopCart(context,{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations={
    GETGOODSINFO(state,value){
        state.goodsInfo=value
    }
}
const getters={
    //简化路径导航
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    //简化产品信息
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    //简化产品售卖属性
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[]
    }
}
export default{
    namespaced:true,//开启命名空间
    state,
    actions,
    mutations,
    getters
}