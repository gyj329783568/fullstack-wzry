<template>
  <div class="list-card">
    <m-card :title="title" :icon="icon">
      <div class="nav jc-between">
        <div
          class="nav-item"
          :class="{active: active === i}"
          v-for="(c, i) in categories"
          :key="i"
          @click="active = i">
          <div class="nav-link">{{ c.name }}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="(category, i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    categories:{
      type: Array,
      required: true
    },
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/variables.scss';

</style>