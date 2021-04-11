import Engine from '@/GL/Engine.js'
import GUI from '@/utils/GUI.js'
import * as PixiFilters from 'pixi-filters'
import Store from '@/store'

export default class Filters {
  constructor(container) {
    this.$container = container
    this.createFilters()
  }

  createFilters() {
    GUI.setFolder('Filters')

    this.blurFilter()
    this.colorFilter()
    this.CRTFilter()
    this.TiltShift()

    this.setEvents()

    Engine.$app.stage.filters = [this.blur, this.tilt, this.crt, this.color]
  }

  updateFilters() {
    this.updateColor()
  }

  colorFilter() {
    this._updateColor = this.updateColor.bind(this)
    this.color = new Engine.PIXI.filters.ColorMatrixFilter()
    GUI.setFolder('Color', 'Filters')
    GUI.addValue(
      'Color',
      'enabled',
      {
        default: true,
      },
      this._updateColor
    )
    GUI.addValue(
      'Color',
      'hue',
      {
        default: 340,
        min: 0,
        max: 360,
        step: 1,
      },
      this._updateColor
    )
    this.updateColor()
  }

  updateColor() {
    this.color.reset()
    this.color.enabled = GUI.datas.Color.enabled
    //this.color.technicolor(GUI.datas.Color.technicolor)

    if (Store.getters.getCurrentFestival === 'normal') this.color.hue(0, true)
    else this.color.hue(GUI.datas.Color.hue, true)
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
    this.crt = new PixiFilters.CRTFilter({
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
    this.tilt = new PixiFilters.TiltShiftFilter({
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

  update() {
    this.crt.seed = Math.random()
    this.crt.time += 0.5
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
    Engine.$app.ticker.remove(this._update)
  }

  destroy() {
    this.removeEvents()
    this.container.filters = []
  }
}
