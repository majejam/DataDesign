//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import World from '@/GL/World.js'
//import Store from '@/store'
export default class Scene {
  constructor(concert) {
    this.$concert = concert

    console.log(this.$concert.$data)

    this.scene = {
      graphics: null,
      sprite: null,
      text: null,
      container: null,
      isBig: this.$concert.$data.popularity / 100 > 0.5,
      direction: '',
      bounds: { x: 0, y: 0, w: 200, h: 400 },
    }

    this.artists = {
      singer: {
        sprite: null,
        speed: Math.random(),
      },
      musician: {
        sprite: null,
        speed: Math.random(),
      },
    }

    this.time = 0

    this.init()
  }

  init() {
    this.setEvents()
    this.createScene()
    this.createArtists()
  }

  /**
   * Scene creation
   */

  createScene() {
    this.positionScene()
    this.scene.graphics = this.createGraphics(
      this.$concert.concert.container.x + this.scene.bounds.x,
      this.$concert.concert.container.y + this.scene.bounds.y,
      this.scene.bounds.w,
      this.scene.bounds.h,
      0xff0000
    )
    this.scene.graphics.zIndex = this.$concert.concert.container.y + this.scene.bounds.y + this.scene.bounds.h
    //this.$festival.addChild(this.scene.graphics)
    if (this.scene.isBig && !this.isSceneRight()) this.createBigScene('scenebigleft')
    else if (this.scene.isBig && this.isSceneRight()) this.createBigScene('scenebigright')
    else if (!this.scene.isBig && !this.isSceneRight()) this.createSmallScene('scenesmallleft.png')
    else if (!this.scene.isBig && this.isSceneRight()) this.createSmallScene('scenesmallright.png')
  }

  positionScene() {
    this.scene.bounds.w = this.scene.isBig ? 600 : 500
    this.scene.bounds.h = this.scene.isBig ? 600 : 400
    this.scene.bounds.y = this.scene.isBig ? 0 : 100 + Math.random() * 50

    if (Math.round(Math.random())) {
      this.scene.direction = 'right'
      this.scene.bounds.y = Math.random() * 50
      this.scene.bounds.x = this.$concert.concert.container.width - this.scene.bounds.w - Math.random() * 50
    } else {
      this.scene.bounds.x = 0
      this.scene.direction = 'left'
    }
  }

  createSmallScene(sprite) {
    this.scene.container = new Engine.PIXI.Container()
    this.scene.sprite = new Engine.PIXI.Sprite(Engine.spritesheet.textures[sprite])
    this.scene.container.position.x = this.$concert.concert.container.x + this.scene.bounds.x
    this.scene.container.position.y = this.$concert.concert.container.y + this.scene.bounds.y + 50
    this.scene.container.zIndex = this.scene.container.position.y + this.scene.sprite.height
    this.scene.container.addChild(this.scene.sprite)
    this.$concert.$festival.addChild(this.scene.container)
  }

  createBigScene(sprite) {
    this.scene.container = new Engine.PIXI.Container()
    this.scene.sprite = new Engine.PIXI.AnimatedSprite(Engine.animations[sprite])
    this.scene.sprite.play()
    this.scene.sprite.animationSpeed = 0.1 + this.$concert.$data.audio_features.energy / 10
    this.scene.container.position.x = this.$concert.concert.container.x + this.scene.bounds.x
    this.scene.container.position.y = this.$concert.concert.container.y + this.scene.bounds.y
    this.scene.container.zIndex = this.scene.container.position.y + this.scene.sprite.height

    this.scene.container.addChild(this.scene.sprite)
    this.scene.container.addChild(this.createNameScene(0.53))
    this.$concert.$festival.addChild(this.scene.container)
  }

  createGraphics(x, y, w, h, color) {
    const graphics = new Engine.PIXI.Graphics()
    graphics.beginFill(color)
    graphics.drawRect(x, y, w, h)
    graphics.endFill()
    return graphics
  }

  createNameScene(skew) {
    const string = this.substr(this.$concert.$data.artists[0].name)
    let fontSize = 30

    if (this.lgstwrdstr(string) * 30 > 300) {
      fontSize = 30
    }

    const style = new Engine.PIXI.TextStyle({
      breakWords: true,
      fontSize: fontSize,
      fontFamily: 'Montserrat',
      wordWrap: true,
      wordWrapWidth: 300,
      fill: 0xffffff,
      align: 'center',
    })

    this.scene.text = new Engine.PIXI.Text(string, style)
    this.scene.text.alpha = 0.8

    if (this.isSceneRight()) {
      this.scene.text.skew.y = skew
      this.scene.text.position.y = this.scene.container.height * 0.22 - this.scene.text.width / 6
      this.scene.text.position.x = this.scene.container.width * 0.37 - this.scene.text.width / 2
    } else {
      this.scene.text.skew.y = -skew
      this.scene.text.position.y = this.scene.container.height * 0.31 + this.scene.text.width / 6
      this.scene.text.position.x = this.scene.container.width * 0.24 - this.scene.text.width / 2
    }

    return this.scene.text
  }

  animateSceneName(time) {
    if (this.scene.text) {
      this.scene.text.alpha = Math.abs(Math.sin(time))
    }
  }

  lgstwrdstr(str) {
    let longestWord = str.split(' ').sort(function (a, b) {
      return b.length - a.length
    })
    return longestWord[0].length
  }

  substr(string, limit = 30) {
    let str = string + ' '
    str = str.substring(0, limit)
    str = str.substring(0, str.lastIndexOf(' '))
    return str
  }

  /**
   * Artists creation
   */

  createArtists() {
    this.createSinger()
    this.createMusician()
  }

  createSinger() {
    this.artists.singer.sprite = new Engine.PIXI.Sprite(Engine.spritesheet.textures['character.png'])
    const random = Math.random() * 20 - 10
    console.log(random)
    if (this.isBig()) {
      this.artists.singer.sprite.position.x = this.isSceneRight() ? this.scene.container.width * 0.13 + random : this.scene.container.width * 0.26 + random
      this.artists.singer.sprite.position.y = this.isSceneRight() ? this.scene.container.height * 0.29 + random : this.scene.container.height * 0.26 + random
    } else {
      this.artists.singer.sprite.position.x = this.isSceneRight() ? this.scene.container.width * 0.1 + random : this.scene.container.width * 0.1 + random
      this.artists.singer.sprite.position.y = this.isSceneRight() ? this.scene.container.height * -0.2 + random : this.scene.container.height * 0 + random
    }
    this.scene.container.addChild(this.artists.singer.sprite)
  }

  createMusician() {
    this.artists.musician.sprite = new Engine.PIXI.Sprite(Engine.spritesheet.textures['character.png'])
    const random = Math.random() * 20 - 10
    console.log(random)
    if (this.isBig()) {
      this.artists.musician.sprite.position.x = this.isSceneRight() ? this.scene.container.width * 0.25 + random : this.scene.container.width * 0.1 + random
      this.artists.musician.sprite.position.y = this.isSceneRight() ? this.scene.container.height * 0.4 + random : this.scene.container.height * 0.4 + random
    } else {
      this.artists.musician.sprite.position.x = this.isSceneRight() ? this.scene.container.width * 0.23 + random : this.scene.container.width * 0.32 + random
      this.artists.musician.sprite.position.y = this.isSceneRight() ? this.scene.container.height * 0 + random : this.scene.container.height * -0.3 + random
    }
    this.scene.container.addChild(this.artists.musician.sprite)
  }

  animateSinger(time) {
    if (this.$concert.$data.audio_features.energy > 0.48) {
      const energetic_factor = 5 + 15 * (1 - this.$concert.$data.audio_features.energy)
      this.artists.singer.sprite.position.y = this.artists.singer.sprite.position.y + Math.sin((time * 40 + this.artists.singer.speed * 100) / energetic_factor) / 2
    }
  }

  animateMusician(time) {
    if (this.$concert.$data.audio_features.energy > 0.48) {
      const energetic_factor = 5 + 15 * (1 - this.$concert.$data.audio_features.energy)
      this.artists.musician.sprite.position.y = this.artists.musician.sprite.position.y + Math.sin((time * 40 + this.artists.musician.speed * 100) / energetic_factor) / 2
    }
  }

  update() {
    this.time += 0.05

    if (this.scene.container)
      this.scene.container.visible = World.cull.isInViewport(this.scene.container.position.x, this.scene.container.position.y, this.scene.container.width, this.scene.container.height)

    if (this.scene.container.visible) {
      this.animateSceneName(this.time)
      this.animateSinger(this.time)
      this.animateMusician(this.time)
    }
  }

  /**
   * Getters
   */

  isSceneRight() {
    return this.scene.direction === 'right'
  }

  getBounds() {
    return this.scene.bounds
  }

  getDirection() {
    return this.scene.direction
  }

  isBig() {
    return this.scene.isBig
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
