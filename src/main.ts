import {App} from './app/app';
import {Vec2} from './app/math';

// Initialize canvas
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize app
const app = new App(canvas);

// Add drag event
let dragging = false;
let lastMousePos = new Vec2(0.0, 0.0);

canvas.addEventListener('mousedown', event => {
  if (event.button == 1) { 
    dragging = true;
    lastMousePos = new Vec2(event.offsetX, event.offsetY);
  }
  event.preventDefault();
}, false);

canvas.addEventListener('mousemove', event => {
  if (dragging) {
    const mousePos = new Vec2(event.offsetX, event.offsetY);
    let delta = mousePos.sub(lastMousePos);
    delta.y = -delta.y;

    lastMousePos = mousePos;
    app.move(delta.mul(0.001));
  }
  event.preventDefault();
}, false);

canvas.addEventListener('mouseup', event => {
  if (event.button == 1) dragging = false;
  event.preventDefault();
}, false);

// Add zoom event
canvas.addEventListener('wheel', event => {
  if (event.deltaY > 0)
    app.zoom(1.1);
  else
    app.zoom(0.9);
  event.preventDefault();
}, false);

// Main application loop
let lastTime = 0.0;
function step(currentTime: number) {
  const dt = currentTime - lastTime;
  lastTime = currentTime;

  app.update(dt);
  app.draw();

  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step);
