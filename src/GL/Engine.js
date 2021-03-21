import Bus from '@/utils/bus.js'

import * as PIXI from 'pixi.js'

class Engine {
  constructor() {
    this.$el = null
    this.$app = null
    this.PIXI = PIXI
    console.log('Engine')
  }

  init(el) {
    this.$el = el
    this._onResize = this.onResize.bind(this)
    this._update = this.update.bind(this)

    this.initRenderer()
    this.drawRectangle()

    // Listen for frame updates
    this.$app.ticker.add(this._update)

    Bus.$on('resize', this._onResize)

    window.addEventListener('resize', this._onResize)
  }

  /**
   * Renderer setup
   */
  initRenderer() {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    this.$app = new PIXI.Application({
      antialias: true,
      autoResize: true,
      //resolution: devicePixelRatio,
    })

    this.$app.renderer.resize(window.innerWidth, window.innerHeight)

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    this.$el.appendChild(this.$app.view)
  }

  /**
   * PIXI test
   */
  drawRectangle() {
    this.container = new this.PIXI.Container()

    const rectAndHole = new this.PIXI.Graphics()

    rectAndHole.beginFill(0x00ff00)
    rectAndHole.drawRect(0, 0, 150, 150)
    rectAndHole.endFill()

    this.container.addChild(rectAndHole)
    // Move container to the center
    this.container.x = this.$app.screen.width / 2
    this.container.y = this.$app.screen.height / 2

    // Center bunny sprite in local container coordinates
    this.container.pivot.x = this.container.width / 2
    this.container.pivot.y = this.container.height / 2

    this.$app.stage.addChild(this.container)
  }

  onResize() {
    console.log('resize')
    this.$app.renderer.resize(window.innerWidth, window.innerHeight)
    this.container.position.set(this.$app.screen.width / 2, this.$app.screen.height / 2)
  }

  update(delta) {
    this.container.rotation -= 0.01 * delta
  }

  /**
   * EVENTS
   */

  setEvents() {}

  removeEvents() {}
}

let EngineInstance = new Engine()

export default EngineInstance
