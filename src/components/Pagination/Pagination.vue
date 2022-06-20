<template>
  <div class="pagination">
      <!-- 当当前页面等于1时不能点击 -->
      <button :disabled="pageon == 1" @click="getPageon(1)">上一页</button>

        <!-- 判断1是否显示与隐藏 -->
        <button v-show="pageon - Math.floor(this.continues / 2) > 1" @click="changePageon(1)">1</button>       
        <button v-show="pageon - Math.floor(this.continues / 2) > 2">···</button>

        <!-- 表示中间分页的,用v-for遍历数字 -->
        <button 
        v-for="(page1,index) in startAndEnd.end"
        :key="index" v-show="page1 >= startAndEnd.start" 
        @click="changePageon(page1)"
        :style="{backgroundColor: pageon === page1 ? '#f07c82':''}"
        >{{page1}}</button>

        <!-- 表示后面分页 -->
        <button v-show="this.pageChange">···</button>
        <button v-show="pageon + Math.floor(this.continues / 2) < page" @click="changePageon(page)">{{page}}</button>
        <button :disabled='pageon == page' @click="getPageon(2)">下一页</button>

        <button style="margin-left: 30px">共{{total}}条</button>
    </div>
</template>

<script>
export default {
    name:'Pagination',
    props:['pageSize','pageon','total','continues'],
    computed: {
        //获取有多少页数据
        page() {
            return Math.ceil(this.total / this.pageSize)
        },
        //获取分页器的具体数
        startAndEnd() {
            let start = 0
            let end = 0
            if(this.continues > this.page) {
                start = 1
                end = this.page
            }else {
                start = this.pageon - Math.floor(this.continues / 2)
                end = this.pageon + Math.floor(this.continues / 2)
                //当页数小于分页数时
                if(start < 1) {
                    start = 1
                    end = this.continues
                }
                //当end后两个为当前页面时
                if(end > this.page) {
                    start = start - end + this.page
                    end = this.page
                }
            }
            return {start,end}
        },
        //控制页面的显示
        pageChange() {

             if(this.pageon < 3) {
                 return false
             } else {
                 return this.pageon + Math.floor(this.continues / 2) + 1 < this.page
             }
            
        },
        
    },
    mounted() {
        
    },
    methods: {
        //发送点击上一页下一页进行改变的命令
        getPageon(num) {
            this.$bus.$emit('getPageon',num)
        },
        //发送跳转用户点击的页面的命令
        changePageon(page1) {
            this.$bus.$emit('changePageon',page1)
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>