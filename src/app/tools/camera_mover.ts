import {Vec2} from '../math';
import {View} from '../renderer';

import {Tool} from './tool';

/** Camera movement sensibility. */
const SENSIBILITY = 0.001;

/**
 * Tool for moving the camera.
 */
export class CameraMover extends Tool {
  /** View being used to render. */
  private view: View;

  /** Last mouse position. */
  private lastPosition: Vec2|null;

  /**
   * @param view The view being used to render.
   */
  constructor(view: View) {
    super();
    this.view = view;
  }

  public override activate(): void {
    this.lastPosition = null;
  }

  public override draw(): void {
    // Do nothing.
  }

  public override onMouseDown(position: Vec2): void {
    this.lastPosition = position;
  }

  public override onMouseUp(_: Vec2): void {
    this.lastPosition = null;
  }

  public override onMouseMove(position: Vec2): void {
    if (!this.lastPosition) return;

    let delta = position.sub(this.lastPosition);
    delta.y *= -1.0;
    this.lastPosition = position;

    this.view.move(delta.mul(SENSIBILITY));
  }
}
