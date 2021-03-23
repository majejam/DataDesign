//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import Store from '@/store'
export default class Concert {
  constructor(festival, data = null, opt = {}) {
    this.$festival = festival
    this.$data = data
    this.$opt = opt
    this.concert = {
      container: null,
      graphics: null,
      color: this.$opt.color ? this.$opt.color : 0xff0000,
      size: {
        width: this.$opt.width ? this.$opt.width : 500,
        height: this.$opt.height ? this.$opt.height : 500,
      },
      position: {
        x: this.$opt.x ? this.$opt.x : 0,
        y: this.$opt.y ? this.$opt.y : 0,
      },
    }
    this.init()
  }

  init() {
    this.setEvents()
    this.createConcert()
  }

  createConcert() {
    this.concert.container = new Engine.PIXI.Container()
    this.concert.container.zIndex = 2
    this.createConcertGrounds()
    this.createConcertName()
    this.concertInteractivity(true)
    this.$festival.addChild(this.concert.container)
  }

  createConcertGrounds() {
    this.concert.graphics = new Engine.PIXI.Graphics()
    this.concert.graphics.beginFill(this.concert.color)
    this.concert.graphics.drawRect(0, 0, this.concert.size.width, this.concert.size.height)
    this.concert.graphics.endFill()

    this.concert.container.x = this.concert.position.x
    this.concert.container.y = this.concert.position.y
    this.addChild(this.concert.graphics)
  }

  createConcertName() {
    let text = new Engine.PIXI.Text(this.$data.artists[0].name, { fontFamily: 'Arial', fontSize: 24, fill: 0x000000, align: 'center' })
    this.addChild(text)
  }

  concertInteractivity(bool) {
    if (bool) {
      this.concert.container.interactive = true
      this.concert.container.on('mousedown', () => {
        console.log(this.$data.uri)
        Store.dispatch('playTrack', this.$data.uri)
      })
    }
  }

  addChild(child) {
    this.concert.container.addChild(child)
  }

  update() {}

  /**
   * EVENTS
   */

  setEvents() {
    /**
     * Binding functions
     */
    this._update = this.update.bind(this)
    //Engine.$app.ticker.add(this._update)
  }

  removeEvents() {}
}
