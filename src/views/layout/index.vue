<template>
    <div class="h-screen">
        <!-- 需要在 tailwind 中定义 h-header、h-main 高度 -->
        <header-vue class="h-header"></header-vue>
        <!-- h-main的样式 优先级会被替代 不然可能出现两个滚动条-->
        <div class="h-main">
            <main-vue></main-vue>
        </div>
        <floating-vue></floating-vue>
    </div>
</template>
  
<script setup>
import headerVue from './components/header/index.vue'
import mainVue from './components/main.vue'
import floatingVue from './components/floating/index.vue'
import { } from 'vue'
</script>
  
<style lang="scss" scoped></style>
  