class Stats {
  constructor(swarms) {
    this.gen = 0
  }

  init(swarms) {
    this.swarms = swarms
    this.swarms.forEach(swarm => this.createDiv(swarm.color))

    this.update()
  }

  update() {
    this.gen++
    document.getElementById('gen').innerHTML = this.gen
    this.swarms.forEach(swarm => {
      document.getElementById(swarm.color).innerHTML = swarm.stepsInBestTry ? swarm.stepsInBestTry : '-'
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