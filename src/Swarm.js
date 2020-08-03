import Dot from './Dot'

class Swarm {
  constructor(size, ctx) {
    this.dots = (new Array(size)).fill(null).map(() => new Dot(400, 400, ctx))
  }

  move() {
    this.dots.forEach(dot => dot.move())
  }

  draw() {
    this.dots.forEach(dot => dot.draw())
  }
}

export default Swarm