
console.log('Package: matrix.js');

class mat4x4 {

    constructor(diag=0.0) {
        this.data = [
            [ diag,  0.0,  0.0,  0.0 ],
            [  0.0, diag,  0.0,  0.0 ],
            [  0.0,  0.0, diag,  0.0 ],
            [  0.0,  0.0,  0.0, diag ]
        ];
    }

    get_at(y, x) { return this.data[y][x]; }
    set_at(y, x, val) { this.data[y][x] = val; }

    mul_s(scalar) {
        var m = new mat4x4();

        for(var y = 0; y < 4; y++) {
            for(var x = 0; x < 4; x++) {
                m.data[y][x] *= scalar;
            }
        }

        return m;
    }

    div_s(scalar) {
        return this.mul_s( 1.0 / scalar );
    }

    mul_v(vec) {
        v0 = (this.data[0][0]*vec.data[0])+(this.data[0][1]*vec.data[1])+(this.data[0][2]*vec.data[2])+(this.data[0][3]*vec.data[3]);
        v1 = (this.data[1][0]*vec.data[0])+(this.data[1][1]*vec.data[1])+(this.data[1][2]*vec.data[2])+(this.data[1][3]*vec.data[3]);
        v2 = (this.data[2][0]*vec.data[0])+(this.data[2][1]*vec.data[1])+(this.data[2][2]*vec.data[2])+(this.data[2][3]*vec.data[3]);
        v3 = (this.data[3][0]*vec.data[0])+(this.data[3][1]*vec.data[1])+(this.data[3][2]*vec.data[2])+(this.data[3][3]*vec.data[3]);

        return new vector4(v0, v1, v2, v3);
    }

    mul_m(mat) {

        const ax1=this.data[0][0]; const ax2=this.data[0][1]; const ax3=this.data[0][2]; const ax4=this.data[0][3];
        const ay1=this.data[1][0]; const ay2=this.data[1][1]; const ay3=this.data[1][2]; const ay4=this.data[1][3];
        const az1=this.data[2][0]; const az2=this.data[2][1]; const az3=this.data[2][2]; const az4=this.data[2][3];
        const aw1=this.data[3][0]; const aw2=this.data[3][1]; const aw3=this.data[3][2]; const aw4=this.data[3][3];

        const bx1=mat.data[0][0];  const bx2=mat.data[0][1];  const bx3=mat.data[0][2];  const bx4=mat.data[0][3];
        const by1=mat.data[1][0];  const by2=mat.data[1][1];  const by3=mat.data[1][2];  const by4=mat.data[1][3];
        const bz1=mat.data[2][0];  const bz2=mat.data[2][1];  const bz3=mat.data[2][2];  const bz4=mat.data[2][3];
        const bw1=mat.data[3][0];  const bw2=mat.data[3][1];  const bw3=mat.data[3][2];  const bw4=mat.data[3][3];

        var t = new mat4x4();

        t.data[0][0] = (ax1*bx1)+(ax2*by1)+(ax3*bz1)+(ax4*bw1);
        t.data[1][0] = (ay1*bx1)+(ay2*by1)+(ay3*bz1)+(ay4*bw1);
        t.data[2][0] = (az1*bx1)+(az2*by1)+(az3*bz1)+(az4*bw1);
        t.data[3][0] = (aw1*bx1)+(aw2*by1)+(aw3*bz1)+(aw4*bw1);

        t.data[0][1] = (ax1*bx2)+(ax2*by2)+(ax3*bz2)+(ax4*bw2);
        t.data[1][1] = (ay1*bx2)+(ay2*by2)+(ay3*bz2)+(ay4*bw2);
        t.data[2][1] = (az1*bx2)+(az2*by2)+(az3*bz2)+(az4*bw2);
        t.data[3][1] = (aw1*bx2)+(aw2*by2)+(aw3*bz2)+(aw4*bw2);

        t.data[0][2] = (ax1*bx3)+(ax2*by3)+(ax3*bz3)+(ax4*bw3);
        t.data[1][2] = (ay1*bx3)+(ay2*by3)+(ay3*bz3)+(ay4*bw3);
        t.data[2][2] = (az1*bx3)+(az2*by3)+(az3*bz3)+(az4*bw3);
        t.data[3][2] = (aw1*bx3)+(aw2*by3)+(aw3*bz3)+(aw4*bw3);

        t.data[0][3] = (ax1*bx4)+(ax2*by4)+(ax3*bz4)+(ax4*bw4);
        t.data[1][3] = (ay1*bx4)+(ay2*by4)+(ay3*bz4)+(ay4*bw4);
        t.data[2][3] = (az1*bx4)+(az2*by4)+(az3*bz4)+(az4*bw4);
        t.data[3][3] = (aw1*bx4)+(aw2*by4)+(aw3*bz4)+(aw4*bw4);

        return t;
    }

};

function mat4x4_diagonal(val) {
    return mat4x4(val);
}

function mat4x4_identity() {
    return mat4x4(1.0);
}
