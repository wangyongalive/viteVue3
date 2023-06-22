import { loginUser, getProfile } from '@/api/sys'
import { message } from '@/libs'
import md5 from 'md5'
export default {
  namespaced: true,
  state: () => ({
    // 登录之后的 token
    token: '',
    // 获取用户信息
    userInfo: {}
  }),
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      state.token = newToken
    },
    /**
     * 保存用户信息
     */
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
    }
  },
  actions: {
    /**
     * 登录
     */
    async login(context, payload) {
      try {
        const { password } = payload
        const data = await loginUser({
          ...payload,
          password: password ? md5(password) : '' // 其他登录方式可能是空
        })
        context.commit('setToken', data.token)
        await context.dispatch('profile') // profile返回promise await 一下
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * 获取用户信息
     */
    async profile(context) {
      const data = await getProfile()
      await context.commit('setUserInfo', data)
      // 欢迎
      message(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname
            : data.nickname
        } `,
        6000
      )
    },
    /**
     * 退出登录
     */
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
      location.reload()
    }
  }
}
