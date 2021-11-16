import {Toggle} from './toggle';

/**
 * A switch made of many toggles, where only one can be active at a time.
 */
export class Switch {
  /** Current switch state. */
  private state: string;

  /** The toggles in the switch. */
  private toggles: [string, Toggle][];

  /** Callback called when the state changes. */
  private stateChangeCallback: (state: string) => void;

  // Default constructor.
  constructor() {
    this.state = '';
    this.toggles = [];
    this.stateChangeCallback = (_) => {};
  }

  /**
   * The current state of the switch.
   */
  public get current(): string {
    return this.state;
  }

  /**
   * Sets the current state of the switch.
   */
  public set current(name: string) {
    if (this.state === name) return;
    this.toggles.forEach(toggle => toggle[1].activated = toggle[0] === name);
    this.state = name;
    this.stateChangeCallback(name);
  }

  /**
   * Adds a toggle to the switch.
   * @param name The name of the toggle.
   * @param toggle The toggle to add.
   */
  public add(name: string, toggle: Toggle): void {
    this.toggles.push([name, toggle]);
    toggle.setOnActivated(() => this.onToggleActivated(name));
    toggle.setOnDeactivated(() => this.onToggleDeactivated(name));
  }

  /**
   * Sets the callback called when the state changes.
   * @param callback The callback to set.
   */
  public setOnStateChange(callback: (state: string) => void): void {
    this.stateChangeCallback = callback;
  }

  /**
   * Callback for when a toggle is activated.
   * @param name The name of the toggle that was activated.
   */
  private onToggleActivated(name: string): void {
    this.current = name;
  }

  /**
   * Callback for when a toggle is deactivated.
   * @param name The name of the toggle that was deactivated.
   */
  private onToggleDeactivated(name: string): void {
    if (this.state === name) this.current = '';
  }
}
