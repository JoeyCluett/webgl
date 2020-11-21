'use strict';

var input_map = {
    up: false,
    down: false,
    left: false,
    right: false
};

function keydown_callback(ev) {

    //console.log('keydown_callback');

    ev = ev || window.event;

    switch(ev.keycode) {
        case 'w': input_map.up = true;    break;
        case 'a': input_map.left = true;  break;
        case 's': input_map.down = true;  break;
        case 'd': input_map.right = true; break;
        case 27: // escape key
            break;
        default:
            break;
    }
}

function keyup_callback(ev) {
    ev = ev || window.event;

    switch(ev.keycode) {
        case 'w': input_map.up = false;    break;
        case 'a': input_map.left = false;  break;
        case 's': input_map.down = false;  break;
        case 'd': input_map.right = false; break;
        default:
            break;
    }

}

function main() {

    var width  = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    console.log( 'w: ' + width + ", h: " + height);

    var canvas = document.querySelector("#glCanvas");
    canvas.width  = width  * 0.95; // slightly smaller than available space
    canvas.height = height * 0.95; // ...

    const gl = canvas.getContext("webgl2");

    if(gl == null) {
        alert("Browser does not support WebGL")
        return;
    }

    document.addEventListener("keydown", keydown_callback);
    document.addEventListener("keyup",   keyup_callback);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
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
        precision highp float;

        attribute vec4 position;
        attribute vec4 color;

        uniform mat4 Model;
        uniform mat4 View;
        uniform mat4 Projection;

        // color is simple passed through
        varying vec4 out_color;

        void main() {
            out_color = color;
            gl_Position = Projection * View * Model * position;
        }
        `;

    const fragment_shader_source =
        `
        precision highp float;

        varying vec4 out_color;

        void main() {
            //gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
            gl_FragColor = out_color;
        }    
        `;

    const shader = new Shader(
            gl, 
            vertex_shader_source, 
            fragment_shader_source);

    const data = [
    //  position            color
        -1.0, -1.0, 0.0,    1.0, 0.0, 0.0, 1.0,
        1.0,  -1.0, 0.0,    0.0, 1.0, 0.0, 1.0,
        0.0,   1.0, 0.0,    0.0, 0.0, 1.0, 1.0
    ];

    const info = {
        attributes: {
            position: shader.get_attrib_location( 'position' ),
            color:    shader.get_attrib_location( 'color' )
        },
        uniforms: {
            model:      shader.get_uniform_location( 'Model' ),
            view:       shader.get_uniform_location( 'View' ),
            projection: shader.get_uniform_location( 'Projection' )
        }
    }

    var vbo = new VertexBufferObject(gl);
    vbo.buffer_static_array_data(data);

    const Model      = mat4x4_identity();
    var   View       = camera.get_transform();
    const Projection = perspective(radians(66.0), canvas.height / canvas.width, 0.1, 100.0);

    var old_time = 0.0;

    function render_loop(current_time) {

        var delta_time = current_time - old_time;
        old_time = current_time;
        console.log('render_loop: ' + delta_time);

        

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        View = camera.get_transform();
        vbo.bind();

        // specify attributes and proper offsets
        gl.vertexAttribPointer(info.attributes.position, 3, gl.FLOAT, gl.FALSE, 28, 0);
        gl.vertexAttribPointer(info.attributes.color,    4, gl.FLOAT, gl.FALSE, 28, 12);
        gl.enableVertexAttribArray(info.attributes.position);
        gl.enableVertexAttribArray(info.attributes.color);

        shader.use();

        gl.uniformMatrix4fv(info.uniforms.model,      gl.FALSE, Model.to_array());
        gl.uniformMatrix4fv(info.uniforms.view,       gl.FALSE, View.to_array());
        gl.uniformMatrix4fv(info.uniforms.projection, gl.FALSE, Projection.to_array());

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        //window.requestAnimationFrame(render_loop);
    }

    window.requestAnimationFrame(render_loop);
}

