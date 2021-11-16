import {Body} from '../body';
import {Vec2} from '../math';
import {View, Renderer} from '../renderer';
import * as UI from '../ui';
import {World} from '../world';

import {Tool} from './tool';

/** Velocity multiplier for throwing bodies. */
const VELOCITY_MULTIPLIER = 0.001;

/**
 * Tool for adding bodies to the world.
 */
export class BodyAdder extends Tool {
  /** World to add bodies to. */
  private world: World;

  /** View being used to render. */
  private view: View;

  /** Slider which indicates the body's mass. */
  private mass: UI.Slider;

  /** Body being added. */
  private body: Body;

  /** Mouse down position. */
  private mouseDown: Vec2|null;

  /** Has the mouse moved? */
  private mouseMoved: boolean;

  /**
   * @param world The world to add bodies to.
   * @param view The view being used to render.
   * @param mass The slider which indicates the body's mass.
   */
  constructor(world: World, view: View, mass: UI.Slider) {
    super();
    this.world = world;
    this.view = view;
    this.mass = mass;
  }

  public override activate(): void {
    this.body = new Body();
    this.mouseDown = null;
    this.mouseMoved = false;
  }

  public override draw(renderer: Renderer): void {
    if (!this.mouseMoved) return;

    this.body.mass = this.mass.value;
    renderer.drawCircle(this.body.position, this.body.radius, this.body.color);
  }

  public override onMouseDown(position: Vec2): void {
    this.body.position = this.view.screenToWorld(position);
    this.mouseDown = position;
  }

  public override onMouseUp(position: Vec2): void {
    if (this.mouseDown) {
      let delta = position.sub(this.mouseDown);
      delta.y *= -1.0;
      this.body.velocity = delta.mul(VELOCITY_MULTIPLIER * this.view.scale);
      this.world.addBody(this.body);
    }

    this.activate();
  }

  public override onMouseMove(position: Vec2): void {
    if (!this.mouseDown) this.body.position = this.view.screenToWorld(position);
    this.mouseMoved = true;
  }
}
