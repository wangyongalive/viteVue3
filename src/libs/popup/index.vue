<template>
    <div>
        <!-- teleport -->
        <teleport to="body">
            <!-- 蒙版 -->
            <transition name="fade">
                <div class="w-screen h-screen bg-zinc-900/80 fixed z-40 top-0 left-0" v-if="modelValue"
                    @click="isOpen = false"></div>
                <!-- @click="emits('update:modelValue', false)" -->
            </transition>
            <!-- 内容 -->
            <transition name="popup-down-up">
                <!-- $attrs 接受外部传入的属性 -->
                <div class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0" v-if="modelValue" v-bind="$attrs">
                    <slot />
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
    modelValue: {
        required: true,
        type: Boolean
    }
})

const emits = defineEmits(['update:modelValue'])

// 通过 useVModel 获取到响应式数据 isOpen，当 isOpen 改变时，会自动触发 update:modelValue
const isOpen = useVModel(props)

// ------ 滚动锁定 ------
const isLocked = useScrollLock(document.body)

// 监听 props.modelValue 的变化即可
// 监听 isOpen 的变化即可
watch(
    // () => props.modelValue,
    isOpen,
    (val) => {
        isLocked.value = val
    },
    {
        immediate: true
    }
)
</script>

<style scoped>
/* 中间状态 */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

/* 开始和结束时刻 */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* popup-down-up 展示动画 */
.popup-down-up-enter-active,
.popup-down-up-leave-active {
    transition: all 0.3s;
}

/* 开始和结束时刻 */
.popup-down-up-enter-from,
.popup-down-up-leave-to {
    transform: translateY(100%);
}
</style>
