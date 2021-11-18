import {Body} from '../body';
import {Vec2} from '../math';
import {View} from '../renderer';
import {Form} from '../ui/form';
import {GRAVITY_CONSTANT, World} from '../world';

import {Preset} from './preset';

/**
 * Generates a binary star system.
 */
export class CustomBinary extends Preset {
  constructor() {
    // Create form
    const form = Form.create('customBinary');
    form.addSlider('starsMass', 0.1, 100000000.0, 1000.0, 'exponential');
    form.addSlider('starsDistance', 0.1, 100.0, 0.15, 'exponential');
    form.addSlider('bodyCount', 1, 2000, 100, 'integer');
    form.addSlider('bodyMass', 0.1, 100000.0, 1.0, 'exponential');
    form.addSlider('bodyMassSpread', 0.0, 1.0, 1.0, 'linear');
    form.addSlider('bodyDistance', 0.1, 25.0, 4.0, 'linear');
    form.addSlider('bodyDistanceSpread', 0.0, 1.0, 0.8, 'linear');
    super('customBinary', form);
  }

  public override generate(world: World, view: View): void {
    view.reset();

    // Get settings from form
    const starsMass = this.form!.getValue('starsMass');
    const starsDistance = this.form!.getValue('starsDistance');
    const bodyCount = this.form!.getValue('bodyCount');
    const bodyMass = this.form!.getValue('bodyMass');
    const bodyMassSpread = this.form!.getValue('bodyMassSpread');
    const bodyDistance = this.form!.getValue('bodyDistance');
    const bodyDistanceSpread = this.form!.getValue('bodyDistanceSpread');

    const bodyMinMass = Math.max(0.01, bodyMass * (1.0 - bodyMassSpread));
    const bodyMaxMass = bodyMass * (1.0 + bodyMassSpread);
    const bodyMinDistance = bodyDistance * (1.0 - bodyDistanceSpread);
    const bodyMaxDistance = bodyDistance * (1.0 + bodyDistanceSpread);

    // Add stars
    const starA = new Body();
    const starB = new Body();
    starA.mass = starsMass;
    starB.mass = starsMass;
    starA.position = new Vec2(-starA.radius - starsDistance, 0.0);
    starB.position = new Vec2(+starB.radius + starsDistance, 0.0);
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
