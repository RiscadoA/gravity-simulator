import {Mat3, Vec2} from '../math';

import {Color} from './color';
import {Command} from './command';
import {DrawCircle} from './draw_circle';
import {DrawLine} from './draw_line';
import {Program} from './program';
import {View} from './view';

export {View};

/** Number of divisions used for drawing circles. */
const CIRCLE_DIVISIONS: number = 32;

/** Line thickness scale. */
const LINE_THICKNESS_SCALE = 0.0025;

/** Trail thickness scale. */
const TRAIL_THICKNESS_SCALE = 0.5;

/** Trail minimum thickness scale. */
const TRAIL_MIN_THICKNESS = 0.0015;

/** Arrow head scale. */
const ARROW_HEAD_SCALE: number = 0.02;

/**
 * Class used to render the app.
 */
export class Renderer {
  /** Draw commands. */
  private commands: Command[];

  /** View used. */
  public view: View;

  /** HTML canvas. */
  private canvas: HTMLCanvasElement;

  /** WebGL context. */
  private context: WebGLRenderingContext;

  /** Shader program used for drawing. */
  private drawProgram: Program;

  /** Draw program position attribute location. */
  private drawPositionAttribute: number;

  /** Draw program transform uniform location. */
  private drawTransformUniform: WebGLUniformLocation;

  /** Draw program color uniform location. */
  private drawColorUniform: WebGLUniformLocation;

  /** Vertex buffer used for drawing. */
  private vertexBuffer: WebGLBuffer;

  /** Circle first vertice and vertex count. */
  private circle: [number, number];

  /** Line first vertice and vertex count. */
  private line: [number, number];

  /** Quad first vertice and vertex count. */
  private quad: [number, number];

  /** Trails framebuffer. */
  private trailsFramebuffer: WebGLFramebuffer;

  /** Trails texture. */
  private trailsTexture: WebGLTexture;

  /** Shader program used for trails. */
  private trailsProgram: Program;

  /** Trails program position attribute location. */
  private trailsPositionAttribute: number;

  /** Trails program texture uniform location. */
  private trailsTextureUniform: WebGLUniformLocation;

  /** Should trails be drawn? */
  private _trailsEnabled: boolean;

  /** Shader program used for fade. */
  private fadeProgram: Program;

  /** Fade program position attribute location. */
  private fadePositionAttribute: number;

  /** Fade program value uniform location. */
  private fadeValueUniform: WebGLUniformLocation;

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
    this.initTrails();

    // Initialize view.
    this.view = new View(this.canvas.width, this.canvas.height);
    this.view.setOnViewChange(() => {
      if (this._trailsEnabled) {
        // Clear the trails texture.
        this.context.bindFramebuffer(this.context.FRAMEBUFFER, this.trailsFramebuffer);
        this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.context.clearColor(0.0, 0.0, 0.0, 0.0);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
      }
    });
  }

  /**
   * Draws a circle.
   * @param center The center of the circle.
   * @param radius The radius of the circle.
   * @param color The color of the circle.
   * @param drawTrails Should trails be drawn?
   */
  public drawCircle(center: Vec2, radius: number, color: Color, drawTrails: boolean): void {
    this.commands.push(new DrawCircle(center, radius, color, drawTrails));
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
    this.drawLine(end, end.add(diagonal1.mul(-ARROW_HEAD_SCALE / this.view.scale)), 1.0 / this.view.scale, color);
    this.drawLine(end, end.add(diagonal2.mul(-ARROW_HEAD_SCALE / this.view.scale)), 1.0 / this.view.scale, color)
  }

  /**
   * Flushes the renderer, showing the current state of the app.
   */
  public flush(): void {
    if (this._trailsEnabled) {
      // Bind the trails framebuffer.
      this.context.bindFramebuffer(this.context.FRAMEBUFFER, this.trailsFramebuffer);
      this.context.viewport(0, 0, this.canvas.width, this.canvas.height);

      // Bind the buffers and shaders.
      this.drawProgram.use();
      this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
      this.context.vertexAttribPointer(this.drawPositionAttribute, 2, this.context.FLOAT, false, 0, 0);
      this.context.enableVertexAttribArray(this.drawPositionAttribute);

      // Draw all commands that require trails.
      for (let command of this.commands) this.executeTrailCommand(command);

      // Apply fade.
      this.context.enable(this.context.BLEND);
      this.context.blendEquation(this.context.FUNC_REVERSE_SUBTRACT);
      this.context.blendFuncSeparate(this.context.SRC_ALPHA, this.context.ONE, this.context.ZERO, this.context.ONE);

      this.fadeProgram.use();
      this.context.uniform1f(this.fadeValueUniform, 1.0 / 255.0);
      this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
      this.context.vertexAttribPointer(this.fadePositionAttribute, 2, this.context.FLOAT, false, 0, 0);
      this.context.enableVertexAttribArray(this.fadePositionAttribute);
      this.context.drawArrays(this.context.TRIANGLE_FAN, this.quad[0], this.quad[1]);

      this.context.disable(this.context.BLEND);
    }

    // Clear the screen with the background color.
    this.context.bindFramebuffer(this.context.FRAMEBUFFER, null);
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.context.clearColor(0.0, 0.0, 0.0, 1.0);
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    if (this._trailsEnabled) {
      // Draw trails texture.
      this.trailsProgram.use();
      this.context.bindTexture(this.context.TEXTURE_2D, this.trailsTexture);
      this.context.uniform1i(this.trailsTextureUniform, 0);

      this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
      this.context.vertexAttribPointer(this.trailsPositionAttribute, 2, this.context.FLOAT, false, 0, 0);
      this.context.enableVertexAttribArray(this.trailsPositionAttribute);
      this.context.drawArrays(this.context.TRIANGLE_FAN, this.quad[0], this.quad[1]);
    }

    // Bind the buffers and shaders.
    this.drawProgram.use();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
    this.context.vertexAttribPointer(this.drawPositionAttribute, 2, this.context.FLOAT, false, 0, 0);
    this.context.enableVertexAttribArray(this.drawPositionAttribute);

    // Execute all draw commands.
    for (let command of this.commands) this.executeCommand(command);

    this.commands = [];
  }

  /**
   * Enables or disables trails.
   */
  public set trailsEnabled(enabled: boolean) {
    this._trailsEnabled = enabled;
    if (this._trailsEnabled) {
      // Clear the trails texture.
      this.context.bindFramebuffer(this.context.FRAMEBUFFER, this.trailsFramebuffer);
      this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.context.clearColor(0.0, 0.0, 0.0, 0.0);
      this.context.clear(this.context.COLOR_BUFFER_BIT);
    }
  }

  /**
   * Checks if trails are enabled.
   */
  public get trailsEnabled(): boolean {
    return this._trailsEnabled;
  }

  /**
   * Initializes shaders used for drawing.
   */
  private initShaders(): void {
    // Create draw program.
    this.drawProgram = new Program(
        this.context, `
        attribute vec2 position;

        uniform mat3 transform;

        void main() {
          vec2 transformed = (transform * vec3(position, 1.0)).xy;
          gl_Position = vec4(transformed, 0.0, 1.0);
        }
        `,
        `
        uniform mediump vec3 color;

        void main() {
          gl_FragColor = vec4(color, 1.0);
        }
        `);

    // Get program attribute locations.
    this.drawPositionAttribute = this.drawProgram.getAttributeLocation('position');

    // Get shader program uniform locations.
    this.drawTransformUniform = this.drawProgram.getUniformLocation('transform');
    this.drawColorUniform = this.drawProgram.getUniformLocation('color');

    // Create trails program.
    this.trailsProgram = new Program(
        this.context, `
      attribute vec2 position;

      varying vec2 uvs;
      
      void main() {
        uvs = (position + 1.0) / 2.0;
        gl_Position = vec4(position, 0.0, 1.0);
      }
      `,
        `
      precision mediump float;

      uniform sampler2D trails;

      varying vec2 uvs;

      void main() {
        vec4 color = texture2D(trails, uvs);
        if (color.a == 0.0) discard;
        gl_FragColor = vec4(texture2D(trails, uvs));
      }
      `);

    // Get program attribute locations.
    this.trailsPositionAttribute = this.trailsProgram.getAttributeLocation('position');

    // Get shader program uniform locations.
    this.trailsTextureUniform = this.trailsProgram.getUniformLocation('trails');

    // Create fade program.
    this.fadeProgram = new Program(
        this.context, `
      attribute vec2 position;
      
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
      `,
        `
      precision mediump float;

      uniform float fade;

      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, fade);
      }
      `);

    // Get program attribute locations.
    this.fadePositionAttribute = this.fadeProgram.getAttributeLocation('position');

    // Get shader program uniform locations.
    this.fadeValueUniform = this.fadeProgram.getUniformLocation('fade');
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

    // Generate quad vertices
    this.quad = [vertices.length / 2, 4];
    vertices.push(-1.0, -1.0);
    vertices.push(-1.0, +1.0);
    vertices.push(+1.0, +1.0);
    vertices.push(+1.0, -1.0);

    // Generate vertex buffer
    this.vertexBuffer = this.context.createBuffer()!;
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
    this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);
  }

  /**
   * Initializes the trails framebuffer and texture.
   */
  private initTrails(): void {
    this._trailsEnabled = false;

    // Create framebuffer
    this.trailsFramebuffer = this.context.createFramebuffer()!;
    this.context.bindFramebuffer(this.context.FRAMEBUFFER, this.trailsFramebuffer);

    // Create texture
    this.trailsTexture = this.context.createTexture()!;
    this.context.bindTexture(this.context.TEXTURE_2D, this.trailsTexture);
    this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.NEAREST);
    this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.NEAREST);
    this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
    this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
    this.context.texImage2D(
        this.context.TEXTURE_2D, 0, this.context.RGBA, this.canvas.width, this.canvas.height, 0, this.context.RGBA,
        this.context.UNSIGNED_BYTE, null);

    // Attach texture to framebuffer
    this.context.framebufferTexture2D(
        this.context.FRAMEBUFFER, this.context.COLOR_ATTACHMENT0, this.context.TEXTURE_2D, this.trailsTexture, 0);

    // Check framebuffer status
    if (this.context.checkFramebufferStatus(this.context.FRAMEBUFFER) !== this.context.FRAMEBUFFER_COMPLETE) {
      throw new Error('Trails framebuffer is not complete');
    }

    // Clear framebuffer.
    this.context.clearColor(0.0, 0.0, 0.0, 1.0);
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    // Unbind framebuffer
    this.context.bindFramebuffer(this.context.FRAMEBUFFER, null);
  }

  /**
   * Executes a draw trail command.
   * @param command Command to execute.
   */
  private executeTrailCommand(command: Command): void {
    if (!command.drawTrails) return;

    if (command instanceof DrawCircle) {
      const radius = Math.max(command.radius * TRAIL_THICKNESS_SCALE, TRAIL_MIN_THICKNESS / this.view.scale);
      const translation = Mat3.translation(command.center);
      const scale = Mat3.scale(new Vec2(radius, radius));
      const transform = scale.mul(translation).mul(this.view.transform);

      this.context.uniformMatrix3fv(this.drawTransformUniform, false, transform.elements);
      this.context.uniform3f(this.drawColorUniform, command.color.r, command.color.g, command.color.b);
      this.context.drawArrays(this.context.TRIANGLE_FAN, this.circle[0], this.circle[1]);
    } else if (command instanceof DrawLine) {
      const translation = Mat3.translation(command.start);
      const direction = command.end.sub(command.start);
      const scale = Mat3.scale(new Vec2(command.thickness * LINE_THICKNESS_SCALE, direction.length()));
      const rotation = Mat3.rotation(Math.atan2(direction.y, direction.x) - Math.PI / 2);
      const transform = scale.mul(rotation).mul(translation).mul(this.view.transform);

      this.context.uniformMatrix3fv(this.drawTransformUniform, false, transform.elements);
      this.context.uniform3f(this.drawColorUniform, command.color.r, command.color.g, command.color.b);
      this.context.drawArrays(this.context.TRIANGLE_FAN, this.line[0], this.line[1]);
    }
  }

  /**
   * Executes a draw command.
   * @param command Command to execute.
   */
  private executeCommand(command: Command): void {
    if (command instanceof DrawCircle) {
      const radius = Math.max(command.radius, TRAIL_MIN_THICKNESS / this.view.scale);
      const translation = Mat3.translation(command.center);
      const scale = Mat3.scale(new Vec2(radius, radius));
      const transform = scale.mul(translation).mul(this.view.transform);

      this.context.uniformMatrix3fv(this.drawTransformUniform, false, transform.elements);
      this.context.uniform3f(this.drawColorUniform, command.color.r, command.color.g, command.color.b);
      this.context.drawArrays(this.context.TRIANGLE_FAN, this.circle[0], this.circle[1]);
    } else if (command instanceof DrawLine) {
      const translation = Mat3.translation(command.start);
      const direction = command.end.sub(command.start);
      const scale = Mat3.scale(new Vec2(command.thickness * LINE_THICKNESS_SCALE, direction.length()));
      const rotation = Mat3.rotation(Math.atan2(direction.y, direction.x) - Math.PI / 2);
      const transform = scale.mul(rotation).mul(translation).mul(this.view.transform);

      this.context.uniformMatrix3fv(this.drawTransformUniform, false, transform.elements);
      this.context.uniform3f(this.drawColorUniform, command.color.r, command.color.g, command.color.b);
      this.context.drawArrays(this.context.TRIANGLE_FAN, this.line[0], this.line[1]);
    }
  }
}
