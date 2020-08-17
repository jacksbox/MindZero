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
let obstacle = null

const init = (twoParentMode = false) => {

  swarms = [
    new Swarm({ size: 500, initialStepLimit: 500, color: 'purple', origin }),
    new Swarm({ size: 500, initialStepLimit: 500, color: 'black', origin }),
    new Swarm({ size: 500, initialStepLimit: 500, color: 'orange', origin }),
    new Swarm({ size: 500, initialStepLimit: 500, color: 'gray', origin }),
  ]
  population = new Population(swarms, twoParentMode)

  goal = new Goal(400, 80, 6, 'red')

  obstacle = new Obstacle(100, 300, 500, 10)

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

    obstacle.draw(ctx)
    goal.draw(ctx)

    population.update(goal, obstacle, bounds)
    population.draw(showOnlyPrimus, ctx)
  }

  window.requestAnimationFrame(run);
}

init()
run()