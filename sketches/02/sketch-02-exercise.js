
const canvasSketch  = require('canvas-sketch')
const math          = require('canvas-sketch-util/math')
const random        = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {

  return ({ context, width, height }) => {

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black'

    // Place context origin in top left of canvas    
    const cx = 0
    const cy = 0
    
    // Size of the shapes to draw
    const w = width * 0.01
    const h = height * 0.2
    let x, y

    const num = 60
    const radius = height * 0.6
    const colors = ['YellowGreen','Tomato','Thistle', 'Teal', "Purple"]

    for (let i = 0; i < num; i++) {

      const slice = math.degToRad(360 / num) // When num is 12 this makes 30 deg slices
      const angle = slice * i // so angle 0 then 30, then 60, then 90 etc

      x = radius * Math.sin(angle)
      y = radius * Math.cos(angle)

      context.save()
        context.fillStyle = 'white'
        context.translate(cx, cy)
        context.translate(x, y)
        context.rotate(-angle)
        context.scale(random.range(0.1, 7), random.range(0.2, 0.5))
        context.beginPath()
        context.rect(-w * 0.3, random.range(0, -h * 0.5), w, h)
        context.fill()
      context.restore()

      context.save()
        let colorNum = Math.floor(Math.random() * colors.length)
        context.strokeStyle = colors[colorNum]
        context.translate(cx, cy)
        context.rotate(-angle)
        context.lineWidth = random.range(4, 40)
        context.beginPath()
        context.arc(0, 0, radius * random.range(0.3, 1.2), 
          slice * random.range(0, -8), 
          slice * random.range(1, 8)
        )
        context.stroke()
      context.restore()
    }

  };

};

canvasSketch(sketch, settings);
