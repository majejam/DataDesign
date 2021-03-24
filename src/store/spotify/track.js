import Vue from 'vue'

const state = {
  recentlyPlayed: [],
  currentPlaybackDevice: 0,
  playerInit: false,
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
  getPlayerInit(state) {
    return state.playerInit
  },
  getCurrentPlaybackDevice(state) {
    return state.currentPlaybackDevice
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
  setPlayerInit(state, data) {
    state.playerInit = data
  },
  setCurrentPlaybackDevice(state, data) {
    state.currentPlaybackDevice = data
  },
  setSearchData(state, data) {
    state.searchData = data
  },
  setUserTop(state, data) {
    state.userTop = data
  },
}

const actions = {
  playTrack({ getters }, uri) {
    console.log(uri)
    /**
     * {
  "uris": [ "spotify:track:18lKp9uRyR2xJZFvg8ZWUC"],
  "position_ms": 0
}
     */
    Vue.axios
      .put(
        `https://api.spotify.com/v1/me/player/play?device_id=${getters.getCurrentPlaybackDevice}`,
        JSON.stringify({
          uris: [uri],
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
        //dispatch('getCurrentPlayback')
      })
  },
  pauseTrack({ getters }) {
    Vue.axios
      .put(
        `https://api.spotify.com/v1/me/player/pause?device_id=${getters.getCurrentPlaybackDevice}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getters.getTokens['access_token'],
          },
        }
      )
      .then(() => {
        //dispatch('getCurrentPlayback')
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
