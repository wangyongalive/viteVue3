import { createApp } from 'vue'
import router from './router'
import './styles/index.scss'
import App from './App.vue'
import mLibs from './libs'
import { useREM } from './utils/flexible'
// 注册svg-icon
import 'virtual:svg-icons-register'

// 设置 rem
useREM()

createApp(App).use(router).use(mLibs).mount('#app')
