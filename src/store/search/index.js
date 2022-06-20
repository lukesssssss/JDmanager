//vuex模块式开发的小仓库
//引入搜索模块的手机列表
import { reqGetSearchInfo } from "@/api"
export default {
    namespaced:true,
    actions:{
        //获取搜索模块
        async getSearchList({commit},params={}) {
            //当用户派发数据时，第二过参数传过来，至少是一个空对象
            let reslut = await reqGetSearchInfo(params)
            if(reslut.code === 200) {
                commit('GETSEARCHLEST',reslut.data)
            }
        }
    },
    mutations:{
        GETSEARCHLEST(state,search) {
            state.searchList = search
        }
    },
    state:{
        searchList:{}
    },
    //getter可以简化数据
    getters: {
        //获取searchList下的goodsList
        goodsList(state) {
            //防止用户在没有网络时返回undefined，所以可以给一个空数组进行遍历
            return state.searchList.goodsList || []
        },
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        }
    }
}