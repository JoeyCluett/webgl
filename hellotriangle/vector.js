
console.log('Package: vector.js');

class vector3 {
    constructor(x=0.0, y=0.0, z=0.0) {
        this.data = [ x, y, z ];
    }

    x(_x = null) {
        if(_x == null) { return this.data[0]; }
        else { this.data[0] = _x; }
    }

    y(_y = null) {
        if(_y == null) { return this.data[1]; }
        else { this.data[1] = _y; }
    }

    z(_z = null) {
        if(_z == null) { return this.data[2]; }
        else { this.data[2] = _z; }
    }

    mul_s(scalar) {
        return new vector3(
                this.data[0] * scalar, 
                this.data[1] * scalar, 
                this.data[2] * scalar);
    }

    div_s(scalar) {
        return new vector3(
                this.data[0] / scalar, 
                this.data[1] / scalar, 
                this.data[2] / scalar);
    }

    add_s(scalar) {
        return new vector3(
                this.data[0] + scalar, 
                this.data[1] + scalar, 
                this.data[2] + scalar);
    }

    sub_s(scalar) {
        return new vector3(
                this.data[0] - scalar, 
                this.data[1] - scalar, 
                this.data[2] - scalar);
    }

    mul_v(vector) {
        return new vector3(
                this.data[0] * vector.data[0], 
                this.data[1] * vector.data[1], 
                this.data[2] * vector.data[2]);
    }

    div_v(vector) {
        return new vector3(
                this.data[0] / vector.data[0], 
                this.data[1] / vector.data[1], 
                this.data[2] / vector.data[2]);
    }

    add_v(vector) {
        return new vector3(
                this.data[0] + vector.data[0], 
                this.data[1] + vector.data[1], 
                this.data[2] + vector.data[2]);
    }

    sub_v(vector) {
        return new vector3(
                this.data[0] - vector.data[0], 
                this.data[1] - vector.data[1], 
                this.data[2] - vector.data[2]);
    }

    normalized() {

        const x = this.data[0];
        const y = this.data[1];
        const z = this.data[2];

        const mag = Math.sqrt( x*x + y*y + z*z );

        return new vector3( 
                x / mag, 
                y / mag, 
                z / mag);
    }

};

class vector4 {
    constructor(x=0.0, y=0.0, z=0.0, w=1.0) {
        this.data = [ x, y, z, w ];
    }

    x(_x = null) {
        if(_x == null) { return this.data[0]; }
        else { this.data[0] = _x; }
    }

    y(_y = null) {
        if(_y == null) { return this.data[1]; }
        else { this.data[1] = _y; }
    }

    z(_z = null) {
        if(_z == null) { return this.data[2]; }
        else { this.data[2] = _z; }
    }

    w(_w = null) {
        if(_w == null) { return this.data[3]; }
        else { this.data[3] = _w; }
    }

    mul_s(scalar) {
        return new vector4(
            this.data[0] * scalar, this.data[1] * scalar, 
            this.data[2] * scalar, this.data[3] * scalar);
    }

    div_s(scalar) {
        return new vector4(
            this.data[0] / scalar, this.data[1] / scalar, 
            this.data[2] / scalar, this.data[3] / scalar);
    }

    mul_v(vector) {
        return new vector4(
            this.data[0] * vector.data[0], this.data[1] * vector.data[1],
            this.data[2] * vector.data[2], this.data[3] * vector.data[3]
        );
    }

    div_v(vector) {
        return new vector4(
            this.data[0] / vector.data[0], this.data[1] / vector.data[1],
            this.data[2] / vector.data[2], this.data[3] / vector.data[3]
        );
    }

};

