import {Mat3, Vec2} from '../math';

import {Color} from './color';
import {DrawLine} from './draw_line';
import {DrawCircle} from './draw_circle';
import {View} from './view';

export {View};

type DrawCommand = DrawCircle|DrawLine;

/** Background color of the application. */
const BACKGROUND_COLOR: Color = new Color(0.05, 0.05, 0.05);

/** Number of divisions used for drawing circles. */
const CIRCLE_DIVISIONS: number = 32;

/** Line thickness scale. */
const LINE_THICKNESS_SCALE = 0.0025;

/** Arrow head scale. */
const ARROW_HEAD_SCALE: number = 0.02;

/**
 * Class used to render the app.
 */
export class Renderer {
  /** Draw commands. */
  private commands: DrawCommand[];

  /** View used. */
  public view: View;

  /** HTML canvas. */
  private canvas: HTMLCanvasElement;

  /** WebGL context. */
  private context: WebGLRenderingContext;

  /** Vertex shader used for drawing. */
  private vertexShader: WebGLShader;

  /** Fragment shader used for drawing. */
  private fragmentShader: WebGLShader;

  /** Shader program used for drawing. */
  private program: WebGLProgram;

  /** Shader program position attribute location. */
  private positionAttribute: number;

  /** Shader program transform uniform location. */
  private transformUniform: WebGLUniformLocation;

  /** Shader program color uniform location. */
  private colorUniform: WebGLUniformLocation;

  /** Vertex buffer used for drawing. */
  private vertexBuffer: WebGLBuffer;

  /** Circle first vertice and vertex count. */
  private circle: [number, number];

  /** Line first vertice and vertex count. */
  private line: [number, number];

  /**
   * @param canvas Canvas to use.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.commands = [];

    // Get the WebGL context.
    this.canvas = canvas;
    this.context = this.canvas.getContext('webgl')!;

    // Initialize shaders and vertex buffers.
    this.initShaders();
    this.initVertexBuffers();

    // Initialize view.
    this.view = new View(this.canvas.width, this.canvas.height);
  }

  /**
   * Draws a circle.
   * @param center The center of the circle.
   * @param radius The radius of the circle.
   * @param color The color of the circle.
   */
  public drawCircle(center: Vec2, radius: number, color: Color): void {
    this.commands.push(new DrawCircle(center, radius, color));
  }

  /**
   * Draws a line.
   * @param start The start of the line.
   * @param end The end of the line.
   * @param thickness Thickness of the line.
   * @param color The color of the line.
   */
   public drawLine(start: Vec2, end: Vec2, thickness: number, color: Color): void {
    this.commands.push(new DrawLine(start, end, thickness, color));
  }

  /**
   * Draws an arrow.
   * @param start The start of the arrow.
   * @param end The end of the arrow.
   * @param color The color of the arrow.
   */
  public drawArrow(start: Vec2, end: Vec2, color: Color): void {
    const offset = end.sub(start);
    const perpendicular = offset.perpendicular();
    const diagonal1 = offset.add(perpendicular).normalize();
    const diagonal2 = offset.sub(perpendicular).normalize();
    this.drawLine(start, end, 1.0 / this.view.scale, color);
    this.drawLine(end, end.add(diagonal1.mul(-ARROW_HEAD_SCALE / this.view.scale)), 1.0 / this.view.scale, color)
    this.drawLine(end, end.add(diagonal2.mul(-ARROW_HEAD_SCALE / this.view.scale)), 1.0 / this.view.scale, color)
  }

  /**
   * Flushes the renderer, showing the current state of the app.
   */
  public flush(): void {
    // Clear the screen with the background color.
    this.context.clearColor(BACKGROUND_COLOR.r, BACKGROUND_COLOR.g, BACKGROUND_COLOR.b, 1.0);
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    // Execute all draw commands.
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
    this.context.vertexAttribPointer(this.positionAttribute, 2, this.context.FLOAT, false, 0, 0);
    this.context.enableVertexAttribArray(this.positionAttribute);
    this.context.useProgram(this.program);

    for (let command of this.commands) {
      if (command instanceof DrawCircle) {
        const translation = Mat3.translation(command.center);
        const scale = Mat3.scale(new Vec2(command.radius, command.radius));
        const transform = scale.mul(translation).mul(this.view.getTransform());

        this.context.uniformMatrix3fv(this.transformUniform, false, transform.elements);
        this.context.uniform3f(this.colorUniform, command.color.r, command.color.g, command.color.b);
        this.context.drawArrays(this.context.TRIANGLE_FAN, this.circle[0], this.circle[1]);
      } else if (command instanceof DrawLine) {
        const translation = Mat3.translation(command.start);
        const direction = command.end.sub(command.start);
        const scale = Mat3.scale(new Vec2(command.thickness * LINE_THICKNESS_SCALE, direction.length()));
        const rotation = Mat3.rotation(Math.atan2(direction.y, direction.x) - Math.PI / 2);
        const transform = scale.mul(rotation).mul(translation).mul(this.view.getTransform());

        this.context.uniformMatrix3fv(this.transformUniform, false, transform.elements);
        this.context.uniform3f(this.colorUniform, command.color.r, command.color.g, command.color.b);
        this.context.drawArrays(this.context.TRIANGLE_FAN, this.line[0], this.line[1]);
      }
    }

    this.commands = [];
  }

  /**
   * Initializes shaders used for drawing.
   */
  private initShaders(): void {
    // Create vertex shader.
    this.vertexShader = this.context.createShader(this.context.VERTEX_SHADER)!;
    this.context.shaderSource(this.vertexShader, `
      attribute vec2 position;

      uniform mat3 transform;

      void main() {
        vec2 transformed = (transform * vec3(position, 1.0)).xy;
        gl_Position = vec4(transformed, 0.0, 1.0);
      }
    `);
    this.context.compileShader(this.vertexShader);

    // Create fragment shader.
    this.fragmentShader = this.context.createShader(this.context.FRAGMENT_SHADER)!;
    this.context.shaderSource(this.fragmentShader, `
      uniform mediump vec3 color;

      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
    `);
    this.context.compileShader(this.fragmentShader);

    // Create shader program.
    this.program = this.context.createProgram()!;
    this.context.attachShader(this.program, this.vertexShader);
    this.context.attachShader(this.program, this.fragmentShader);
    this.context.linkProgram(this.program);

    // Get shader program attribute locations.
    this.positionAttribute = this.context.getAttribLocation(this.program, 'position');

    // Get shader program uniform locations.
    this.transformUniform = this.context.getUniformLocation(this.program, 'transform')!;
    this.colorUniform = this.context.getUniformLocation(this.program, 'color')!;
  }

  /**
   * Initializes vertex buffers used for drawing.
   */
  private initVertexBuffers(): void {
    // Generate circle vertices
    this.circle = [0, CIRCLE_DIVISIONS + 2];
    let vertices: number[] = [];
    vertices.push(0.0, 0.0);
    for (let i = 0; i <= CIRCLE_DIVISIONS; i++) {
      let angle = i / CIRCLE_DIVISIONS * Math.PI * 2;
      vertices.push(Math.cos(angle), Math.sin(angle));
    }

    // Generate line vertices
    this.line = [vertices.length / 2, 4];
    vertices.push(-1.0, 0.0);
    vertices.push(-1.0, 1.0);
    vertices.push(+1.0, 1.0);
    vertices.push(+1.0, 0.0);
    
    // Generate vertex buffer
    this.vertexBuffer = this.context.createBuffer()!;
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
    this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);
  }
}
