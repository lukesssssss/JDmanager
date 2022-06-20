//对axios进行二次封装
//引入axios
import axios from "axios";

//引入进度条
import nprogress from "nprogress";
//引入样式
import 'nprogress/nprogress.css'
//使用axios的create去创建一个实例，request就是稍微配置了一下的axios
 const requests = axios.create({
    //基础路径：表示咋路径中都会带有/api这个路径
    baseURL:"/api",
    //表示请求五秒后
    timeout: 5000
})
//请求拦截器，即可以在发送请求前做一些事情
requests.interceptors.request.use((config) => {
//config是配置对象，里面的请求头非常重要
nprogress.start()
console.log('成功了');
return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    console.log('yes了');
    return res.data
},
(err) => {
    console.log('失败了');
    return Promise.reject(new Error('faile'))
    
})
//暴露request
export default requests
