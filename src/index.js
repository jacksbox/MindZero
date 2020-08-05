import Bounds from './Bounds'
import Swarm from './Swarm'
import Goal from './Goal'
import Obstacle from './Obstacle'

import Vec2 from './Vec2'

import stats from './Stats'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const bounds = new Bounds(800, 800)
canvas.width = bounds.w
canvas.height = bounds.h

const origin = new Vec2(400, 700)

const swarm1 = new Swarm(500, 500, 'purple', origin)
const swarm2 = new Swarm(500, 500, 'black', origin)
const swarm3 = new Swarm(500, 500, 'orange', origin)

const goal = new Goal(400, 80, 6, 'red')

const obstacle = new Obstacle(100, 300, 10, 10)

let gen = 0

stats.update()


const run = () => {
  if (swarm1.allStopped() && swarm2.allStopped() && swarm3.allStopped()) {
    swarm1.evolve()
    swarm2.evolve()
    swarm3.evolve()
    stats.gen++
    stats.update(swarm1, swarm2, swarm3)
  } else {
    bounds.clear(ctx)

    obstacle.draw(ctx)
    goal.draw(ctx)

    swarm1.update(goal, obstacle, bounds)
    swarm2.update(goal, obstacle, bounds)
    swarm3.update(goal, obstacle, bounds)
    swarm1.draw(ctx)
    swarm2.draw(ctx)
    swarm3.draw(ctx)
  }

  window.requestAnimationFrame(run);
}

run()