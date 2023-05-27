<template>
    <div class="relative" ref="containerTarget" :style="{
        height: containerHeight + 'px' // 因为当前为 relative 布局，所以需要主动指定高度
    }">
        <!-- 因为列数不确定，所以需要根据列数计算每列的宽度，所以等待列宽计算完成，并且有了数据源之后进行渲染 -->
        <template v-if="columnWidth && data.length">
            <!-- 通过动态的 style 来去计算对应的列宽、left、top -->
            <div :style="{
                width: columnWidth + 'px',
                left: item._style?.left + 'px',
                top: item._style?.top + 'px'
            }" v-for="(item, index) in data" :key="nodeKey ? item[nodeKey] : index">
                <!-- 作用域插槽 -->
                <slot :item="item" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
const props = defineProps({
    // 数据源
    data: {
        type: Array,
        required: true
    },
    // 唯一标识的 key
    nodeKey: {
        type: String
    },
    // 列数
    column: {
        default: 2,
        type: Number
    },
    // 列间距
    columnSpacing: {
        default: 20,
        type: Number
    },
    // 行间距
    rowSpacing: {
        default: 20,
        type: Number
    },
    // 是否需要进行图片预读取
    picturePreReading: {
        type: Boolean,
        default: true
    }
})

// 容器的总高度
const containerHeight = ref(0)
// 记录每列高度的容器。key：所在列  val：列高
const columnHeightObj = ref({})
/**
 * 构建记录各列的高度的对象。
 */
const useColumnHeightObj = () => {
    columnHeightObj.value = {}
    for (let i = 0; i < props.column; i++) {
        columnHeightObj.value[i] = 0
    }
}

// 容器实例
const containerTarget = ref(null)
// 容器总宽度(不包含 padding、margin、border)
const containerWidth = ref(0)
// 容器左边距，计算 item left 时，需要使用定位
const containerLeft = ref(0)
/**
 * 计算容器宽度
 */
const useContainerWidth = () => {
    const { paddingLeft, paddingRight } = getComputedStyle(
        containerTarget.value,
        null
    )
    // 容器左边距
    containerLeft.value = parseFloat(paddingLeft)
    // 容器宽度
    containerWidth.value =
        containerTarget.value.offsetWidth -
        parseFloat(paddingLeft) -
        parseFloat(paddingRight)
}


// 列宽
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
    // 如果是5列，则存在 4 个列间距
    return (props.column - 1) * props.columnSpacing
})

/**
 * 开始计算
 */
const useColumnWidth = () => {
    // 获取容器宽度
    useContainerWidth()
    // 计算列宽
    columnWidth.value =
        (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
    // 计算列宽
    useColumnWidth()
})

</script>

<style lang="scss" scoped></style>