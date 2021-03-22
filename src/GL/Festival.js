//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import World from '@/GL/World.js'

export default class Festival {
  constructor(data = null, opt = {}) {
    this.$data = data
    this.$opt = opt
    this.festival = {
      container: null,
      graphics: null,
      color: this.$opt.color ? this.$opt.color : 0xffff00,
      size: {
        width: this.$opt.width ? this.$opt.width : 300,
        height: this.$opt.height ? this.$opt.height : 300,
      },
      position: {
        x: this.$opt.x ? this.$opt.x : 0,
        y: this.$opt.y ? this.$opt.y : 0,
      },
    }
    console.log(this.$data)
    this.init()
  }

  init() {
    this.setEvents()
    this.createFestival()
  }

  createFestival() {
    this.festival.container = new Engine.PIXI.Container()

    this.festival.graphics = new Engine.PIXI.Graphics()
    this.festival.graphics.beginFill(this.festival.color)
    this.festival.graphics.drawRect(0, 0, this.festival.size.width, this.festival.size.height)
    this.festival.graphics.endFill()

    let text = new Engine.PIXI.Text(this.$data.artists[0].name, { fontFamily: 'Arial', fontSize: 24, fill: 0xf00f10, align: 'center' })
    this.festival.container.addChild(this.festival.graphics)
    this.festival.container.addChild(text)

    this.festival.container.x = this.festival.position.x
    this.festival.container.y = this.festival.position.y
    World.addChild(this.festival.container)
  }

  update() {}

  /**
   * EVENTS
   */

  setEvents() {
    /**
     * Binding functions
     */
    this._update = this.update.bind(this)
    //Engine.$app.ticker.add(this._update)
  }

  removeEvents() {}
}
