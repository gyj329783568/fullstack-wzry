<template>
  <div class="home text-center">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/banner1.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/banner2.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/banner3.jpeg">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div
          v-for="(n, index) in 10"
          :key="index"
          class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- end of nav-icons -->
    <m-list-card title="新闻资讯" icon="news" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{ news.categoryName }}]</span>
          <span>|</span>
          <span>{{ news.title }}</span>
          <span>{{ news.date }}</span>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      },
      newsCats: [
        {
          name: '热门',
          newsList: new Array(5).fill(1).map(() => ({
            categoryName: '热门',
            title: '热门王者荣耀祝各位召唤师春节快乐',
            date: '06/01'
          }))
        },
        {
          name: '新闻',
          newsList: new Array(5).fill(1).map(() => ({
            categoryName: '新闻',
            title: '新闻王者荣耀祝各位召唤师春节快乐',
            date: '06/01'
          }))
        },
        {
          name: '公告',
          newsList: new Array(5).fill(1).map(() => ({
            categoryName: '公告',
            title: '公告王者荣耀祝各位召唤师春节快乐',
            date: '06/01'
          }))
        },
        {
          name: '活动',
          newsList: new Array(5).fill(1).map(() => ({
            categoryName: '活动',
            title: '活动王者荣耀祝各位召唤师春节快乐',
            date: '06/01'
          }))
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/variables.scss';
.pagination-home {
  .swiper-pagination.bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, 'white');
    &.swiper-pagination.bullet-active {
      background: map-get($colors, 'info')
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-left: none;
    }
  }
}
</style>
