import {Vec2} from '../math';
import {Color} from './color';
import {Command} from './command';

/**
 * Represents a command used to draw a circle.
 */
export class DrawCircle extends Command {
  /** Position of the circle center. */
  public center: Vec2;
  /** Radius of the circle. */
  public radius: number;
  /** Color of the circle. */
  public color: Color;

  /**
   * @param center Position of the circle center.
   * @param radius Radius of the circle.
   * @param color Color of the circle.
   * @param drawTrails Whether to draw trails.
   */
  constructor(center: Vec2, radius: number, color: Color, drawTrails: boolean) {
    super(drawTrails);
    this.center = center;
    this.radius = radius;
    this.color = color;
  }
}
