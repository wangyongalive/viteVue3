import path, { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    }),
    VueSetupExtend()
  ],
  // 软链接
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  // 代理
  server: {
    open: true,
    proxy: {
      // 代理所有 /api 的请求，该求情将被代理到 target 中
      '/prod-api': {
        // 代理请求之后的请求地址
        target: 'http://localhost:3000',
        // 跨域
        changeOrigin: true
      }
    }
  }
})
