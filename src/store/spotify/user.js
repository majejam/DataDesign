import Vue from 'vue'
import * as querystring from 'querystring'
import router from '@/router'
import Bus from '@/utils/bus.js'
const state = {
  code: '',
  tokens: {},
  refresh_token: '',
  user: {
    images: [
      {
        url: '',
      },
    ],
  },
}

const getters = {
  getCode(state) {
    return state.code
  },
  getTokens(state) {
    return state.tokens
  },
  getRefreshToken(state) {
    return state.refresh_token
  },
  isRefreshToken(state) {
    return state.refresh_token !== ''
  },
  getUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.code !== ''
  },
}

const mutations = {
  setCode(state, data) {
    state.code = data
  },
  setToken(state, data) {
    state.tokens = data
  },
  setRefreshToken(state, data) {
    state.refresh_token = data
  },
  setUser(state, data) {
    state.user = data
  },
  clearState(state) {
    state.code = ''
    state.tokens = {}
    state.user = {
      images: [
        {
          url: '',
        },
      ],
    }
  },
}

const actions = {
  initUser({ getters, commit, dispatch }) {
    Vue.axios
      .post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          code: getters.getCode,
          redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URL,
          grant_type: 'authorization_code',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + new Buffer(process.env.VUE_APP_SPOTIFY_CLIENT_ID + ':' + process.env.VUE_APP_SPOTIFY_CLIENT_SECRET).toString('base64'),
          },
        }
      )
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          commit('setToken', res.data)
          commit('setRefreshToken', res.data.refresh_token)
          dispatch('getUser')
          dispatch('initPersonalization')
          Bus.$emit('ApiInit')
        } else {
          dispatch('logoutUser')
        }
      })
      .catch(() => {
        dispatch('logoutUser')
      })
  },
  getUser({ getters, commit }) {
    Vue.axios
      .get('https://api.spotify.com/v1/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        commit('setUser', res.data)
      })
  },
  refreshToken({ getters, commit, dispatch }) {
    Vue.axios
      .post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          grant_type: 'refresh_token',
          refresh_token: getters.getRefreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + new Buffer(process.env.VUE_APP_SPOTIFY_CLIENT_ID + ':' + process.env.VUE_APP_SPOTIFY_CLIENT_SECRET).toString('base64'),
          },
        }
      )
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          commit('setToken', res.data)
          Bus.$emit('ApiInit')
        } else {
          dispatch('logoutUser')
        }
      })
      .catch(() => {
        dispatch('logoutUser')
      })
  },
  logoutUser({ commit }) {
    commit('clearState')
    router.replace('/login')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
