import {World} from '../world';

import {Preset} from './preset';

/**
 * Generates an empty set.
 */
export class Empty extends Preset {
  constructor() {
    super('empty');
  }

  public override generate(_: World): void {
    // Do nothing
  }
}
