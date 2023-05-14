<template>
    <!-- .group 在父元素hover 可以触发group-hover: -->
    <div class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
        <div>
            <!-- 搜索图标 -->
            <m-svg-icon class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2" name="search" color="#707070" />
            <!-- 输入框 -->
            <input class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 rounded-xl group-hover:bg-white"
                type="text" placeholder="搜索" />
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>