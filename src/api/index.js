//在这个模块对API进行统一管理
import requests from "./request";

//引入mockAJAX
import reqAjaxMock from './mockAJAX'

export const reqCategoryList = () => 
    //axios发送请求结果是promise变量
      requests({url:'/product/getBaseCategoryList',methods:'get'})
//获取banner的mock
export const reqGetBanner = () => reqAjaxMock({url:'/banner',methods:'get'})
//两个效果一样
// export const reqGetBanner = () => reqAjaxMock.get('/banner')

//获取floor的mock
export const reqGetFloor = () => reqAjaxMock({url:'/floor',methods:'get'})

//获取搜索模块下的商品数据，获取请求：post，需要带参数
//当前这个接口，给服务器传递参数params,至少是一个空对象
export const reqGetSearchInfo= (params) => requests({url:'/list',method:'post',data:params})

//获取产品详细信息的接口
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,methods:'get'})
