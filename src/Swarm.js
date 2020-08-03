import Dot from './Dot'

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
    const bestChild = best.getChild()
    bestChild.champ = true

    this.dots = this.dots.map(() => {
      const dot = this.selectParent()
      return dot.getChild()
    })

    this.dots[this.dots.length - 1] = bestChild

    this.mutate()
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

    let worst = this.dots[0]
    for (let i = 1; i < len; i++) {
      if (this.dots[i].fitness < worst.fitness) {
        worst = this.dots[i]
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