import Brain from './Brain'

import Vec2 from './Vec2'

class Dot {
  constructor(x, y, maxStep) {
    this.start = new Vec2(x, y)
    this.size = 4
    this.pos = new Vec2(x, y)
    this.vel = new Vec2()
    this.brain = new Brain(maxStep)
    this.isDead = false
    this.hasHitGoal = false
    this.fitness = 0
    this.champ = false
    this.isRandom = false
    this.hasHitObstacle = false
    this.hasHitGoal = false
  }

  draw(color, ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, 0, 2 * Math.PI);
    if (this.champ) {
      ctx.fillStyle = 'green';
    } else if(this.isRandom){
      ctx.fillStyle = 'purple';
    } else {
      ctx.fillStyle = color;
    }
    ctx.fill();
  }

  update(goal, obstacle, bounds) {
    if(!this.isDead && !this.hasHitGoal) {
      this.move()

      if (bounds.isOutOfBounds(this.pos)) {
        this.isDead = true
      }
      if (obstacle.checkCollisionWith(this.pos)) {
        this.isDead = true
        this.hasHitObstacle = true
      }
      if (goal.checkCollisionWith(this.pos)) {
        this.hasHitGoal = true
      }
    }
  }

  move() {
    if ( this.brain.step === this.brain.maxStep) {
      this.isDead = true
      return
    }
    this.vel.add(this.brain.get())
    this.vel.limit(4)
    this.pos.add(this.vel)

    this.brain.next()
  }

  calcFitness() {
    this.fitness = this.hasHitGoal ? 1 : 1 / Math.pow(this.pos.distance(new Vec2(400, 80)), 2)
    if (this.hasHitObstacle) {
      this.fitness /= 2
    } else
    if (this.hasHitGoal) {
      this.fitness = this.fitness * 1.5 + +  100 / (this.brain.step * this.brain.step)
      // this.fitness += 1/16 +  1/ (this.brain.step * this.brain.step)
    }
  }

  getChild(maxStep) {
    const child = new Dot(this.start.x, this.start.y, this.ctx)
    child.brain = this.brain.clone()
    child.brain.maxStep = maxStep
    child.hasHitGoal = this.hasHitGoal
    return child
  }

  mutate() {
    this.brain.mutate(this.hasHitGoal)
  }
}

export default Dot