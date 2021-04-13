import Vue from 'vue'

const state = {
  recentlyPlayed: [],
  currentPlaybackDevice: 0,
  playerInit: false,
  currentSong: {
    external_urls: {
      spotify: null,
    },
  },
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
  getCurrentSong(state) {
    return state.currentSong
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
  setCurrentSong(state, data) {
    state.currentSong = data
  },
  setSearchData(state, data) {
    state.searchData = data
  },
  setUserTop(state, data) {
    state.userTop = data
  },
}

const actions = {
  playTracks({ getters, dispatch }, opt) {
    Vue.axios
      .get(`https://api.spotify.com/v1/artists/${opt.artist}/top-tracks?market=FR`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        let tracks_uri = res.data.tracks.map(obj => {
          return obj.uri
        })
        tracks_uri = [opt.uri, ...tracks_uri]
        tracks_uri = [...new Set(tracks_uri)]
        dispatch('playTrack', tracks_uri)
      })
  },

  playTrack({ getters }, uris) {
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
          uris: uris,
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

  getTracks({ getters }, uris) {
    Vue.axios
      .get(`https://api.spotify.com/v1/tracks?ids=${uris}&market=FR`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        console.log('Seed for recommendation was based on :', res)
        res.data.tracks.forEach((track, index) => {
          console.log(index, track.name, track.artists[0].name)
        })
      })
  },

  getTrack({ getters, commit }, uris) {
    Vue.axios
      .get(`https://api.spotify.com/v1/tracks?ids=${uris}&market=FR`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.getTokens['access_token'],
        },
      })
      .then(res => {
        commit('setCurrentSong', res.data.tracks[0])
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
