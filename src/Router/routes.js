//引入组件
import Home from '@/components/Pages/Home'
import Login from '@/components/Pages/Login'
import Register from '@/components/Pages/Register'
import Search from '@/components/Pages/search/index'
import Detail from '@/components/Pages/Detail'
export default [
    {
        name:'home',
        path:'/home',
        component:Home,
        //如果页面展示则为true，不然为false
        meta: {show:false}
    },
    {
        name:'login',
        path:'/login',
        component:Login,
        meta: {show:true}
    },
    {
        name:'register',
        path:'/register',
        component:Register,
        meta: {show:true}
    },
    {
        name:'search',
        path:'/search /:keyword',
        component:Search,
        meta: {show:false}
    },
    {
        name:'detail',
        path:'/detail/:skuid',
        component:Detail,
        meta:{show:true}
    },
    //重定向
    {
        path: '*',
        redirect: '/home'
      }
]