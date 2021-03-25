import Engine from '@/GL/Engine.js'
import World from '@/GL/World.js'
import Concert from '@/GL/Concert.js'
import Store from '@/store'
import Player from '@/GL/Player.js'
export default class Festival {
  constructor(concertsData = null, opt = {}) {
    this.$concertsData = this.sortConcert(concertsData)
    this.$opt = opt
    this.festival = {
      container: null,
      graphics: null,
      currentConcertName: '',
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
    this.concertPosition = new Array()
    this.concerts = new Array()
    let count = 0
    let row = 0

    this.$concertsData.forEach((concert, index) => {
      let xPos = count > 0 ? 50 + Math.random() * 100 + this.concertPosition[index - 1].x + this.concertPosition[index - 1].width : this.festival.margin.x
      let yPos = 0
      if (row > 0) {
        let temp = [...this.concertPosition]
        yPos = 50 + Math.random() * 100 + this.concertPosition[index - 1 - count].y + this.getBiggerHeight(temp.splice((row - 1) * concertPerRow, concertPerRow))
      } else {
        yPos = this.festival.margin.y
      }
      let rWidth = ((1500 + Math.random() * 400) * concert.popularity) / 100
      let rHeight = ((1100 + Math.random() * 200) * concert.popularity) / 100
      this.concertPosition.push({ x: xPos, y: yPos, width: rWidth, height: rHeight })
      this.concerts.push(
        new Concert(this, concert, {
          x: xPos,
          y: yPos,
          width: rWidth,
          height: rHeight,
        })
      )
      if (count === concertPerRow - 1) {
        row++
        count = 0
      } else {
        count++
      }
    })
  }

  sortConcert(array) {
    /**
     * Generate an array with the most listenned tracks at the middle of the array
     * For that, we separate de the array in three seperate one : even indexes, odd indexes, and first result
     * Then we reverse the array of odd indexes, place it in first, then push the first result & then the even indexes array
     * That means that given an array of [1, 2, 3, 4, 5, 6, 7] => [6, 4, 2] + [1] + [3, 5, 7]
     */
    const arr = [...array]
    const firstElement = new Array(arr.shift())
    const oddArray = arr.filter(function (element, index) {
      return index % 2 === 0
    })
    const evenArray = arr.filter(function (element, index) {
      return index % 2 === 1
    })

    const sortedArray = [...oddArray.reverse(), ...firstElement, ...evenArray]
    return sortedArray
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

  getNearestConcert(currentX, currentY) {
    /**
     * Finds nearest concert using pythagoras formula,
     * loop through array of concert, check position & compare to world current position
     * First loop finds distance from world pos & checkMinDistance finds the nearest concert
     */

    this.concerts.forEach(concert => {
      concert.setCurrentDistance(this.pythagoreCalc(currentX, currentY, concert.getMiddlePosition().x / this.festival.container.width, concert.getMiddlePosition().y / this.festival.container.height))
    })
    this.checkMinDistance(this.concerts)
  }

  checkMinDistance(data) {
    /**
     * Fastest algorithm for finding smallest number in a array of objects,
     * if nearest one isn't the current one => play the corresponding music
     */
    var lowest = Number.POSITIVE_INFINITY
    var highest = Number.NEGATIVE_INFINITY
    var tmp
    var current
    for (var i = data.length - 1; i >= 0; i--) {
      tmp = data[i].concert.distance
      if (tmp < lowest) {
        lowest = tmp
        current = i
      }
      if (tmp > highest) highest = tmp
    }
    if (data[current].$data.name !== this.festival.currentConcertName) {
      if (Store.getters.getPlayerInit) Player.changeTrackFade(data[current].$data.uri)
      this.festival.currentConcertName = data[current].$data.name
      console.log('Now playing : ', this.festival.currentConcertName)
    }
  }

  pythagoreCalc(cx, cy, tx, ty) {
    return Math.pow(cx - tx, 2) + Math.pow(cy - ty, 2)
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
