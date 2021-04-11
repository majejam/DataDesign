import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import Cull from '@/GL/Cull.js'
import Draggable from '@/GL/Draggable.js'
import Festival from '@/GL/Festival.js'
import Store from '@/store'
import Filters from '@/GL/Filters.js'
import Player from '@/GL/Player.js'

class World {
  constructor() {
    this.$el = null
    this.world = {
      container: null,
      scale: 1,
      position: {
        x: 0,
        y: 0,
        lerp: {
          x: 0,
          y: 0,
        },
      },
    }

    this.background = {
      graphics: null,
    }

    this.post = {
      container: null,
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

    console.log('World Init done')

    Player.playAmbience()
  }

  createNewFestival() {
    this.currentFestival.destroy()
    this.storeData = Store.getters.getTopTracksFeatures

    setTimeout(() => {
      this.festival = new Festival(this.storeData, {
        x: 0,
        y: 0,
      })
      this.filters.updateFilters()
      this.currentFestival = this.festival
    }, 1000)
  }

  /**
   * World container
   */
  createWorldContainer() {
    this.world.container = new Engine.PIXI.Container()

    this.createBackground()

    this.centerWorld()

    this.filters = new Filters(this.world.container)

    Engine.$app.stage.addChild(this.world.container)
  }

  createBackground() {
    this.background.graphics = new Engine.PIXI.Graphics()
    this.background.graphics.beginTextureFill({
      texture: this.gradient('#FF666F', '#F8AE84', '#FEC961'),
    })
    this.background.graphics.drawRect(0, 0, Engine.$app.screen.width, Engine.$app.screen.height)
    this.background.graphics.endFill()
    this.background.graphics.zIndex = 1
    Engine.$app.stage.addChild(this.background.graphics)
  }

  gradient(from, middle, to) {
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    //document.body.appendChild(c)
    ctx.canvas.width = Engine.$app.screen.width
    ctx.canvas.height = Engine.$app.screen.height
    const grd = ctx.createLinearGradient(0, 0, 1, Engine.$app.screen.height)
    grd.addColorStop(0, from)
    grd.addColorStop(0.5, middle)
    grd.addColorStop(1, to)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, Engine.$app.screen.width, Engine.$app.screen.height)
    return new Engine.PIXI.Texture.from(c)
  }

  centerWorld() {
    this.world.container.scale.x = this.world.container.scale.y = this.world.scale
    // Move container to the center
    this.world.container.x = Engine.$app.screen.width / 2
    this.world.container.y = Engine.$app.screen.height / 2

    this.world.container.pivot.x = this.world.container.width / 2
    this.world.container.pivot.y = this.world.container.height / 2

    this.world.container.zIndex = 2
  }

  addChild(child) {
    this.world.container.addChild(child)
    this.centerWorld()
    this._center = this.centerWorld.bind(this)
    Engine.$app.ticker.addOnce(this._center)
  }

  onResize() {
    console.log('resize')
    this.draggable.resize()
    if (!this.background.graphics) return
    this.background.graphics.width = Engine.$app.screen.width
    this.background.graphics.height = Engine.$app.screen.height
  }

  update() {
    this.updateWorldPosition()
    this.currentFestival.getNearestConcert(this.getTruePosition().x, this.getTruePosition().y)
  }

  /**
   * Drag functions
   */

  updateWorldPosition() {
    this.checkBounds(0.02)

    this.world.container.x = this.draggable.getPosition().x + Engine.$app.screen.width / 2
    this.world.container.y = this.draggable.getPosition().y + Engine.$app.screen.height / 2
  }

  checkBounds(margin) {
    if (this.normalizeWorldPos().x > 1 - margin) this.draggable.setPositionX(-(this.world.container.width / 2 - Engine.$app.screen.width / 2) + this.getMargins(margin).x)
    else if (this.normalizeWorldPos().x < 0 + margin) this.draggable.setPositionX(this.world.container.width / 2 - Engine.$app.screen.width / 2 - this.getMargins(margin).x)

    if (this.normalizeWorldPos().y > 1 - margin) this.draggable.setPositionY(-(this.world.container.height / 2 - Engine.$app.screen.height / 2) + this.getMargins(margin).y)
    else if (this.normalizeWorldPos().y < 0 + margin) this.draggable.setPositionY(this.world.container.height / 2 - Engine.$app.screen.height / 2 - this.getMargins(margin).y)
  }

  getMargins(margin) {
    return {
      x: margin * (this.world.container.width - Engine.$app.screen.width + 0.5),
      y: margin * (this.world.container.height - Engine.$app.screen.height + 0.5),
    }
  }

  normalizeWorldPos() {
    return {
      x: -(this.draggable.getPosition().x / (this.world.container.width - Engine.$app.screen.width) - 0.5),
      y: -(this.draggable.getPosition().y / (this.world.container.height - Engine.$app.screen.height) - 0.5),
    }
  }

  getTruePosition() {
    return {
      x: 1 - (this.world.container.position.x + this.world.container.width / 2 - Engine.$app.screen.width / 2) / this.world.container.width,
      y: 1 - (this.world.container.position.y + this.world.container.height / 2 - Engine.$app.screen.height / 2) / this.world.container.height,
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
    this._createNewFestival = this.createNewFestival.bind(this)
    Engine.$app.ticker.add(this._update)
    Bus.$on('NewFestival', this._createNewFestival)
  }

  removeEvents() {
    window.removeEventListener('mousedown', this._mousedown)
    window.removeEventListener('mouseup', this._mouseup)
  }
}

let WorldInstance = new World()

export default WorldInstance
