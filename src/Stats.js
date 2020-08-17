class Stats {
  constructor() {
    this.gen = 0
  }

  init(population) {
    this.population = population
    this.population.swarms.forEach(swarm => this.createDiv(swarm.color))

    this.update()
  }

  update() {
    this.gen++
    document.getElementById('gen').innerHTML = this.gen
    this.population.swarms.forEach(swarm => {
      document.getElementById(swarm.color).innerHTML = swarm.stepsPrimus ? swarm.stepsPrimus : '-'
    })
  }

  createDiv(color) {
    const div = document.createElement("div")
    div.id = color
    div.style = `color: ${color}; padding: 10px`
    document.getElementById('steps').appendChild(div)
  }
}

const stats = new Stats()

export default stats