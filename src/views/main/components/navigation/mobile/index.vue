<template>
  <!-- position: sticky 是一个 CSS 定位属性，用于将元素固定在
   距离顶部或底部一定距离的位置，当页面滚动到该位置时，
  元素会停留在原地，不再随页面滚动而移动，直到页面滚动到另一个位置。 -->
  <div class="bg-white sticky top-0 left-0 z-10">
    <!-- 汉堡按钮  shadow-l-white 白色阴影效果 自定义的  right-[-1px] 自定义的值-->
    <li
      class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white"
    >
      <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
    </li>
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- last:mr-4 最后一个元素 margin-right -->
      <li
        v-for="item in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// 获取数据
defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
