import Bus from '@/utils/bus.js'

import Store from '@/store'
class Player {
  constructor() {
    this.hasToken = false
    this.hasInit = false
    this.playerisInit = false
    this.apiisInit = false
    this.player = null

    this.volume = {
      current: 0.1,
      target: 0.1,
    }
  }

  init() {
    Bus.$on('ApiInit', () => {
      console.log('Bus init api')
      this.hasToken = true

      if (this.playerisInit) this.initPlayer()
      else this.apiisInit = true
    })

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (this.apiisInit) this.initPlayer()
      else this.playerisInit = true
    }
  }

  initPlayer() {
    console.log('init player')
    const token = Store.getters.getTokens['access_token']
    console.log(token)
    this.player = new window.Spotify.Player({
      name: 'Create ur festival',
      volume: 0,
      getOAuthToken: cb => {
        cb(token)
      },
    })

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
    this.player.addListener('player_state_changed', state => {
      console.log(state)
    })

    // Ready
    this.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
      Store.commit('setCurrentPlaybackDevice', device_id)
      Store.commit('setPlayerInit', true)
      console.log(this.player)
      this.hasInit = true
      Bus.$emit('PlayerInit')
    })

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    this.player.addListener('player_state_changed', ({ position, duration, track_window: { current_track } }) => {
      console.log('Currently Playing', current_track)
      console.log('Position in Song', position)
      console.log('Duration of Song', duration)
    })

    // Connect to the player!
    this.player.connect()

    Bus.$on('PlayerInit', () => {
      console.log('Init done')
    })
  }

  setFadeVolume(level, timing) {
    return new Promise(resolve => {
      clearInterval(this.interval)
      const step = 0.01
      const isAdd = level - this.volume.current > 0 ? true : false
      console.log('VALUE : ', isAdd)
      this.volume.current = level
      this.interval = setInterval(() => {
        if (this.volume.target <= level && isAdd) {
          this.volume.target += step
          console.log(Math.pow(this.volume.target, 2))
          this.player.setVolume(Math.pow(this.volume.target, 2))
          if (this.volume.target > 1 - step) this.volume.target = 1
        } else if (this.volume.target > level && !isAdd) {
          this.volume.target -= step
          console.log(Math.pow(this.volume.target, 2))
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
    this.setFadeVolume(0, 100).then(() => {
      console.log('Switching track...')
      Store.dispatch('playTrack', uri).then(() => {
        this.setFadeVolume(0.2, 100).then(() => {
          console.log('Volume set to normal')
        })
      })
    })
    //Store.dispatch('playTrack', data[current].$data.uri)
  }
}

let PlayerInstance = new Player()

export default PlayerInstance
