//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import World from '@/GL/World.js'
//import Store from '@/store'
export default class Person {
  constructor(festival, opt = {}) {
    this.$festival = festival
    this.$opt = opt
    this.person = {
      graphics: null,
      color: this.$opt.color ? this.$opt.color : 0xff00f0,
      size: {
        width: this.$opt.width ? this.$opt.width : 100,
        height: this.$opt.height ? this.$opt.height : 100,
      },
      maxSpeed: Math.random() + 1,
      target: new Engine.PIXI.Point(2500, 1800),
      steerStrengh: 1,
      wanderStrengh: 0.6,
      static: true,
      position: new Engine.PIXI.Point(Math.random() * this.$festival.festival.container.width - 200, Math.random() * this.$festival.festival.container.height - 200),
      velocity: new Engine.PIXI.Point(),
      acceleration: new Engine.PIXI.Point(),
      delta: new Engine.PIXI.Point(0.1, 0.1),
      desiredPosition: new Engine.PIXI.Point(),
      distance: 0,
      isVisible: false,
      decisionDuration: 10000 + Math.round(Math.random() * 20000),
    }

    this.selectedConcert = this.$festival.concerts[Math.round(Math.random() * (this.$festival.concerts.length - 1))]
    this.time = 0
    this.init()
  }

  init() {
    this.setEvents()
    //this.person.position.x = 1600
    //this.person.position.y = 1600
    this.createPerson()

    this.moveToRandomConcerts()

    this.interval = setInterval(() => {
      if (this.person.static && Math.random() < 0.9) this.moveInsideConcert()
      else if (this.person.static) this.moveToRandomConcerts()
    }, this.person.decisionDuration)
  }

  createPerson() {
    this.person.graphics = new Engine.PIXI.Graphics()
    this.person.graphics.beginFill(this.person.color)
    this.person.graphics.drawRect(0, 0, this.person.size.width, this.person.size.height)
    this.person.graphics.endFill()
    this.person.graphics.zIndex = 2
    this.person.graphics.x = this.person.position.x
    this.person.graphics.y = this.person.position.y
    this.$festival.addChild(this.person.graphics)
  }

  changeColor(color) {
    this.person.color = color
    this.person.graphics.clear()
    this.person.graphics.beginFill(this.person.color)
    this.person.graphics.drawRect(0, 0, this.person.size.width, this.person.size.height)
    this.person.graphics.endFill()
  }

  update(delta) {
    this.time += delta
    this.person.isVisible = World.cull.isInViewport(this.person.position.x, this.person.position.y, 100, 100)
    if (this.person.isVisible) {
      this.person.graphics.visible = true
      this.complexPositionCalculation()
    } else {
      this.person.graphics.visible = false
      this.simplePositionCalculation()
    }

    this.person.graphics.x = this.person.position.x
    this.person.graphics.y = this.person.position.y

    if (Math.round(this.person.position.x) == Math.round(this.person.target.x) && Math.round(this.person.position.y) == Math.round(this.person.target.y)) {
      this.person.static = true
      if (this.person.color !== 0x5678ff) {
        this.changeColor(0x5678ff)
      }
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
      this.person.acceleration.x = this.lerp(this.person.acceleration.x, 0, 0.4)
    } else {
      this.person.acceleration.x = this.lerp(this.person.acceleration.x, this.person.velocity.x, this.person.delta.x)
    }

    if (Math.round(this.person.position.y) == Math.round(this.person.target.y)) {
      this.person.acceleration.y = this.lerp(this.person.acceleration.y, 0, 0.4)
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
    this.selectedConcert = this.$festival.concerts[Math.round(Math.random() * (this.$festival.concerts.length - 1))]
    //console.log('Moving to.. ', this.selectedConcert.$data.artists[0].name)
    this.moveTo(this.selectedConcert.getMiddlePosition().x + (Math.random() - 0.5) * 200, this.selectedConcert.getMiddlePosition().y + (Math.random() - 0.5) * 200)
  }

  moveInsideConcert() {
    this.moveTo(
      this.selectedConcert.getMiddlePosition().x + ((Math.random() - 0.5) * this.selectedConcert.concert.size.width) / 2,
      this.selectedConcert.getMiddlePosition().y + ((Math.random() - 0.5) * this.selectedConcert.concert.size.height) / 2
    )
  }

  moveTo(x, y) {
    this.person.static = false
    this.changeColor(0xff00f0)
    this.person.target.set(x, y)
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
    clearInterval(this.interval)
    this.$festival.removeChild(this.person.graphics)
  }
}
