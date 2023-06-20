import { loginUser } from '@/api/sys'
import md5 from 'md5'
export default {
  namespaced: true,
  state: () => ({
    // 登录之后的 token
    token: ''
  }),
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
    /**
     * 登录
     */
    async login(context, payload) {
      try{
        const { password } = payload
        const data = await loginUser({
          ...payload,
          password: password ? md5(password) : '' // 其他登录方式可能是空
        })
        // console.log('user login!!!!!!!!!')
        context.commit('setToken', data.token)
      }catch(err){
        console.log(err)
      }
    }
  }
}
