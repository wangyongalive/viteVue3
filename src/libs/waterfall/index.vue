<template>
    <div class="relative" ref="containerTarget" :style="{
        height: containerHeight + 'px' // 因为当前为 relative 布局，所以需要主动指定高度
    }">
        <!-- 因为列数不确定，所以需要根据列数计算每列的宽度，所以等待列宽计算完成，并且有了数据源之后进行渲染 -->
        <template v-if="columnWidth && data.length">
            <!-- 通过动态的 style 来去计算对应的列宽、left、top -->
            <div class="m-waterfall-item absolute duration-300" :style="{
                width: columnWidth + 'px',
                left: item._style?.left + 'px',
                top: item._style?.top + 'px'
            }" v-for="(item, index) in data" :key="nodeKey ? item[nodeKey] : index">
                <!-- 作用域插槽 -->
                <slot :item="item" :width="columnWidth" />
            </div>
        </template>
        <!-- 可以给一个加载中的描述，没有也无所谓 -->
        <div v-else>加载中...</div>
    </div>
</template>

<script setup name="waterFall">
import { onMounted, ref, computed, watch, nextTick, onUnmounted } from 'vue'
import { getImgElements, getAllImg, onComplateImgs, getMinHeightColumn, getMinHeight, getMaxHeight } from './utils'
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

    // console.log(columnWidth.value, containerWidth.value)
}

onMounted(() => {
    // console.log('mounted')
    // 计算列宽
    useColumnWidth()
})

// item 高度集合
let itemHeights = []
/**
 * 监听图片加载完成
 */
const waitImgComplate = () => {
    itemHeights = []
    // 拿到所有元素
    let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
    // 获取所有元素的 img 标签
    const imgElements = getImgElements(itemElements)
    // 获取所有 img 标签的图片
    const allImgs = getAllImg(imgElements)
    onComplateImgs(allImgs).then(() => {
        // console.log(res, 'res')
        // 图片加载完成，获取高度
        itemElements.forEach(el => {
            itemHeights.push(el.offsetHeight)
        })
        // 渲染位置
        useItemLocation()
    })
}

/**
 * 图片不需要预加载时，计算 item 高度
 */
const useItemHeight = () => {
    itemHeights = []
    // 拿到所有元素
    let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
    // 计算 item 高度
    itemElements.forEach((el) => {
        // 依据传入数据计算出的 img 高度
        itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
}



/**
 * 为每个 item 生成位置属性
 */
const useItemLocation = () => {
    // console.log(itemHeights)
    // 遍历数据源
    props.data.forEach((item, index) => {
        // 避免重复计算
        if (item._style) {
            return
        }
        // 生成 _style 属性
        item._style = {}
        // left
        item._style.left = getItemLeft()
        // top
        item._style.top = getItemTop()
        // 指定列高度自增
        increasingHeight(index)
    })
    // 指定容器高度
    containerHeight.value = getMaxHeight(columnHeightObj.value)
}

/**
 * 返回下一个 item 的 left
 */
const getItemLeft = () => {
    // 最小高度所在的列 * (列宽 + 间距)
    let minHeightColumn = getMinHeightColumn(columnHeightObj.value)
    return minHeightColumn * (columnWidth.value + props.columnSpacing) + containerLeft.value
}

/**
 * 返回下一个 item 的 top
 */
const getItemTop = () => {
    // 列高对象中的最小的高度
    return getMinHeight(columnHeightObj.value)
}

const increasingHeight = (index) => {
    // 最小高度所在的列
    const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
    // 该列高度自增
    columnHeightObj.value[minHeightColumn] +=
        itemHeights[index] + props.rowSpacing
}

/**
 * 在组件销毁时，清除所有的 _style
 */
onUnmounted(() => {
    props.data.forEach((item) => {
        delete item._style
    })
})


// 触发计算
watch(() => props.data, (newVal) => {
    // console.log('watch ')
    // 第一次获取数据时，构建高度记录容器
    const resetColumnHeight = newVal.every((item) => !item._style)
    if (resetColumnHeight) {
        // 构建高度记录容器
        useColumnHeightObj()
    }

    nextTick(() => {
        if (props.picturePreReading) {
            waitImgComplate()
        } else {
            // console.log('nextTick ')
            useItemHeight()
        }
    })
}, {
    immediate: true,
    deep: true
})


/**
 * 监听列数变化，重新构建瀑布流
 */
watch(() => props.column, () => {
    columnWidth.value = 0
    // 视图更新后的回调函数
    nextTick(() => {
        useColumnWidth()
        // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
        props.data.forEach((item) => {
            item._style = null
        })
    })
})

</script>

<style lang="scss" scoped></style>