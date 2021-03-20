import Vue from 'vue'
import router from '@/router'

const state = {
  topArtist: [],
  topTracks: [],
}

const getters = {
  getTopArtist(state) {
    return state.topArtist
  },
  getTopTracks(state) {
    return state.topTracks
  },
}

const mutations = {
  setTopArtist(state, data) {
    state.topArtist = data
  },
  setTopTracks(state, data) {
    state.topTracks = data
  },
  clearTopArtist(state) {
    state.topArtist = []
  },
  clearTopTracks(state) {
    state.topTracks = []
  },
}

const actions = {
  initPersonalization({ dispatch }) {
    console.log(router.currentRoute.fullPath)
    console.log('initPersonalization')
    dispatch('getUserTopArtists')
    dispatch('getUserTopTracks')
  },
  getUserTopArtists({ getters, commit }) {
    console.log(getters.getTokens['access_token'])
    Vue.axios
      .get(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          commit('setTopArtist', res.data)
        } else {
          console.log('getTopTracks')
        }
      })
      .catch(err => {
        console.log('getTopTracks : ' + err)
      })
  },
  getUserTopTracks({ getters, commit }) {
    Vue.axios
      .get('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        if (res.status === 200) {
          commit('setTopTracks', res.data)
          console.log(res.data)
        } else {
          console.log('getUserTopTracksError')
        }
      })
      .catch(() => {
        console.log('getUserTopTracksError')
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
