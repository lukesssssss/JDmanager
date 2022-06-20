<template>
  <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="carousel in this.list"
              :key="carousel.id"
            >
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
</template>

<script>
//引入swiper
import Swiper from 'swiper'
export default {
  name: "Carousel",
  props:['list'],
  watch: {
    bannerList: {
      immediate:true,
      handler(nval,oval) {
        //nextTick可以让函数在变化前不执行，在变化完成后立即获得更新完后的Dom
        this.$nextTick(() => {
          
        var mySwiper = new Swiper(".swiper-container", {
       // 垂直切换选项
      loop: true, // 循环模式选项
      
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        clickable:true,//控制小球的点击       
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    })
        })
      }
    }
  }
};
</script>

<style>
</style>