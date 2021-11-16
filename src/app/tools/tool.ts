import {Vec2} from '../math';
import {Renderer} from '../renderer';

/**
 * Generic tool class.
 */
export abstract class Tool {
  /**
   * Called when the tool is activated.
   */
  public abstract activate(): void;

  /**
   * Called every frame to draw tool related stuff.
   * @param renderer The renderer to draw to.
   */
  public abstract draw(renderer: Renderer): void;

  /**
   * Called when the mouse button is pressed.
   * @param position Mouse position.
   */
  public abstract onMouseDown(position: Vec2): void;

  /**
   * Called when the mouse button is released.
   * @param position Mouse position.
   */
  public abstract onMouseUp(position: Vec2): void;

  /**
   * Called when the mouse is moved.
   * @param position Mouse position.
   */
  public abstract onMouseMove(position: Vec2): void;
}
