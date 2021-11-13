import {Vec2} from './math';

/** The density of bodies. */
const BODY_DENSITY: number = 1.0;

/**
 * Represents a body in the simulation.
 *
 * Density = 3/4pi
 * Volume = 4pi/3 r^3
 * Mass = Volume * Density = K1 * r^3
 * r = Mass^(1/3)
 *
 */
export class Body {
  /** Body's position. */
  private position: Vec2;
  /** Body's velocity. */
  private velocity: Vec2;
  /** Body's mass. */
  private mass: number;
  /** Body's radius. */
  private radius: number;

  /**
   * @param position The body's initial position.
   * @param velocity The body's initial velocity.
   * @param mass The body's initial mass.
   */
  constructor(position: Vec2, velocity: Vec2, mass: number) {
    this.position = position;
    this.velocity = velocity;
    this.mass = 0.0;
    this.radius = 0.0;
    this.setMass(mass);
  }

  /**
   * Gets the body's position.
   * @returns The 2D vector which represents the body's position.
   */
  public getPosition(): Vec2 {
    return this.position;
  }

  /**
   * Gets the body's velocity.
   * @returns The body's velocity.
   */
  public getVelocity(): Vec2 {
    return this.velocity;
  }

  /**
   * Gets the body's mass.
   * @returns The body's mass.
   */
  public getMass(): number {
    return this.mass;
  }

  /**
   * Gets the body's radius.
   * @returns The body's radius.
   */
  public getRadius(): number {
    return this.radius;
  }

  /**
   * Sets the body's mass.
   * @param mass The body's new mass.
   */
  public setMass(mass: number): void {
    this.mass = mass;
    this.radius = (3.0 / 4.0) * Math.PI * (this.radius ** (1.0 / 3.0)) / BODY_DENSITY;
  }

  /**
   * Applies a force to the body.
   * @param force The force to apply to the body.
   */
  public applyForce(force: Vec2): void {
    this.velocity = this.velocity.add(force.div(this.mass));
  }

  /**
   * Updates the body's position.
   * @param dt The time step.
   */
  public update(dt: number): void {
    this.position = this.position.add(this.velocity.mul(dt));
  }

  /**
   * Checks if this body is colliding with another.
   * @param other The other body.
   * @returns Whether the bodies are colliding.
   */
  public collides(other: Body): boolean {
    // The square of the distance is used to avoid calculating the square root.
    const sqrDistance = this.position.sub(other.position).sqrLength();
    const sqrRadius = (this.radius + other.radius) ** 2;
    return sqrDistance <= sqrRadius;
  }
}
