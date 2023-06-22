<template>
  <!-- 头部图标 -->
  <header-vue></header-vue>
  <!-- 表单区 -->
  <div
    class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg">
    <h3 class="text-center mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block">
      账号登录
    </h3>
    <!-- 表单 -->
    <vee-form @submit="onLoginHandler">
      <!-- focus激活状态  outline-0 边框为0-->
      <!-- 用户名 -->
      <vee-field
        class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        name="username" type="text" placeholder="用户名" autocomplete="on" :rules="validateUsername"
        v-model="loginForm.username" />
      <vee-error-message class="text-sm text-red-600 block mt-0.5 text-left" name="username" />
      <!-- 密码 -->
      <vee-field
        class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        name="password" type="password" placeholder="密码" autocomplete="on" :rules="validatePassword"
        v-model="loginForm.password" />
      <vee-error-message class="text-sm text-red-600 block mt-0.5 text-left" name="password" />
      <!-- leading-[0px] div的高度比较小 -->
      <div class="pt-1 pb-3 leading-[0px] text-right">
        <a class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
          @click="onToRegister">
          去注册
        </a>
      </div>
      <m-button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800" :loading="loading" :isActiveAnim="false">
        登录
      </m-button>
    </vee-form>

    <div class="flex justify-around mt-4">
      <!-- QQ -->
      <m-svg-icon class="w-4 cursor-point" name="qq"></m-svg-icon>
      <!-- 微信 -->
      <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
    </div>
    <slider-captcha-vue v-if="isSliderCaptchaVisible" @close="isSliderCaptchaVisible = false"
      @success="onCaptchaSuccess"></slider-captcha-vue>
  </div>
</template>

<script setup name="Login">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import headerVue from '../components/header.vue'
import sliderCaptchaVue from './slider-captcha.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import { LOGIN_TYPE_USERNAME } from '@/constants'

const store = useStore()
const router = useRouter()

/**
* 进入注册页面
*/
const onToRegister = () => {
  // 配置跳转方式
  router.push('/register')
}


// 控制 sliderCaptcha 展示
const isSliderCaptchaVisible = ref(false)


/**
 * 登录触发 表单校验后才会触发
 */
const onLoginHandler = () => {
  isSliderCaptchaVisible.value = true
}

/**
 * 人类行为验证通过
 */
const onCaptchaSuccess = async () => {
  isSliderCaptchaVisible.value = false
  // 登录操作
  onLogin()
}

// 登录时的 loading
const loading = ref(false)
// 用户输入的用户名和密码
const loginForm = ref({
  username: '',
  password: ''
})


/**
 * 用户登录行为
 */
const onLogin = async () => {
  loading.value = true
  // 执行登录操作
  try {
    await store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
    router.push('/')
  }
  catch (err) {
    console.log(err)
  }
  finally { // finally 没有写catch如果报错 后面的代码将不会执行
    loading.value = false
  }
}

</script>

<style lang="scss" scoped></style>
