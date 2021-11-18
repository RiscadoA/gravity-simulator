import {Vec2} from '../math';
import {View} from '../renderer';
import {World} from '../world';

import {Tool} from './tool';

/**
 * Tool for removing bodies to the world.
 */
export class BodyRemover extends Tool {
  /** World to add bodies to. */
  private world: World;

  /** View being used to render. */
  private view: View;

  /**
   * @param world The world to remove bodies from.
   * @param view The view being used to render.
   */
  constructor(world: World, view: View) {
    super();
    this.world = world;
    this.view = view;
  }

  public override activate(): void {
    // Do nothing.
  }

  public override draw(): void {
    // Do nothing.
  }

  public override onMouseDown(_: Vec2): void {
    // Do nothing.
  }

  public override onMouseUp(position: Vec2): void {
    const body = this.world.pickBody(this.view.screenToWorld(position));
    if (body) this.world.removeBody(body);
  }

  public override onMouseMove(_: Vec2): void {
    // Do nothing.
  }
}
