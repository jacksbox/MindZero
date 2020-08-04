class Stats {
  constructor() {
    this.gen = 0
    this.minSteps = 999
    this.champIds = []
  }

  update() {
    document.getElementById('gen').innerHTML = this.gen
    document.getElementById('minSteps').innerHTML = this.minSteps
    document.getElementById('champIds').innerHTML = this.champIds.join('<br/>')
  }
}

const stats = new Stats()

export default stats