<template>
  <div>
    <theNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 搜索标签的控制 -->
            <li class="with-x" v-if="this.searchParams.keyword">{{searchParams.keyword}}<i @click="removeKW">×</i></li>
            <li class="with-x" v-if="this.searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCGN">×</i></li>
            <li class="with-x" v-for="(attrVal,index) in searchParams.props" :key="index">{{attrVal.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 改变商品排序的地方 -->
                <li :class="{active:change === 1}" @click="changeOrder('1')">
                  <!-- 引用阿里的图标时一定要在前面加iconfont -->
                  <a >综合<span v-show="change === 1" class="iconfont" :class="isAsc"></span></a>
                </li>
                <li :class="{active:change === 2}" @click="changeOrder('2')">
                  <a >价格<span v-show="change === 2" class="iconfont" :class="isAsc"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <!-- 这是goodslist的地方 -->
              <li class="yui3-u-1-5" v-for='goods in goodsList' :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 这是放图片的地方 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                    
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 测试数据阶段 -->
          <Pagination :pageon='searchParams.pageNo' :total="searchList.total" :pageSize='searchParams.pageSize' :continues="5"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',
    data() {
      return {
        searchParams:{
          //前三个是几级分类id
          "category1Id": "",
          "category2Id": "",
          "category3Id": "",
          "categoryName": "",
          //关键字
          "keyword": "",
          //排序,1表示综合，2表示价格，asc是升，desc是降
          "order": "2:asc",
          //表示默认第几页
          "pageNo": 6,
          // 表示每一页展示的数目
          "pageSize": 3,
          // 平台售卖物品属性所带的参数
          "props": [],
          // 表示物品的品牌
          "trademark": ""
        },
        what:"asc",
        number:0
      }
    },
    //要在挂载前服务器能够拿到用户需要的参数
    beforeMount() {
      //es6语法，可以让内容相同的资源快速分配合并
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted() {
     this.getData()
     this.$bus.$on('pinpai',this.tdSkip)
     //发送改变当前页面pageon的事件
     this.$bus.$on('getPageon',this.getPageon)
     //获得改变当前页码的请求
     this.$bus.$on('changePageon',this.changePageon)
    },
    computed: {
      //用getters可以拿到简化后的数据，十分方便
      ...mapGetters('search',['goodsList']),
      ...mapState('search',['searchList']),
      //判断用户点击的是哪个标签
      change() {
        return this.searchParams.order.indexOf('1') != -1 ? 1 : 2
      },
      //判断箭头向上还是向下
      isAsc() {
        return this.searchParams.order.indexOf('asc') != -1 ? "icon-shangxiazuoyouTriangle111":"icon-shangxiazuoyouTriangle19"
      }
    },
    methods: {
      //通过函数让用户搜索时返回不同的数据
      getData() {
        this.$store.dispatch('search/getSearchList',this.searchParams)
      },
      //清除标签，并重新发请求，需要制空所有信息
      removeCGN() {
        //写undefined可以不会带数据给服务器，减少服务器的请求次数
        this.searchParams.categoryName = undefined
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.getData()
        //通过路由跳转修改路径参数
        //若有params搜索词参数则保留
        if(this.$router.params) {
          this.$router.push({name:'search',params:this.$router.params})
        }
        
      },
      //清除搜索框的面包屑，同理
      removeKW() {
        //写undefined可以不会带数据给服务器，减少服务器的请求次数
        this.searchParams.keyword = undefined
        this.getData()
        //通过路由跳转修改路径参数
        //若有params搜索词参数则保留
        if(this.$router.query) {
          this.$router.push({name:'search',query:this.$router.query})
        }
        //同时用全局事件总线把搜索框里面的数据清零
        this.$bus.$emit('clear')
        
      },
      //接收名字并赋值，还要改变路径
      tdSkip(td) {
        this.searchParams.keyword = td        
        this.$router.push({name:'search',query:td})
        this.getData()
      },
      //拿到用户点击的属性
      attrInfo(attr,attrVal) {
        let props = `${attr.attrId}:${attrVal}:${attr.attrName}`
        console.log(props);
        //然后放入searchParams里面的props中,然后重新发送请求  
        if(this.searchParams.props.indexOf(props) === -1) {
          //数据去重，检测数组里面是否有一样的
          this.searchParams.props.push(props)
        }
        this.getData()
      },
      //拿到想要删除属性的索引值
      removeAttr(index) {
        //用splice方法可以删除想要位置的数字，前一个是位置，后一个是个数，且可以在画面添加文字
        this.searchParams.props.splice(index,1)
        this.getData()
      },
      origin() {
        this.what = "desc"
      },
      //改变order的值,并拿到传的参用来判断
      changeOrder(num) {
        //判断用户是否进行了跳转
        if(this.number != num) {
          this.origin()
          this.number = num
        }
        if(this.what === "asc") {
          this.what = "desc"
        } else {
          this.what = "asc"
        }
        this.searchParams.order = num + ":" + this.what
        this.getData()
      },
      //改变pageon
      getPageon(num) {
        if(num === 1) {
          this.searchParams.pageNo -= 1
        } else {
          this.searchParams.pageNo += 1
        }
        this.getData()
      },
      //改变当前页面
      changePageon(num) {
        this.searchParams.pageNo = num
        this.getData()
      }
    },
    components: {
      SearchSelector
    },
    watch: {
      //通过监听路径的变化执行getData（）函数，可以解决页面搜索不加载的问题。
      $route: {
        handler() {
          //需要重新整理给服务器的参数
          Object.assign(this.searchParams,this.$route.query,this.$route.params)
          this.getData()
          //每一次请求后都应该把以前滞留的id制空，以防产生赘余
          this.searchParams.category1Id = ''
          this.searchParams.category2Id = ''
          this.searchParams.category3Id = ''
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: 5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>