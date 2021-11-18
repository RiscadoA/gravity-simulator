import {Body} from '../body';
import {Vec2} from '../math';
import {GRAVITY_CONSTANT, World} from '../world';

import {Preset} from './preset';

/**
 * Generates a binary star system.
 */
export class Binary extends Preset {
  constructor() {
    super('binary');
  }

  public override generate(world: World): void {
    // Get settings from form
    const starsMass = 1000.0;
    const starsDistance = 0.15;
    const bodyCount = 100;
    const bodyMass = 1.0;
    const bodyMassSpread = 1.0;
    const bodyDistance = 4.0;
    const bodyDistanceSpread = 0.8;

    const bodyMinMass = Math.max(0.01, bodyMass * (1.0 - bodyMassSpread));
    const bodyMaxMass = bodyMass * (1.0 + bodyMassSpread);
    const bodyMinDistance = bodyDistance * (1.0 - bodyDistanceSpread);
    const bodyMaxDistance = bodyDistance * (1.0 + bodyDistanceSpread);

    // Add stars
    const starA = new Body();
    const starB = new Body();
    starA.mass = starsMass;
    starB.mass = starsMass;
    starA.position.x = -starA.radius - starsDistance;
    starB.position.x = +starB.radius + starsDistance;
    const reducedMass = starsMass / 2.0;
    starA.velocity = starA.position.perpendicular().normalize().mul(
        Math.sqrt(GRAVITY_CONSTANT * reducedMass / (starA.position.length() * 2)));
    starB.velocity = starB.position.perpendicular().normalize().mul(
        Math.sqrt(GRAVITY_CONSTANT * reducedMass / (starB.position.length() * 2)));
    world.addBody(starA);
    world.addBody(starB);

    for (let i = 0; i < bodyCount; ++i) {
      // Add body
      const body = new Body();
      body.mass = Math.random() * (bodyMaxMass - bodyMinMass) + bodyMinMass;

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (bodyMaxDistance - bodyMinDistance) + bodyMinDistance + starA.radius +
          starB.radius + starsDistance + body.radius;
      body.position = new Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
      body.velocity =
          body.position.perpendicular().normalize().mul(Math.sqrt(GRAVITY_CONSTANT * starsMass * 2.0 / distance));
      world.addBody(body);
    }
  }
}
