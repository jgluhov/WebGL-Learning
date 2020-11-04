function GLInstance(canvasID: string): WebGL2RenderingContextExt | null {
  const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
  const gl = canvas.getContext('webgl2') as WebGL2RenderingContextExt;

  if (!gl) {
    console.error('WebGL context is not available');
    return null;
  }

  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.fClear = function() {
    this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
    return this;
  }

  // Set the size of the canvas html element and the rendering view part
  gl.fSetSize = function(width: number, height: number) {
    // set the size of the canvas, on chrome we need to set it 3 ways to make it work perfectly
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width;
    canvas.height = height;

    // when updating the canvas size, must reset the viewport of the canvas
    // else the resolution webgl renders at will not change
    this.viewport(0, 0, width, height);
    return this;
  }

  return gl;
}

export default GLInstance;