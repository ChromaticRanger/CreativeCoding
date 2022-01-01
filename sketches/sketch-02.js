
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

    // Place context origin in center of canvas
    const cx = width * 0.5
    const cy = height * 0.5
    
    // Size of the shapes to draw
    const w = width * 0.01
    const h = height * 0.1
    let x, y

    const num = 40
    const radius = width * 0.3

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
        context.scale(random.range(0.1, 2), random.range(0.2, 0.5))
        context.beginPath()
        context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h)
        context.fill()
      context.restore()

      context.save()
        context.strokeStyle = 'white'
        context.translate(cx, cy)
        context.rotate(-angle)
        context.lineWidth = random.range(5, 20)
        context.beginPath()
        context.arc(0, 0, radius * random.range(0.7, 1.3), 
          slice * random.range(0, -8), 
          slice * random.range(1, 5)
        )
        context.stroke()
      context.restore()
    }

  };

};

canvasSketch(sketch, settings);
