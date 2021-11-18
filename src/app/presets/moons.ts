import {Body} from '../body';
import {Vec2} from '../math';
import {World, GRAVITY_CONSTANT} from '../world';

import {Preset} from './preset';

/**
 * Generates a star system with planets and moons.
 */
export class Moons extends Preset {
  constructor() {
    super('moons');
  }

  public override generate(world: World): void {
    // Add star
    const star = new Body();
    star.mass = 10000.0;
    world.addBody(star);

    for (let i = 0; i < 100; ++i) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 3.0 + 1.0;

      // Add body
      const body = new Body();
      body.mass = Math.random() * 9.0 + 1.0;
      body.position = new Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
      body.velocity = body.position.perpendicular().normalize().mul(Math.sqrt(GRAVITY_CONSTANT * star.mass / distance));
      world.addBody(body);
    }
  }
}
