//import Bus from '@/utils/bus.js'

import Engine from '@/GL/Engine.js'
import World from '@/GL/World.js'
import Concert from '@/GL/Concert.js'
export default class Festival {
  constructor(concertsData = null, opt = {}) {
    this.$concertsData = concertsData
    this.$opt = opt
    this.festival = {
      container: null,
      graphics: null,
      color: this.$opt.color ? this.$opt.color : 0xffff00,
      size: {
        width: this.$opt.width ? this.$opt.width : 2000,
        height: this.$opt.height ? this.$opt.height : 2000,
      },
      margin: {
        x: this.$opt.marginx ? this.$opt.marginxx : 50,
        y: this.$opt.marginy ? this.$opt.marginxy : 50,
      },
      position: {
        x: this.$opt.x ? this.$opt.x : 0,
        y: this.$opt.y ? this.$opt.y : 0,
      },
    }
    this.init()
  }

  init() {
    this.setEvents()
    this.createFestival()
  }

  createFestival() {
    this.festival.container = new Engine.PIXI.Container()
    this.festival.container.sortableChildren = true

    this.createConcerts()
    this.createFestivalGrounds()
    //this.centerWorld()

    World.addChild(this.festival.container)
  }

  centerWorld() {
    // Move container to the center
    this.festival.container.x = Engine.$app.screen.width / 2
    this.festival.container.y = Engine.$app.screen.height / 2

    this.festival.container.pivot.x = this.festival.container.width / 2
    this.festival.container.pivot.y = this.festival.container.height / 2
  }

  createFestivalGrounds() {
    this.festival.graphics = new Engine.PIXI.Graphics()
    this.festival.graphics.beginFill(this.festival.color)
    this.festival.graphics.drawRect(0, 0, this.festival.container.width + this.festival.margin.x * 2, this.festival.container.height + this.festival.margin.y * 2)
    this.festival.graphics.endFill()
    this.festival.graphics.zIndex = 1
    this.addChild(this.festival.graphics)
  }

  createConcerts() {
    this.positionConcertRow(5)
  }

  positionConcertRandom(numberOfConcert, maxTries) {
    let placedConcert = new Array()
    this.concerts = new Array()
    let count = 0
    while (count < maxTries && placedConcert.length < numberOfConcert) {
      let xPos = Math.random() * this.festival.size.width
      let yPos = Math.random() * this.festival.size.height
      let rWidth = 500 + Math.random() * 1000
      let rHeight = 200 + Math.random() * 200
      let isGood = true
      let index = 0
      for (let i = 0; i < placedConcert.length && isGood; i++) {
        if (
          placedConcert[i].x < xPos + placedConcert[i].width &&
          placedConcert[i].x + placedConcert[i].width > xPos &&
          placedConcert[i].y < yPos + placedConcert[i].height &&
          placedConcert[i].y + placedConcert[i].height > yPos
        )
          isGood = false
        else index = i
      }
      if (isGood) {
        placedConcert.push({ x: xPos, y: yPos, width: rWidth, height: rHeight })
        this.concerts.push(
          new Concert(this, this.$concertsData[index], {
            x: xPos,
            y: yPos,
            width: rWidth,
            height: rHeight,
          })
        )
      }
      count++
    }
    console.log(placedConcert, count)
    this.createFestivalGrounds()
    this.createFestivalGrounds()
  }
  positionConcertRow(concertPerRow) {
    let placedConcert = new Array()
    this.concerts = new Array()
    let count = 0
    let row = 0

    this.$concertsData.forEach((concert, index) => {
      let xPos = count > 0 ? 50 + Math.random() * 100 + placedConcert[index - 1].x + placedConcert[index - 1].width : this.festival.margin.x
      let yPos = 0
      if (row > 0) {
        let temp = [...placedConcert]
        yPos = 50 + Math.random() * 100 + placedConcert[index - 1 - count].y + this.getBiggerHeight(temp.splice((row - 1) * concertPerRow, concertPerRow))
      } else {
        yPos = this.festival.margin.y
      }
      let rWidth = ((1000 + Math.random() * 200) * concert.popularity) / 100
      let rHeight = ((600 + Math.random() * 100) * concert.popularity) / 100
      placedConcert.push({ x: xPos, y: yPos, width: rWidth, height: rHeight })
      this.concerts.push(
        new Concert(this, concert, {
          x: xPos,
          y: yPos,
          width: rWidth,
          height: rHeight,
        })
      )
      if (count === concertPerRow - 1) {
        console.log('new row')
        row++
        count = 0
      } else {
        count++
      }
    })
  }

  getBiggerHeight(pastValues) {
    let maxHeight = 0
    pastValues.forEach(value => {
      if (value.height > maxHeight) maxHeight = value.height
    })
    return maxHeight
  }

  addChild(child) {
    this.festival.container.addChild(child)
  }

  hideFestival() {
    this.festival.container.visible = false
  }

  showFestival() {
    this.festival.container.visible = true
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
