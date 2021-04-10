import Bus from '@/utils/bus.js'

import Store from '@/store'
import router from '@/router'
class Player {
  constructor() {
    this.currenturi = ''
    this.player = null
    this.hasInit = false
    this.isAllowed = false

    this.status = {
      readyToInit: false,
      hasInit: false,
      apiHasInit: false,
    }

    this.volume = {
      current: 0.1,
      target: 0.1,
    }
  }

  init() {
    Store.commit('setPlayerInit', false)
    Bus.$on('ApiInit', () => {
      console.log('Bus init api')

      setInterval(() => {
        console.log('Refreshed token')
        Store.dispatch('refreshToken')
      }, 60000 * 30)

      if (this.status.readyToInit) this.initPlayer()
      else this.status.apiHasInit = true
    })

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (this.status.apiHasInit) this.initPlayer()
      else this.status.readyToInit = true
    }
  }

  initPlayer() {
    console.log('Player initialization')
    Store.commit('setLoadingMessage', 'Player initialization')
    const token = Store.getters.getTokens['access_token']
    this.player = new window.Spotify.Player({
      name: 'Create your festival',
      volume: Store.getters.getVolume,
      getOAuthToken: cb => {
        cb(token)
      },
    })

    this.volume.current = Store.getters.getVolume

    this.setEvents()

    // Connect to the player!
    this.player.connect()

    this.audio = new Audio('audio/ambience.mp3')
    this.audio.volume = Store.getters.getVolume * 0.4
    this.audio.loop = true

    Bus.$on('PlayerInit', () => {
      console.log('Init done')
    })
  }

  playAmbience() {
    if (!this.isAllowed) return
    this.audio.play().catch(() => {
      setTimeout(() => {
        this.playAmbience()
      }, 1000)
    })
  }

  setAmbienceVolume() {
    const volume = Store.getters.getVolume
    this.audio.volume = Math.round(volume * 0.6 * 10) / 10
  }

  setGlobalVolume(value) {
    Store.commit('setVolume', value)
    this.setAmbienceVolume()
    const volume = Store.getters.getVolume

    if (volume == 0) {
      this.volume.current = 0
      this.setFadeVolume(0, 100)
    } else {
      this.setFadeVolume(volume, 100)
    }
  }

  setFadeVolume(level, timing) {
    console.log(level)
    return new Promise(resolve => {
      clearInterval(this.interval)
      const step = 0.05
      const isAdd = level - this.volume.current > 0 ? true : false
      if (level === 0 && this.volume.current === 0) {
        this.volume.target = 0
        this.player.setVolume(0.0001)
        resolve('finish')
      }
      this.volume.current = level

      this.interval = setInterval(() => {
        if (this.volume.target <= level && isAdd) {
          this.volume.target += step
          if (this.volume.target > level - step) this.volume.target = level
          //console.log(this.volume.target)
          this.player.setVolume(Math.round(this.volume.target * 100) / 100)
        } else if (this.volume.target > level && !isAdd) {
          if (this.volume.target < 0.01) {
            this.volume.target = 0
            this.player.setVolume(0.0001)
          } else {
            this.volume.target -= step
            this.player.setVolume(Math.floor(this.volume.target * 100) / 100)
          }
        } else {
          clearInterval(this.interval)
          resolve('finish')
        }
      }, timing)
    })
  }

  mute() {}

  changeTrackFade(uri, artist) {
    this.currenturi = uri
    if (!this.status.hasInit) {
      console.warn('Player was not ready (might be demo mode)')
      return false
    }
    if (!this.isAllowed) {
      console.warn('Player was set on not allowed')
      return false
    }

    this.setFadeVolume(0, 50).then(() => {
      console.log('Switching track...')
      Store.dispatch('playTracks', { uri: uri, artist: artist }).then(() => {
        const volume = Store.getters.getVolume
        this.setFadeVolume(volume, 50).then(() => {
          console.log('Volume set to normal')
        })
      })
    })
    //Store.dispatch('playTrack', data[current].$data.uri)
  }

  /**
   * Event function
   */

  playerReady(_e) {
    console.log('Ready with Device ID', _e.device_id)
    Store.commit('setCurrentPlaybackDevice', _e.device_id)
    Store.commit('setPlayerInit', true)
    Bus.$emit('PlayerInit')
    this.status.hasInit = true
  }

  /**
   * Events
   */
  setEvents() {
    this._playerReady = this.playerReady.bind(this)
    // Error handling
    this.player.addListener('initialization_error', ({ message }) => {
      console.warn(message)
    })
    this.player.addListener('authentication_error', ({ message }) => {
      console.warn(message)
    })
    this.player.addListener('account_error', ({ message }) => {
      console.warn(message)
      Store.commit('setPlayerInit', false)
      Bus.$emit('PlayerInit')
      Store.commit('clearState', false)
      this.status.hasInit = false
      router.push('Demo')
    })

    this.player.addListener('playback_error', ({ message }) => {
      console.warn(message)
    })
    // Ready
    this.player.addListener('ready', this._playerReady)

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    this.player.addListener('player_state_changed', ({ track_window: { current_track } }) => {
      if (Store.getters.getCurrentSong.id !== current_track.id) Store.dispatch('getTrack', current_track.id)
    })
  }
}

let PlayerInstance = new Player()

export default PlayerInstance
