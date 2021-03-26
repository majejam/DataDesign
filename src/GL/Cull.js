//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'

export default class Cull {
  constructor(viewport) {
    this.$viewport = viewport

    this.bounds = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }

    this.setEvents()

    console.log(this.$viewport)
  }

  init() {}

  /**
   * World container
   */
  onResize() {
    console.log('resize')
  }

  update() {
    this.bounds.x = Math.abs(this.$viewport.container.position.x - this.$viewport.container.width / 2)
    this.bounds.y = Math.abs(this.$viewport.container.position.y - this.$viewport.container.height / 2)
    this.bounds.width = this.bounds.x + Engine.$app.screen.width
    this.bounds.height = this.bounds.y + Engine.$app.screen.height
    //console.log(this.bounds.width, this.bounds.height)
  }

  checkIfTargetIsInViewport(target_x, target_y, target_s_x, target_s_y) {
    //if(target_x > )

    console.log(target_x, target_y, target_s_x, target_s_y)
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
