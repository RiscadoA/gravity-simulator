import {Mat3, Vec2,} from '../math';

/**
 * A view is a 2D camera that can be used to render a scene.
 */
export class View {
  /** Transform matrix to apply while rendering. */
  private _transform: Mat3;

  /** View position. */
  private _position: Vec2;

  /** View scale. */
  private _scale: number;

  /** Aspect ratio. */
  private aspectRatio: number;

  /** Canvas width. */
  private width: number;

  /** Canvas height. */
  private height: number;

  /** View change callback. */
  private onViewChangeCallback: () => void;

  /** Zoom change callback. */
  private onZoomChangeCallback: () => void;

  // Default constructor
  constructor(width: number, height: number) {
    this.aspectRatio = height / width;
    this.width = width;
    this.height = height;
    this.onViewChangeCallback = () => {};
    this.onZoomChangeCallback = () => {};
    this.reset();
  }

  /**
   * Gets the transform matrix.
   */
  public get transform(): Mat3 {
    return this._transform;
  }

  /**
   * Sets the view's position.
   */
  public set position(position: Vec2) {
    this._position = position;
    this.updateTransform();
  }

  /**
   * Gets the view's position.
   */
  public get position(): Vec2 {
    return this._position.clone();
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
    this.scale = 1.0;
    this.triggerViewChange();
  }

  /**
   * Moves the view by a given amount.
   * @param delta The amount to move.
   */
  public move(delta: Vec2): void {
    this.position = this.position.add(delta.div(this.scale));
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
   * Triggers the view change callback.
   */
  public triggerViewChange(): void {
    this.onViewChangeCallback();
  }

  /**
   * Sets the view change callback.
   * @param callback The callback.
   */
  public setOnViewChange(callback: () => void): void {
    this.onViewChangeCallback = callback;
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
    this._transform = translation.mul(scale);
  }
}
