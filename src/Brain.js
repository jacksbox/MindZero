const randomDir = max => (Math.random() * max) - 1

let id = 0

import Vec2 from './Vec2'

class Brain {
  constructor(stepLimit) {
    this.directions = (new Array(stepLimit)).fill(null).map(() => new Vec2(randomDir(2), randomDir(2)))
    this.stepLimit = stepLimit
    this.step = 0
    this.id = id++
  }

  isEmpty() {
    return this.step === this.stepLimit - 1
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

  clone(stepLimit = null) {
    const brainClone = new Brain(0)
    brainClone.directions = stepLimit
      ? this.directions.slice(0, stepLimit).map(vec2 => vec2.clone())
      : this.directions.map(vec2 => vec2.clone())
    return brainClone
  }

  mutate(hasHitGoal) {
    const mutationRate = hasHitGoal ? 0.005 : 0.01
    // const maxSequence = hasHitGoal ? Math.floor(rand(0, 3)) : Math.floor(rand(0,8))
    const maxSequence = 0
    let sequence = 0
    this.directions = this.directions.map(vec2 => {
      if (sequence > 0 || Math.random() < mutationRate) {
        sequence = sequence > 0 ? sequence-- : maxSequence
        return new Vec2(randomDir(2), randomDir(2))
      }
      return vec2
    })
  }
}

export default Brain