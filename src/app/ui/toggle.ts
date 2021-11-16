import {Button} from './button';

/**
 * A button that toggles between two states.
 */
export class Toggle extends Button {
  /** The current toggle state. */
  private state: boolean;

  /** The toggle activation callback. */
  private onActivatedCallback: () => void;

  /** The toggle deactivation callback. */
  private onDeactivatedCallback: () => void;

  /**
   * @param element The button element.
   */
  constructor(element: HTMLButtonElement) {
    super(element);
    this.state = false;
    this.onActivatedCallback = () => {};
    this.onDeactivatedCallback = () => {};
    this.setOnClick(this.onClick.bind(this));
  }

  /**
   * Is the toggle activated?
   */
  public get activated(): boolean {
    return this.state;
  }

  /**
   * Set the toggle to activated or deactivated.
   */
  public set activated(state: boolean) {
    this.state = state;
    this.element.classList.toggle('on', state);
  }

  /**
   * Set the toggle activation callback.
   * @param callback The callback to set.
   */
  public setOnActivated(callback: () => void): void {
    this.onActivatedCallback = callback;
  }

  /**
   * Set the toggle activation callback.
   * @param callback The callback to set.
   */
  public setOnDeactivated(callback: () => void): void {
    this.onDeactivatedCallback = callback;
  }


  /**
   * Set the toggle activation callback.
   */
  private onClick(): void {
    this.activated = !this.activated;
    if (this.activated)
      this.onActivatedCallback();
    else
      this.onDeactivatedCallback();
  }
}
