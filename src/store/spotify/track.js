import Vue from 'vue'

const state = {
  recentlyPlayed: [],
  currentPlayback: {},
  searchData: {
    artists: {
      items: [],
    },
    tracks: {
      items: [],
    },
  },
  userTop: {},
}

const getters = {
  getRecentlyPlayed(state) {
    return state.recentlyPlayed
  },
  getCurrentPlayback(state) {
    return state.currentPlayback
  },
  getSearchData(state) {
    return state.searchData
  },
  getUserTop(state) {
    return state.userTop
  },
}

const mutations = {
  setRecentlyPlayed(state, data) {
    state.recentlyPlayed = data
  },
  setCurrentPlayback(state, data) {
    state.currentPlayback = data
  },
  setSearchData(state, data) {
    state.searchData = data
  },
  setUserTop(state, data) {
    state.userTop = data
  },
}

const actions = {
  getCurrentPlayback({ getters, commit }) {
    Vue.axios
      .get('https://api.spotify.com/v1/me/player', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        if (res.status === 200) {
          commit('setCurrentPlayback', res.data)
          console.log(res.data)
        } else {
          console.log('getCurrentPlaybackError')
        }
      })
      .catch(err => {
        console.log('getCurrentPlayback : ' + err)
      })
  },
  playTrack({ getters, dispatch }, id) {
    console.log(
      id,
      JSON.stringify({
        context_uri: 'spotify:track:6EJiVf7U0p1BBfs0qqeb1f',
        offset: {
          position: 5,
        },
        position_ms: 0,
      })
    )
    Vue.axios
      .put(
        `https://api.spotify.com/v1/me/player/play?device_id=${id}`,
        JSON.stringify({
          context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
          offset: {
            position: 5,
          },
          position_ms: 0,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getters.getTokens['access_token'],
          },
        }
      )
      .then(() => {
        dispatch('getCurrentPlayback')
      })
  },
  pauseTrack({ getters, dispatch }) {
    Vue.axios
      .put(
        `https://api.spotify.com/v1/me/player/pause?device_id=${getters.getCurrentPlayback.device.id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getters.getTokens['access_token'],
          },
        }
      )
      .then(() => {
        dispatch('getCurrentPlayback')
      })
  },
  setVolume({ getters }, volume) {
    Vue.axios
      .put(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getters.getTokens['access_token'],
          },
        }
      )
      .then(res => {
        if (res.status !== 204) {
          console.log('setVolumeError')
        }
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
