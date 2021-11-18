/**
 * Draw command base class.
 */
export class Command {
  /** Should trails be drawn? */
  public drawTrails: boolean;

  /**
   * @param drawTrails Should trails be drawn?
   */
  constructor(drawTrails: boolean) {
    this.drawTrails = drawTrails;
  }
}
