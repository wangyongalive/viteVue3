import { createApp } from 'vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import App from './App.vue'
import mLibs from './libs'
import mDirective from './directives'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
// 注册svg-icon
import 'virtual:svg-icons-register'
// 鉴权
import './permission'

// 设置 rem
useREM()
// 初始化主题
useTheme()
createApp(App).use(router).use(mLibs).use(store).use(mDirective).mount('#app')
