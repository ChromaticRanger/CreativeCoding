
const canvasSketch = require('canvas-sketch')
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ]
};

// const degToRad = (degrees) => {
//   return degrees / 180 * Math.PI
// }
// 
// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min
// }

const sketch = () => {

  return ({ context, width, height }) => {

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black'

    // Place context origin in center of canvas
    const cx = width * 0.5
    const cy = height * 0.5
    
    // Size of the shapes to draw
    const w = width * 0.01
    const h = height * 0.1
    let x, y

    const num = 12
    const radius = width * 0.3

    for (let i = 0; i < num; i++) {

      const slice = math.degToRad(360 / num) // When num is 12 this makes 30 deg slices
      const angle = slice * i // so angle 0 then 30, then 60, then 90 etc

      x = radius * Math.sin(angle)
      y = radius * Math.cos(angle)

      context.save()
      context.translate(cx, cy)
      context.translate(x, y)

      // Draw a small red circle right here
      context.fillStyle = 'red'
      context.beginPath()
      context.arc(0, 0, 20, 0, Math.PI * 2)
      context.fill()

      // Draw rectangle after adjusting the angle
      context.fillStyle = 'black'
      context.rotate(-angle)
      context.scale(random.range(1, 3), random.range(1, 3))
      context.beginPath()
      context.rect(-w * 0.5, -h * 0.5, w, h)
      context.fill()
      context.restore()
    }

  };

};

canvasSketch(sketch, settings);
