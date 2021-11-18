import {Vec2} from './math';
import {Color} from './renderer/color';

/** The density of bodies. */
const BODY_DENSITY: number = 200.0;

/**
 * Represents a body in the simulation.
 */
export class Body {
  /** Body's mass. */
  private _mass: number;
  /** Body's radius. */
  private _radius: number;
  /** Body's position. */
  private _position: Vec2;
  /** Body's velocity. */
  private _velocity: Vec2;
  /** Body's color. */
  public color: Color;
  /** Is the body static? */
  public static: boolean;
  /** Merge callback. */
  private onMergeCallback: (body: Body) => void;

  /**
   * @param mass The body's initial mass.
   * @param position The body's initial position.
   * @param velocity The body's initial velocity.
   * @param color The body's color.
   */
  constructor() {
    this.mass = 1.0;
    this.position = new Vec2(0.0, 0.0);
    this.velocity = new Vec2(0.0, 0.0);
    this.color = Color.random().mul(0.8).add(new Color(0.2, 0.2, 0.2));
    this.onMergeCallback = (_) => {};
  }

  /**
   * Gets the body's position.
   */
  public get position(): Vec2 {
    return this._position;
  }

  /**
   * Sets the body's position.
   */
  public set position(position: Vec2) {
    this._position = new Vec2(position.x, position.y);
  }

  /**
   * Gets the body's velocity.
   */
  public get velocity(): Vec2 {
    return this._velocity;
  }

  /**
   * Sets the body's velocity.
   */
  public set velocity(velocity: Vec2) {
    this._velocity = new Vec2(velocity.x, velocity.y);
  }

  /**
   * Gets the body's mass.
   */
  public get mass(): number {
    return this._mass;
  }

  /**
   * Sets the body's mass.
   */
  public set mass(mass: number) {
    this._mass = mass;
    this._radius = (3.0 / 4.0) * Math.PI * (this.mass ** (1.0 / 3.0)) / BODY_DENSITY;
  }

  /**
   * Gets the body's radius.
   */
  public get radius(): number {
    return this._radius;
  }

  /**
   * Applies a force to the body.
   * @param force The force to apply to the body.
   * @param dt The time step.
   */
  public applyForce(force: Vec2, dt: number): void {
    this.applyImpulse(force.mul(dt));
  }

  /**
   * Applies an impulse to the body.
   * @param impulse The impulse to apply to the body.
   */
  public applyImpulse(impulse: Vec2): void {
    this.velocity = this.velocity.add(impulse.mul(1.0 / this.mass));
  }

  /**
   * Updates the body's position.
   * @param dt The time step.
   */
  public update(dt: number): void {
    if (!this.static) this.position = this.position.add(this.velocity.mul(dt));
  }

  /**
   * Checks if this body is intersecting with another.
   * @param other The other body.
   * @returns Whether the bodies are intersecting.
   */
  public intersects(other: Body): boolean;

  /**
   * Checks if the body is intersecting with a point.
   * @param point The point.
   * @returns Whether the body is intersecting with the point.
   */
  public intersects(point: Vec2): boolean;

  // Implementation
  public intersects(other: Body|Vec2): boolean {
    if (other instanceof Body) {
      // The square of the distance is used to avoid calculating the square root.
      const sqrDistance = this.position.sub(other.position).sqrLength();
      const sqrRadius = (this.radius + other.radius) ** 2;
      return sqrDistance <= sqrRadius;
    } else {  // other is a Vec2
      return this.position.sub(other).sqrLength() <= this.radius ** 2;
    }
  }

  /**
   * Sets the merge callback.
   * @param callback The callback.
   */
  public setOnMerge(callback: (body: Body) => void): void {
    this.onMergeCallback = callback;
  }

  /**
   * Merges this body with another.
   * @param other The other body.
   * @returns The new body.
   */
  public merge(other: Body): Body {
    let b = new Body();

    b.mass = this.mass + other.mass;
    b.position = this.position.mul(this.mass).add(other.position.mul(other.mass)).div(b.mass);
    b.velocity = this.velocity.mul(this.mass).add(other.velocity.mul(other.mass)).div(b.mass);

    const colorA = this.color.mul(this.mass / b.mass);
    const colorB = other.color.mul(other.mass / b.mass);
    b.color = colorA.add(colorB);

    other.onMergeCallback(b);
    this.onMergeCallback(b);
    return b;
  }
}
