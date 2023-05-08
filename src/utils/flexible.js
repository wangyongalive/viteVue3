import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize() // 轻松地获取并响应浏览器窗口的变化

/**
 * 判断当前是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})
