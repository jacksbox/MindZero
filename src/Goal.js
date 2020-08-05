import Vec2 from './Vec2'

class Goal {
  constructor(x, y, size, color) {
    this.pos = new Vec2(x, y)
    this.size = size
    this.color = color
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default Goal