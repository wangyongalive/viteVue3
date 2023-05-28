<template>
    <div class="infinite">
        <slot />
        <div ref="loadingTargetRef" class=" h-6 py-4">
            <!-- 加载更多 -->
            <m-svg-icon class="w-4 h-4 mx-auto animate-spin" name="infinite-load" v-show="loading">
            </m-svg-icon>
            <!-- 没有更多数据了 -->
            <p v-if="isFinished" class="text-center text-base text-zinc-400">
                已经没有更多数据了!
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
    // 是否处于加载状态
    modelValue: {
        type: Boolean,
        required: true
    },
    // 数据是否全部加载完成
    isFinished: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

// 处理 loading 状态
const loading = useVModel(props)
// 滚动的元素
const loadingTargetRef = ref(null)
useIntersectionObserver(loadingTargetRef, ([{ isIntersecting }]) => {
    //   当加载更多数据时可见
    if (isIntersecting && !loading.value && !props.isFinished) {
        loading.value = true
        emits('onLoad')
    }
},)

</script>

<style lang="scss" scoped></style>