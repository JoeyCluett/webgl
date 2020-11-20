
console.log('Package: camera.js');

class Camera {

    constructor(pos, speed, screenW, screenH, mouse_speed, canvas_ref) {
        this.position  = pos; // vector3 type
        this.direction = new vector3();

        this._horizontal_angle = 0.0;
        this._vertical_angle   = 0.0;

        this.speed       = speed;
        this.screenW     = screenW;
        this.screenH     = screenH;
        this.mouse_speed = mouse_speed;
        this.canvas_ref  = canvas_ref;

        // bounds checking when relevant
        this.is_bounded = false;
        this.min_bounds = new vector3();
        this.max_bounds = new vector3();
    }

    set_look_at(look) {
        this.direction = normalize( 
                new vector3( 
                        look.x() - this.position.x(),
                        look.y() - this.position.y(),
                        look.z() - this.position.z()
                ));
    }

    update(delta_time, x_pos, y_pos, key_up=false, key_down=false, key_left=false, key_right=false) {

        this._horizontal_angle += this.mouse_speed * delta_time * (this.screenW/2 - x_pos);
        this._vertical_angle   += this.mouse_speed * delta_time * (this.screenH/2 - y_pos);

        this.direction = new vector3(
                Math.cos(this._vertical_angle) * Math.sin(this._horizontal_angle),
                Math.sin(this._vertical_angle),
                Math.cos(this._vertical_angle) * Math.sin(this._horizontal_angle));

        const right = new vector3(
            Math.sin(this._horizontal_angle - Math.PI/2.0),
            0.0,
            Math.cos(this._horizontal_angle - Math.PI/2.0));

        // matrix * scalar multiplication is done on a per element basis
        const delta_time_speed = delta_time * this.speed;

        // i hate this format
        if(key_up)    this.position = this.position.add_v( this.direction.mul_s( delta_time_speed ) )
        if(key_down)  this.position = this.position.sub_v( this.direction.mul_s( delta_time_speed ) )
        if(key_right) this.position = this.position.add_v( right.mul_s( delta_time_speed ) )
        if(key_left)  this.position = this.position.sub_v( right.mul_s( delta_time_speed ) )

        // bounds checks
        if(this.is_bounded) {
            const clamp = function(max, min, inp) {
                if(inp < min) return min;
                if(inp > max) return max;
                return inp;
            }
    
            this.position.x( clamp(this.max_bounds.x(), this.min_bounds.x(), this.position.x()) );
            this.position.y( clamp(this.max_bounds.y(), this.min_bounds.y(), this.position.y()) );
            this.position.z( clamp(this.max_bounds.z(), this.min_bounds.z(), this.position.z()) );
        }
    }

    get_transform() {
        return lookAt(
            this.position, 
            this.position.add_v(this.direction),
            new vector3( 0.0, 1.0, 0.0 ));
    }

};