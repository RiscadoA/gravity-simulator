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
  private _scale: number;

  /** Aspect ratio. */
  private aspectRatio: number;

  /** Canvas width. */
  private width: number;

  /** Canvas height. */
  private height: number;

  /** Zoom change callback. */
  private onZoomChangeCallback: () => void;

  // Default constructor
  constructor(width: number, height: number) {
    this.aspectRatio = height / width;
    this.width = width;
    this.height = height;
    this.onZoomChangeCallback = () => {};
    this.reset();
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
   */
  public set scale(scale: number) {
    this._scale = scale;
    this.updateTransform();
    this.onZoomChangeCallback();
  }

  /**
   * Gets the view's scale.
   */
  public get scale(): number {
    return this._scale;
  }

  /**
   * Resets this view.
   */
  public reset(): void {
    this.position = new Vec2(0.0, 0.0);
    this.scale = 0.5;
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
    this.scale /= multiplier;
  }

  /**
   * Converts from screen coordinates to world coordinates.
   * @param screen The screen coordinates.
   * @return The world coordinates.
   */
  public screenToWorld(screen: Vec2): Vec2 {
    let normalized = new Vec2(screen.x / this.width, screen.y / this.height);
    normalized = normalized.sub(new Vec2(0.5, 0.5)).mul(2.0);
    normalized.y *= -1.0;
    return this.transform.inverse().mul(normalized);
  }

  /**
   * Sets the zoom change callback.
   * @param callback The callback.
   */
  public setOnZoomChange(callback: () => void): void {
    this.onZoomChangeCallback = callback;
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
