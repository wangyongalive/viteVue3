import { useIntersectionObserver } from '@vueuse/core'

export default {
  // 图片懒加载：在用户无法看到图片时，不加载图片，在用户可以看到图片后加载图片
  // 如何判断用户是否看到了图片：useIntersectionObserver
  // 如何做到不加载图片（网络）：img 标签渲染图片，指的是 img 的 src 属性，src 属性是网络地址时，则会从网络中获取该图片资源。那么如果 img 标签不是网络地址呢？把该网络地址默认替换为非网络地址，然后当用户可见时，在替换成网络地址。
  mounted(el) {
    console.log(el)
    // 1. 拿到当前 img 标签的 src
    const imgSrc = el.src
    // 2. 把 img 标签的 src 替换为本地地址
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 3. 当图片可见实时 加载图片
        el.src = imgSrc
        // 4. 停止监听
        stop()
      }
    })
  }
}