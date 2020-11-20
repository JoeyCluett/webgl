

function main() {

    var width  = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    console.log( 'w: ' + width + ", h: " + height);

    canvas = document.querySelector("#glCanvas");
    canvas.width  = width  * 0.95; // slightly smaller than window
    canvas.height = height * 0.95; // ...

    const gl = canvas.getContext("webgl");

    if(gl == null) {
        alert("Browser does not support WebGL")
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var camera = new Camera( 
            new vector3(0.5, 0.1, 0.5), // position
            1.0,                        // speed
            canvas.width,               // width
            canvas.height,              // height
            0.07,                       // mouse speed
            canvas                      // canvas reference
        );

    const vertex_shader_source = 
    `
        attribute vec4 position;
        uniform mat4 Model;
        uniform mat4 View;
        uniform mat4 Projection;

        void main() {
            gl_Position = Projection * View * Model * position;
        }
    `;

    const fragment_shader_source =
    `
        void main() {
            gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
        }    
    `;

    const shader = new Shader(
            gl, 
            vertex_shader_source, 
            fragment_shader_source);

    

}