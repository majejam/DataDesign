import Vue from 'vue'

const state = {
  topArtist: [],
  topTracks: [],
  topTracksFeatures: [],
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
    console.log('initPersonalization')
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
          console.log(res.data)
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
          console.log(res.data.items)
          let ids = res.data.items.map(obj => {
            return obj.id
          })
          dispatch('getAudioFeatures', ids.toString())
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
          console.log(dataUniqueArtist)
          commit('setTopTracksFeatures', dataUniqueArtist)
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
