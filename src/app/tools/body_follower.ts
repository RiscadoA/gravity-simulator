import {Body} from '../body';
import {Vec2} from '../math';
import {View} from '../renderer';
import {World} from '../world';

import {Tool} from './tool';

/**
 * Tool for making the view follow a body.
 */
export class BodyFollower extends Tool {
  /** World to add bodies to. */
  private world: World;

  /** View being used to render. */
  private view: View;

  /** Body being followed. */
  private body: Body|null;

  /** Callback used. */
  private callback: (body: Body) => void;

  /**
   * @param world The world where bodies will be followed.
   * @param view The view that will be moved.
   */
  constructor(world: World, view: View) {
    super();
    this.world = world;
    this.view = view;
    this.body = null;
    this.callback = this.setBody.bind(this);
  }

  public override activate(): void {
    this.body = null;
  }

  public override draw(): void {
    if (this.body) {
      if (this.body.destroyed) this.setBody(null);
      else this.view.position = this.body.position.mul(-1.0);
    }
  }

  public override onMouseDown(position: Vec2): void {
    this.setBody(this.world.pickBody(this.view.screenToWorld(position)));
  }

  public override onMouseUp(_: Vec2): void {
    // Do nothing
  }

  public override onMouseMove(_: Vec2): void {
    // Do nothing
  }

  private setBody(body: Body|null): void {
    if (this.body) this.body.removeOnMerge(this.callback);
    this.body = body;
    if (this.body) this.body.addOnMerge(this.callback);
    this.view.triggerViewChange();
  }
}
