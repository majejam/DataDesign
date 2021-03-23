import Bus from '@/utils/bus.js'

import Store from '@/store'
export default class Player {
  constructor() {
    this.init()
    this.hasToken = false
    this.hasInit = false
  }

  init() {
    Bus.$on('ApiInit', () => {
      console.log('Bus init api')
      this.hasToken = true
      //this.initPlayer()
      window.onSpotifyWebPlaybackSDKReady = () => {
        this.initPlayer()
      }
    })
  }

  initPlayer() {
    console.log('init player')
    const token = Store.getters.getTokens['access_token']
    console.log(token)
    const player = new window.Spotify.Player({
      name: 'Create ur festival',
      getOAuthToken: cb => {
        cb(token)
      },
    })

    // Error handling
    player.addListener('initialization_error', ({ message }) => {
      console.error(message)
    })
    player.addListener('authentication_error', ({ message }) => {
      console.error(message)
    })
    player.addListener('account_error', ({ message }) => {
      console.error(message)
    })
    player.addListener('playback_error', ({ message }) => {
      console.error(message)
    })

    // Playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state)
    })

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
      Store.commit('setCurrentPlaybackDevice', device_id)
    })

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    player.addListener('player_state_changed', ({ position, duration, track_window: { current_track } }) => {
      console.log('Currently Playing', current_track)
      console.log('Position in Song', position)
      console.log('Duration of Song', duration)
    })

    // Connect to the player!
    player.connect()

    this.hasInit = true
  }
}
