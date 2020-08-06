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

const swarms = [
  new Swarm(500, 500, 'purple', origin),
  new Swarm(500, 500, 'black', origin),
  new Swarm(500, 500, 'orange', origin),
  new Swarm(500, 500, 'gray', origin),
]

const goal = new Goal(400, 80, 6, 'red')

const obstacle = new Obstacle(100, 300, 500, 10)

stats.init(swarms)


const togglePrimusBtn = document.getElementById('onlyPrimus')

let showOnlyPrimus = false
togglePrimusBtn.addEventListener('change', e => {
  showOnlyPrimus = e.target.checked
})


const run = () => {
  if (swarms.every(swarm => swarm.allStopped())) {
    swarms.forEach(swarm => swarm.evolve())
    stats.update()
  } else {
    bounds.clear(ctx)

    obstacle.draw(ctx)
    goal.draw(ctx)

    swarms.forEach(swarm => {
      swarm.update(goal, obstacle, bounds)
      swarm.draw(showOnlyPrimus, ctx)
    })
  }

  window.requestAnimationFrame(run);
}

run()