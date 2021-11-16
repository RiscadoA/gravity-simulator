import {World} from '../world';

import {Preset} from './preset';

/**
 * Empty preset.
 */
export class Empty extends Preset {
  public override generate(world: World): void {
    // Do nothing.
  }
}
