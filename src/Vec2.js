class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add(other) {
    this.x += other.x
    this.y += other.y
  }

  static Add(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y)
  }

  sub(other) {
    this.x -= other.x
    this.y -= other.y
  }

  static Sub(a, b) {
    return new Vec2(a.x - b.x, a.y - b.y)
  }

  clone() {
    return new Vec2(this.x, this.y)
  }

  static Clone(a) {
    return new Vec2(a.x, a.y)
  }

  distance(other) {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2))
  }

  static Distance(a, b) {
    return Math.sqrt(Math.pow(a.x - a.x, 2) + Math.pow(b.y - a.y, 2))
  }

  limitX(limit) {
    if (this.x > limit) {
      this.x = limit
    } else if (this.x < -limit) {
      this.x = -limit
    }
  }

  limitY(limit) {
    if (this.y > limit) {
      this.y = limit
    } else if (this.y < -limit) {
      this.y = -limit
    }
  }

  limit(limit) {
    this.limitX(limit)
    this.limitY(limit)
  }

  static Limit(a, limit) {
    a.limit(limit)
  }

  toArray() {
    return [this.x, this.y]
  }
}

export default Vec2