/**
 * Implements a 2D vector, with support for vector math operations.
 */
export class Vec2 {
  /** X component. */
  public x: number;
  /** Y component. */
  public y: number;

  /**
   * @param x X component.
   * @param y Y component.
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Adds this and another 2D vector and returns the result.
   * @param v Other 2D vector.
   * @returns The result 2D vector.
   */
  public add(v: Vec2): Vec2 {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  /**
   * Subtracts another 2D vector from this and returns the result.
   * @param v Other 2D vector.
   * @returns The result 2D vector.
   */
  public sub(v: Vec2): Vec2 {
    return new Vec2(this.x - v.x, this.y - v.y);
  }

  /**
   * Multiplies this 2D vector by a scalar and returns the result.
   * @param s Scalar.
   * @returns The result 2D vector.
   */
  public mul(s: number): Vec2 {
    return new Vec2(this.x * s, this.y * s);
  }

  /**
   * Divides this 2D vector by a scalar and returns the result.
   * @param s Scalar.
   * @returns The result 2D vector.
   */
  public div(s: number): Vec2 {
    return new Vec2(this.x / s, this.y / s);
  }

  /**
   * Calculates the dot product of this and another 2D vector and returns the result.
   * @param v Other 2D vector.
   * @returns The result.
   */
  public dot(v: Vec2): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Calculates the squared length of this 2D vector and returns the result.
   * @returns The result.
   */
  public sqrLength(): number {
    return this.dot(this);
  }

  /**
   * Calculates the length of this 2D vector and returns the result.
   * @returns The result.
   */
  public length(): number {
    return Math.sqrt(this.sqrLength());
  }

  /**
   * Normalizes this 2D vector and returns the result.
   * @returns The result.
   */
  public normalize(): Vec2 {
    return this.div(this.length());
  }
}
