import {Vec2} from './math';
import {Color} from './renderer/color';

/** The density of bodies. */
const BODY_DENSITY: number = 100.0;

/**
 * Represents a body in the simulation.
 */
export class Body {
  /** Body's mass. */
  private mass: number;
  /** Body's radius. */
  private radius: number;
  /** Body's position. */
  private position: Vec2;
  /** Body's velocity. */
  private velocity: Vec2;
  /** Body's color. */
  private color: Color;

  /**
   * @param mass The body's initial mass.
   * @param position The body's initial position.
   * @param velocity The body's initial velocity.
   * @param color The body's color.
   */
  constructor(mass: number, position: Vec2, velocity: Vec2, color: Color) {
    this.setMass(mass);
    this.position = position;
    this.velocity = velocity;
    this.color = color;
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
   * Gets the body's color.
   * @return The body's color.
   */
  public getColor(): Color {
    return this.color;
  }

  /**
   * Sets the body's mass.
   * @param mass The body's new mass.
   */
  public setMass(mass: number): void {
    this.mass = mass;
    this.radius = (3.0 / 4.0) * Math.PI * (this.mass ** (1.0 / 3.0)) / BODY_DENSITY;
  }

  /**
   * Applies a force to the body.
   * @param force The force to apply to the body.
   * @param dt The time step.
   */
  public applyForce(force: Vec2, dt: number): void {
    this.velocity = this.velocity.add(force.mul(dt / this.mass));
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

  /**
   * Merges this body with another.
   * @param other The other body.
   * @returns The new body.
   */
  public merge(other: Body): Body {
    const mass = this.mass + other.mass;
    const position = this.mass > other.mass ? this.position : other.position;
    const velocity = this.velocity.mul(this.mass).add(other.velocity.mul(other.mass)).div(mass);

    const colorA = this.color.mul(this.mass / mass);
    const colorB = other.color.mul(other.mass / mass);
    const color = colorA.add(colorB);
    return new Body(mass, position, velocity, color);
  }
}
