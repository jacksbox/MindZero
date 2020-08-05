const rand = (min, max) => (Math.random() * max) + min

const len = 500

let id = 0

class Brain {
  constructor(maxStep = len - 1) {
    this.directions = (new Array(len)).fill(null).map(() => ({ x: rand(0, 2) - 1, y: rand(0, 2) - 1 }))
    this.step = 0
    this.maxStep = maxStep
    this.id = id++
  }

  next() {
    this.step++
  }

  get() {
    return {
      x: this.directions[this.step].x,
      y: this.directions[this.step].y
    }
  }

  clone() {
    const theClone = new Brain()
    theClone.directions = this.directions.map(({ x, y }) => ({ x, y }))
    return theClone
  }

  mutate(hasHitGoal) {
    const threshold = hasHitGoal ? 0.005 : 0.01
    // const maxSequence = hasHitGoal ? Math.floor(rand(0, 3)) : Math.floor(rand(0,8))
    const maxSequence = 0
    let sequence = 0
    this.directions = this.directions.map(v => {
      if (sequence > 0 || Math.random() < threshold) {
        sequence = sequence > 0 ? sequence-- : maxSequence
        return {
          x: rand(0, 2) - 1,
          y: rand(0, 2) - 1
        }
      }
      return v
    })
  }
}

export default Brain