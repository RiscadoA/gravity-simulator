/**
 * Slider types.
 */
export type SliderType = 'linear'|'exponential';

/**
 * Class used to read slider values from the user.
 */
export class Slider {
  /** The slider's range input element. */
  private input: HTMLInputElement;

  /** The slider's value diplay element. */
  private display: HTMLElement;

  /** The slider's type. */
  private type: SliderType;

  /**
   * @param input Range input element.
   * @param display Value display element.
   * @param type The slider type.
   */
  constructor(input: HTMLInputElement, display: HTMLElement, type: SliderType) {
    this.input = input;
    this.display = display;
    this.type = type;

    this.input.addEventListener('input', this.updateDisplay.bind(this));
  }

  /**
   * @returns The current value of the slider.
   */
  public get value(): number {
    switch (this.type) {
      case 'linear':
        return this.input.valueAsNumber;
      case 'exponential':
        return Math.pow(10.0, this.input.valueAsNumber);
    }
  }

  /**
   * Sets the value of the slider.
   */
  public set value(value: number) {
    switch (this.type) {
      case 'linear':
        this.input.valueAsNumber = value;
        break;
      case 'exponential':
        this.input.valueAsNumber = Math.log10(value);
        break;
    }

    this.updateDisplay();
  }

  /**
   * Updates the display of the slider.
   */
  private updateDisplay(): void {
    if (this.value < 0.01 || this.value > 9999.99)
      this.display.innerText = this.value.toExponential(1);
    else
      this.display.innerText = this.value.toFixed(2);
  }
}
