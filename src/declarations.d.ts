declare module "*.frag" {
  const value: string;
  export default value;
}

declare module "*.vert" {
  const value: string;
  export default value;
}

interface IRenderLoop {
  start(): this;
  stop(): this;
}

interface WebGL2RenderingContextExt extends WebGL2RenderingContext {
  fClear(): this;
  fSetSize(width: number, height: number): this;
  fCreateArrayBuffer(floatArray: Float32Array, isStatic = true): WebGLBuffer | null;
  fAnimate(callback: (deltaTime: number) => void, fpsLimit: number = 1000): IRenderLoop;
}