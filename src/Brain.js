const randomDir = max => (Math.random() * max) - 1

const len = 500

let id = 0

import Vec2 from './Vec2'

class Brain {
  constructor(stepThreshold = len - 1) {
    this.directions = (new Array(len)).fill(null).map(() => new Vec2(randomDir(2), randomDir(2)))
    this.step = 0
    this.stepThreshold = stepThreshold
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
    const brainClone = new Brain()
    brainClone.directions = this.directions.map(vec2 => vec2.clone())
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