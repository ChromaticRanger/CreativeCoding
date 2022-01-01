
const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 400, 400 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black'
    const diameter = width * 0.05
    const radius = diameter / 2
    const cx = 0
    const cy = 0

    // Draw circle at origin 0, 0
    context.beginPath()
    context.arc(cx, cy, radius, 0, Math.PI * 2)
    context.fill()

    // Save current Context
    context.save()
    // move origin to center of the canvas
    context.translate(width * 0.5, height * 0.5)
    // Draw a red circle
    context.fillStyle = 'red'
    context.beginPath()
    context.arc(cx, cy, radius, 0, Math.PI * 2)
    context.fill()
    // Restore previous context
    context.restore()

    // Save current Context
    context.save()
    // move down 10 on y-axis
    context.translate(0, 10)
    context.fillStyle = 'green'
    context.beginPath()
    context.arc(cx, cy, radius, 0, Math.PI * 2)
    context.fill()
    context.restore()

  };
};

canvasSketch(sketch, settings);
