//Derek Klatt 2/20 Lab 2
var gl;
var points;
var x = 0;
var y = 0;
window.onload = function init(){
  var canvas = document.getElementById( "gl-canvas" );
  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }
  //
  // Configure WebGL
  //
  gl.viewport( 0, 0, canvas.width, canvas.height );
  gl.clearColor( 0.0, 1.0, 0.0, 1.0 );
  //document.onkeydown = handleKeyDown;
  //document.onkeyup = handleKeyUp;
  // Load shaders and initialize attribute buffers
  var program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );
  window.onkeydown = function( event ) {
    switch( event.keyCode ) {
      case 87:
        if(0.8 > y-0.1){
          y = y+0.1;
        }
        break;
      case 83:
        if(-0.8 < y-0.1){
          y = y-0.1;
        }
        break;
      case 68:
        if(0.79 > x-0.1){
          x = x+0.1;
        }
        break;
      case 65:
        if(-0.9 < x-0.1){
          x = x-0.1;
        }
        break;
      case 49:
        x=0;
        y=0;
        break;
    }
    var shape = new Float32Array([
      x, y,
      x-0.1, y-0.15,
      x+0.1, y-0.15,
      x, y-0.2,
      x+0.1, y-0.05
    ]);
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, shape, gl.STATIC_DRAW );
    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // Load the data into the GPU
    // Associate our shader variables with our data buffer
    render();
  };
};

function render() {
  gl.clear( gl.COLOR_BUFFER_BIT );
  gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}
