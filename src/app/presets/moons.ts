import {Body} from '../body';
import {Vec2} from '../math';
import {View} from '../renderer';
import {GRAVITY_CONSTANT, World} from '../world';

import {Preset} from './preset';

/**
 * Generates a star system with planets and moons.
 */
export class Moons extends Preset {
  constructor() {
    super('moons');
  }

  public override generate(world: World, view: View): void {
    view.reset();
    view.scale = 0.015;

    // Add star
    const star = new Body();
    star.mass = 100000.0;
    world.addBody(star);

    for (let i = 0; i < 3; i++) {
      const planet = new Body();
      planet.mass = 1000.0 + 1000.0 * i;
      planet.position = new Vec2(-20.0 - 10.0 * i * i * (1.0 + Math.random()), 0.0);
      planet.velocity = planet.position.perpendicular().normalize().mul(
          Math.sqrt(GRAVITY_CONSTANT * star.mass / planet.position.length()));
      world.addBody(planet);

      const moonCount = Math.floor(Math.random() * 3) + 1 + 3 * i;

      for (let j = 0; j < moonCount; j++) {
        const moon = new Body();
        moon.mass = Math.random() * 2.0 + 1.0;

        const angle = Math.random() * Math.PI * 2;
        const distance = (Math.random() * 0.1 + 1.0) * j * j * 0.1 + 0.1 + planet.radius + moon.radius;

        moon.position = planet.position.add(new Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance));
        moon.velocity = planet.velocity.add(moon.position.sub(planet.position)
                                                .perpendicular()
                                                .normalize()
                                                .mul(Math.sqrt(GRAVITY_CONSTANT * planet.mass / distance)));
        world.addBody(moon);
      }
    }
  }
}
