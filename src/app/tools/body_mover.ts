import {Body} from '../body';
import {Vec2} from '../math';
import {Renderer, View} from '../renderer';
import {World} from '../world';

import {Tool} from './tool';

/**
 * Tool for moving bodies in the world.
 */
export class BodyMover extends Tool {
  /** World to add bodies to. */
  private world: World;

  /** View being used to render. */
  private view: View;

  /** Body being moved. */
  private body: Body|null;

  /**
   * @param world The world whoose bodies will be moved.
   * @param view The view being used to render.
   */
  constructor(world: World, view: View) {
    super();
    this.world = world;
    this.view = view;
  }

  public override activate(): void {
    this.body = null;
  }

  public override draw(_: Renderer): void {
    // Do nothing.
  }

  public override onMouseDown(position: Vec2): void {
    this.setBody(this.world.pickBody(this.view.screenToWorld(position)));
    if (this.body) this.body.position = this.view.screenToWorld(position);
  }

  public override onMouseUp(position: Vec2): void {
    if (this.body) {
      this.body.position = this.view.screenToWorld(position);
      this.setBody(null);
    }
  }

  public override onMouseMove(position: Vec2): void {
    if (this.body) this.body.position = this.view.screenToWorld(position);
  }

  private setBody(body: Body|null): void {
    if (this.body) {
      this.body.setOnMerge((_) => {});
      this.body.static = false;
    }

    this.body = body;

    if (this.body) {
      this.body.static = true;
      this.body?.setOnMerge(this.setBody.bind(this));
    }
  }
}
