//import Bus from '@/utils/bus.js'

import Store from '@/store'
export default class Player {
  constructor() {
    this.init()
  }

  init() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = Store.getters.getTokens['access_token']
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

        //Store.dispatch('getCurrentPlayback')

        setTimeout(() => {
          console.log('cc')
          Store.dispatch('playTrack', 'spotify:album:3tXNwhv4GZQDHCOb4p5kcS')
        }, 5000)
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
    }
  }
}
