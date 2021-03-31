//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import Cull from '@/GL/Cull.js'
import Draggable from '@/GL/Draggable.js'
import Festival from '@/GL/Festival.js'
import Store from '@/store'
import GUI from '@/utils/GUI.js'

import * as Filters from 'pixi-filters'

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
  }

  /**
   * World container
   */
  createWorldContainer() {
    this.world.container = new Engine.PIXI.Container()

    this.createFilters()

    this.createBackground()

    this.centerWorld()

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
    ctx.canvas.width = Engine.$app.screen.width
    ctx.canvas.height = Engine.$app.screen.height
    const grd = ctx.createLinearGradient(0, 0, 1, Engine.$app.screen.height)
    grd.addColorStop(0, from)
    grd.addColorStop(0.5, middle)
    grd.addColorStop(1, to)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, Engine.$app.screen.width, Engine.$app.screen.width)
    return new Engine.PIXI.Texture.from(c)
  }

  createFilters() {
    GUI.setFolder('Filters')

    this.blurFilter()
    this.CRTFilter()
    this.TiltShift()

    this.world.container.filters = [this.blur, this.tilt, this.crt]
  }

  blurFilter() {
    this._updateBlur = this.updateBlur.bind(this)
    this.blur = new Engine.PIXI.filters.BlurFilter(1)
    GUI.setFolder('Blur', 'Filters')
    GUI.addValue(
      'Blur',
      'enabled',
      {
        default: false,
      },
      this._updateBlur
    )
    GUI.addValue(
      'Blur',
      'intensity',
      {
        default: 1,
        min: 0,
        max: 100,
        step: 1,
      },
      this._updateBlur
    )
    this.updateBlur()
  }

  updateBlur() {
    this.blur.enabled = GUI.datas.Blur.enabled
    this.blur.blur = GUI.datas.Blur.intensity
  }

  CRTFilter() {
    this._updateCRT = this.updateCRT.bind(this)
    this.crt = new Filters.CRTFilter({
      lineWidth: 0,
      noise: 0.1,
      vignettingAlpha: 0.3,
      time: 0.5,
    })
    GUI.setFolder('CRT', 'Filters')
    GUI.addValue(
      'CRT',
      'enabled',
      {
        default: true,
      },
      this._updateCRT
    )
    GUI.addValue(
      'CRT',
      'noise',
      {
        default: 0.05,
        min: 0,
        max: 1,
        step: 0.01,
      },
      this._updateCRT
    )
    GUI.addValue(
      'CRT',
      'vignetting',
      {
        default: 0.3,
        min: 0,
        max: 1,
        step: 0.01,
      },
      this._updateCRT
    )
    GUI.addValue(
      'CRT',
      'vignettingAlpha',
      {
        default: 0.3,
        min: 0,
        max: 1,
        step: 0.01,
      },
      this._updateCRT
    )
    GUI.addValue(
      'CRT',
      'vignettingBlur',
      {
        default: 0.3,
        min: 0,
        max: 1,
        step: 0.01,
      },
      this._updateCRT
    )
    this.updateCRT()
  }

  updateCRT() {
    this.crt.enabled = GUI.datas.CRT.enabled
    this.crt.noise = GUI.datas.CRT.noise
    this.crt.vignetting = GUI.datas.CRT.vignetting
    this.crt.vignettingAlpha = GUI.datas.CRT.vignettingAlpha
    this.crt.vignettingBlur = GUI.datas.CRT.vignettingBlur
  }

  TiltShift() {
    this._updateTiltShift = this.updateTiltShift.bind(this)
    this.tilt = new Filters.TiltShiftFilter({
      blur: 30,
      gradientBlur: 800,
    })
    GUI.setFolder('Tilt', 'Filters')
    GUI.addValue(
      'Tilt',
      'enabled',
      {
        default: false,
      },
      this._updateTiltShift
    )
    GUI.addValue(
      'Tilt',
      'gradientBlur',
      {
        default: 800,
        min: 0,
        max: 1000,
        step: 10,
      },
      this._updateTiltShift
    )
    GUI.addValue(
      'Tilt',
      'blur',
      {
        default: 30,
        min: 0,
        max: 1000,
        step: 10,
      },
      this._updateTiltShift
    )
    this.updateTiltShift()
  }

  updateTiltShift() {
    this.tilt.enabled = GUI.datas.Tilt.enabled
    this.tilt.blur = GUI.datas.Tilt.blur
    this.tilt.gradientBlur = GUI.datas.Tilt.gradientBlur
  }

  centerWorld() {
    // Move container to the center
    this.world.container.x = Engine.$app.screen.width / 2
    this.world.container.y = Engine.$app.screen.height / 2

    this.world.container.pivot.x = this.world.container.width / 2
    this.world.container.pivot.y = this.world.container.height / 2

    this.world.container.zIndex = 2

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
    this.background.graphics.width = Engine.$app.screen.width
    this.background.graphics.height = Engine.$app.screen.height
  }

  update() {
    this.crt.seed = Math.random()
    this.crt.time += 0.5
    this.updateWorldPosition()
    this.currentFestival.getNearestConcert(this.normalizeWorldPos().x, this.normalizeWorldPos().y)
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
