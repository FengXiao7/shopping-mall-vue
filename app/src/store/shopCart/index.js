import { reqGetCartList, reqDeleteCart, reqUpdateChartChecked } from '@/api/index'

const state = {
    cartList: []//这个数组只有一项，后台封装数据不是很好，我们用getters取出来
}
const actions = {
    //获取购物车商品列表
    async getCartList(context) {
        let result = await reqGetCartList()
        if (result.code == 200) {
            context.commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车商品
    async deleteCart(context, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车产品状态
    async updateChartChecked(context, { skuId, isChecked }) {
        let result = await reqUpdateChartChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除所有选中的商品
    deleteAllselected({ dispatch, getters }) {
        //获取当前购物车中全部的产品
        let PromiseArray = []
        getters.cartList.cartInfoList.forEach(cartInfo => {
            //把选中的商品，调用deleteCart方法
            let promise = cartInfo.isChecked == 1 ? dispatch("deleteCart", cartInfo.skuId) : ""
            //将每次返回的promise写入数组
            PromiseArray.push(promise)
            // console.log(promise);
        });
        //只有当PromiseArray中所有的Promise都成功，返回结果才成功
        // console.log(PromiseArray);
        return Promise.all(PromiseArray)
    },
    //修改全部产品状态
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseArray = []
        getters.cartList.cartInfoList.forEach(cartInfo=>{
            //只有和全选按钮不一样的才发请求
            if(cartInfo.isChecked!=isChecked){
                let promise=dispatch("updateChartChecked",{skuId:cartInfo.skuId,isChecked})
                PromiseArray.push(promise)
            }
        })
        return Promise.all(PromiseArray)
    }
}
const mutations = {
    GETCARTLIST(state, value) {
        state.cartList = value
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    namespaced: true,//开启命名空间
    state,
    actions,
    mutations,
    getters
}