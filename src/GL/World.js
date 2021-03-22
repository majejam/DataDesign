//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import Draggable from '@/GL/Draggable.js'
import Festival from '@/GL/Festival.js'
import Store from '@/store'

class World {
  constructor() {
    this.$el = null
    this.world = {
      container: null,
      position: {
        x: 0,
        y: 0,
        lerp: {
          x: 0,
          y: 0,
        },
      },
    }
  }

  init(el) {
    this.$el = el
    this.storeData = Store.getters.getTopTracksFeatures
    this.createWorldContainer()
    this.draggable = new Draggable(this.$el)

    this.storeData.forEach((data, index) => {
      new Festival(data, {
        x: index * 400,
        y: 0,
      })
    })
    this.setEvents()
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

  update() {
    this.updateWorldPosition()
  }

  /**
   * Drag functions
   */

  updateWorldPosition() {
    this.world.container.x = this.draggable.getPosition().x + Engine.$app.screen.width / 2
    this.world.container.y = this.draggable.getPosition().y + Engine.$app.screen.height / 2
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
    window.removeEventListener('mousedown', this._mousedown)
    window.removeEventListener('mouseup', this._mouseup)
  }
}

let WorldInstance = new World()

export default WorldInstance
