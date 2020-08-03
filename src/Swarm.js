import Dot from './Dot'

class Swarm {
  constructor(size, ctx) {
    this.dots = (new Array(size)).fill(null).map(() => new Dot(400, 800, ctx))
  }

  update() {
    this.dots.forEach(dot => dot.update())
  }

  draw() {
    this.dots.forEach(dot => dot.draw())
  }
}

export default Swarm