import Swarm from './Swarm'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const swarm = new Swarm(1000, ctx)


const run = () => {
  ctx.clearRect(0, 0, 800, 800)

  ctx.beginPath();
  ctx.arc(400, 80, 6, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  swarm.update()
  swarm.draw()

  window.requestAnimationFrame(run);
}

run()