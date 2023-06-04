// defineAsyncComponent  异步组件
import { defineAsyncComponent } from 'vue'
// 导入 confirm.ts 中的 confirm() 函数，并再次导出
export { confirm } from './confirm'

export default {
  // install 方法
  install(app) {
    // 获取当前路径任意文件夹下的 index.vue 文件
    // glob 从文件系统导入多个模块
    const components = import.meta.glob('./*/index.vue')
    // console.log(components)
    // 遍历获取到的组件模块
    for (const [key, value] of Object.entries(components)) {
      // 拼接组件注册的 name
      const componentName = 'm-' + key.replace('./', '').split('/')[0]
      // 通过 defineAsyncComponent 异步导入指定路径下的组件
      app.component(componentName, defineAsyncComponent(value))
    }
  }
}
