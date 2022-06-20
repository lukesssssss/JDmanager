//引入vue
import Vue from "vue";
//引入路由插件
import VueRoute  from "vue-router";
//使用插件
Vue.use(VueRoute)
import routes from "./routes"
//配置路由
export default  new VueRoute({
      routes,
      //滚动行为
      scrollBehavior (to, from, savedPosition) {
          // y表示y轴离顶部的距离
          return {y:0}
      }
     
})
//可以避免浏览器多次无效点击报错
const VueRouterPush = VueRoute.prototype.push
VueRoute.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}