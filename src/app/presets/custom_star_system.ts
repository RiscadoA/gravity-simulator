import {Body} from '../body';
import {Vec2} from '../math';
import {Form} from '../ui/form';
import {GRAVITY_CONSTANT, World} from '../world';

import {Preset} from './preset';

/**
 * Generates a custom system with a single star.
 */
export class CustomStarSystem extends Preset {
  constructor() {
    // Create form
    const form = Form.create('customStarSystem');
    form.addSlider('starMass', 0.1, 100000000.0, 1000.0, 'exponential');
    form.addSlider('bodyCount', 1, 1000, 100, 'integer');
    form.addSlider('bodyMinMass', 0.1, 100000.0, 1.0, 'exponential');
    form.addSlider('bodyMaxMass', 0.1, 100000.0, 1.0, 'exponential');
    form.addSlider('bodyMinDistance', 0.1, 25.0, 1.0, 'linear');
    form.addSlider('bodyMaxDistance', 0.1, 25.0, 5.0, 'linear');
    super('customStarSystem', form);
  }

  public override generate(world: World): void {
    // Get settings from form
    const starMass = this.form!.getValue('starMass');
    const bodyCount = this.form!.getValue('bodyCount');
    let bodyMinMass = this.form!.getValue('bodyMinMass');
    let bodyMaxMass = this.form!.getValue('bodyMaxMass');
    let bodyMinDistance = this.form!.getValue('bodyMinDistance');
    let bodyMaxDistance = this.form!.getValue('bodyMaxDistance');
    if (bodyMaxMass < bodyMinMass) [bodyMaxMass, bodyMinMass] = [bodyMinMass, bodyMaxMass];
    if (bodyMaxDistance < bodyMinDistance) [bodyMaxDistance, bodyMinDistance] = [bodyMinDistance, bodyMaxDistance];

    // Add star
    const star = new Body();
    star.mass = starMass;
    world.addBody(star);

    for (let i = 0; i < bodyCount; ++i) {
      // Add body
      const body = new Body();
      body.mass = Math.random() * (bodyMaxMass - bodyMinMass) + bodyMinMass;

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (bodyMaxDistance - bodyMinDistance) + bodyMinDistance + star.radius + body.radius;
      body.position = new Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
      body.velocity = body.position.perpendicular().normalize().mul(Math.sqrt(GRAVITY_CONSTANT * starMass / distance));
      world.addBody(body);
    }
  }
}
