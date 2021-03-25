//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
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
      maxSpeed: Math.random() + 0.5,
      target: new Engine.PIXI.Point(2500, 1800),
      steerStrengh: 1,
      wanderStrengh: 0.6,
      static: true,
      position: new Engine.PIXI.Point(1000 + Math.random() * 2000, 500 + Math.random() * 2000),
      velocity: new Engine.PIXI.Point(),
      acceleration: new Engine.PIXI.Point(),
      delta: new Engine.PIXI.Point(0.1, 0.1),
      desiredPosition: new Engine.PIXI.Point(),
      distance: 0,
    }
    this.init()
  }

  init() {
    this.setEvents()
    this.createPerson()

    this.moveToRandomConcerts()
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

  update() {
    if (this.person.static) return

    this.person.desiredPosition.set(this.person.target.x - this.person.position.x, this.person.target.y - this.person.position.y)

    this.person.velocity.set(
      this.clamp(this.person.velocity.x + this.person.desiredPosition.x, -this.person.maxSpeed, this.person.maxSpeed),
      this.clamp(this.person.velocity.y + this.person.desiredPosition.y, -this.person.maxSpeed, this.person.maxSpeed)
    )

    if (Math.round(this.person.position.x) == Math.round(this.person.target.x)) {
      this.person.acceleration.x = this.lerp(this.person.acceleration.x, 0, 0.7)
    } else {
      this.person.acceleration.x = this.lerp(this.person.acceleration.x, this.person.velocity.x, this.person.delta.x)
    }

    if (Math.round(this.person.position.y) == Math.round(this.person.target.y)) {
      this.person.acceleration.y = this.lerp(this.person.acceleration.y, 0, 0.7)
    } else {
      this.person.acceleration.y = this.lerp(this.person.acceleration.y, this.person.velocity.y, this.person.delta.y)
    }

    this.person.position.x += this.person.acceleration.x
    this.person.position.y += this.person.acceleration.y

    this.person.graphics.x = this.person.position.x
    this.person.graphics.y = this.person.position.y

    if (Math.round(this.person.position.x) == Math.round(this.person.target.x) && Math.round(this.person.position.y) == Math.round(this.person.target.y)) {
      this.person.static = true
      console.log('set static')
    }
  }

  moveToRandomConcerts() {
    this.selectedConcert = this.$festival.concerts[Math.round(Math.random() * this.$festival.concerts.length - 1)]
    console.log('Moving to.. ', this.selectedConcert.$data.artists[0].name)
    this.moveTo(this.selectedConcert.getMiddlePosition().x + (Math.random() - 0.5) * 200, this.selectedConcert.getMiddlePosition().y + (Math.random() - 0.5) * 200)
  }

  moveInsideConcert() {
    this.moveTo(this.selectedConcert.getMiddlePosition().x + (Math.random() - 0.5) * 200, this.selectedConcert.getMiddlePosition().y + (Math.random() - 0.5) * 200)
  }

  moveTo(x, y) {
    this.person.static = false
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

  removeEvents() {}
}
