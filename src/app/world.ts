import {Body} from './body';
import {Vec2} from './math';
import {Renderer} from './renderer';
import {Color} from './renderer/color';

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
   * @param mass The mass of the body.
   * @param position The initial position of the body.
   * @param velocity The initial velocity of the body.
   */
  public addBody(mass: number, position: Vec2, velocity: Vec2): void {
    this.bodies.push(new Body(mass, position, velocity, Color.random().add(new Color(0.1, 0.1, 0.1))));
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
        const offset = body1.getPosition().sub(body2.getPosition());
        const sqrDistance = offset.sqrLength();
        const direction = offset.normalize();
        const force = direction.mul(GRAVITY_CONSTANT * body1.getMass() * body2.getMass() / sqrDistance);

        // Apply the force to the bodies.
        this.bodies[j].applyForce(force, dt);
        this.bodies[i].applyForce(force.mul(-1.0), dt);
      }
    }

    // Check for collisions between bodies.
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        // Check for collision.
        if (this.bodies[i].collides(this.bodies[j])) {
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
      renderer.drawCircle(this.bodies[i].getPosition(), this.bodies[i].getRadius(), this.bodies[i].getColor());
    }
  }
}
