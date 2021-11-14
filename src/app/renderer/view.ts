import {Mat3, Vec2,} from '../math';

/**
 * A view is a 2D camera that can be used to render a scene.
 */
export class View {
  /** Transform matrix to apply while rendering. */
  private transform: Mat3;

  /** View position. */
  private position: Vec2;

  /** View scale. */
  private scale: number;

  /** Aspect ratio. */
  private aspectRatio: number;

  // Default constructor
  constructor(width: number, height: number) {
    this.position = new Vec2(0.0, 0.0);
    this.scale = 1.0;
    this.aspectRatio = height / width;
    this.updateTransform();
  }

  /**
   * Gets the transform matrix.
   * @returns The transform matrix.
   */
  public getTransform(): Mat3 {
    return this.transform;
  }

  /**
   * Sets the view's position.
   * @param position The new position.
   */
  public setPosition(position: Vec2): void {
    this.position = position;
    this.updateTransform();
  }

  /**
   * Sets the view's scale.
   * @param scale The new scale.
   */
  public setScale(scale: number): void {
    this.scale = scale;
    this.updateTransform();
  }

  /**
   * Moves the view by a given amount.
   * @param delta The amount to move.
   */
  public move(delta: Vec2): void {
    this.setPosition(this.position.add(delta.div(this.scale)));
  }

  /**
   * Zooms the view in.
   * @param factor The zoom factor.
   */
  public zoom(multiplier: number): void {
    this.setScale(this.scale / multiplier);
  }

  /**
   * Updates the transform matrix.
   */
  private updateTransform(): void {
    const translation = Mat3.translation(new Vec2(this.position.x, this.position.y));
    const scale = Mat3.scale(new Vec2(this.scale * this.aspectRatio, this.scale));
    this.transform = translation.mul(scale);
  }
}
