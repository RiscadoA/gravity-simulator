import {Vec2} from '../math';
import {Color} from './color';

/**
 * Represents a command used to draw a circle.
 */
export class DrawCircle {
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
   */
  constructor(center: Vec2, radius: number, color: Color) {
    this.center = center;
    this.radius = radius;
    this.color = color;
  }
}
