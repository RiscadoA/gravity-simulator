/**
 * Describes a color.
 */
export class Color {
  /** The red component of the color. */
  public r: number;
  /** The green component of the color. */
  public g: number;
  /** The blue component of the color. */
  public b: number;
  /** The alpha component of the color. */
  public a: number;

  /**
   * @param r The red component of the color.
   * @param g The green component of the color.
   * @param b The blue component of the color.
   * @param a The alpha component of the color.
   */
  constructor(r: number, g: number, b: number, a: number = 1.0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * Adds the given color to this color, returning a new color.
   * @param other The color to add.
   * @returns The new color.
   */
  public add(other: Color): Color {
    const r = Math.min(1.0, this.r + other.r);
    const g = Math.min(1.0, this.g + other.g);
    const b = Math.min(1.0, this.b + other.b);
    const a = Math.min(1.0, this.a + other.a);
    return new Color(r, g, b, a);
  }

  /**
   * Mixes this color with the given color, returning a new color.
   * @param other The color to mix with.
   * @returns The new color.
   */
  public mix(other: Color): Color {
    const r = (this.r + other.r) / 2.0;
    const g = (this.g + other.g) / 2.0;
    const b = (this.b + other.b) / 2.0;
    const a = (this.a + other.a) / 2.0;
    return new Color(r, g, b, a);
  }

  /**
   * Multiplies this color by a scalar, returning a new color.
   * @param multiplier The scalar to multiply by.
   * @returns The new color.
   */
  public mul(multiplier: number): Color {
    const r = Math.min(1.0, this.r * multiplier);
    const g = Math.min(1.0, this.g * multiplier);
    const b = Math.min(1.0, this.b * multiplier);
    return new Color(r, g, b, this.a);
  }

  /**
   * Divides this color by a scalar, returning a new color.
   * @param divider The scalar to divide by.
   * @returns The new color.
   */
   public div(divider: number): Color {
    return this.mul(1.0 / divider);
  }

  /**
   * Generates a random color.
   * @returns A random color.
   */
  public static random(): Color {
    return new Color(Math.random(), Math.random(), Math.random());
  }
}
