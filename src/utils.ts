export function createShader(
  gl: WebGL2RenderingContext,
  src: string,
  type: number
): WebGLShader | null {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Error compiling shader : ' + src, gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function createProgram(
  gl: WebGL2RenderingContext,
  vShader: WebGLShader,
  fShader: WebGLShader,
  shouldValidate: boolean
): WebGLProgram | null {
  const prog = gl.createProgram();

  if (!prog) {
    return null;
  }

  gl.attachShader(prog, vShader);
  gl.attachShader(prog, fShader);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Error creating shader program.', gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }

  if (shouldValidate) {
    gl.validateProgram(prog);

    if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
      console.log('Error validating program', gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return null;
    }
  }

  gl.detachShader(prog, vShader);
  gl.detachShader(prog, fShader);
  gl.deleteShader(vShader);
  gl.deleteShader(fShader);

  return prog;
}