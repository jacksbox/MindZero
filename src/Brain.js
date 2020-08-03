const rand = (min, max) => (Math.random() * max) + min

const len = 500

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

  clone() {
    const theClone = new Brain()
    theClone.directions = this.directions.map(({ x, y }) => ({ x, y }))
    return theClone
  }

  mutate() {
    const threshold = 0.01
    this.directions = this.directions.map(v => {
      if (Math.random() < threshold) {
        return {
          x: rand(0, 2) - 1,
          y: rand(0, 2) - 1
        }
      }
      return v
    })
    this.set()
  }
}

export default Brain