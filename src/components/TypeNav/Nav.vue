<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
            <div class="container"  @mouseenter="beShow" @mouseleave="beHide">
                <h2 class="all">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <transition name="sort">
                <div class="sort" v-show="this.switch" >
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(cgl,index) in cgl" :key="cgl.categoryId"  @mouseenter="changeColor(index)"  :class="{cur: index === theNum}">
                            <h3 >
                                <!-- data是固定写法不可以更改 -->
                                <a :data-category="cgl.categoryName" :data-category1="cgl.categoryId">{{cgl.categoryName}}</a>
                            </h3>                                       
                            <!-- 二三级分类 -->
                            <!-- 下面是改变style方法用v-show也可以 -->
                            <div class="item-list clearfix" :style="{display: index === theNum ? 'block' : 'none'}">
                                <div class="subitem" v-for="c2 in cgl.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt >
                                            <a :data-category="c2.categoryName" :data-category2="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd >
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-category="c3.categoryName" :data-category3="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>                                   
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>                       
                    </div>
                </div>
                </transition>
                
            </div>
        </div>

</template>

<script>
import { mapState } from 'vuex'
//引入lodash解决卡顿问题
import throttle from 'lodash/throttle'
export default {
    name:'theNav',
    mounted() {
        if(this.$route.path != '/home') {
            this.switch = false
        }
      },
    computed: {
        ...mapState('home',['cgl'])
    },
    data() {
        return {
            theNum :-2,
            switch:true
        }
    },
    methods: {
        // changeColor(index) {
        //     this.theNum = index
        // }
        //使用节流方法throttle,别用箭头函数，否则会出现指向问题
        changeColor:throttle(function(index) {
           this.theNum = index
        },50),
        goSearch(event) {
            //可以获得自己点击的a标签
            let element = event.target
            //可以把dataset中的自定义属性结构出来
            let {category,category1,category2,category3} = element.dataset
            let location = {name:'search',path:'/search'}
            let query = {categoryName:category}

            if(category1) {
                query.category1Id = category1
            }else if(category2) {
                query.category2Id = category2
            }else if(category3) {
                query.category3Id = category3
            } 
            //整理参数
            //若是有params参数则要合并
            if(this.$route.params) {
                location.params = this.$route.params
            }
            location.query = query
            this.$router.push(location)
        },
        //控制鼠标离开进入的显示与隐藏
        beShow() {
            this.switch = true
        },
        beHide() {
            this.theNum = -1
            if(this.$route.path != "/home") {
                this.switch = false
            }
        }
    },
}

</script>

<style  lang="less" scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                           

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                .cur {
                        background-color: skyblue;
                    }
                }
            }
            // 下面是进入的动画
            .sort-enter {
                height: 0;
                opacity: 0;
            }
            .sort-enter-to {
                height: 461px;
                opacity: 100%;
            }
            .sort-enter-active {
                transition: all 0.8s linear;
            }
        }
    }
</style>
