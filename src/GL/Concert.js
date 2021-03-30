//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import World from '@/GL/World.js'
//import Store from '@/store'
export default class Concert {
  constructor(festival, data = null, opt = {}) {
    this.$festival = festival
    this.$data = data
    this.$opt = opt
    this.concert = {
      container: null,
      graphics: null,
      color: this.$opt.color ? this.$opt.color : 0xff7171,
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
      isVisible: false,
      distance: 0,
    }

    this.scene = {
      graphics: null,
      bounds: { x: 0, y: 0, w: 200, h: 400 },
    }
    this.screen = {
      container: null,
      graphics: null,
      bounds: { x: 300, y: -100, w: 300, h: 200 },
    }
    this.crowd = {
      graphics: null,
      bounds: { x: 300, y: 0, w: 300, h: 200 },
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

    this.createScene()
    this.createScreen()
    this.createCrowdZone()
    this.concertInteractivity(true)
    this.$festival.addChild(this.concert.container)
  }

  createConcertGrounds() {
    this.concert.graphics = this.createGraphics(0, 0, this.concert.size.width, this.concert.size.height, this.concert.color)

    this.concert.container.x = this.concert.position.x
    this.concert.container.y = this.concert.position.y
    this.addChild(this.concert.graphics)
  }

  createScene() {
    this.positionScene()
    this.scene.graphics = this.createGraphics(this.concert.container.x + this.scene.bounds.x, this.concert.container.y + this.scene.bounds.y, this.scene.bounds.w, this.scene.bounds.h, 0xff0000)
    this.scene.graphics.zIndex = this.concert.container.y + this.scene.graphics.y + this.scene.bounds.h
    this.$festival.addChild(this.scene.graphics)
  }

  positionScene() {
    this.scene.bounds.w = this.concert.container.width / 3
    this.scene.bounds.h = this.concert.container.height / 1.5

    this.scene.bounds.y = Math.random() * (this.concert.container.height - this.scene.bounds.h)
    if (Math.round(Math.random())) this.scene.bounds.x = this.concert.container.width - this.scene.bounds.w - Math.random() * 50
    else this.scene.bounds.x = Math.random() * 50
  }

  createScreen() {
    this.screen.container = new Engine.PIXI.Container()
    this.screen.container.x = this.concert.container.x + this.screen.bounds.x
    this.screen.container.y = this.concert.container.y + this.screen.bounds.y
    this.screen.graphics = this.createGraphics(0, 0, this.screen.bounds.w, this.screen.bounds.h, 0x09ff00)
    this.screen.graphics.skew.y = -0.2
    this.screen.container.zIndex = this.concert.container.y + this.screen.graphics.y + this.screen.bounds.h
    this.screen.container.addChild(this.screen.graphics)
    this.screen.container.addChild(this.createName())
    this.$festival.addChild(this.screen.container)
  }

  createGraphics(x, y, w, h, color) {
    const graphics = new Engine.PIXI.Graphics()
    graphics.beginFill(color)
    graphics.drawRect(x, y, w, h)
    graphics.endFill()
    return graphics
  }

  createName() {
    const style = new Engine.PIXI.TextStyle({
      breakWords: true,
      fontSize: 48,
      fontFamily: 'Noto Sans',
      wordWrap: true,
      wordWrapWidth: this.screen.bounds.w,
      fill: 0x000000,
      align: 'center',
    })

    let text = new Engine.PIXI.Text(this.substr(this.$data.artists[0].name), style)
    text.position.x = this.screen.bounds.w / 2 - text.width / 2
    text.position.y = this.screen.bounds.h / 2 - text.height / 1.5
    text.skew.y = -0.2
    return text
  }

  substr(string, limit = 30) {
    let str = string + ' '
    str = str.substring(0, limit)
    str = str.substring(0, str.lastIndexOf(' '))
    return str
  }

  positionCrowd() {
    this.crowd.bounds.w = this.concert.container.width - (this.scene.bounds.w + 50)
    this.crowd.bounds.h = this.concert.container.height
    this.crowd.bounds.y = 0

    if (this.scene.bounds.x > this.concert.container.width / 2) this.crowd.bounds.x = 0
    else this.crowd.bounds.x = this.concert.container.width - this.crowd.bounds.w
  }

  createCrowdZone() {
    this.positionCrowd()
    this.crowd.graphics = this.createGraphics(this.concert.container.x + this.crowd.bounds.x, this.concert.container.y + this.crowd.bounds.y, this.crowd.bounds.w, this.crowd.bounds.h, 0xf5c0c0)
    this.crowd.graphics.zIndex = 3
    this.$festival.addChild(this.crowd.graphics)
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

  addChild(child) {
    this.concert.container.addChild(child)
  }

  update() {
    this.concert.isVisible = World.cull.isInViewport(this.concert.position.x, this.concert.position.y, this.concert.size.width, this.concert.size.height)
    if (this.concert.isVisible) {
      this.concert.container.visible = true
    } else {
      this.concert.container.visible = false
      return
    }
  }

  /**
   * Getters
   */

  getBounds() {
    return {
      x: this.concert.position.x,
      y: this.concert.position.y,
      w: this.concert.size.width,
      h: this.concert.size.height,
    }
  }

  getConcertCrowdPosition(offset_x = 0, offset_y = 0) {
    return {
      x: this.concert.container.x + this.crowd.bounds.x + Math.random() * (this.crowd.bounds.w - offset_x),
      y: this.concert.container.y + this.crowd.bounds.y + Math.random() * (this.crowd.bounds.h - offset_y),
      w: this.crowd.bounds.w,
      h: this.crowd.bounds.h,
    }
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
    Engine.$app.ticker.add(this._update)
  }

  removeEvents() {}
}
