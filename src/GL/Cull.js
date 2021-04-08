//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'

export default class Cull {
  constructor(viewport) {
    this.$viewport = viewport

    this.margin = 100

    this.bounds = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }

    this.setEvents()
  }

  init() {}

  /**
   * World container
   */
  onResize() {
    console.log('resize')
  }

  update() {
    this.bounds.x = Math.abs(this.$viewport.container.position.x - this.$viewport.container.width / 2 + this.margin)
    this.bounds.y = Math.abs(this.$viewport.container.position.y - this.$viewport.container.height / 2 + this.margin)
    this.bounds.width = this.bounds.x + Engine.$app.screen.width + this.margin
    this.bounds.height = this.bounds.y + Engine.$app.screen.height + this.margin
  }

  isInViewport(target_x, target_y, target_width, target_height) {
    if (target_x > this.bounds.x - target_width && target_x < this.bounds.width + target_width && target_y > this.bounds.y - target_height && target_y < this.bounds.height + target_height) {
      return true
    } else {
      return false
    }
  }

  /**
   * Drag functions
   */

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
