import {View} from '../renderer';
import {Form} from '../ui/form';
import {World} from '../world';

/**
 * Generic preset for generating worlds.
 */
export abstract class Preset {
  /** Preset identifier. */
  private _id: string;

  /** Form used to set settings. */
  private _form: Form|null;

  /**
   * @param id The preset identifier.
   * @param form The preset form.
   */
  constructor(id: string, form: Form|null = null) {
    this._id = id;
    this._form = form;
  }

  /**
   * Gets the preset's id;
   */
  get id(): string {
    return this._id;
  }

  /**
   * Gets the preset's form.
   */
  get form(): Form|null {
    return this._form;
  }

  /**
   * Initialize the preset.
   * @param world World to generate.
   * @param view View being used.
   */
  public abstract generate(world: World, view: View): void;
}
