import { GuiValues } from '../common/GuiValues.js';

function Uniforms(name, gui, uniforms) {
  this.uniforms = uniforms;

  this.vals = new GuiValues();
  this.vals.init(name, gui, this);

  for (var key in this.uniforms) {

    this.addVals(key, this.uniforms[key]);

  }
}


Uniforms.prototype = {

  addVals: function(key, vals) {
    var type = vals.type;
    vals.isDisplay = true;

    if (!this.validation(vals.options)) {
      vals.isDisplay = false;
      return;
    }

    switch (type) {

      case 'bool': {
        this.vals.add(
          'bool', key,
          vals.value,
          null
        );

        break;
      };

      case 'c': {
        var value = vals.value.clone();
        value.r = value.r * 255;
        value.g = value.g * 255;
        value.b = value.b * 255;

        this.vals.add(
          'c', key,
          value,
          null
        );

        break;
      };

      case 'v2': {},
      case 'v3': {},
      case 'v4': {
        var keyStr = ['x', 'y', 'z', 'w'];
        var value = vals.value;
        var ops = (vals.options === undefined) ? {} : vals.options;

        for (var i = 0; i < value.length; i++) {
          var ops_def = {
            visible: (ops.visible === undefined) ? true : ops.visible,
            min:     (ops.min === undefined) ? value[i] * 0.5 : ops.min,
            max:     (ops.max === undefined) ? value[i] * 10 : ops.max,
            step:    (ops.step === undefined) ? 0.1 : ops.step,
          };
          this.vals.add(
            'num', key + '_' + keyStr[i],
            value[i],
            ops_def
          );
        }

        break;
      };

      case 'm2v': {},
      case 'm3v': {},
      case 'm4v': {

        break;
      };

      default: {
        var value = vals.value;
        var ops = (vals.options === undefined) ? {} : vals.options;
        var ops_def = {
          visible: (ops.visible === undefined) ? true : ops.visible,
          min:     (ops.min === undefined) ? value[i] * 0.5 : ops.min,
          max:     (ops.max === undefined) ? value[i] * 10 : ops.max,
          step:    (ops.step === undefined) ? 0.1 : ops.step,
        };

        this.vals.add(
          'num', key,
          value,
          ops_def
        );

        break;
      };

    }
  },

  validation: function(op) {
    if (op === undefined) return true;

    if (op.visible === false) return false;
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

  change: function() {
    for (var key in this.uniforms) {
      var vals = this.uniforms[key];
      var type = vals.type;

      if (vals.isDisplay) {

        switch (type) {

          case 'c': {
            this.uniforms[key].value = {
              r: this.vals[key].r / 255,
              g: this.vals[key].g / 255,
              b: this.vals[key].b / 255,
            };
            this.uniforms[key].needsUpdate = true;

            break;

          };

          case 'v3': {
            this.uniforms[key].value = {
              x: this.vals[key + '_x'],
              y: this.vals[key + '_y'],
              z: this.vals[key + '_z'],
            };
            this.uniforms[key].needsUpdate = true;

            break;

          };

          default: {
            this.uniforms[key].value = this.vals[key];
            this.uniforms[key].needsUpdate = true;

            break;

          };

        }

      }

    }
  },

}

export { Uniforms };
