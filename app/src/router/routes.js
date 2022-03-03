// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Search from '@/pages/Search/index.vue'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import myOrder from '@/pages/Center/myOrder'
// import groupOrder from '@/pages/Center/groupOrder'
// meta:{
//     show:true 主要用于是否显示Footer组件
// }
export default [
    {
        path: '/home',
        // 懒加载，其他组件类似
        component: ()=>import('@/pages/Home'),
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: {
            show: false
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: {
            show: true
        }
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: {
            show: false
        }
    },
    {
        path: '/detail/:skuid',
        component: ()=>import('@/pages/Detail'),
        meta: {
            show: true
        }
    },
    {
        path: '/addCartSuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: {
            show: true
        }
    },
    {
        path: '/shopCart',
        component: ()=>import('@/pages/ShopCart'),
        meta: {
            show: true
        }
    },
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopCart") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        meta: {
            show: true
        },
        beforeEnter(to, from, next) {
            if (from.path === '/trade') {
                next()
            } else {
                next('/trade')
            }
        }
    },
    {
        path: '/paySuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: {
            show: true
        },
        beforeEnter(to, from, next) {
            if (from.path === '/pay') {
                next()
            } else {
                next('/pay')
            }
        }
    },
    {
        path: '/center',
        component: ()=>import('@/pages/Center'),
        meta: {
            show: true
        },
        children: [
            {
                path: "myOrder",
                component: ()=>import('@/pages/Center/myOrder'),
            },
            {
                path: "groupOrder",
                component: ()=>import('@/pages/Center/groupOrder'),
            },
            {
                path: "/center",
                redirect: "/center/myOrder"
                // 重定向，访问center时，改为访问/center/myOrder
            }
        ]
    },
    //重定向,默认首页为Home组件
    {
        path: '*',
        redirect: '/home'
    }
]