<template>
  <!-- position: sticky 是一个 CSS 定位属性，用于将元素固定在
   距离顶部或底部一定距离的位置，当页面滚动到该位置时，
  元素会停留在原地，不再随页面滚动而移动，直到页面滚动到另一个位置。 -->
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <li
        v-for="item in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
