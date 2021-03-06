import {Vec2} from './math';
import * as Presets from './presets';
import {Renderer} from './renderer';
import * as Tools from './tools';
import * as UI from './ui';
import {Form} from './ui/form';
import {World} from './world';

/** Multiplier of the time step passed to the update functions. */
const TIME_SCALE = 0.000002;

/** Help page URL. */
const HELP_URL = 'https://riscadoa.com/portfolio/gravity-simulator/';

/**
 * Application class.
 */
export class App {
  /** Renderer used by the app. */
  private renderer: Renderer;

  /** Physics world. */
  private world: World;

  /** Introduction form. */
  private introduction: Form;

  /** Tools map. */
  private tools: Map<string, Tools.Tool>;

  /** Current tool. */
  private tool: Tools.Tool|undefined;

  /** Preset selector. */
  private presetSelector: Presets.Selector;

  /** Reset button. */
  private resetButton: UI.Button;

  /** Settings button. */
  private settingsButton: UI.Button;

  /** Trails toggle. */
  private trailsToggle: UI.Toggle;

  /** Zoom in button. */
  private zoomInButton: UI.Button;

  /** Zoom out button. */
  private zoomOutButton: UI.Button;

  /** Help button. */
  private helpButton: UI.Button;

  /** Body adder toggle. */
  private bodyAdderToggle: UI.Toggle;

  /** Body remover toggle. */
  private bodyRemoverToggle: UI.Toggle;

  /** Body mover toggle. */
  private bodyMoverToggle: UI.Toggle;

  /** Camera mover toggle. */
  private cameraMoverToggle: UI.Toggle;

  /** Body follower toggle. */
  private bodyFollowerToggle: UI.Toggle;

  /** Tools switch. */
  private toolSwitch: UI.Switch;

  /** Simulation speed slider. */
  private simulationSpeed: UI.Slider;

  /** New body mass slider. */
  private bodyMass: UI.Slider;

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
      this.renderer.view.triggerViewChange();
    });

    // Initialize UI sliders
    this.bodyMass =
        new UI.Slider(document.getElementById('bodyMass') as HTMLDivElement, 0.1, 100000000.0, 1.0, 'exponential');
    this.bodyMass.value = 1.0;
    this.simulationSpeed =
        new UI.Slider(document.getElementById('simulationSpeed') as HTMLDivElement, 0.001, 100.0, 1.0, 'exponential');
    this.simulationSpeed.value = 1.0;

    // Initialize UI buttons
    this.resetButton = new UI.Button(document.getElementById('resetButton') as HTMLButtonElement);
    this.settingsButton = new UI.Button(document.getElementById('settingsButton') as HTMLButtonElement);
    this.zoomInButton = new UI.Button(document.getElementById('zoomInButton') as HTMLButtonElement);
    this.zoomOutButton = new UI.Button(document.getElementById('zoomOutButton') as HTMLButtonElement);
    this.helpButton = new UI.Button(document.getElementById('helpButton') as HTMLButtonElement);

    // Initialize UI toggles
    this.trailsToggle = new UI.Toggle(document.getElementById('trailsToggle') as HTMLButtonElement);
    this.bodyAdderToggle = new UI.Toggle(document.getElementById('bodyAdderToggle') as HTMLButtonElement);
    this.bodyRemoverToggle = new UI.Toggle(document.getElementById('bodyRemoverToggle') as HTMLButtonElement);
    this.bodyMoverToggle = new UI.Toggle(document.getElementById('bodyMoverToggle') as HTMLButtonElement);
    this.cameraMoverToggle = new UI.Toggle(document.getElementById('cameraMoverToggle') as HTMLButtonElement);
    this.bodyFollowerToggle = new UI.Toggle(document.getElementById('bodyFollowerToggle') as HTMLButtonElement);

    // Initialize tools
    this.tools = new Map<string, Tools.Tool>();
    this.tools.set('bodyAdder', new Tools.BodyAdder(this.world, this.renderer.view, this.bodyMass));
    this.tools.set('bodyRemover', new Tools.BodyRemover(this.world, this.renderer.view));
    this.tools.set('bodyMover', new Tools.BodyMover(this.world, this.renderer.view));
    this.tools.set('cameraMover', new Tools.CameraMover(this.renderer.view));
    this.tools.set('bodyFollower', new Tools.BodyFollower(this.world, this.renderer.view));
    this.tool = undefined;

    // Intiailize UI tool switch
    this.toolSwitch = new UI.Switch();
    this.toolSwitch.add('bodyAdder', this.bodyAdderToggle);
    this.toolSwitch.add('bodyRemover', this.bodyRemoverToggle);
    this.toolSwitch.add('bodyMover', this.bodyMoverToggle);
    this.toolSwitch.add('cameraMover', this.cameraMoverToggle);
    this.toolSwitch.add('bodyFollower', this.bodyFollowerToggle);
    this.toolSwitch.setOnStateChange(tool => {
      this.tool = this.tools.get(tool);
      this.introduction.hide();
      if (this.tool) this.tool.activate();
    });

    // Trails callbacks
    this.trailsToggle.setOnActivated(() => {
      this.renderer.trailsEnabled = true;
    });
    this.trailsToggle.setOnDeactivated(() => {
      this.renderer.trailsEnabled = false;
    });

    // Zoom callbacks
    this.zoomInButton.setOnClick(() => {
      this.renderer.view.zoom(0.75);
      this.renderer.view.triggerViewChange();
    });
    this.zoomOutButton.setOnClick(() => {
      this.renderer.view.zoom(1.25);
      this.renderer.view.triggerViewChange();
    });

    // Help callback
    this.helpButton.setOnClick(() => {
      window.open(HELP_URL);
    });

    // Initialize preset selector
    this.presetSelector = new Presets.Selector(this.world, this.renderer.view);
    this.presetSelector.add(new Presets.Empty());
    this.presetSelector.add(new Presets.Planets());
    this.presetSelector.add(new Presets.Moons());
    this.presetSelector.add(new Presets.Binary());
    this.presetSelector.add(new Presets.CustomSimple());
    this.presetSelector.add(new Presets.CustomBinary());
    this.presetSelector.finish('planets');
    this.resetButton.setOnClick(() => {
      this.introduction.hide();
      this.world.clear();
      this.presetSelector.apply();
    });
    this.settingsButton.setOnClick(() => {
      this.introduction.hide();
      if (this.presetSelector.open)
        this.presetSelector.hide();
      else
        this.presetSelector.show();
    });
    this.presetSelector.apply();

    // Initialize introduction
    this.introduction = Form.create('introduction');
    this.introduction.show();
    this.introduction.setOnSubmit(() => this.introduction.hide());
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
    this.world.update(this.simulationSpeed.value * dt * TIME_SCALE);

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
