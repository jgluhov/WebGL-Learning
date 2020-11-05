import GLInstance from './gl';
import * as utils from './utils';
import vShaderSrc from './shaders/vertex.vert';
import fShaderSrc from './shaders/fragment.frag';
import { RenderLoop } from './render-loop';


function main() {
  const gl = GLInstance('glcanvas');

  if (!gl) {
    return;
  }

  gl.fSetSize(500, 500).fClear();

  const shaderProg = utils.domShaderProgram(gl, vShaderSrc, fShaderSrc, true);

  if (!shaderProg) {
    return;
  }

  // get location of uniforms and attributes
  gl.useProgram(shaderProg);
  const aPositionLoc = gl.getAttribLocation(shaderProg, 'a_position');
  const uPointSize = gl.getUniformLocation(shaderProg, 'uPointSize');
  gl.useProgram(null);
  
  // setup data buffers
  const vertices = new Float32Array([0, 0, 0, 0.5, 0.5, 0]);
  const bufferVertices = gl.fCreateArrayBuffer(vertices)
  
  // setup for drawing
  gl.useProgram(shaderProg);  // activate the Shader
  gl.uniform1f(uPointSize, 50.0); // store data to the shader's uniform variable uPointSize

  // how its down without VAOs
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertices); // tell gl which buffer we want to use at the moment
  gl.enableVertexAttribArray(aPositionLoc); // enable the position attribute in the shader
  gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0); // set which buffer the attribute will pull data from
  gl.bindBuffer(gl.ARRAY_BUFFER, null); // done setting up the buffer

  const onRender = () => {
    gl.uniform1f(uPointSize, 50.0);

    gl.fClear();
    gl.drawArrays(gl.POINTS, 0, vertices.length / 3);
  }

  new RenderLoop(onRender).start();
}

window.addEventListener('load', main);
