import Vec2 from './Vec2'

class Bounds {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.min = new Vec2(0, 0)
    this.max = new Vec2(w, h)
  }

  clear(ctx) {
    ctx.clearRect(this.min.x, this.min.y, this.w, this.h)
  }

  isOutOfBounds(vec2) {
    if (
      vec2.x < this.min.x || vec2.x > this.max.x ||
      vec2.y < this.min.y || vec2.y > this.max.y
    ) {
      return true
    }

    return false
  }
}

export default Bounds