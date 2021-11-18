import {Body} from '../body';
import {Vec2} from '../math';
import {World, GRAVITY_CONSTANT} from '../world';

import {Preset} from './preset';

/**
 * Generates a simple star system with a single star and planets.
 */
export class Planets extends Preset {
  constructor() {
    super('planets');
  }

  public override generate(world: World): void {
    // Add star
    const star = new Body();
    star.mass = 100000.0;
    world.addBody(star);

    for (let i = 0; i < 8; ++i) {
      const angle = Math.random() * Math.PI * 2;
      const distance = (Math.random() * 0.1 + 1.0) * i * i * 0.5 + 2.0;

      // Add body
      const body = new Body();
      body.mass = Math.random() * 10.0 + 1.0 + 10.0 * i;
      body.position = new Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
      body.velocity = body.position.perpendicular().normalize().mul(Math.sqrt(GRAVITY_CONSTANT * star.mass / distance));
      world.addBody(body);
    }
  }
}
