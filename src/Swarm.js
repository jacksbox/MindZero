import Dot from './Dot'
import stats from './Stats'

const rand = max => Math.random() * max

class Swarm {
  constructor(size, initialStepLimit, color, origin) {
    this.size = size
    this.initialStepLimit = initialStepLimit
    this.color = color
    this.origin = origin
    this.dots = (new Array(this.size)).fill(null).map(() => new Dot(origin.x, origin.y, initialStepLimit))

    this.stepsInBestTry = null
  }

  evolve() {
    this.calcFitness()
    this.calcFitnessSum()
    const primus = this.selectPrimus()
    // evolved dots only can do 1.2 times the amount of steps of the primus
    const newStepLimit = Math.min(
      Math.floor((primus.reachedGoal ? (primus.brain.step + 1) : primus.brain.stepLimit) * 1.2),
      this.initialStepLimit
    )
    const primusChild = primus.getChild(newStepLimit)

    primusChild.brain.id = primus.brain.id
    primusChild.primus = true

    this.stepsInBestTry = newStepLimit

    this.dots = this.dots.map(() => {
      const dot = this.selectParent()
      return dot.getChild(newStepLimit)
    })

    this.mutate()

    this.dots[this.dots.length - 1] = primusChild
  }

  mutate() {
    this.dots.forEach(dot => dot.mutate())
  }

  selectPrimus() {
    let dot = this.dots[0]
    const len = this.dots.length
    for (let i = 1; i < len; i++) {
      if (this.dots[i].fitness > dot.fitness) {
        dot = this.dots[i]
      }
    }

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