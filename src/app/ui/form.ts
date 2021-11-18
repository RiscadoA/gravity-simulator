import {Button} from './button';
import {Slider, SliderType} from './slider';
import {Switch} from './switch';
import {Toggle} from './toggle';

/**
 * Represents a form field.
 */
export type FormField = Slider|Toggle|Switch;

/**
 * Represents a form. A form is a collection of form fields.
 */
export class Form {
  /** The form fields. */
  private _fields: Map<string, FormField>;

  /** The form's root element. */
  private _root: HTMLElement;

  /** The form's cancel button. */
  private _cancel: Button;

  /** The form's submit button. */
  private _submit: Button;

  /**
   * @param root The form's root element.
   */
  constructor(root: HTMLElement) {
    this._fields = new Map<string, FormField>();
    this._root = root;
    this._cancel = new Button(this._root.querySelector('#cancel') as HTMLButtonElement);
    this._submit = new Button(this._root.querySelector('#submit') as HTMLButtonElement);
  }

  /**
   * Creates a new form.
   * @param id Form identifier.
   */
  static create(id: string): Form {
    return new Form(document.querySelector(`.form>#${id}`) as HTMLDivElement);
  }

  /**
   * Adds a toggle field to the form.
   * @param id The toggle's id.
   */
  public addToggle(id: string): void {
    const element = this._root.querySelector(`#${id}`);
    if (element && element instanceof HTMLButtonElement) {
      this._fields.set(id, new Toggle(element));
    }
  }

  /**
   * Adds a switch to the form.
   * @param id The switch's id.
   * @param toggles The switch's toggles' ids.
   */
  public addSwitch(id: string, ...toggles: string[]): void {
    const s = new Switch();
    toggles.forEach(i => {
      this.addToggle(i);
      s.add(i, this._fields.get(i) as Toggle);
    });
    this._fields.set(id, s);
  }

  /**
   * Adds a slider field to the form.
   * @param id The slider's id.
   * @param min The slider's minimum value.
   * @param max The slider's maximum value.
   * @param initial The slider's initial value.
   * @param type The slider's type.
   */
  public addSlider(id: string, min: number, max: number, initial: number, type: SliderType): void {
    const element = this._root.querySelector(`#${id}`);
    if (element && element instanceof HTMLDivElement) {
      this._fields.set(id, new Slider(element, min, max, initial, type));
    }
  }

  /**
   * Shows the form.
   */
  public show() {
    this._root.classList.toggle('hidden', false);
  }

  /**
   * Hides the form.
   */
  public hide() {
    this._root.classList.toggle('hidden', true);
  }

  /**
   * Checks if the form is open.
   */
  public get open(): boolean {
    return !this._root.classList.contains('hidden');
  }

  /**
   * Checks if the toggle with the given id is on.
   * @param id The toggle's id.
   * @returns True if the toggle is on, false otherwise.
   */
  public isOn(id: string): boolean {
    return (this._fields.get(id) as Toggle).activated;
  }

  /**
   * Gets the value of the slider with the given id.
   * @param id The slider's id.
   * @returns The slider's value.
   */
  public getValue(id: string): number {
    return (this._fields.get(id) as Slider).value;
  }

  /**
   * Gets the state of the switch with the given id.
   * @param id The switch's id.
   * @returns The switch's state.
   */
  public getState(id: string): string {
    return (this._fields.get(id) as Switch).current;
  }

  /**
   * Sets the state of the switch with the given id.
   * @param id The switch's id.
   * @param state The new state.
   */
  public setState(id: string, state: string): void {
    (this._fields.get(id) as Switch).current = state;
  }

  /**
   * Sets the form cancelled callback.
   * @param callback The callback.
   */
  public setOnCancel(callback: () => void) {
    this._cancel.setOnClick(callback);
  }

  /**
   * Sets the form submitted callback.
   * @param callback The callback.
   */
  public setOnSubmit(callback: () => void) {
    this._submit.setOnClick(callback);
  }
}
