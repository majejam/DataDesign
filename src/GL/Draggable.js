//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'

export default class Draggable {
  constructor(el, opt = {}) {
    this.$el = el
    this.$opt = opt
    this.position = {
      x: 0,
      y: 0,
      lerp: {
        x: 0,
        y: 0,
      },
    }
    this.cursor = {
      x: 0,
      y: 0,
      hold: false,
      start: {
        x: 0,
        y: 0,
      },
      delta: {
        x: 0,
        y: 0,
      },
    }
    this.speed = this.$opt.speed ? this.$opt.speed : 1
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    this.init()
  }

  init() {
    this.setEvents()
  }

  update() {
    if (this.cursor.hold) {
      this.setDeltas()
      this.updatePosition()
    }
    this.updateWorldPosition()
  }

  /**
   * Drag functions
   */

  setCursor(_e) {
    this.cursor.x = _e.clientX / this.viewport.width
    this.cursor.y = _e.clientY / this.viewport.height
  }

  startCursor(_e) {
    this.cursor.start.x = _e.clientX / this.viewport.width
    this.cursor.start.y = _e.clientY / this.viewport.height
  }

  setDeltas() {
    this.cursor.delta.x = this.cursor.start.x - this.cursor.x
    this.cursor.delta.y = this.cursor.start.y - this.cursor.y
    this.cursor.start.x = this.cursor.x
    this.cursor.start.y = this.cursor.y
  }

  resetDeltas() {
    this.cursor.delta.x = this.cursor.delta.y = this.cursor.start.x = this.cursor.start.y = 0
  }

  updatePosition() {
    this.position.x -= this.cursor.delta.x * 1000 * this.speed
    this.position.y -= this.cursor.delta.y * 1000 * this.speed * 0.8
  }

  updateWorldPosition() {
    this.position.lerp.x = this.lerp(this.position.lerp.x, this.position.x, 0.1)
    this.position.lerp.y = this.lerp(this.position.lerp.y, this.position.y, 0.1)
  }

  setPositionX(pos) {
    this.position.x = pos
  }

  setPositionY(pos) {
    this.position.y = pos
  }

  getPosition() {
    return {
      x: this.position.lerp.x,
      y: this.position.lerp.y,
    }
  }

  getTruePosition() {
    return {
      x: this.position.x,
      y: this.position.y,
    }
  }

  /**
   * Event functions
   */

  mouseDown(_e) {
    this.cursor.hold = true
    this.startCursor(_e)
  }

  mouseUp() {
    this.cursor.hold = false
    this.resetDeltas()
  }

  mouseMove(_e) {
    this.setCursor(_e)
  }

  touchDown(_e) {
    this.setCursor(_e.touches[0])
    this.cursor.hold = true
    this.startCursor(_e.touches[0])
  }

  touchUp() {
    this.cursor.hold = false
    this.resetDeltas()
  }

  touchMove(_e) {
    this.setCursor(_e.touches[0])
  }

  /**
   * EVENTS
   */

  setEvents() {
    /**
     * Binding functions
     */
    this._mousedown = this.mouseDown.bind(this)
    this._mouseup = this.mouseUp.bind(this)
    this._mousemove = this.mouseMove.bind(this)
    this._touchdown = this.touchDown.bind(this)
    this._touchup = this.touchUp.bind(this)
    this._touchmove = this.touchMove.bind(this)
    this._update = this.update.bind(this)

    /**
     * Mouse events
     */
    this.$el.addEventListener('mousedown', this._mousedown)
    this.$el.addEventListener('mouseup', this._mouseup)
    this.$el.addEventListener('mouseout', this._mouseup)
    this.$el.addEventListener('mousemove', this._mousemove)

    /**
     * Touch events
     */
    this.$el.addEventListener('touchstart', this._touchdown)
    this.$el.addEventListener('touchmove', this._touchmove)
    this.$el.addEventListener('touchend', this._touchup)
    this.$el.addEventListener('touchcancel', this._touchup)

    Engine.$app.ticker.add(this._update)
  }

  removeEvents() {
    this.$el.removeEventListener('mousedown', this._mousedown)
    this.$el.removeEventListener('mouseup', this._mouseup)
    this.$el.removeEventListener('mouseout', this._mouseup)
    this.$el.removeEventListener('mousemove', this._mousemove)
    this.$el.removeEventListener('touchstart', this._touchdown)
    this.$el.removeEventListener('touchmove', this._touchmove)
    this.$el.removeEventListener('touchend', this._touchup)
    this.$el.removeEventListener('touchcancel', this._touchup)

    Engine.$app.ticker.remove(this._update)
  }

  /**
   * Utils
   */

  lerp(min, max, fraction) {
    return (max - min) * fraction + min
  }
}
