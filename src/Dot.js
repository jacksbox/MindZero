import Brain from './Brain'

import {  vAdd, vLimit } from './Vector'

class Dot {
  constructor(x, y, ctx) {
    this.size = 4
    this.pos = {
       x,
       y
    }
    this.vel = {
      x: 0,
      y: 0
    }
    this.ctx = ctx
    this.brain = new Brain
    this.dead = false
    this.goal = false
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
  }

  update() {
    if(!this.dead && !this.goal) {
      this.move()

      if (this.pos.x < 0 || this.pos.x > 800 || this.pos.y < 0 || this.pos.y > 800) {
        this.dead = true
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
    vAdd(this.vel, this.brain)
    vLimit(this.vel, 4)
    vAdd(this.pos, this.vel)

    this.brain.next()
  }
}

export default Dot