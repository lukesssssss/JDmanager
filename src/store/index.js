import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)
//仓库，储存数据的地方
// const actions = {}
// const mutations ={}
// const state = {}
// const getters = {}
//以下为模块式开发所用
import home from './home/index'
import search from './search/index'
import detail from "./detail/detail";
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail
    }
})