import Swarm from './Swarm'
import stats from './Stats'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let swarm = new Swarm(500, ctx)

let gen = 0

stats.update()


const run = () => {
  if (swarm.allStopped()) {
    swarm.evolve()
    stats.gen++
    stats.update()
  } else {
    ctx.clearRect(0, 0, 800, 800)


    ctx.beginPath();
    ctx.rect(100, 300, 600, 10, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(400, 80, 6, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    swarm.update()
    swarm.draw()
  }

  window.requestAnimationFrame(run);
}

run()