import {World} from '../world';

/**
 * Generic preset for generating worlds.
 */
export abstract class Preset {
  /**
   * Initialize the preset.
   * @param world World to generate.
   */
  public abstract generate(world: World): void;
}
