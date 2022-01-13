
const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {

  const agents = []
  
  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width)
    const y = random.range(0, height)
    agents.push(new Agent(x, y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i]
      
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j]

        let dist = agent.pos.getDistance(other.pos)

        if (dist > 200) continue

        context.beginPath()
        context.moveTo(agent.pos.x, agent.pos.y)
        context.lineTo(other.pos.x, other.pos.y)
        context.stroke()

      }
    }

    agents.forEach(agent => {
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
