const rand = (min, max) => (Math.random() * max) + min

const len = 1000

class Brain {
  constructor() {
    this.directions = (new Array(len)).fill(null).map(() => ({ x: rand(0, 2) - 1, y: rand(0, 2) - 1 }))
    this.step = 0
    this.maxStep = len - 1
    this.set()
  }

  next() {
    this.step++
    this.set()
  }

  set() {
    this.x = this.directions[this.step].x
    this.y = this.directions[this.step].y
  }
}

export default Brain