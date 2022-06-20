<template>
  <div>
    <!-- 全局三级联动 -->
      <theNav></theNav>
      <listContent/>
      <Recommd/>
      <Rank/>
      <Like/>
      <!-- 用props传参 -->
      <Floor v-for="floor in floorList" :key="floor.id" :floor = 'floor'/>
      <Brand/>
  </div>
</template>

<script>
import listContent from './ListContent/ListContent.vue'
import Recommd from './Recommd/Recommd.vue'
import Rank from './Rank/Rank.vue'
import Like from './Like/Like.vue'
import Floor from './Floor/Floor.vue'
import Brand from './Brand/Brand.vue'

import { mapState } from 'vuex'
export default {
    name:'theHome',
    components:{
      listContent,
      Recommd,
      Rank,
      Like,
      Floor,
      Brand
      },
    mounted() {
        this.$store.dispatch('home/getFloor')
        console.log(this.floorList);
    },
    computed: {
        ...mapState('home',['floorList'])
    }
}
</script>

<style>

</style>