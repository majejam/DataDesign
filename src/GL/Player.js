import Bus from '@/utils/bus.js'

import Store from '@/store'
class Player {
  constructor() {
    this.player = null
    this.hasInit = false
    this.isAllowed = true

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
    const token = Store.getters.getTokens['access_token']
    this.player = new window.Spotify.Player({
      name: 'Create your festival',
      volume: 0,
      getOAuthToken: cb => {
        cb(token)
      },
    })

    this.setEvents()

    // Connect to the player!
    this.player.connect()

    this.audio = new Audio('audio/ambience.mp3')
    this.audio.volume = 0.2
    this.audio.loop = true

    Bus.$on('PlayerInit', () => {
      console.log('Init done')
    })
  }

  playAmbience() {
    this.audio.play().catch(() => {
      setTimeout(() => {
        this.playAmbience()
      }, 1000)
    })
  }

  setFadeVolume(level, timing) {
    return new Promise(resolve => {
      clearInterval(this.interval)
      const step = 0.01
      const isAdd = level - this.volume.current > 0 ? true : false
      this.volume.current = level
      this.interval = setInterval(() => {
        if (this.volume.target <= level && isAdd) {
          this.volume.target += step
          this.player.setVolume(Math.pow(this.volume.target, 2))
          if (this.volume.target > 1 - step) this.volume.target = 1
        } else if (this.volume.target > level && !isAdd) {
          this.volume.target -= step
          this.player.setVolume(Math.pow(this.volume.target, 2))
          if (this.volume.target < step) this.volume.target = 0
        } else {
          clearInterval(this.interval)
          resolve('finish')
        }
      }, timing)
    })
  }

  changeTrackFade(uri) {
    //console.log(uri);
    if (!this.isAllowed) {
      console.warn('Player was set on not allowed')
      return false
    }

    this.setFadeVolume(0, 50).then(() => {
      console.log('Switching track...')
      Store.dispatch('playTrack', uri).then(() => {
        this.setFadeVolume(0.8, 50).then(() => {
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
      console.error(message)
    })
    this.player.addListener('authentication_error', ({ message }) => {
      console.error(message)
    })
    this.player.addListener('account_error', ({ message }) => {
      console.error(message)
    })
    this.player.addListener('playback_error', ({ message }) => {
      console.error(message)
    })

    // Playback status updates
    //this.player.addListener('player_state_changed')

    // Ready
    this.player.addListener('ready', this._playerReady)

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })
    /*
    this.player.addListener('player_state_changed', ({ position, duration, track_window: { current_track } }) => {
      console.log('Currently Playing', current_track)
      console.log('Position in Song', position)
      console.log('Duration of Song', duration)
    })*/
  }
}

let PlayerInstance = new Player()

export default PlayerInstance
