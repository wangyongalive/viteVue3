<template>
  <!-- .group 在父元素hover 可以触发子元素的group-hover: -->
  <div
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#707070"
      />
      <!-- 输入框 
    group-hover:bg-white group-hover:border-zinc-200 在父容器悬浮的时候 改变背景色和边框颜色
    -->
      <input
        class="block w-full h-[44px] pl-4 text-sm outline-0 text-zinc-900 bg-zinc-100 rounded-xl tracking-wide font-semibold border border-zinc-100 duration-500 focus:border-red-300 group-hover:bg-white group-hover:border-zinc-200"
        type="text"
        placeholder="搜索"
      />
      <!-- 删除按钮 -->
      <m-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500"
        name="input-delete"
        color="#707070"
      />
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: 搜索按钮(通用组件) -->
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 hover:shadow-2xl"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script setup></script>

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
