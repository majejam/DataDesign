//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import World from '@/GL/World.js'
//import Store from '@/store'
export default class Person {
  constructor(festival, id, opt = {}) {
    this.$id = id
    this.$festival = festival
    this.$opt = opt
    this.person = {
      state: 'static',
      container: null,
      graphics: null,
      sprite: null,
      animation: null,
      color: this.$opt.color ? this.$opt.color : 0xff87f0,
      scale: 0.8,
      gender: Math.round(Math.random()) ? 'girl' : 'man',
      size: {
        width: this.$opt.width ? this.$opt.width : 200,
        height: this.$opt.height ? this.$opt.height : 200,
      },
      maxSpeed: Math.random() + 1,
      target: new Engine.PIXI.Point(2500, 1800),
      static: false,
      position: new Engine.PIXI.Point(Math.random() * this.$festival.festival.container.width - 200, Math.random() * this.$festival.festival.container.height - 200),
      velocity: new Engine.PIXI.Point(),
      acceleration: new Engine.PIXI.Point(),
      delta: new Engine.PIXI.Point(0.01, 0.01),
      desiredPosition: new Engine.PIXI.Point(),
      distance: 0,
      isVisible: false,
      baseDecisionTime: 10000,
      decisionMaxOffset: 50000,
      decisionDuration: Math.round(Math.random() * 20000),
      changedState: false,
    }

    this.selectedConcert = this.$festival.concerts[Math.round(Math.random() * (this.$festival.concerts.length - 1))]
    this.time = 0
    this.init()
  }

  init() {
    this.setEvents()

    this.createPerson()

    this.teleportRandomConcerts()

    this.decision(this.person.decisionDuration)
  }

  createPerson() {
    this.person.container = new Engine.PIXI.Container()
    this.person.container.x = this.person.position.x
    this.person.container.y = this.person.position.y
    //this.createPersonGraphics()
    this.$festival.addChild(this.person.container)
  }

  createPersonGraphics() {
    this.person.sprite = new Engine.PIXI.Sprite(Engine.spritesheet.textures['character.png'])
    this.person.graphics = new Engine.PIXI.Graphics()
    this.person.sprite.scale.x = this.person.sprite.scale.y = this.person.scale
    this.person.graphics.beginFill(this.person.color)
    this.person.graphics.drawRect(0, 0, this.person.size.width, this.person.size.height)
    this.person.graphics.endFill()
    //this.person.container.addChild(this.person.sprite)
    //this.person.container.addChild(this.person.graphics)
  }

  changeColor(color) {
    this.person.color = color
    this.person.graphics.clear()
    this.person.graphics.beginFill(this.person.color)
    this.person.graphics.drawRect(0, 0, this.person.size.width, this.person.size.height)
    this.person.graphics.endFill()
  }

  /**
   * IA
   */

  decision(time) {
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (this.person.static && Math.random() < 0.9) this.moveInsideConcert()
      else if (this.person.static) this.moveToRandomConcerts()

      this.person.decisionDuration = this.person.baseDecisionTime + Math.round(Math.random() * this.person.decisionMaxOffset)
      this.decision(this.person.decisionDuration)
    }, time)
  }

  /**
   * Animations
   */
  standingAnimation() {
    this.person.container.removeChild(this.person.animation)

    if (!this.selectedConcert.isSceneRight()) {
      this.person.animation = new Engine.PIXI.AnimatedSprite(Engine.animations['girl' + 'leftdancing'])
      this.person.animation.play()
    } else {
      this.person.animation = new Engine.PIXI.Sprite(Engine.textures[this.person.gender + 'rightwalk_01.png'])
    }
    console.log(this.selectedConcert.$data.audio_features.danceability / 10)
    this.person.animation.animationSpeed = this.selectedConcert.$data.audio_features.danceability / 10
    this.person.animation.scale.x = this.person.animation.scale.y = this.person.scale
    this.person.container.addChild(this.person.animation)
  }

  manLeftWalkAnimation() {
    if (this.person.state === 'walk_left') return
    this.person.state = 'walk_left'
    this.person.container.removeChild(this.person.animation)
    // create an animated sprite
    this.person.animation = new Engine.PIXI.AnimatedSprite(Engine.animations[this.person.gender + 'leftwalk'])
    this.person.animation.scale.x = this.person.animation.scale.y = this.person.scale

    this.person.animation.play()
    this.person.container.addChild(this.person.animation)
  }

  manRightWalkAnimation() {
    if (this.person.state === 'walk_right') return
    this.person.state = 'walk_right'
    this.person.container.removeChild(this.person.animation)
    // create an animated sprite
    this.person.animation = new Engine.PIXI.AnimatedSprite(Engine.animations[this.person.gender + 'rightwalk'])
    this.person.animation.scale.x = this.person.animation.scale.y = this.person.scale

    this.person.animation.play()
    this.person.container.addChild(this.person.animation)
  }

  /**
   * States handlers
   */

  checkIfArrivedToDestination() {
    if (Math.round(this.person.position.x) == Math.round(this.person.target.x) && Math.round(this.person.position.y) == Math.round(this.person.target.y)) {
      this.person.static = true
      this.person.state = 'static'

      if (!this.person.changedState) {
        this.person.changedState = true
        this.checkState(true)
      }
    }
  }

  checkState(once) {
    if (this.person.static) {
      this.standingAnimation()
    }

    if (!this.person.static)
      if (!once) {
        this.person.changedState = false
      }
  }

  /**
   * Mouvement & methods
   */

  update(delta) {
    this.time += delta
    this.person.isVisible = World.cull.isInViewport(this.person.position.x, this.person.position.y, 100, 100)
    if (this.person.isVisible) {
      this.person.container.visible = true
      this.complexPositionCalculation()
    } else {
      this.person.container.visible = false
      this.simplePositionCalculation()
    }

    this.animationHandler()

    this.person.container.x = this.person.position.x
    this.person.container.y = this.person.position.y
    this.person.container.zIndex = Math.round(this.person.position.y + this.person.size.height * this.person.scale)

    this.checkIfArrivedToDestination()
  }

  animationHandler() {
    if (this.person.animation && !this.person.static && this.person.isVisible) {
      this.person.animation.animationSpeed = (1 + (Math.abs(this.person.acceleration.x) + Math.abs(this.person.acceleration.y)) / 2) / 30
      if (!this.person.static && this.person.acceleration.x < 0) {
        this.manLeftWalkAnimation()
      } else if (!this.person.static && this.person.acceleration.x > 0) {
        this.manRightWalkAnimation()
      }
    } else if (this.person.animation && this.person.static && this.person.isVisible) {
      this.energeticDance(this.time)
    }
  }

  energeticDance(time) {
    // If very danceable song
    if (this.selectedConcert.$data.audio_features.energy > 0.48) {
      const energetic_factor = 5 + 15 * (1 - this.selectedConcert.$data.audio_features.energy)
      this.person.animation.position.y = Math.sin((this.person.maxSpeed * time) / energetic_factor) * 5
    } else {
      this.person.animation.position.y = 0
    }
  }

  complexPositionCalculation() {
    if (this.person.static) return
    if (Math.round(this.time) % 10 == 1) {
      this.person.desiredPosition.set(this.person.target.x - this.person.position.x + (Math.random() - 0.5) * 1000, this.person.target.y - this.person.position.y + (Math.random() - 0.5) * 1000)
    } else {
      this.person.desiredPosition.set(this.person.target.x - this.person.position.x, this.person.target.y - this.person.position.y)
    }

    this.person.velocity.set(
      this.clamp(this.person.velocity.x + this.person.desiredPosition.x, -this.person.maxSpeed, this.person.maxSpeed),
      this.clamp(this.person.velocity.y + this.person.desiredPosition.y, -this.person.maxSpeed, this.person.maxSpeed)
    )

    if (Math.round(this.person.position.x) == Math.round(this.person.target.x)) {
      this.person.acceleration.x = this.lerp(this.person.acceleration.x, 0, 0.6)
    } else {
      this.person.acceleration.x = this.lerp(this.person.acceleration.x, this.person.velocity.x, this.person.delta.x)
    }

    if (Math.round(this.person.position.y) == Math.round(this.person.target.y)) {
      this.person.acceleration.y = this.lerp(this.person.acceleration.y, 0, 0.2)
    } else {
      this.person.acceleration.y = this.lerp(this.person.acceleration.y, this.person.velocity.y, this.person.delta.y)
    }

    this.person.position.x += this.person.acceleration.x
    this.person.position.y += this.person.acceleration.y
  }

  simplePositionCalculation() {
    if (this.person.static) return
    this.person.desiredPosition.set(this.person.target.x - this.person.position.x, this.person.target.y - this.person.position.y)

    this.person.velocity.set(
      this.clamp(this.person.velocity.x + this.person.desiredPosition.x, -this.person.maxSpeed, this.person.maxSpeed),
      this.clamp(this.person.velocity.y + this.person.desiredPosition.y, -this.person.maxSpeed, this.person.maxSpeed)
    )

    this.person.position.x += this.person.velocity.x
    this.person.position.y += this.person.velocity.y
  }

  moveToRandomConcerts() {
    this.selectedConcert = this.$festival.pickWeightedConcert()
    this.moveTo(this.selectedConcert.getConcertCrowdPosition(100).x, this.selectedConcert.getConcertCrowdPosition(100).y)
  }

  teleportRandomConcerts() {
    this.selectedConcert = this.$festival.pickWeightedConcert()
    this.teleport(this.selectedConcert.getConcertCrowdPosition(100).x, this.selectedConcert.getConcertCrowdPosition(100).y)
  }

  moveInsideConcert() {
    this.moveTo(this.selectedConcert.getConcertCrowdPosition(100).x, this.selectedConcert.getConcertCrowdPosition(100).y)
  }

  moveTo(x, y) {
    this.person.static = false
    this.person.target.set(x, y)
    this.checkState(false)
  }

  teleport(x, y) {
    this.person.static = false
    this.person.target.set(x, y)
    this.person.position.set(x, y)
    this.checkState(false)
  }

  normalize(val, max, min) {
    return (val - min) / (max - min)
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max)
  }

  lerp(min, max, fraction) {
    return (max - min) * fraction + min
  }

  /**
   * Getters
   */

  getPosition() {
    return this.person.position
  }

  getCurrentDistance() {
    return this.concert.distance
  }

  setCurrentDistance(payload) {
    this.person.distance = payload
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

  removeEvents() {
    Engine.$app.ticker.remove(this._update)
  }

  destroy() {
    this.removeEvents()
    clearTimeout(this.timeout)
    this.$festival.removeChild(this.person.container)
  }
}
