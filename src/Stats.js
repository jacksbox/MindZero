class Stats {
  constructor() {
    this.gen = 0
  }

  update(...swarms) {
    document.getElementById('gen').innerHTML = this.gen
    swarms.forEach(swarm => {
      document.getElementById(swarm.color).innerHTML = swarm.bestSteps
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