function Uniforms(name, gui, uniforms, folder = true, changeMethod = null) {
  this.u = uniforms;
  this.changeMethod = (changeMethod == null) ? function() {} : changeMethod;

  this.f = gui.addFolder(name);
  if (folder) this.f.open();

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
        o = this.setOps(key, this.u[key].value, 0);
        this.f.add(this.u[key], 'value')
        .name(o.name);
        break;
      };
      case 'c': {
        o = this.setOps(key, this.u[key].value, 0);
        this.u[key].tValue = this.u[key].value.clone();
        this.u[key].tValue.r = this.u[key].tValue.r * 255;
        this.u[key].tValue.g = this.u[key].tValue.g * 255;
        this.u[key].tValue.b = this.u[key].tValue.b * 255;
        this.f.addColor(this.u[key], 'tValue')
        .name(o.name)
        .onChange(()=> {
          this.u[key].value = {
            r: this.u[key].tValue.r / 255,
            g: this.u[key].tValue.g / 255,
            b: this.u[key].tValue.b / 255,
          };
          this.changeMethod();
        });
        break;
      };
      case 'v2': {
        this.addVector(key, 0);
        this.addVector(key, 1);
        break;
      };
      case 'v3': {
        this.addVector(key, 0);
        this.addVector(key, 1);
        this.addVector(key, 2);
        break;
      };
      case 'v4': {
        this.addVector(key, 0);
        this.addVector(key, 1);
        this.addVector(key, 2);
        this.addVector(key, 3);
        break;
      };
      case 'i': {
        o = this.setOps(key, this.u[key].value);
        this.f.add(this.u[key], 'value', o.min, o.max)
        .step(o.step)
        .name(o.name)
        .onChange(()=> {
          this.changeMethod();
        });
        break;
      };
      case 'f': {
        o = this.setOps(key, this.u[key].value);
        this.f.add(this.u[key], 'value', o.min, o.max)
        .step(o.step)
        .name(o.name)
        .onChange(()=> {
          this.changeMethod();
        });
        break;
      };
      default: {
      };
    }
  },

  setOps: function(key, value) {
    var ops = (this.u[key].options === undefined) ? {} : this.u[key].options;
    return {
      min:  (ops.min === undefined) ? value * 0.5 : ops.min,
      max:  (ops.max === undefined) ? value * 10 : ops.max,
      step: (ops.step === undefined) ? 0.1 : ops.step,
      name: (ops.name === undefined) ? key : ops.name,
    };
  },

  addVector: function(key, index) {
    let tKey;
    if (index == 0) tKey = (this.u[key].value[0]) ? 0 : 'x';
    else if (index == 1) tKey = (this.u[key].value[1]) ? 1 : 'y';
    else if (index == 2) tKey = (this.u[key].value[2]) ? 2 : 'z';

    const o = this.setOps(key, this.u[key].value[tKey]);
    const nameArr = ['x', 'y', 'z'];
    this.f.add(this.u[key].value, tKey, o.min, o.max)
    .step(o.step)
    .name(o.name + '_' + nameArr[index])
    .onChange(()=> {
      this.changeMethod();
    });
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
}

export { Uniforms };
