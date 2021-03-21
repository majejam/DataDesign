//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'

class World {
  constructor() {
    this.world = {
      container: null,
      position: {
        x: 0,
        y: 0,
      },
    }
  }

  init() {
    this._update = this.update.bind(this)
    this.createWorldContainer()
    Engine.$app.ticker.add(this._update)
  }

  /**
   * World container
   */
  createWorldContainer() {
    this.world.container = new Engine.PIXI.Container()

    this.centerWorld()

    Engine.$app.stage.addChild(this.world.container)
  }

  centerWorld() {
    // Move container to the center
    this.world.container.x = Engine.$app.screen.width / 2
    this.world.container.y = Engine.$app.screen.height / 2

    this.world.container.pivot.x = this.world.container.width / 2
    this.world.container.pivot.y = this.world.container.height / 2
  }

  addChild(child) {
    this.world.container.addChild(child)
    this.centerWorld()
  }

  onResize() {
    console.log('resize')
  }

  update(delta) {
    this.world.container.rotation -= 0.01 * delta
  }

  /**
   * EVENTS
   */

  setEvents() {}

  removeEvents() {}
}

let WorldInstance = new World()

export default WorldInstance
