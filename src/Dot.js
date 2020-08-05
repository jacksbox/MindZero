import Brain from './Brain'

import Vec2 from './Vec2'

class Dot {
  constructor(x, y, maxStep) {
    this.radius = 4
    this.start = new Vec2(x, y)
    this.pos = new Vec2(x, y)
    this.vel = new Vec2()
    this.brain = new Brain(maxStep)

    this.fitness = 0
    this.champ = false

    this.isDead = false
    this.hitObstacle = false
    this.reachedGoal = false
    this.hasHitGoal = false
  }

  draw(color, ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x - this.radius, this.pos.y - this.radius, this.radius, 0, 2 * Math.PI);
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
    if(!this.isDead && !this.reachedGoal) {
      this.move()

      if (bounds.isOutOfBounds(this.pos)) {
        this.isDead = true
      }
      if (obstacle.checkCollisionWith(this.pos)) {
        this.isDead = true
        this.hitObstacle = true
      }
      if (goal.checkCollisionWith(this.pos)) {
        this.reachedGoal = true
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
    this.fitness = this.reachedGoal ? 1 : 1 / Math.pow(this.pos.distance(new Vec2(400, 80)), 2)
    if (this.hitObstacle) {
      this.fitness /= 2
    } else
    if (this.reachedGoal) {
      this.fitness = this.fitness * 1.5 + +  100 / (this.brain.step * this.brain.step)
    }
  }

  getChild(maxStep) {
    const child = new Dot(this.start.x, this.start.y)
    child.brain = this.brain.clone()
    child.brain.maxStep = maxStep
    child.hasHitGoal = this.reachedGoal
    return child
  }

  mutate() {
    this.brain.mutate(this.hasHitGoal)
  }
}

export default Dot