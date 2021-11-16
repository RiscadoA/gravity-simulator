import {Vec2} from './math';
import * as Presets from './presets';
import {Renderer} from './renderer';
import * as Tools from './tools';
import * as UI from './ui';
import {World} from './world';

/** Multiplier of the time step passed to the update functions. */
const TIME_SCALE = 0.00001;

/**
 * Application class.
 */
export class App {
  /** Renderer used by the app. */
  private renderer: Renderer;

  /** Physics world. */
  private world: World;

  /** Tools map. */
  private tools: Map<string, Tools.Tool>;

  /** Current tool. */
  private tool: Tools.Tool|undefined;

  /** Presets map. */
  private presets: Map<string, Presets.Preset>;

  /** Current preset. */
  private preset: Presets.Preset|undefined;

  /** Reset button. */
  private resetButton: UI.Button;

  /** Settings button. */
  private settingsButton: UI.Button;

  /** Add body toggle. */
  private addBodyToggle: UI.Toggle;

  /** Remove body toggle. */
  private removeBodyToggle: UI.Toggle;

  /** Move camera toggle. */
  private moveCameraToggle: UI.Toggle;

  /** Tools switch. */
  private toolSwitch: UI.Switch;

  /** Simulation speed slider. */
  private speed: UI.Slider;

  /** New body mass slider. */
  private mass: UI.Slider;

  /** Last mouse position. */
  private mousePos: Vec2;

  // Default constructor.
  constructor() {
    // Initialize canvas
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create renderer.
    this.renderer = new Renderer(canvas);
    this.renderer.view.setOnZoomChange(this.onMouseMove.bind(this));

    // Create physics world.
    this.world = new World();

    // Add canvas UI events
    canvas.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      this.mousePos = new Vec2(e.offsetX, e.offsetY);
      this.onMouseDown();
      e.preventDefault();
    });
    canvas.addEventListener('mouseup', e => {
      if (e.button !== 0) return;
      this.mousePos = new Vec2(e.offsetX, e.offsetY);
      this.onMouseUp();
      e.preventDefault();
    });
    canvas.addEventListener('mousemove', e => {
      this.mousePos = new Vec2(e.offsetX, e.offsetY);
      this.onMouseMove();
      e.preventDefault();
    });
    canvas.addEventListener('wheel', (event: WheelEvent) => {
      this.renderer.view.zoom(event.deltaY > 0 ? 1.1 : 0.9);
      event.preventDefault();
    });

    // Initialize UI sliders
    this.speed = new UI.Slider(
        document.getElementById('speedInput') as HTMLInputElement, document.getElementById('speedValue') as HTMLElement,
        'exponential');
    this.speed.value = 1.0;
    this.mass = new UI.Slider(
        document.getElementById('massInput') as HTMLInputElement, document.getElementById('massValue') as HTMLElement,
        'exponential');
    this.mass.value = 1.0;

    // Initialize UI buttons
    this.resetButton = new UI.Button(document.getElementById('resetButton') as HTMLButtonElement);
    this.settingsButton = new UI.Button(document.getElementById('settingsButton') as HTMLButtonElement);

    // Initialize UI toggles
    this.addBodyToggle = new UI.Toggle(document.getElementById('addBodyToggle') as HTMLButtonElement);
    this.removeBodyToggle = new UI.Toggle(document.getElementById('removeBodyToggle') as HTMLButtonElement);
    this.moveCameraToggle = new UI.Toggle(document.getElementById('moveCameraToggle') as HTMLButtonElement);

    // Initialize tools
    this.tools = new Map<string, Tools.Tool>();
    this.tools.set('addBody', new Tools.BodyAdder(this.world, this.renderer.view, this.mass));
    this.tools.set('removeBody', new Tools.BodyRemover(this.world, this.renderer.view));
    this.tools.set('moveCamera', new Tools.CameraMover(this.renderer.view));
    this.tool = undefined;

    // Intiailize UI tool switch
    this.toolSwitch = new UI.Switch();
    this.toolSwitch.add('addBody', this.addBodyToggle);
    this.toolSwitch.add('removeBody', this.removeBodyToggle);
    this.toolSwitch.add('moveCamera', this.moveCameraToggle);
    this.toolSwitch.setOnStateChange(tool => {
      this.tool = this.tools.get(tool);
      if (this.tool) this.tool.activate();
    });

    // Initialie presets
    this.presets = new Map<string, Presets.Preset>();
    this.presets.set('empty', new Presets.Empty());
    this.preset = this.presets.get('empty');
    this.resetButton.setOnClick(() => {
      if (this.preset) {
        this.world.clear();
        this.preset.generate(this.world);
      }
    });

    // Create a few bodies.
    /*const CENTRAL_MASS = 1000.0;
    this.world.addBody(new Body(CENTRAL_MASS, new Vec2(0.0, 0.0), new Vec2(0.0, 0.0), Color.random()));

    for (let i = 0; i < 100; ++i) {
      const mass = 0.1;
      const angle = (i / 100.0) * Math.PI * 2;
      const distance = 1.0;
      const pos = new Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
      const vel = pos.perpendicular().normalize().mul(Math.sqrt(GRAVITY_CONSTANT * (CENTRAL_MASS) / distance));
      this.world.addBody(new Body(mass, pos, vel, Color.random()));
    }*/
  }

  /**
   * Starts the application's main loop.
   */
  public start() {
    this.animate(0.0);
  }

  /**
   * Updates and draws the application.
   * @param dt Time step in milliseconds.
   */
  private animate(dt: number): void {
    this.world.update(this.speed.value * dt * TIME_SCALE);

    if (this.tool) this.tool.draw(this.renderer);
    this.world.draw(this.renderer);
    this.renderer.flush();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Mouse down event listener.
   * @param event The mouse event.
   */
  private onMouseDown(): void {
    if (this.tool) this.tool.onMouseDown(this.mousePos);
  }

  /**
   * Mouse up event listener.
   * @param event The mouse event.
   */
  private onMouseUp(): void {
    if (this.tool) this.tool.onMouseUp(this.mousePos);
  }

  /**
   * Mouse move event listener.
   * @param event The mouse event.
   */
  private onMouseMove(): void {
    if (this.tool) this.tool.onMouseMove(this.mousePos);
  }
}
