import {Body} from './body';
import {Vec2} from './math';
import {Renderer} from './renderer';

export const GRAVITY_CONSTANT = 0.000001;

/**
 * Represents a world of bodies.
 */
export class World {
  /** List of bodies in the world. */
  private bodies: Body[];

  // Default constructor.
  constructor() {
    this.bodies = [];
  }

  /**
   * Adds a body to the world.
   * @param body Body to add.
   */
  public addBody(body: Body): void {
    this.bodies.push(body);
  }

  /**
   * Removes a body from the world.
   * @param body The body to remove.
   */
  public removeBody(body: Body): void {
    body.destroyed = true;
    this.bodies.splice(this.bodies.indexOf(body), 1);
  }

  /**
   * Picks a body in the world.
   * @param position The position to pick.
   * @return The body at the position, or null if no body is at the position.
   */
  public pickBody(position: Vec2): Body|null {
    for (let i = 0; i < this.bodies.length; i++) {
      if (this.bodies[i].intersects(position)) return this.bodies[i];
    }
    return null;
  }

  /**
   * Deletes all bodies in the world.
   */
  public clear(): void {
    for (let i = 0; i < this.bodies.length; i++)
      this.bodies[i].destroyed = true;
    this.bodies = [];
  }

  /**
   * Updates the world.
   * @param dt The time step.
   */
  public update(dt: number): void {
    // Move bodies.
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update(dt);
    }

    // Apply gravity to all bodies.
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const body1 = this.bodies[i];
        const body2 = this.bodies[j];

        // Calculate the force of gravity between the two bodies.
        const offset = body1.position.sub(body2.position);
        const sqrDistance = offset.sqrLength();
        const direction = offset.normalize();
        const force = direction.mul(GRAVITY_CONSTANT * body1.mass * body2.mass / sqrDistance);

        // Apply the force to the bodies.
        this.bodies[j].applyForce(force, dt);
        this.bodies[i].applyForce(force.mul(-1.0), dt);
      }
    }

    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        // Check for collision.
        if (this.bodies[i].intersects(this.bodies[j])) {
          // Create a new body from the two bodies.
          this.bodies[i] = this.bodies[i].merge(this.bodies[j]);
          // Remove the second body.
          this.bodies.splice(j, 1);
        }
      }
    }
  }

  /**
   * Draws the world.
   * @param renderer Renderer used.
   */
  public draw(renderer: Renderer): void {
    for (let i = 0; i < this.bodies.length; i++) {
      renderer.drawCircle(this.bodies[i].position, this.bodies[i].radius, this.bodies[i].color, true);
    }
  }
}
