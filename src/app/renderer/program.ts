/**
 * WebGL program wrapper.
 */
export class Program {
  /** Context used. */
  private _context: WebGLRenderingContext;

  /** Vertex shader. */
  private _vs: WebGLShader;

  /** Fragment shader. */
  private _fs: WebGLShader;

  /** Shader program. */
  private _program: WebGLProgram;

  /**
   * @param context Context used.
   * @param vs Vertex shader source code.
   * @param fs Fragment shader source code.
   */
  constructor(context: WebGLRenderingContext, vs: string, fs: string) {
    this._context = context;
    this._vs = this.createShader(this._context.VERTEX_SHADER, vs);
    this._fs = this.createShader(this._context.FRAGMENT_SHADER, fs);

    const program = this._context.createProgram()!;
    this._context.attachShader(program, this._vs);
    this._context.attachShader(program, this._fs);
    this._context.linkProgram(program);
    if (!this._context.getProgramParameter(program, this._context.LINK_STATUS))
      throw new Error(this._context.getProgramInfoLog(program)!);
    this._program = program;
  }

  /**
   * Uses the program.
   */
  public use(): void {
    this._context.useProgram(this._program);
  }

  /**
   * Gets the attribute location.
   * @param name Name of attribute.
   * @returns Attribute location.
   */
  public getAttributeLocation(name: string): number {
    return this._context.getAttribLocation(this._program, name);
  }

  /**
   * Gets the uniform location.
   * @param name Name of uniform.
   * @returns Uniform location.
   */
  public getUniformLocation(name: string): WebGLUniformLocation {
    return this._context.getUniformLocation(this._program, name)!;
  }

  /**
   * Creates a shader.
   * @param type Type of shader.
   * @param source Source code of shader.
   * @returns Shader.
   */
  private createShader(type: number, source: string): WebGLShader {
    const shader = this._context.createShader(type)!;
    this._context.shaderSource(shader, source);
    this._context.compileShader(shader);
    if (!this._context.getShaderParameter(shader, this._context.COMPILE_STATUS))
      throw new Error(this._context.getShaderInfoLog(shader)!);
    return shader;
  }
}
