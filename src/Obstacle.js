import Vec2 from './Vec2'

class Obstacle {
  constructor(x, y, w, h) {
    this.pos = new Vec2(x, y)
    this.w = w
    this.h = h

    this.min = new Vec2(x, y)
    this.max = new Vec2(x + w, y + h)
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.w, this.h);
    ctx.fillStyle = 'black';
    ctx.fill();
  }

  checkCollisionWith(vec2) {
    if (
      vec2.x > this.min.x && vec2.x < this.max.x &&
      vec2.y > this.min.y && vec2.y < this.max.y
    ) {
      return true
    }

    return false
  }
}

export default Obstacle