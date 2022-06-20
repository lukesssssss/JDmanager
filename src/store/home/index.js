//vuex模块式开发的小仓库
//引用接口里面的数据
import { reqCategoryList,reqGetBanner,reqGetFloor } from "@/api/index"
export default {
    namespaced:true,
    //第一步，拿到请求
    actions:{
        //获取axios请求
         async cgList({commit}) {
             //nnd，一定要加括号表示使用函数
            let reslut =  await reqCategoryList()
            if(reslut.code == 200) {
                commit('CGLIST',reslut.data)
            }                
        },
        //获取mock请求
        async getBanner({commit}) {
            let reslut = await reqGetBanner()
            if(reslut.code == 200) {
                commit('BANNERLIST',reslut.data)
            }
        },
        async getFloor({commit}) {
            let reslut = await reqGetFloor()
            if(reslut.code === 200) {
                commit('FLOORLIST',reslut.data)
            }
        }
    },
    //第二步，改变状态
    mutations:{
        CGLIST(state,cglist) {
            state.cgl = cglist
        },
        BANNERLIST(state,banner) {
            state.bannerList = banner
        },
        FLOORLIST(state,floor) {
            state.floorList = floor
        }
    },
    //保存数据之地
    state:{
        cgl:[],
        bannerList:[],
        floorList:[]
    },
    getters: {}
}