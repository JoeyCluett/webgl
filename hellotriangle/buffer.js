'use strict';
console.log('Package: buffer.js');

class VertexBufferObject {

    constructor(gl) {
        this.gl     = gl;
        this.vbo_id = gl.createBuffer();

        // space needed to specify operation
        this.buffer_type = null;
    }

    buffer_static_array_data(data) {
        this.buffer_type = this.gl.ARRAY_BUFFER;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo_id);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    }

    bind() {
        this.gl.bindBuffer(this.buffer_type, this.vbo_id);
    }

};

class VertexArrayObject {

    constructor() {

    }

};
