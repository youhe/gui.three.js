import { GuiValues } from './GuiValues.js';

function Uniforms(name, gui, uniforms) {

  this.folder = gui.addFolder(name);
  this.folder.open();

  this.uniforms = uniforms;

  this.vals = new GuiValues();

  for (var key in uniforms) {

    this.init(key, uniforms[key]);

  }

}


Uniforms.prototype = {

  init: function(key, vals) {

    let type = vals.type;

    switch (type) {

      case 'bool': {

        this.set(type, key, vals.value, vals.options);

        break;

      };

      case 'i': {

        this.set(type, key, vals.value, vals.options);

        break;

      };

      case 'f': {

        this.set(type, key, vals.value, vals.options);

        break;

      };

      case 'v2': {

        this.set(type, key + '_x', vals.value[0], vals.options);
        this.set(type, key + '_y', vals.value[1], vals.options);

        break;

      };

      case 'v3': {

        this.set(type, key + '_x', vals.value[0], vals.options);
        this.set(type, key + '_y', vals.value[1], vals.options);
        this.set(type, key + '_z', vals.value[2], vals.options);

        break;

      };

      case 'v4': {

        this.set(type, key + '_x', vals.value[0], vals.options);
        this.set(type, key + '_y', vals.value[1], vals.options);
        this.set(type, key + '_z', vals.value[2], vals.options);
        this.set(type, key + '_w', vals.value[2], vals.options);

        break;

      };

      case 'c': {

        let tValue = {};
        tValue.r = vals.value.r * 255;
        tValue.g = vals.value.g * 255;
        tValue.b = vals.value.b * 255;
        this.set(type, key, tValue, vals.options);

        break;

      };

    }

  },

  set: function(type, key, value, op) {

    let op_def = {
      visible: true,
      min: value / 2,
      max: value * 10,
      step: 0.1,
    };

    if (op !== undefined) {

      if (op.visible !== undefined) op_def.visible = op.visible;
      if (op.min !== undefined) op_def.min = op.min;
      if (op.max !== undefined) op_def.max = op.max;
      if (op.step !== undefined) op_def.step = op.step;

    }

    if (this.validation(op_def)) {

      this.add(type, key, value, op_def);

    }

  },

  validation: function(op) {

    if (!op.visible) return false;

    return true;

  },

  add: function(type, key, value, op) {

    this.vals.add(type, key, value);

    switch (type) {

      case 'bool': {

        this.folder.add(
          this.vals.values,
          key,
        ).onChange(()=> {
          this.change()
        });

        break;

      };

      case 'c': {

        this.folder.addColor(
          this.vals.values,
          key,
        ).onChange(()=> {
          this.change()
        });

        break;

      };

      default: {

        this.folder.add(
          this.vals.values,
          key,
          op.min,
          op.max,
        ).step(op.step).onChange(()=> {
          this.change()
        });

        break;

      };

    }

  },

  change: function() {

    for (var key in this.vals.values) {
      let tKey = this.vals.getKey(key);

      if (tKey != '') {

        let value = this.vals.getValue(key);
        this.uniforms[tKey].value = value;
        this.uniforms[tKey].needsUpdate = true;

      }

    }

  },
}

export { Uniforms };
