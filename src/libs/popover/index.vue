<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽  触发弹出层的视图-->
      <slot name="reference" />
    </div>
    <!-- 气泡展示动画 -->
    <transition name="slide">
      <!-- 匿名插槽 弹出层视图中需要展示的内容-->
      <slot />
    </transition>
  </div>
</template>
<script>

</script>

<script setup>

/**
 * 鼠标移入的触发行为
 */
const onMouseenter = () => {

}

/**
 * 鼠标移出的触发行为
 */
const onMouseleave = () => {
}

</script>

<style lang="scss" scoped>
// slide 展示动画
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>