import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
// 处理navigationBar中的数据 categorys
export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    // 把旧数据使用vuex-persistedstate 进行保存
    categorys: [CATEGORY_NOMAR_DATA]
  }),
  mutations: {
    /**
     * 为 categorys 赋值
     */
    setCategorys(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  actions: {
    /**
     * 获取 category 数据，并自动保存到 vuex 中
     */
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
