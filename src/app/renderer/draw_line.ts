import {Vec2} from '../math';
import {Color} from './color';
import {Command} from './command';

/**
 * Represents a command used to draw an line on the screen.
 */
export class DrawLine extends Command {
  /** Start of the line. */
  public start: Vec2;
  /** End of the line. */
  public end: Vec2;
  /** Thickness of the line. */
  public thickness: number;
  /** Color of the line. */
  public color: Color;

  /**
   * @param start Start position of the line.
   * @param end End position of the line.
   * @param thickness Thickness of the line.
   * @param color Color of the line.
   */
  constructor(start: Vec2, end: Vec2, thickness: number, color: Color) {
    super(false);
    this.start = start;
    this.end = end;
    this.thickness = thickness;
    this.color = color;
  }
}
