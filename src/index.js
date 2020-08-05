import Swarm from './Swarm'
import Goal from './Goal'
import stats from './Stats'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let swarm1 = new Swarm(500, ctx, 'purple')
let swarm2 = new Swarm(500, ctx, 'black')
let swarm3 = new Swarm(500, ctx, 'orange')

const goal = new Goal(400, 80, 6, 'red')

let gen = 0

stats.update()


const run = () => {
  if (swarm1.allStopped() & swarm2.allStopped()) {
    swarm1.evolve()
    swarm2.evolve()
    swarm3.evolve()
    stats.gen++
    stats.update(swarm1, swarm2, swarm3)
  } else {
    ctx.clearRect(0, 0, 800, 800)


    ctx.beginPath();
    ctx.rect(100, 300, 600, 10, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    goal.draw(ctx)

    swarm1.update()
    swarm2.update()
    swarm3.update()
    swarm1.draw()
    swarm2.draw()
    swarm3.draw()
  }

  window.requestAnimationFrame(run);
}

run()