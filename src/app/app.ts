import {Vec2} from './math';
import {Renderer} from './renderer';
import {World, GRAVITY_CONSTANT} from './world';

/** Multiplier of the time step passed to the update functions. */
const TIME_SCALE = 0.001;

export class App {
  /** Renderer used by the app. */
  private renderer: Renderer;

  /** Physics world. */
  private world: World;

  /**
   * @param canvas HTML element to attach the application to.
   */
  constructor(canvas: HTMLCanvasElement) {
    // Create renderer.
    this.renderer = new Renderer(canvas);

    // Create physics world.
    this.world = new World();

    // Create a few bodies.
    const CENTRAL_MASS = 10000.0;
    this.world.addBody(CENTRAL_MASS, new Vec2(0.0, 0.0), new Vec2(0.0, 0.0));
    for (let i = 0; i < 1000; ++i) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 7.0 + 1.0;
      const pos = new Vec2(Math.cos(angle) * radius, Math.sin(angle) * radius);
      const vel = pos.perpendicular().normalize().mul(Math.sqrt(GRAVITY_CONSTANT * CENTRAL_MASS / radius));
      this.world.addBody(1.0, pos, vel);
    }
  }

  /**
   * Draws the application.
   */
  public draw(): void {
    this.world.draw(this.renderer);
    this.renderer.flush();
  }

  /**
   * Updates the application.
   * @param dt Time step in seconds.
   */
  public update(dt: number): void {
    this.world.update(dt * TIME_SCALE);
  }

  /**
   * Zooms the view in.
   * @param factor The zoom factor.
   */
  public zoom(factor: number): void {
    this.renderer.zoom(factor);
  }

  /**
   * Moves the view.
   * @param delta The delta to move the view by.
   */
  public move(delta: Vec2): void {
    this.renderer.move(delta);
  }
}
