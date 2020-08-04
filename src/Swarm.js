import Dot from './Dot'
import stats from './Stats'

const rand = max => Math.random() * max

class Swarm {
  constructor(size, ctx) {
    this.size = size
    this.ctx = ctx
    this.dots = (new Array(this.size)).fill(null).map(() => new Dot(400, 700, this.ctx))
  }

  evolve() {
    this.calcFitness()
    this.calcFitnessSum()
    const best = this.selectBest()
    const maxStep = best.brain.step
    const bestChild = best.getChild(maxStep)
    bestChild.brain.id = best.brain.id
    bestChild.champ = true

    this.dots = this.dots.map(() => {
      const dot = this.selectParent()
      return dot.getChild(maxStep)
    })

    this.mutate()

    this.dots[this.dots.length - 1] = bestChild
  }

  mutate() {
    this.dots.forEach(dot => dot.brain.mutate())
  }

  selectBest() {
    let dot = this.dots[0]
    const len = this.dots.length
    for (let i = 1; i < len; i++) {
      if (this.dots[i].fitness > dot.fitness) {
        dot = this.dots[i]
      }
    }

    stats.minSteps = dot.brain.step
    stats.champIds.push(dot.brain.id)

    return dot
  }

  selectParent() {
    const r = rand(this.fitnessSum);

    let runningSum = 0;

    const len = this.dots.length
    for (let i = 0; i < len; i++) {
      runningSum += this.dots[i].fitness;
      if (runningSum > r) {
        return this.dots[i];
      }
    }
  }

  calcFitness() {
    this.dots.forEach(dot => dot.calcFitness())
  }

  calcFitnessSum() {
    this.fitnessSum = this.dots.reduce((acc, dot) => acc + dot.fitness, 0)
  }

  update() {
    this.dots.forEach(dot => dot.update())
  }

  draw() {
    this.dots.forEach(dot => dot.draw())
  }

  allStopped() {
    const len = this.dots.length
    for (let i = 0; i < len; i++) {
      if (!this.dots[i].dead && !this.dots[i].goal) {
        return false
      }
    }
    return true
  }
}

export default Swarm