import Vue from 'vue'
import Bus from '@/utils/bus.js'

const state = {
  topArtist: [],
  topTracks: [],
  topTracksFeatures: [],
  topIds: [],
  currentFestival: 'normal',
}

const getters = {
  getTopArtist(state) {
    return state.topArtist
  },
  getTopTracks(state) {
    return state.topTracks
  },
  getTopTracksFeatures(state) {
    return state.topTracksFeatures
  },
  getTopIds(state) {
    return state.topIds
  },
  getCurrentFestival(state) {
    return state.currentFestival
  },
}

const mutations = {
  setTopArtist(state, data) {
    state.topArtist = data
  },
  setTopTracks(state, data) {
    state.topTracks = data
  },
  setTopTracksFeatures(state, data) {
    state.topTracksFeatures = data
  },
  setTopIds(state, data) {
    state.topIds = data
  },
  setCurrentFestival(state, data) {
    state.currentFestival = data
  },
  clearTopArtist(state) {
    state.topArtist = []
  },
  clearTopTracks(state) {
    state.topTracks = []
  },
  clearTopTracksFeatures(state) {
    state.topTracksFeatures = []
  },
}

const actions = {
  initPersonalization({ dispatch }) {
    console.log('Personnalisation initialisation')
    dispatch('getUserTopArtists')
    dispatch('getUserTopTracks')
  },
  getUserTopArtists({ getters, commit, dispatch }) {
    Vue.axios
      .get(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        if (res.status === 200) {
          commit('setTopArtist', res.data)
        } else {
          console.log('getTopTracks')
        }
      })
      .catch(err => {
        console.log('getTopTracks : ' + err)
        dispatch('logoutUser')
        //commit('clearState')
      })
  },
  getUserTopTracks({ getters, commit, dispatch }) {
    Vue.axios
      .get('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        if (res.status === 200) {
          commit('setTopTracks', res.data)
          let ids = res.data.items.map(obj => {
            return obj.id
          })
          dispatch('getAudioFeatures', ids.toString())
          commit('setTopIds', ids)
          commit('setCurrentFestival', 'normal')
          //dispatch('getRecommendation', ids.slice(0, 5).toString())
        } else {
          console.log('getUserTopTracksError')
        }
      })
      .catch(() => {
        console.log('getUserTopTracksError')
      })
  },
  getAudioFeatures({ getters, commit }, ids) {
    Vue.axios
      .get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        if (res.status === 200) {
          commit('clearTopTracksFeatures')
          /**
           * Merges data from tracks api call & corresponding audio features from this call
           */
          const data = res.data.audio_features.map((obj, index) => {
            delete getters.getTopTracks.items[index].album.available_markets
            delete getters.getTopTracks.items[index].available_markets
            Object.assign(getters.getTopTracks.items[index], { audio_features: obj })
            return getters.getTopTracks.items[index]
          })

          const dataUniqueArtist = Array.from(new Set(data.map(a => a.artists[0].id))).map(id => {
            return data.find(a => a.artists[0].id === id)
          })
          commit('setTopTracksFeatures', dataUniqueArtist)
          Bus.$emit('NewFestival')
        } else {
          console.log('getAudioFeaturesError')
        }
      })
      .catch(() => {
        //dispatch('logoutUser')
      })
  },
  getRecommendation({ getters, commit, dispatch }, uris) {
    dispatch('getTracks', uris)
    Vue.axios
      .get(`https://api.spotify.com/v1/recommendations?limit=20&min_energy=0.1&min_valence=0.1&market=FR&seed_tracks=${uris}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        if (res.status === 200) {
          Object.defineProperty(res.data, 'items', Object.getOwnPropertyDescriptor(res.data, 'tracks'))
          delete res.data['tracks']
          commit('setTopTracks', res.data)
          let ids = res.data.items.map(obj => {
            return obj.id
          })
          commit('setCurrentFestival', 'recommended')
          dispatch('getAudioFeatures', ids.toString())
        } else {
          console.log('getAudioFeaturesError')
        }
      })
      .catch(() => {
        //dispatch('logoutUser')
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
