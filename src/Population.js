class Population {
  constructor(swarms, twoParentMode = false) {
    this.swarms = swarms;
    this.twoParentMode = twoParentMode;
  }

  update(...params) {
    this.swarms.forEach((swarm) => swarm.update(...params));
  }

  draw(...params) {
    this.swarms.forEach((swarm) => swarm.draw(...params));
  }

  allStopped(...params) {
    return this.swarms.every((swarm) => swarm.allStopped(...params));
  }

  evolve() {
    if (!twoParentMode) {
      this.swarms.forEach((swarm) => swarm.evolve());
    } else {
      let newStepLimit = null
      this.swarms.forEach(swarm => {
        swarm.calcFitness();
        swarm.calcFitnessSum();

        const primus = swarm.selectPrimus();
        // evolved dots only can do 1.2 times the amount of steps of this swarms primus
        const swarmStepLimit = Math.min(
          Math.floor(
            (primus.reachedGoal
              ? primus.brain.step + 1
              : primus.brain.stepLimit) * 1.2
          ),
          swarm.initialStepLimit
        );
        newStepLimit = newStepLimit ? Math.min(newStepLimit, swarmStepLimit): swarmStepLimit
      })
      const evolvedSwarms = []
      this.swarms.forEach((swarm, index) => {
        const primus = swarm.selectPrimus();
        // const newStepLimit = 500
        const primusChild = primus.getChild(newStepLimit);

        primusChild.brain.id = primus.brain.id;
        primusChild.primus = true;

        const newSwarm = swarm.clone()
        newSwarm.stepsInBestTry = newStepLimit;

        newSwarm.dots = swarm.dots.map(() => {
          const mother = swarm.selectParent();
          const fatherSwarm = this.swarms[(index + 1) % this.swarms.length]
          const father = fatherSwarm.selectParent();
          const child = this.getChildFromParents(mother, father, newStepLimit);
          return child
        });

        newSwarm.mutate();

        newSwarm.dots[newSwarm.dots.length - 1] = primusChild;

        evolvedSwarms.push(newSwarm)
      });
      this.swarms = evolvedSwarms
    }
  }

  getChildFromParents(mother, father, newStepLimit) {
    const dot = mother.getChild(newStepLimit)

    // console.log(dot, mother, father)
    dot.brain.directions = dot.brain.directions.map((direction, index) => {
      if (Math.random() >= 0.5) {
        return father.brain.directions[index].clone()
      }
      return direction.clone()
    })

    return dot
  }
}

export default Population;
