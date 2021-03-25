//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
//import Store from '@/store'
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
      crowd: {
        container: null,
        data: new Array(),
      },
      distance: 0,
    }
    this.init()
  }

  init() {
    this.setEvents()
    this.createConcert()

    console.log(this.$data.popularity / 100, Math.abs(Math.exp(this.$data.audio_features.danceability + 0.001) / Math.exp(1)))
  }

  createConcert() {
    this.concert.container = new Engine.PIXI.Container()
    this.concert.container.zIndex = 2
    this.createConcertGrounds()
    this.createConcertName()
    this.createCrowd(10, 100 * (this.$data.popularity / 100))
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
        //this.$festival.hideFestival()
        //Store.dispatch('playTrack', this.$data.uri)
      })
    }
  }

  createMan(x, y) {
    // create an animated sprite
    this.animatedCapguy = new Engine.PIXI.AnimatedSprite(Engine.spritesheet.animations['dancingman'])
    // set speed, start playback and add it to the stage
    this.animatedCapguy.animationSpeed = this.$data.audio_features.danceability / 3
    this.animatedCapguy.play()
    this.animatedCapguy.position.x = x
    this.animatedCapguy.position.y = y
    this.concert.crowd.container.addChild(this.animatedCapguy)
    return this.animatedCapguy
  }

  createCrowd(peoplePerRow, numberOfPeople) {
    this.concert.crowd.container = new Engine.PIXI.Container()
    let count = 0
    let row = 0

    for (let index = 0; index < numberOfPeople; index++) {
      let xPos = count * 90 + Math.random() * 20
      let yPos = row * 90 + Math.random() * 20

      this.concert.crowd.data.push(this.createMan(xPos, yPos))

      if (count === peoplePerRow - 1) {
        row++
        count = 0
      } else {
        count++
      }
    }

    this.concert.crowd.container.x = this.concert.container.width / 2
    this.concert.crowd.container.y = this.concert.container.height / 2

    this.concert.crowd.container.pivot.x = this.concert.crowd.container.width / 2
    this.concert.crowd.container.pivot.y = this.concert.crowd.container.height / 2

    this.addChild(this.concert.crowd.container)
  }

  addChild(child) {
    this.concert.container.addChild(child)
  }

  update() {}

  /**
   * Getters
   */

  getPosition() {
    return this.concert.position
  }

  getMiddlePosition() {
    return {
      x: this.concert.position.x + this.concert.size.width / 2,
      y: this.concert.position.y + this.concert.size.height / 2,
    }
  }

  getCurrentDistance() {
    return this.concert.distance
  }

  setCurrentDistance(payload) {
    this.concert.distance = payload
  }

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
