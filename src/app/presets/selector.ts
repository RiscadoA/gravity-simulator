import {Form} from '../ui/form';
import {World} from '../world';

import {Preset} from './preset';

/**
 * Class used to select presets.
 */
export class Selector {
  /** World to affect. */
  private _world: World;

  /** Presets available. */
  private _presets: Preset[];

  /** Preset chosen. */
  private _selected: Preset|null;

  /** Form used to select. */
  private _form: Form;

  /** Is the form open? */
  private _open: boolean;

  /**
   * @param world The world to affect.
   */
  constructor(world: World) {
    this._world = world;
    this._presets = [];
    this._selected = null;
    this._form = Form.create('selector');
    this._open = false;
  }

  /**
   * Adds a preset to the selector.
   * @param preset The preset to add.
   */
  public add(preset: Preset): void {
    this._presets.push(preset);
    this._form.addToggle(preset.id);
  }

  /**
   * Finishes building the selector.
   */
  public finish(initial: string): void {
    this._form.addSwitch('preset', ...this._presets.map(p => p.id));
    this._form.setOnCancel(this.onSelectionCanceled.bind(this));
    this._form.setOnSubmit(this.onSelectionSubmitted.bind(this));
    this._selected = this._presets.find(p => p.id === initial)!;
  }

  /**
   * Shows the selector.
   */
  public show(): void {
    if (!this._open) {
      this._form.show();
      if (this._selected)
        this._form.setState('preset', this._selected.id);
    }
    this._open = true;
  }

  /**
   * Hides the selector.
   */
  public hide(): void {
    if (this._selected && this._selected.form && this._selected.form.open) this._selected.form.hide();
    if (this._form.open) this._form.hide();
    this._open = false;
  }

  /**
   * Checks if the selector is open.
   */
  public get open(): boolean {
    return this._open;
  }

  /**
   * Applies the last selected preset.
   */
  public apply(): void {
    this._world.clear();
    if (this._selected) this._selected.generate(this._world);
  }

  /**
   * Callback called when the selection form is canceled.
   */
  private onSelectionCanceled(): void {
    this._form.hide();
    this._open = false;
  }

  /**
   * Callback called when the selection form is submitted.
   */
  private onSelectionSubmitted(): void {
    const state = this._form.getState('preset');
    this._form.hide();

    this._selected = this._presets.find(p => p.id === state)!;
    if (this._selected.form) {
      this._selected.form.show();
      this._selected.form.setOnCancel(this.onSettingsCanceled.bind(this));
      this._selected.form.setOnSubmit(this.onSettingsSubmitted.bind(this));
    } else {
      this.onSettingsSubmitted();
    }
  }

  /**
   * Callback called when the settings form is canceled.
   */
  private onSettingsCanceled(): void {
    this._selected?.form?.hide();
    this._form.show();
  }

  /**
   * Callback called when the settings form is submitted.
   */
  private onSettingsSubmitted(): void {
    this.apply();
    this._selected?.form?.hide();
    this._open = false;
  }
}
