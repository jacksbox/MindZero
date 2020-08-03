import Swarm from './Swarm'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const swarm = new Swarm(10, ctx)


const run = () => {
  swarm.move()

  ctx.clearRect(0, 0, 800, 800)
  swarm.draw()

  window.requestAnimationFrame(run);
}

run()