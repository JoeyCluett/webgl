'use strict';
console.log('Package: transform.js');

function radians(_degrees) {
    return Math.PI * _degrees / 180.0;
}

function degrees(_radians) {
    return 180.0 * _radians / Math.PI;
}

// assume [0.0, 1.0]
function perspectiveRH(field_of_view, aspect_ratio, near_clip, far_clip) {

    const tanHalfFov = Math.tan( field_of_view / 2.0 );

    var R = new mat4x4(0.0);

    R.data[0][0] = 1.0 / (aspect_ratio * tanHalfFov);
    R.data[1][1] = 1.0 / tanHalfFov;
    R.data[2][2] = far_clip / ( near_clip - far_clip );
    R.data[2][3] = -1.0;
    R.data[3][2] = -(far_clip * near_clip) / (far_clip - near_clip);

    return R;
}

function perspective(field_of_view, aspect_ratio, near_clip, far_clip) {
    return perspectiveRH(field_of_view, aspect_ratio, near_clip, far_clip);
}

function normalize(v3) {

    const x = v3.data[0];
    const y = v3.data[1];
    const z = v3.data[2];

    const mag = Math.sqrt( x*x + y*y + z*z );

    v3.data[0] = x / mag;
    v3.data[1] = y / mag;
    v3.data[2] = z / mag;

    return v3;
}

function cross(a, b) {
    return new vector3(
        a.y()*b.z() - a.z()*b.y(),
        a.z()*b.x() - a.x()*b.z(),
        a.x()*b.y() - a.y()*b.x());
}

function dot(a, b) {
    return a.x()*b.x() + a.y()*b.y() + a.z()*b.z();
}

function lookAtRH(eye, center, up) {
    const f = normalize(center.sub_v(eye)); // center - eye
    const s = normalize(cross( f, up ));
    const u = cross( s, f );

    var R = new mat4x4(1.0);

    R.data[0][0] = s.x();
    R.data[1][0] = s.y();
    R.data[2][0] = s.z();

    R.data[0][1] = u.x();
    R.data[1][1] = u.y();
    R.data[2][1] = u.z();

    R.data[0][2] = -f.x();
    R.data[1][2] = -f.y();
    R.data[2][2] = -f.z();

    R.data[3][0] = -dot( s, eye );
    R.data[3][1] = -dot( u, eye );
    R.data[3][2] =  dot( f, eye );

    return R;
}

/*
// incorrect, dont use
function lookAtLH(eye, center, up) {
    const f = normalize(center.sub_v(eye));
    const s = normalize(cross( f, up ));
    const u = cross( s, f );

    R = new mat4x4(1.0);

    R.data[0][0] = s.x();
    R.data[1][0] = s.y();
    R.data[2][0] = s.z();

    R.data[0][1] = u.x();
    R.data[1][1] = u.y();
    R.data[2][1] = u.z();

    R.data[0][2] = -f.x();
    R.data[1][2] = -f.y();
    R.data[2][2] = -f.z();

    R.data[3][0] = -dot( s, eye );
    R.data[3][1] = -dot( u, eye );
    R.data[3][2] = -dot( f, eye );

    return R;
}
*/

function lookAt(eye, center, up) {
    return lookAtRH(eye, center, up);
}
