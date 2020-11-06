export class RenderLoop implements IRenderLoop {
  private msLastFrame: number = -1; // The time in milliseconds of the last frame 
  private msFpsLimit: number = 1000 / this.fpsLimit; // Calc how many milliseconds per frame in one second of time
  private isActive: boolean = false; // Control the On/Off state of the render loop
  public fps: number = 0; // Save the value of how fast the loop is going

  constructor(
    public callback: (deltaTime: number) => void,
    public fpsLimit: number = 1000
  ) {}

  private run = () => {
    const msCurrent = performance.now(), // Gives you the whole number of how many milliseconds since the down of time :)
      msDelta = (msCurrent - this.msLastFrame),
      deltaTime = msDelta / 1000.0;

    if (msDelta >= this.msFpsLimit) {
      this.fps = Math.floor(1 / deltaTime); // Time it took to generate one frame, divide 1 by that to get how many frames in one second.
      this.msLastFrame = msCurrent;
      this.callback(deltaTime);
    }
    
    if (this.isActive) {
      window.requestAnimationFrame(this.run);
    }
  }

  public start(): this {
    this.isActive = true;
    this.msLastFrame = performance.now();
    window.requestAnimationFrame(this.run);
    return this;
  }

  public stop() {
    this.isActive = false;
    return this;
  }
}
