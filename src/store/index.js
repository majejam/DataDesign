import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from '@/store/spotify/user'
import personalization from '@/store/spotify/personalization'
import track from '@/store/spotify/track'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    personalization,
    track,
  },
  plugins: [createPersistedState()],
})
