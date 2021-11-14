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

  /**
   * Returns a vector perpendicular to this matrix.
   * @returns The result. 
   */
  public perpendicular(): Vec2 {
    return new Vec2(-this.y, this.x);
  }
}

/**
 * Implements a 3D matrix, with support for matrix math operations.
 */
export class Mat3 {
  /**
   * The matrix elements.
   */
  public elements: Float32Array;

  /**
   * @param elements The matrix elements.
   */
  constructor(elements: number[] = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]) {
    this.elements = new Float32Array(elements);
  }

  /**
   * Multiplies this matrix by another matrix and returns the result.
   * @param other The other matrix.
   * @returns The result matrix.
   */
  public mul(other: Mat3): Mat3;

  /**
   * Multiplies this matrix by a scalar and returns the result.
   * @param scalar The scalar.
   * @returns The result matrix.
   */
  public mul(scalar: number): Mat3;

  /**
   * Multiplies this matrix by a vector and returns the result.
   * @param v The vector.
   * @returns The result vector.
   */
  public mul(other: Vec2): Vec2;

  // Implementation of the above two overloads.
  public mul(other: Mat3|number|Vec2): Mat3|Vec2 {
    if (other instanceof Mat3) {  // Multiply by another matrix.
      const result = new Mat3();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let sum = 0.0;
          for (let k = 0; k < 3; k++) {
            sum += this.elements[i * 3 + k] * other.elements[k * 3 + j];
          }
          result.elements[i * 3 + j] = sum;
        }
      }
      return result;
    } else if (other instanceof Vec2) {  // Multiply by vector
      const result = new Vec2(0.0, 0.0);
      result.x += this.elements[0 * 3 + 0] * other.x;
      result.x += this.elements[0 * 3 + 1] * other.y;
      result.x += this.elements[0 * 3 + 2];
      result.y += this.elements[0 * 3 + 0] * other.x;
      result.y += this.elements[0 * 3 + 1] * other.y;
      result.y += this.elements[0 * 3 + 2];
      return result;
    } else {  // Multiply by scalar
      const result = new Mat3();
      for (let i = 0; i < 9; i++) {
        result.elements[i] = this.elements[i] * other;
      }
      return result;
    }
  }

  /**
   * Transposes this matrix and returns the result.
   * @returns The result matrix.
   */
  public transpose(): Mat3 {
    const result = new Mat3();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        result.elements[i * 3 + j] = this.elements[j * 3 + i];
      }
    }
    return result;
  }

  /**
   * Returns the identity matrix.
   * @returns The identity matrix.
   */
  public static identity(): Mat3 {
    return new Mat3();
  }

  /**
   * Returns the translation matrix.
   * @param v The vector.
   */
  public static translation(v: Vec2): Mat3 {
    return new Mat3([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, v.x, v.y, 1.0]);
  }

  /**
   * Returns the scale matrix.
   * @param v The vector.
   * @returns The scale matrix.
   */
  public static scale(v: Vec2): Mat3 {
    return new Mat3([v.x, 0.0, 0.0, 0.0, v.y, 0.0, 0.0, 0.0, 1.0]);
  }
}
