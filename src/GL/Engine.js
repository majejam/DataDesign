import Bus from '@/utils/bus.js'

import * as PIXI from 'pixi.js'

import World from '@/GL/World.js'

class Engine {
  constructor() {
    this.$el = null
    this.$app = null
    this.PIXI = PIXI
  }

  init(el) {
    this.$el = el
    this._onResize = this.onResize.bind(this)
    this._update = this.update.bind(this)

    this.initRenderer()

    // Listen for frame updates
    this.$app.ticker.add(this._update)

    World.init(this.$el)

    Bus.$on('resize', this._onResize)

    window.addEventListener('resize', this._onResize)

    console.log('Engine init done')
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

    this.$app.renderer.resize(this.$el.offsetWidth, this.$el.offsetHeight)

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    this.$el.appendChild(this.$app.view)
  }

  onResize() {
    console.log('resize')
    this.$app.renderer.resize(this.$el.offsetWidth, this.$el.offsetHeight)
    //this.container.position.set(this.$app.screen.width / 2, this.$app.screen.height / 2)
  }

  update() {
    //this.container.rotation -= 0.01 * delta
  }

  /**
   * EVENTS
   */

  setEvents() {}

  removeEvents() {}
}

let EngineInstance = new Engine()

export default EngineInstance
