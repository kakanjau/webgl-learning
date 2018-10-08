const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_xformMatrix;
  void main() {
    gl_Position = u_xformMatrix * a_Position;
  }
`;

const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

function main() {
  const canvas = document.querySelector('#webgl');
  const gl = canvas.getContext('webgl');
  
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const n = initVertexBuffers(gl);

  const ANGLE = 90.0;
  const radian = Math.PI * ANGLE / 180.0;
  const cosB = Math.cos(radian);
  const sinB = Math.sin(radian);

  const xformMatrix = new Float32Array([
    cosB, sinB, 0.0, 0.0,
    -sinB, cosB, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.5, 0.5, 0.0, 1.0
  ]);

  const u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');

  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  const vertices = new Float32Array([
    0.0, 0.5,  -0.5, -0.5,  0.1, 0.4
  ]);
  const n = 3;

  const vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_Position);

  return n;
}