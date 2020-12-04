import Brain from "./Brain";

import Vec2 from "./Vec2";

class Dot {
  constructor(x, y, stepLimit) {
    this.radius = 4;
    this.start = new Vec2(x, y);
    this.pos = new Vec2(x, y);
    this.vel = new Vec2();
    this.brain = new Brain(stepLimit);

    this.fitness = 0;
    this.primus = false;

    this.isDead = false;
    this.hitObstacle = false;
    this.reachedGoal = false;
    this.hasHitGoal = false;
  }

  draw(color, ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos.x - this.radius,
      this.pos.y - this.radius,
      this.radius,
      0,
      2 * Math.PI
    );
    if (this.primus) {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    ctx.fillStyle = color;

    ctx.fill();
  }

  update(goal, obstacles, bounds) {
    if (!this.isDead && !this.reachedGoal) {
      this.move();

      if (bounds.isOutOfBounds(this.pos)) {
        this.isDead = true;
      } else if (
        obstacles.some((obstacle) => obstacle.checkCollisionWith(this.pos))
      ) {
        this.isDead = true;
        this.hitObstacle = true;
      } else if (goal.checkCollisionWith(this.pos)) {
        this.reachedGoal = true;
      }
    }
  }

  move() {
    if (this.brain.isEmpty()) {
      this.isDead = true;
      return;
    }
    const c = this.brain.next();
    if (!c) {
      console.log(this.brain);
    }
    this.vel.add(c);
    this.vel.limit(4);
    this.pos.add(this.vel);
  }

  calcFitness() {
    this.fitness = 1 / Math.sqrt(this.pos.distance(new Vec2(400, 80)));
    if (this.hitObstacle) {
      this.fitness /= 4;
    } else if (this.reachedGoal) {
      this.fitness =
        this.fitness * 1.5 + +100 / (this.brain.step * this.brain.step);
    }
  }

  clone() {
    // no directions in childs brain
    const dotClone = new Dot(this.start.x, this.start.y, 0);
    // clone without step limit
    dotClone.brain = this.brain.clone();

    return dotClone;
  }

  getChild(newStepLimit) {
    // no directions in childs brain
    const child = new Dot(this.start.x, this.start.y, 0);
    // clone with step limit
    child.brain = this.brain.clone(newStepLimit);
    child.brain.stepLimit = newStepLimit;
    // used for mutation sequences
    child.hasHitGoal = this.reachedGoal;
    return child;
  }

  mutate() {
    this.brain.mutate(this.hasHitGoal);
  }
}

export default Dot;
