import Bounds from './Bounds'
import Population from './Population'
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

let population = null
let swarms = null
let goal = null
let obstacles = null

const randFloor = max => Math.floor(Math.random() * max)
const getObstacle = () => {
  const x = randFloor(bounds.w)
  const y = randFloor(bounds.h)
  const dir = Math.random() >= 0.5
  const w = dir ? 10 : randFloor(bounds.w - x)
  const h = dir ? randFloor(bounds.h - y) : 10
  let o = new Obstacle(x, y, w, h)
  if(o.checkCollisionWith(goal), o.checkCollisionWith(origin)) {
    o = getObstacle()
  }
  return o
}

const getObstacles = () => {
  if(window.location.hash) {
    const hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    const obstacleCodes = hash.split(':')
    const obstacles = obstacleCodes.map(code => {
      const params = code.split(',').map(p => parseInt(p))
      return new Obstacle(...params)
    })
    return obstacles
  } else {
    const obstacles = Array(Math.ceil(Math.random() * 20)).fill(null).map(() => getObstacle())
    window.location.hash = obstacles.map(obstacle =>
      `${obstacle.pos.x},${obstacle.pos.y},${obstacle.w},${obstacle.h}`).join(':')
    return obstacles
  }
}

goal = new Goal(400, 80, 6, 'red')


// asymetric
// obstacles = [
//   new Obstacle(100, 300, 500, 10),
//   new Obstacle(500, 500, 200, 10),
// ]
// symetric
// obstacles = [
//   new Obstacle(100, 300, 600, 10)
// ]
// random
obstacles = getObstacles()

const init = (twoParentMode = false) => {

  swarms = [
    new Swarm({ size: 500, initialStepLimit: 500, color: 'purple', origin }),
    new Swarm({ size: 500, initialStepLimit: 500, color: 'black', origin }),
    new Swarm({ size: 500, initialStepLimit: 500, color: 'orange', origin }),
    new Swarm({ size: 500, initialStepLimit: 500, color: 'gray', origin }),
  ]
  population = new Population(swarms, twoParentMode)

  stats.init(population)
}


const togglePrimusBtn = document.getElementById('onlyPrimus')
let showOnlyPrimus = false
togglePrimusBtn.addEventListener('change', e => {
  showOnlyPrimus = e.target.checked
})

const toggleTwoParentMode = document.getElementById('twoParentMode')
let twoParentMode = false
toggleTwoParentMode.addEventListener('change', e => {
  twoParentMode = e.target.checked
  init(twoParentMode)
})


const run = () => {
  if (population.allStopped()) {
    population.evolve()
    stats.update()
  } else {
    bounds.clear(ctx)

    obstacles.forEach(obstacle => obstacle.draw(ctx))
    goal.draw(ctx)

    population.update(goal, obstacles, bounds)
    population.draw(showOnlyPrimus, ctx)
  }

  window.requestAnimationFrame(run);
}

init()
run()