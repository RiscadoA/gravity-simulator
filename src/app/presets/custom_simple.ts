import {Body} from '../body';
import {Vec2} from '../math';
import {View} from '../renderer';
import {Form} from '../ui/form';
import {GRAVITY_CONSTANT, World} from '../world';

import {Preset} from './preset';

/**
 * Generates a custom system with a single star.
 */
export class CustomSimple extends Preset {
  constructor() {
    // Create form
    const form = Form.create('customSimple');
    form.addSlider('starMass', 0.1, 100000000.0, 1000.0, 'exponential');
    form.addSlider('bodyCount', 1, 2000, 100, 'integer');
    form.addSlider('bodyMass', 0.1, 100000.0, 1.0, 'exponential');
    form.addSlider('bodyMassSpread', 0.0, 1.0, 0.5, 'linear');
    form.addSlider('bodyDistance', 0.1, 25.0, 1.0, 'linear');
    form.addSlider('bodyDistanceSpread', 0.0, 1.0, 0.5, 'linear');
    super('customSimple', form);
  }

  public override generate(world: World, view: View): void {
    view.reset();

    // Get settings from form
    const starMass = this.form!.getValue('starMass');
    const bodyCount = this.form!.getValue('bodyCount');
    const bodyMass = this.form!.getValue('bodyMass');
    const bodyMassSpread = this.form!.getValue('bodyMassSpread');
    const bodyDistance = this.form!.getValue('bodyDistance');
    const bodyDistanceSpread = this.form!.getValue('bodyDistanceSpread');

    const bodyMinMass = Math.max(0.01, bodyMass * (1.0 - bodyMassSpread));
    const bodyMaxMass = bodyMass * (1.0 + bodyMassSpread);
    const bodyMinDistance = bodyDistance * (1.0 - bodyDistanceSpread);
    const bodyMaxDistance = bodyDistance * (1.0 + bodyDistanceSpread);

    // Add star
    const star = new Body();
    star.mass = starMass;
    world.addBody(star);

    for (let i = 0; i < bodyCount; ++i) {
      // Add body
      const body = new Body();
      body.mass = Math.random() * (bodyMaxMass - bodyMinMass) + bodyMinMass;

      const angle = Math.random() * Math.PI * 2;
      const distance =
          Math.random() * (bodyMaxDistance - bodyMinDistance) + bodyMinDistance + star.radius + body.radius;
      body.position = new Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
      body.velocity = body.position.perpendicular().normalize().mul(Math.sqrt(GRAVITY_CONSTANT * starMass / distance));
      world.addBody(body);
    }
  }
}
