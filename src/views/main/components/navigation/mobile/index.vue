<template>
  <!-- position: sticky 是一个 CSS 定位属性，用于将元素固定在
   距离顶部或底部一定距离的位置，当页面滚动到该位置时，
  元素会停留在原地，不再随页面滚动而移动，直到页面滚动到另一个位置。
  sticky 父元素高度自适应 无法sticky
  -->
  <div class="bg-white dark:bg-zinc-900  sticky top-0 left-0 z-10">
    <ul class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden" ref="ulTarget">
      <!-- 汉堡按钮  shadow-l-white 白色阴影效果 自定义的  right-[-1px] 自定义的值-->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
        @click="onShowPopup">
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>

      <!-- 滑块 -->
      <li ref="sliderTarget" :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800"></li>

      <!-- items -->
      <!-- last:mr-4 最后一个元素 margin-right   shrink-0 子元素要设置shrink 否则子元素会被压缩-->
      <li v-for="(item, index) in $store.getters.categorys" :key="item.id"
        class="px-1.5 py-0.5 z-10 duration-200 last:mr-4 flex-none" @click="onItemClick(item)" :ref="setItemRef" :class="{
          'text-zinc-100 ': $store.getters.currentCategoryIndex === index
        }">
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isVisible">
      <menu-vue :categorys="$store.getters.categorys" @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup name="menuNav">
import { ref, onBeforeUpdate, watch } from 'vue'
import { useStore } from 'vuex'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'
const store = useStore()

// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// 获取所有的 item 元素 使用函数
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  // 更新清空
  itemRefs = []
})

// 获取 ul 元素，以计算偏移位置
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)

// watch监听
watch(() => store.getters.currentCategoryIndex, (val) => {
  // 获取选中元素的 left、width
  const { left, width } = itemRefs[val].getBoundingClientRect()
  // 为 sliderStyle 设置属性  ul俩边的paddnig
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: `${width}px`
  }
})

// item 点击事件
const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
  isVisible.value = false // 关闭弹出层
}


// 控制popup 展示
const isVisible = ref(false)

const onShowPopup = () => {
  isVisible.value = true
}
</script>

<style lang="scss" scoped></style>
