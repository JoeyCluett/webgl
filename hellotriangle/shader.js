
console.log('Package: shader.js');


function load_shader(gl, shader_type, shader_source) {
    const shader = gl.createShader(shader_type);

    gl.shaderSource( shader, shader_source );
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var msg = 'An error occured compiling shader: ' + gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw msg;
    }

    return shader;
}

class Shader {
    constructor(gl, vertex_source, fragment_source) {

        const vertex_shader   = load_shader(gl, gl.VERTEX_SHADER,   vertex_source);
        const fragment_shader = load_shader(gl, gl.FRAGMENT_SHADER, fragment_source);
        const shader_program  = gl.createProgram();

        gl.attachShader(shader_program, vertex_shader);
        gl.attachShader(shader_program, fragment_shader);
        gl.linkProgram(shader_program);

        if(!gl.getProgramParameter(shader_program, gl.LINK_STATUS)) {
            throw 'An error occured linking shader: ' + gl.getProgramInfoLog(shader_program)
        }

        this.vertex_shader   = vertex_shader;
        this.fragment_shader = fragment_shader;
        this.shader_program  = shader_program;
    }



}
