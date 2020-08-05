import Dot from './Dot'
import stats from './Stats'

const rand = max => Math.random() * max

class Swarm {
  constructor(size, color, origin) {
    this.size = size
    this.color = color
    this.origin = origin
    this.dots = (new Array(this.size)).fill(null).map(() => new Dot(origin.x, origin.y))

    const bestSteps = '-'

    stats.createDiv(color)
  }

  evolve() {
    this.calcFitness()
    this.calcFitnessSum()
    const best = this.selectBest()
    const maxStep = Math.min(Math.floor((best.hasHitGoal ? best.brain.step : best.brain.maxStep) * 1.2), 499)
    const bestChild = best.getChild(maxStep)
    bestChild.brain.id = best.brain.id
    bestChild.champ = true

    this.bestSteps = best.hasHitGoal ? best.brain.step : best.brain.maxStep

    this.dots = this.dots.map(() => {
      const dot = this.selectParent()
      return dot.getChild(maxStep)
    })

    this.mutate()

    this.dots[this.dots.length - 1] = bestChild
  }

  mutate() {
    this.dots.forEach(dot => dot.mutate())
  }

  selectBest() {
    let dot = this.dots[0]
    const len = this.dots.length
    for (let i = 1; i < len; i++) {
      if (this.dots[i].fitness > dot.fitness) {
        dot = this.dots[i]
      }
    }

    stats.minSteps = dot.hasHitGoal ? dot.brain.step : '-'

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

  update(goal, obstacle, bounds) {
    this.dots.forEach(dot => dot.update(goal, obstacle, bounds))
  }

  draw(ctx) {
    this.dots.forEach(dot => dot.draw(this.color, ctx))
  }

  allStopped() {
    const len = this.dots.length
    for (let i = 0; i < len; i++) {
      if (!this.dots[i].isDead && !this.dots[i].reachedGoal) {
        return false
      }
    }
    return true
  }
}

export default Swarm