/**
 * Class used to handle button events.
 */
export class Button {
  /** The button element. */
  protected readonly element: HTMLButtonElement;

  /** The button click callback. */
  private onClickCallback: () => void;

  /**
   * @param element The button element.
   */
  constructor(element: HTMLButtonElement) {
    this.element = element;
    this.onClickCallback = () => {};
    this.element.addEventListener('click', (_) => this.onClickCallback());
  }

  /**
   * Sets the button click callback.
   */
  public setOnClick(callback: () => void): void {
    this.onClickCallback = callback;
  }
}
