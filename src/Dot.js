import Brain from './Brain'

import Vec2 from './Vec2'

class Dot {
  constructor(x, y, ctx, maxStep) {
    this.start = new Vec2(x, y)
    this.size = 4
    this.pos = new Vec2(x, y)
    this.vel = new Vec2()
    this.ctx = ctx
    this.brain = new Brain(maxStep)
    this.dead = false
    this.goal = false
    this.fitness = 0
    this.champ = false
    this.isRandom = false
    this.hitObstacle = false
    this.hasHitGoal = false
  }

  draw(color) {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, 0, 2 * Math.PI);
    if (this.champ) {
      this.ctx.fillStyle = 'green';
    } else if(this.isRandom){
      this.ctx.fillStyle = 'purple';
    } else {
      this.ctx.fillStyle = color;
    }
    this.ctx.fill();
  }

  update() {
    if(!this.dead && !this.goal) {
      this.move()

      if (this.pos.x < 0 || this.pos.x > 800 || this.pos.y < 0 || this.pos.y > 800) {
        this.dead = true
      }
      if (
        (this.pos.x >= 100 && this.pos.x <= 700) &&
        (this.pos.y >= 300 && this.pos.y <= 310)
      ) {
        this.dead = true
        this.hitObstacle = true
      }
      if (Math.abs(this.pos.x - 400) < 6 && Math.abs(this.pos.y - 80) < 6) {
        this.goal = true
      }
    }
  }

  move() {
    if ( this.brain.step === this.brain.maxStep) {
      this.dead = true
      return
    }
    this.vel.add(this.brain.get())
    this.vel.limit(4)
    this.pos.add(this.vel)

    this.brain.next()
  }

  calcFitness() {
    this.fitness = this.goal ? 1 : 1 / Math.pow(this.pos.distance(new Vec2(400, 80)), 2)
    if (this.hitObstacle) {
      this.fitness /= 2
    } else
    if (this.goal) {
      this.fitness = this.fitness * 1.5 + +  100 / (this.brain.step * this.brain.step)
      // this.fitness += 1/16 +  1/ (this.brain.step * this.brain.step)
    }
  }

  getChild(maxStep) {
    const child = new Dot(this.start.x, this.start.y, this.ctx)
    child.brain = this.brain.clone()
    child.brain.maxStep = maxStep
    child.hasHitGoal = this.goal
    return child
  }

  mutate() {
    this.brain.mutate(this.hasHitGoal)
  }
}

export default Dot