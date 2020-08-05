import Vec2 from './Vec2'

class Goal {
  constructor(x, y, radius, color) {
    this.pos = new Vec2(x, y)
    this.radius = radius
    this.color = color
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  checkCollisionWith(vec2) {
    if (this.pos.distance(vec2) < this.radius) {
      return true
    }

    return false
  }
}

export default Goal