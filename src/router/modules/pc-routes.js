/*
 * @Author: wangyongalive jsonwang0102@163.com
 * @Date: 2023-06-09 21:30:41
 * @LastEditors: wangyongalive jsonwang0102@163.com
 * @LastEditTime: 2023-06-23 22:39:31
 * @FilePath: \viteVue3\src\router\modules\pc-routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue')
      },
      {
        path: '/pins/:id',
        name: 'pins',
        component: () => import('@/views/pins/index.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          user: true // 标记用户登录后才能进入
        }
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('@/views/member/index.vue'),
        meta: {
          user: true
        }
      }
      // {
      //   path: '/pay/result',
      //   name: 'payResult',
      //   component: () => import('@/views/pay/index.vue'),
      //   meta: {
      //     user: true
      //   }
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login-register/register/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404/index.vue')
  },
  // 404 页面处理
  {
    path: '/:catchAll(.*)',
    name: 'error',
    redirect: '/404'
  }
]
