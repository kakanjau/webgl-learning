function main() {
  const canvas = document.querySelector('#webgl');
  const gl = canvas.getContext('webgl');

  const vshader_source = `
    void main() {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 10.0;
    }
  `;
  const fshader_source = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `;

  const vshader_source2 = `
    attribute vec4 a_Position;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = 10.0;
    }
  `;
  const fshader_source2 = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
      gl_FragColor = u_FragColor;
    }
  `;

  initShaders(gl, vshader_source, fshader_source);
  initShaders(gl, vshader_source2, fshader_source2);

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  // gl.vertexAttrib3f(a_Position, 0.0, 0.6, 0.0);

  // gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.POINTS, 0, 1);

  const halfHeight = canvas.height/2;
  const halfWidth = canvas.width/2;
  const points = [];
  canvas.onmousedown = function(event) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    let x = event.clientX;
    let y = event.clientY;
    const rect = event.target.getBoundingClientRect();
    x = ((x - rect.left) - halfHeight) / halfHeight;
    y = (halfWidth - (y - rect.top)) / halfWidth;
    points.push([x,y]);
    points.forEach(([ix, iy]) => {
      gl.vertexAttrib2f(a_Position, ix, iy);
      const rgba = [Math.abs(ix), Math.abs(iy), (Math.abs(ix)+Math.abs(iy))/2, 1.0];
      gl.uniform4f(u_FragColor, ...rgba);
      gl.drawArrays(gl.POINTS, 0, 1);
    });
  };
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}