
const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {

  const agents = []
  const infected_agents = []

  // Create some Infected Agents
  for (let x = 0; x < 1; x++) {
    const a_x = random.range(0, width)
    const a_y = random.range(0, height)
    infected_agents.push(new InfectedAgent(a_x, a_y))
  }
  
  // Create a bunch of normal Agents
  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width)
    const y = random.range(0, height)
    agents.push(new Agent(x, y))
  }

  let all_agents = [...agents, ...infected_agents]

  return ({ context, width, height }) => {

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < all_agents.length; i++) {
      
      const agent = all_agents[i]

      // Only do something if this is an infected agent
      if (agent instanceof InfectedAgent) {

        let infection = agent

        // Look through normal agents for any that are close by
        for (let j = 0; j < agents.length; j++) {

          const agent = agents[j]

          let dist = infection.pos.getDistance(agent.pos)

          // if infectiona and agent are more than 200px apart do nothing
          if (dist > 200) continue

          // draw a line between the infection and the agent
          context.beginPath()
          context.moveTo(infection.pos.x, infection.pos.y)
          context.lineTo(agent.pos.x, agent.pos.y)
          context.stroke()

          // if an agent strays inside the infection corona, infect the agent
          if (dist < infection.corona) {
            // remove agent from agents array
            agents.splice(j, 1)
            console.log(agents.length)
            console.log(agents)
          }

        }

      }

      all_agents = [...agents, ...infected_agents]

    }

    all_agents.forEach(agent => {
      agent.update()
      agent.draw(context)
      agent.bounce(width, height)
    })

  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getDistance(v) {
    let dx = this.x - v.x
    let dy = this.y - v.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

class Agent {

  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(-3, 3), random.range(-3, 3))
    this.radius = random.range(4, 12)
  }

  bounce(width, height) {
    if( this.pos.x <= 0 + this.radius || this.pos.x + this.radius >= width ) {
      this.vel.x *= -1
    }

    if(this.pos.y <= 0 + this.radius || this.pos.y + this.radius >= height ) {
      this.vel.y *= -1
    }
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  draw(context) {

    context.fillStyle = 'white';
    
    context.save()
    context.translate(this.pos.x, this.pos.y)
    context.lineWidth = 4

    context.beginPath()
    context.arc(0, 0, this.radius, 0, Math.PI * 2)
    context.fill()
    context.stroke()

    context.restore()
  }

}

class InfectedAgent extends Agent {

  constructor(x, y) {
    super()
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(-3, 3), random.range(-3, 3))
    this.radius = 20
    this.corona = this.radius * 2.5
  }

  draw(context) {

    context.strokeStyle = 'black'

    context.save()
    context.translate(this.pos.x, this.pos.y)
    context.lineWidth = 4

    // draw corona
    context.beginPath()
    context.fillStyle = 'rgba(255, 221, 226, 0.6)'
    context.arc(0, 0, this.corona, 0, Math.PI * 2)
    context.fill()

    // draw nucleus
    context.beginPath()
    context.fillStyle = 'red'
    context.arc(0, 0, this.radius, 0, Math.PI * 2)
    context.fill()
    // context.stroke()
    // context.closePath()

    context.restore()
    
  }

}
