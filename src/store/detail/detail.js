import { reqGoodsInfo } from "@/api"
export default {
    namespaced:true,
    mutations :{
        GETGOODSINFO(state,goodInfo) {
            state.goodsInfo = goodInfo
        }
    },
    actions :{
        async getGoodsInfo({commit},skuid) {
            let reslut = await reqGoodsInfo(skuid)
            if(reslut.code === 200) {
                commit('GETGOODSINFO',reslut.data)
            }
        }
    },
    state :{
        goodsInfo : {}
    },
    getters :{}
}
