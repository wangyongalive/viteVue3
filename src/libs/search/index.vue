<template>
  <!-- .group 在父元素hover 可以触发子元素的group-hover: -->
  <div class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40" ref="containerTarget">
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2" name="search" color="#707070" />
      <!-- 输入框 
    group-hover:bg-white group-hover:border-zinc-200 在父容器悬浮的时候 改变背景色和边框颜色
    -->
      <input
        class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
        type="text" placeholder="搜索" v-model="inputValue" @focus="onFocusHandler" @blur="onBlurHandler"
        @keyup.enter="onSearchHandlder" />
      <!-- 删除按钮  v-show="inputValue" 有内容才显示-->
      <m-svg-icon v-show="inputValue"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer" name="input-delete"
        color="#707070" @click="onClearClick" />
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100">
      </div>
      <!-- TODO: 搜索按钮(通用组件) -->
      <m-button
        class="opacity-0 duration-500 absolute translate-y-[-50%] top-[50%] right-1 rounded-xl group-hover:opacity-100"
        icon="search" iconColor="#ffffff" @click="onSearchHandlder"></m-button>
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <!-- v-if="$slots.dropdown" 当传入slot时候才显示插槽 -->
      <div v-if="$slots.dropdown" v-show="isFocus"
      class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-3xl scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script>
// 更新事件
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// 触发搜索（点击或回车）事件
const EMIT_SEARCH = 'search'
// 删除所有文本事件
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点事件
const EMIT_FOCUS = 'focus'
// 失去焦点事件
const EMIT_BLUR = 'blur'
</script>

<script setup name="search-com">
/**
 * 1. 输入内容实现双向数据绑定
 * 2. 搜索按钮在hover时 展示
 * 3. 一键清空文本功能
 * 4. 触发搜索
 * 5. 控制下拉框展示区的展示
 * 6. 事件处理
 */
import { ref, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})

const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR,
  EMIT_SEARCH
])

// 输入文本
const inputValue = useVModel(props)

/**
 * 清空文本
 */
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}

/**
 * 触发搜索
 */
const onSearchHandlder = () => {
  emits(EMIT_SEARCH, inputValue.value)
}

/**
 * 监听焦点行为
 */
const isFocus = ref(false)
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}

/**
 * 失去焦点
 */
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}

/**
 * 点击区域外隐藏 dropdown
 */
const containerTarget = ref(null)
onClickOutside(containerTarget, () => {
  isFocus.value = false
})

/**
 * 监听输入行为
 */
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
