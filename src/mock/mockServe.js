import Mock from "mockjs";
//引入json文件
import banner from './banner'
import floor from './floor'

Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})