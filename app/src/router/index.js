import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
const router= new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        //我们这个就是距离顶部0个像素，就是最顶部
        return { y: 0 }
    }
})
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
    //未登录
    else{
        let path=to.path
        //未登录不能去结算组件，支付组件，和个人中心组件相关页面
        if(path.indexOf("/trade")!=-1||path.indexOf("/pay")!=-1||path.indexOf("/center")!=-1){
            alert("请登录")
            next("/login?redirect="+path)
        }
        next()

    }
})
export default router