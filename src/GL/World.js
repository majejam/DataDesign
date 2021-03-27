//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import Cull from '@/GL/Cull.js'
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
    this.cull = new Cull(this.world)
    this.draggable = new Draggable(this.$el, {
      speed: 1.8,
    })

    this.festival = new Festival(this.storeData, {
      x: 0,
      y: 0,
    })

    this.currentFestival = this.festival

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

    this.world.container.scale.x = this.world.container.scale.y = 1
  }

  addChild(child) {
    this.world.container.addChild(child)
    this.centerWorld()
    this._center = this.centerWorld.bind(this)
    Engine.$app.ticker.addOnce(this._center)
  }

  onResize() {
    console.log('resize')
  }

  update() {
    this.updateWorldPosition()
    this.currentFestival.getNearestConcert(this.normalizeWorldPos().x, this.normalizeWorldPos().y)
  }

  /**
   * Drag functions
   */

  updateWorldPosition() {
    this.checkBounds()

    this.world.container.x = this.draggable.getPosition().x + Engine.$app.screen.width / 2
    this.world.container.y = this.draggable.getPosition().y + Engine.$app.screen.height / 2
  }

  checkBounds() {
    if (this.normalizeWorldPos().x > 1) this.draggable.setPositionX(-(this.world.container.width / 2 - Engine.$app.screen.width / 2))
    else if (this.normalizeWorldPos().x < 0) this.draggable.setPositionX(this.world.container.width / 2 - Engine.$app.screen.width / 2)

    if (this.normalizeWorldPos().y > 1) this.draggable.setPositionY(-(this.world.container.height / 2 - Engine.$app.screen.height / 2))
    else if (this.normalizeWorldPos().y < 0) this.draggable.setPositionY(this.world.container.height / 2 - Engine.$app.screen.height / 2)
  }

  normalizeWorldPos() {
    return {
      x: -(this.draggable.getPosition().x / (this.world.container.width - Engine.$app.screen.width) - 0.5),
      y: -(this.draggable.getPosition().y / (this.world.container.height - Engine.$app.screen.height) - 0.5),
    }
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
