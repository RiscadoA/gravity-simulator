import {View} from '../renderer';
import {World} from '../world';

import {Preset} from './preset';

/**
 * Generates an empty set.
 */
export class Empty extends Preset {
  constructor() {
    super('empty');
  }

  public override generate(_1: World, _2: View): void {
    // Do nothing
  }
}
