import GLInstance from "./gl";

function main() {
  const gl = GLInstance('glcanvas')
    .fSetSize(500, 500)
    .fClear();
}

window.addEventListener('load', main);