import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated && store.getters.isRefreshToken) {
        store
          .dispatch('refreshToken')
          .then(() => {
            next()
          })
          .catch(() => {
            store.commit('setCode', '')
            //next('/login')
          })
        next()
      } else if (store.getters.isAuthenticated && !store.getters.isRefreshToken) {
        next()
      } else {
        store.commit('setCode', '')
        next()
        //next('/login')
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next('/')
      } else {
        next()
      }
    },
  },
  {
    path: '/auth/callback/*',
    beforeEnter(to, from, next) {
      if (to.query.code !== '' && to.query.code !== undefined) {
        store.commit('setCode', to.query.code)
        store
          .dispatch('initUser')
          .then(() => {
            next('/')
          })
          .catch(() => {
            store.commit('setCode', '')
          })
      } else {
        store.commit('setCode', '')
      }
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
export default router
