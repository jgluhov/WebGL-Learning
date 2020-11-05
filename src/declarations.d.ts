declare module "*.frag" {
  const value: string;
  export default value;
}

declare module "*.vert" {
  const value: string;
  export default value;
}

interface WebGL2RenderingContextExt extends WebGL2RenderingContext {
  fClear(): this;
  fSetSize(width: number, height: number): this;
  fCreateArrayBuffer(floatArray: Float32Array, isStatic = true): WebGLBuffer | null;
}