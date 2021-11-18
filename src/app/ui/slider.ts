/**
 * Slider types.
 */
export type SliderType = 'integer'|'linear'|'exponential';

/**
 * Class used to read slider values from the user.
 */
export class Slider {
  /** The slider's root element. */
  private _root: HTMLDivElement;

  /** The slider's range input element. */
  private _input: HTMLInputElement;

  /** The slider's value diplay element. */
  private _display: HTMLDivElement;

  /** The slider's type. */
  private _type: SliderType;

  /**
   * @param input Range input element.
   * @param display Value display element.
   * @param min The minimum value.
   * @param max The maximum value.
   * @param initial The initial value.
   * @param type The slider type.
   */
  constructor(slider: HTMLDivElement, min: number, max: number, initial: number, type: SliderType) {
    this._root = slider;
    this._input = this._root.querySelector('input') as HTMLInputElement;
    this._display = this._root.querySelector('div') as HTMLDivElement;
    this._type = type;

    switch (this._type) {
      case 'integer':
        this._input.min = min.toString();
        this._input.max = max.toString();
        this._input.value = initial.toString();
        this._input.step = 1.0.toString();
        break;
      case 'linear':
        this._input.min = min.toString();
        this._input.max = max.toString();
        this._input.value = initial.toString();
        this._input.step = 0.1.toString();
        break;
      case 'exponential':
        this._input.min = Math.log10(min).toString();
        this._input.max = Math.log10(max).toString();
        this._input.value = Math.log10(initial).toString();
        this._input.step = 0.1.toString();
        break;
    }

    this._input.addEventListener('input', this.updateDisplay.bind(this));
    this.updateDisplay();
  }

  /**
   * @returns The current value of the slider.
   */
  public get value(): number {
    switch (this._type) {
      case 'integer':
      case 'linear':
        return this._input.valueAsNumber;
      case 'exponential':
        return Math.pow(10.0, this._input.valueAsNumber);
    }
  }

  /**
   * Sets the value of the slider.
   */
  public set value(value: number) {
    switch (this._type) {
      case 'integer':
      case 'linear':
        this._input.valueAsNumber = value;
        break;
      case 'exponential':
        this._input.valueAsNumber = Math.log10(value);
        break;
    }

    this.updateDisplay();
  }

  /**
   * Updates the display of the slider.
   */
  private updateDisplay(): void {
    if (this._type === 'integer') {
      this._display.innerText = this.value.toString();
    } else if (this.value < 0.01 && this.value != 0.0 || this.value > 9999.99)
      this._display.innerText = this.value.toExponential(1);
    else
      this._display.innerText = this.value.toFixed(2);
  }
}
