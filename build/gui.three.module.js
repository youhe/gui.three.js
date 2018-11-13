function Object3D(name, gui, object3D) {
  this.o = object3D;

  this.f = gui.addFolder(name);
  this.f.open();

  this.f.add(this.o.position, 'x', -2, 2).step(0.1).name('pos_x');
  this.f.add(this.o.position, 'y', -2, 2).step(0.1).name('pos_y');
  this.f.add(this.o.position, 'z', -2, 2).step(0.1).name('pos_z');

  this.f.add(this.o.rotation, 'x', -Math.PI, Math.PI).step(0.01).name('rot_x');
  this.f.add(this.o.rotation, 'y', -Math.PI, Math.PI).step(0.01).name('rot_y');
  this.f.add(this.o.rotation, 'z', -Math.PI, Math.PI).step(0.01).name('rot_z');

  this.f.add(this.o.scale, 'x', 0.1, 5).step(0.1).name('sca_x');
  this.f.add(this.o.scale, 'y', 0.1, 5).step(0.1).name('sca_y');
  this.f.add(this.o.scale, 'z', 0.1, 5).step(0.1).name('sca_z');
}

function Uniforms(name, gui, uniforms) {
  this.u = uniforms;

  this.f = gui.addFolder(name);
  this.f.open();

  for (var key in this.u) {
    this.addPrm(key);
  }
}


Uniforms.prototype = {
  addPrm: function(key) {
    var o, type = this.u[key].type;

    if (!this.validation(this.u[key].options)) return;

    switch (type) {
      case 'bool': {
        this.f.add(this.u[key], 'value').name(key);
        break;
      }
      case 'c': {
        o = this.setOps(key, this.u[key].value, 0);
        console.log(o);
        this.u[key].tValue = this.u[key].value.clone();
        this.u[key].tValue.r = this.u[key].tValue.r * 255;
        this.u[key].tValue.g = this.u[key].tValue.g * 255;
        this.u[key].tValue.b = this.u[key].tValue.b * 255;
        this.f.addColor(this.u[key], 'tValue').name(o.name).onChange(()=> {
          this.u[key].value = {
            r: this.u[key].tValue.r / 255,
            g: this.u[key].tValue.g / 255,
            b: this.u[key].tValue.b / 255,
          };
        });
        break;
      }
      case 'v2': {
        o = this.setOps(key, this.u[key].value[0]);
        this.f.add(this.u[key].value, 0, o.min, o.max).step(o.step).name(o.name + '_x');
        o = this.setOps(key, this.u[key].value[1]);
        this.f.add(this.u[key].value, 1, o.min, o.max).step(o.step).name(o.name + '_y');
        break;
      }
      case 'v3': {
        o = this.setOps(key, this.u[key].value[0]);
        this.f.add(this.u[key].value, 0, o.min, o.max).step(o.step).name(o.name + '_x');
        o = this.setOps(key, this.u[key].value[1]);
        this.f.add(this.u[key].value, 1, o.min, o.max).step(o.step).name(o.name + '_y');
        o = this.setOps(key, this.u[key].value[2]);
        this.f.add(this.u[key].value, 2, o.min, o.max).step(o.step).name(o.name + '_z');
        break;
      }
      case 'v4': {
        o = this.setOps(key, this.u[key].value[0]);
        this.f.add(this.u[key].value, 0, o.min, o.max).step(o.step).name(o.name + '_x');
        o = this.setOps(key, this.u[key].value[1]);
        this.f.add(this.u[key].value, 1, o.min, o.max).step(o.step).name(o.name + '_y');
        o = this.setOps(key, this.u[key].value[2]);
        this.f.add(this.u[key].value, 2, o.min, o.max).step(o.step).name(o.name + '_z');
        o = this.setOps(key, this.u[key].value[3]);
        this.f.add(this.u[key].value, 3, o.min, o.max).step(o.step).name(o.name + '_w');
        break;
      }
      case 'i': {
        o = this.setOps(key, this.u[key].value);
        this.f.add(this.u[key], 'value', o.min, o.max).step(o.step).name(o.name);
        break;
      }
      case 'f': {
        o = this.setOps(key, this.u[key].value);
        this.f.add(this.u[key], 'value', o.min, o.max).step(o.step).name(o.name);
        break;
      }
      default:
    }
  },

  setOps: function(key, value) {
    var ops = (this.u[key].options === undefined) ? {} : this.u[key].options;
    console.log(ops);
    return {
      min:  (ops.min === undefined) ? value * 0.5 : ops.min,
      max:  (ops.max === undefined) ? value * 10 : ops.max,
      step: (ops.step === undefined) ? 0.1 : ops.step,
      name: (ops.name === undefined) ? key : ops.name,
    };
  },

  validation: function(op) {
    if (op === undefined) {
      return true;
    }

    if (op.visible === false) {
      return false;
    }

    if (op.max < op.min) {
      console.error('Error: options max < min.');
      return false;
    }

    if (op.max < op.step) {
      console.error('Error: options max < step.');
      return false;
    }

    return true;
  },
};

export { Object3D, Uniforms };
