//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import World from '@/GL/World.js'
//import Store from '@/store'
export default class Concert {
  constructor(festival, data = null, opt = {}) {
    this.$festival = festival
    this.$data = data
    this.$opt = opt
    this.debug = false
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
      bounds: { x: 100, y: -100, w: 300, h: 200 },
    }
    this.crowd = {
      graphics: null,
      bounds: { x: 300, y: 0, w: 300, h: 200 },
    }

    this.stands = new Array()

    this.blasters = new Array()

    this.init()
  }

  init() {
    this.setEvents()
    this.createConcert()
    console.log(this.$data, this.$data.artists[0].name, this.$data.name)
  }

  createConcert() {
    this.concert.container = new Engine.PIXI.Container()
    this.concert.container.zIndex = 2
    this.createConcertGrounds()

    this.createScene()
    this.createScreen()
    this.createCrowdZone()
    this.createStand()
    this.concertInteractivity(false)
    this.$festival.addChild(this.concert.container)
  }

  createConcertGrounds() {
    this.concert.graphics = this.createGraphics(0, 0, this.concert.size.width, this.concert.size.height, this.concert.color)

    this.concert.container.x = this.concert.position.x
    this.concert.container.y = this.concert.position.y
    if (this.debug) this.concert.graphics.alpha = 1
    else this.concert.graphics.alpha = 0
    this.addChild(this.concert.graphics)
  }

  createScene() {
    this.positionScene()
    this.scene.graphics = this.createGraphics(this.concert.container.x + this.scene.bounds.x, this.concert.container.y + this.scene.bounds.y, this.scene.bounds.w, this.scene.bounds.h, 0xff0000)
    this.scene.graphics.zIndex = this.concert.container.y + this.scene.bounds.y + this.scene.bounds.h
    this.$festival.addChild(this.scene.graphics)
  }

  positionScene() {
    this.scene.bounds.w = this.concert.container.width / 3
    this.scene.bounds.h = this.concert.container.height / 1.5

    this.scene.bounds.y = 100 + Math.random() * (this.concert.container.height - this.scene.bounds.h - 100)
    if (Math.round(Math.random())) this.scene.bounds.x = this.concert.container.width - this.scene.bounds.w - Math.random() * 50
    else this.scene.bounds.x = Math.random() * 50
  }

  createScreen(ratio = 1.15) {
    this.screen.container = new Engine.PIXI.Container()
    let sprite_name = this.isSceneRight() ? 'screen_right.png' : 'screen.png'
    this.screen.graphics = new Engine.PIXI.Sprite(Engine.spritesheet.textures[sprite_name])
    this.screen.graphics.height = this.screen.graphics.height / ratio //ratio screen
    if (this.isSceneRight()) {
      this.screen.graphics.y = this.screen.bounds.y / 2
      this.screen.graphics.width = this.screen.graphics.width / ratio
      this.screen.container.x = this.concert.container.x + this.concert.container.width - this.concert.container.width * 0.1 - this.screen.bounds.w
      this.screen.container.y = this.concert.container.y + this.screen.bounds.y - 100
    } else {
      this.screen.graphics.y = this.screen.bounds.y
      this.screen.container.x = this.concert.container.x + this.concert.container.width * 0.1
      this.screen.graphics.width = this.screen.graphics.width / ratio
      this.screen.container.y = this.concert.container.y + this.screen.bounds.y
    }
    this.screen.container.addChild(this.screen.graphics)
    this.screen.container.addChild(this.createName(0.54))
    this.screen.container.scale.x = this.screen.container.scale.y = 0.5 + (this.$data.popularity / 100) * 0.5
    this.screen.container.zIndex = this.concert.container.y + this.screen.graphics.y + this.screen.graphics.height * this.screen.container.scale.y
    this.$festival.addChild(this.screen.container)
  }

  createStand() {
    const nbOfStand = Math.floor((3 * this.$data.popularity) / 100)
    for (let index = 0; index < nbOfStand; index++) {
      let stand_sprite = this.$festival.chance.pickone(['stand_left.png', 'stand_right.png'])
      const graphics = new Engine.PIXI.Sprite(Engine.spritesheet.textures[stand_sprite]) //this.createGraphics(this.concert.container.x, this.concert.container.y - 200, 300, 200, 0xffff00)
      graphics.width = graphics.width / 1.5
      graphics.height = graphics.height / 1.5
      graphics.position.y = this.concert.container.y - graphics.height
      if (!this.isSceneRight()) graphics.position.x = this.concert.container.x + this.concert.container.width - 300 - 350 * index
      else graphics.position.x = this.concert.container.x + 350 * index

      //graphics.position.y = Math.round((Math.random() - 0.5) * 50)
      graphics.zIndex = graphics.position.y + graphics.height
      this.stands.push(graphics)
      this.$festival.addChild(graphics)
    }
  }

  createGraphics(x, y, w, h, color) {
    const graphics = new Engine.PIXI.Graphics()
    graphics.beginFill(color)
    graphics.drawRect(x, y, w, h)
    graphics.endFill()
    return graphics
  }

  isSceneRight() {
    return this.scene.bounds.x > this.concert.container.width / 2
  }

  createName(skew) {
    const style = new Engine.PIXI.TextStyle({
      breakWords: true,
      fontSize: 48,
      fontFamily: 'Noto Sans',
      wordWrap: true,
      wordWrapWidth: this.screen.bounds.w * 0.9,
      fill: 0x000000,
      align: 'center',
    })

    let text = new Engine.PIXI.Text(this.substr(this.$data.artists[0].name), style)
    text.position.x = this.screen.bounds.w / 2 - text.width / 3

    if (this.isSceneRight()) {
      text.skew.y = skew
      text.position.y = this.screen.bounds.h / 2 - text.height / 2
      text.position.x = this.screen.bounds.w / 2 - text.width / 2
    } else {
      text.skew.y = -skew
      text.position.y = this.screen.bounds.h / 2 - text.height / 4
      text.position.x = this.screen.bounds.w / 2 - text.width / 3
    }

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

    if (this.isSceneRight()) this.crowd.bounds.x = 0
    else this.crowd.bounds.x = this.concert.container.width - this.crowd.bounds.w
  }

  createCrowdZone() {
    this.positionCrowd()
    this.crowd.graphics = this.createGraphics(this.concert.container.x + this.crowd.bounds.x, this.concert.container.y + this.crowd.bounds.y, this.crowd.bounds.w, this.crowd.bounds.h, 0xf5c0c0)
    this.crowd.graphics.zIndex = 3
    if (this.debug) this.$festival.addChild(this.crowd.graphics)
    this.positionBlastersRandom(Math.ceil((4 * this.$data.popularity) / 100), 50)
  }

  createBlasters(x, y, ratio) {
    let sprite_name = this.isSceneRight() ? 'blasters_r.png' : 'blasters.png'
    const sprite = new Engine.PIXI.Sprite(Engine.spritesheet.textures[sprite_name])
    sprite.position.x = x
    sprite.position.y = y
    sprite.height = sprite.height / ratio
    sprite.width = sprite.width / ratio
    sprite.zIndex = y + sprite.height

    this.blasters.push(sprite)
    this.$festival.addChild(sprite)
  }

  positionBlastersRandom(numberOfBlaster = 4, maxTries) {
    let placedBlasters = new Array()
    let count = 0
    let nbPlaced = 0
    while (count < maxTries && nbPlaced < numberOfBlaster) {
      let xPos = this.getConcertCrowdPosition(100, 100).x
      let yPos = this.getConcertCrowdPosition(100, 100).y
      let isGood = true
      for (let i = 0; i < placedBlasters.length && isGood; i++) {
        if (
          placedBlasters[i].x < xPos + placedBlasters[i].width &&
          placedBlasters[i].x + placedBlasters[i].width > xPos &&
          placedBlasters[i].y < yPos + placedBlasters[i].height &&
          placedBlasters[i].y + placedBlasters[i].height > yPos
        )
          isGood = false
      }
      if (isGood) {
        placedBlasters.push({ x: xPos, y: yPos, width: 200, height: 200 })
        this.createBlasters(xPos, yPos, 2)
        nbPlaced++
      }
      count++
    }
  }

  concertInteractivity(bool) {
    if (bool) {
      this.concert.container.interactive = true
      this.concert.container.on('mousedown', () => {
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
    this.concert.container.visible = World.cull.isInViewport(this.concert.position.x, this.concert.position.y, this.concert.size.width, this.concert.size.height)
    this.screen.container.visible = World.cull.isInViewport(this.screen.container.position.x, this.screen.container.position.y, this.screen.container.width, this.screen.container.height)

    if (this.blasters.length > 0) {
      this.blasters.forEach(blaster => {
        blaster.visible = World.cull.isInViewport(blaster.position.x, blaster.position.y, blaster.width, blaster.height)
      })
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
