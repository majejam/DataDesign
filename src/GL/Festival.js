import Engine from '@/GL/Engine.js'
import Bus from '@/utils/bus.js'
import World from '@/GL/World.js'
import Concert from '@/GL/Concert.js'
import Store from '@/store'
import Player from '@/GL/Player.js'
import Person from '@/GL/Person.js'
import Chance from 'chance'
export default class Festival {
  constructor(concertsData = null, opt = {}) {
    this.chance = new Chance()
    if (concertsData.length === 0) {
      console.error('NO CONCERT DATA')
      return
    }
    this.$concertsData = this.sortConcert(concertsData)
    this.weightedConcert = this.generateWeightedConcertArray(this.$concertsData)
    this.$opt = opt
    this.festival = {
      container: null,
      graphics: null,
      ground: null,
      currentConcertName: '',
      color: this.$opt.color ? this.$opt.color : 0xf0e4d7,
      size: {
        width: this.$opt.width ? this.$opt.width : 2000,
        height: this.$opt.height ? this.$opt.height : 2000,
      },
      margin: {
        x: this.$opt.marginx ? this.$opt.marginx : 500,
        y: this.$opt.marginy ? this.$opt.marginy : 500,
      },
      position: {
        x: this.$opt.x ? this.$opt.x : 0,
        y: this.$opt.y ? this.$opt.y : 0,
      },
      trees: new Array(),
    }
    this.init()
  }

  init() {
    this.setEvents()
    this.createFestival()
    console.log('Festival created')
    Bus.$emit('loaded')
  }

  createFestival() {
    this.festival.container = new Engine.PIXI.Container()
    this.festival.container.sortableChildren = true

    this.createConcerts()
    this.createFestivalGrounds()
    this.positionTreeRandom(100, 2500, 1.2)
    this.generatePersons(200)

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
    this.festival.ground = new Engine.PIXI.TilingSprite(
      Engine.spritesheet.textures['floor.png'],
      this.festival.container.width + this.festival.margin.x * 2,
      this.festival.container.height + this.festival.margin.y * 2
    )
    this.festival.graphics = new Engine.PIXI.Graphics()
    this.festival.graphics.beginFill(this.festival.color, 0)
    this.festival.graphics.drawRect(0, 0, this.festival.container.width + this.festival.margin.x * 2, this.festival.container.height + this.festival.margin.y * 2)
    this.festival.graphics.endFill()

    //this.festival.graphics.visible = false
    this.festival.graphics.zIndex = 1
    this.addChild(this.festival.graphics)
    this.addChild(this.festival.ground)
  }

  createTree(x, y, ratio) {
    let tree_sprite = this.chance.pickone(['tree.png', 'tree_big_heavy.png', 'tree_small_heavy.png'])

    const sprite = new Engine.PIXI.Sprite(Engine.spritesheet.textures[tree_sprite])
    sprite.position.x = x
    sprite.position.y = y
    sprite.height = sprite.height / ratio
    sprite.width = sprite.width / ratio
    sprite.zIndex = y + sprite.height

    this.festival.trees.push(sprite)
    this.addChild(sprite)
  }

  createConcerts() {
    this.positionConcertRow(5, 200, 200)
  }

  positionTreeRandom(numberOfTree, maxTries, overlay) {
    let placedTree = [...this.concertPosition]
    let count = 0
    let nbPlaced = 0
    while (count < maxTries && nbPlaced < numberOfTree) {
      let xPos = this.festival.margin.x + Math.random() * (this.festival.container.width - this.festival.margin.x * 2)
      let yPos = this.festival.margin.y + Math.random() * (this.festival.container.height - this.festival.margin.y * 2)
      let isGood = true
      for (let i = 0; i < placedTree.length && isGood; i++) {
        if (
          placedTree[i].x < xPos + placedTree[i].width / overlay &&
          placedTree[i].x + placedTree[i].width / overlay > xPos &&
          placedTree[i].y < yPos + placedTree[i].height / overlay &&
          placedTree[i].y + placedTree[i].height / overlay > yPos
        )
          isGood = false
      }
      if (isGood) {
        placedTree.push({ x: xPos, y: yPos, width: 200, height: 400 })
        this.createTree(xPos, yPos, 1.5 + Math.random() * 1.5)
        nbPlaced++
      }
      count++
    }
    console.log('Placed ', nbPlaced, ' tree in ', count, ' tries')
  }

  positionConcertRow(concertPerRow, baseOffset, randomOffset) {
    this.concertPosition = new Array()
    this.concerts = new Array()
    let count = 0
    let row = 0

    this.$concertsData.forEach((concert, index) => {
      let xPos = count > 0 ? baseOffset + Math.random() * randomOffset + this.concertPosition[index - 1].x + this.concertPosition[index - 1].width : this.festival.margin.x
      let yPos = 0
      if (row > 0) {
        let temp = [...this.concertPosition]
        yPos = baseOffset + Math.random() * randomOffset + this.concertPosition[index - 1 - count].y + this.getBiggerHeight(temp.splice((row - 1) * concertPerRow, concertPerRow))
      } else {
        yPos = this.festival.margin.y
      }
      let rWidth = 500 + ((1100 + Math.random() * 400) * concert.popularity) / 100
      let rHeight = 300 + ((900 + Math.random() * 200) * concert.popularity) / 100
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

  generateWeightedConcertArray() {
    /**
     * Create popularity array,
     * determines min & max value of array
     * Normalize popularity concert array from range [min, max] to [0, 1]
     * then create array with corresponding pourcentages
     */
    const arr = [...this.$concertsData]
    const popularityMap = arr.map(x => x.popularity)
    const max = Math.max(...popularityMap)
    const min = Math.min(...popularityMap) / 1.1 //prevents minimum to be 0
    const normalizedMap = popularityMap.map(x => this.normalize(x, max, min))
    const total = normalizedMap.reduce((a, b) => a + b)
    const weight = normalizedMap.map(x => (x * 100) / total)
    return weight
  }

  pickWeightedConcert() {
    return this.chance.weighted(this.concerts, this.weightedConcert)
  }

  normalize(val, max, min) {
    return (val - min) / (max - min)
  }

  generatePersons(nbOfPersons) {
    this.persons = new Array()

    for (let index = 0; index < nbOfPersons; index++) {
      this.persons.push(new Person(this, index))
    }
  }

  removePersons() {
    this.persons.forEach(person => {
      person.destroy()
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

  removeChild(child) {
    this.festival.container.removeChild(child)
  }

  hideFestival() {
    this.festival.container.visible = false
  }

  showFestival() {
    this.festival.container.visible = true
  }

  destroy() {
    World.world.container.removeChild(this.festival.container)
    this.removePersons()
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
     * Fastest algorithm for finding smalest number in a array of objects,
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
      if (Store.getters.getPlayerInit) Player.changeTrackFade(data[current].$data.uri, data[current].$data.artists[0].id)
      this.festival.currentConcertName = data[current].$data.name
      Store.commit('setCurrentSong', this.festival.currentConcertName + ' - ' + data[current].$data.artists[0].name)
      console.log('Now playing : ', this.festival.currentConcertName, data[current].$data)
    }
  }

  pythagoreCalc(cx, cy, tx, ty) {
    return Math.pow(cx - tx, 2) + Math.pow(cy - ty, 2)
  }

  update() {
    this.festival.trees.forEach(tree => {
      tree.visible = World.cull.isInViewport(tree.position.x, tree.position.y, tree.width, tree.height)
    })
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

  removeEvents() {}
}
