function Uniforms(name, gui, uniforms, changeMethod = null) {
  this.u = uniforms;
  this.changeMethod = (changeMethod == null) ? function() {} : changeMethod;

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
        this.f.add(this.u[key], 'value')
        .name(key);
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
        o = this.setOps(key, this.u[key].value[0]);
        this.f.add(this.u[key].value, 0, o.min, o.max)
        .step(o.step)
        .name(o.name + '_x')
        .onChange(()=> {
          this.changeMethod();
        });

        o = this.setOps(key, this.u[key].value[1]);
        this.f.add(this.u[key].value, 1, o.min, o.max)
        .step(o.step)
        .name(o.name + '_y')
        .onChange(()=> {
          this.changeMethod();
        });
        break;
      };
      case 'v3': {
        o = this.setOps(key, this.u[key].value[0]);
        this.f.add(this.u[key].value, 0, o.min, o.max)
        .step(o.step)
        .name(o.name + '_x')
        .onChange(()=> {
          this.changeMethod();
        });
        o = this.setOps(key, this.u[key].value[1]);
        this.f.add(this.u[key].value, 1, o.min, o.max)
        .step(o.step)
        .name(o.name + '_y')
        .onChange(()=> {
          this.changeMethod();
        });
        o = this.setOps(key, this.u[key].value[2]);
        this.f.add(this.u[key].value, 2, o.min, o.max)
        .step(o.step)
        .name(o.name + '_z')
        .onChange(()=> {
          this.changeMethod();
        });
        break;
      };
      case 'v4': {
        o = this.setOps(key, this.u[key].value[0]);
        this.f.add(this.u[key].value, 0, o.min, o.max)
        .step(o.step)
        .name(o.name + '_x')
        .onChange(()=> {
          this.changeMethod();
        });
        o = this.setOps(key, this.u[key].value[1]);
        this.f.add(this.u[key].value, 1, o.min, o.max)
        .step(o.step)
        .name(o.name + '_y')
        .onChange(()=> {
          this.changeMethod();
        });
        o = this.setOps(key, this.u[key].value[2]);
        this.f.add(this.u[key].value, 2, o.min, o.max)
        .step(o.step)
        .name(o.name + '_z')
        .onChange(()=> {
          this.changeMethod();
        });
        o = this.setOps(key, this.u[key].value[3]);
        this.f.add(this.u[key].value, 3, o.min, o.max)
        .step(o.step)
        .name(o.name + '_w')
        .onChange(()=> {
          this.changeMethod();
        });
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
