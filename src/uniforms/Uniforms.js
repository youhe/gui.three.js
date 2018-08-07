import { GuiValues } from '../common/GuiValues.js';

function Uniforms(name, gui, uniforms) {

  this.uniforms = uniforms;

  this.vals = new GuiValues();
  this.vals.init(name, gui);


  for (var key in uniforms) {

    this.addVals(key, uniforms[key]);

  }

}


Uniforms.prototype = {

  addVals: function(key, vals) {

    var type = vals.type;

    switch (type) {

      case 'bool': {

        this.vals.add(
          'bool', key,
          vals.value,
          this,
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
          this,
          null
        );

        break;

      };

      case 'v3': {

        var keyStr = ['_x', '_y', '_z'];
        var value = vals.value;
        var ops = vals.options;
        var ops_def = {
          visible: true,
          min: value.x / 2,
          max: value.x * 10,
          step: 0.1
        };

        if (ops !== undefined) {

          if (ops.visible !== undefined)
            ops_def.visible = ops.visible;
          if (ops.min !== undefined)
            ops_def.min = ops.min;
          if (ops.max !== undefined)
            ops_def.max = ops.max;
          if (ops.step !== undefined)
            ops_def.step = ops.step;

        }

        for (var i = 0; i < value.length; i++) {
          this.vals.add(
            'num', key + keyStr[i],
            value[i],
            this,
            ops_def
          );
        }


        break;

      };

      default: {

        var value = vals.value;
        var ops = vals.options;

        var ops_def = {
          visible: true,
          min: value / 2,
          max: value * 10,
          step: 0.1
        };


        if (ops !== undefined) {

          if (ops.visible !== undefined)
            ops_def.visible = ops.visible;
          if (ops.min !== undefined)
            ops_def.min = ops.min;
          if (ops.max !== undefined)
            ops_def.max = ops.max;
          if (ops.step !== undefined)
            ops_def.step = ops.step;

        }

        this.vals.add(
          'num', key,
          value,
          this,
          ops_def
        );

        break;

      };

    }

  },

  validation: function(op) {

    if (!op.visible) return false;

    return true;

  },

  change: function() {

    for (var key in this.uniforms) {
      var vals = this.uniforms[key];
      var type = vals.type;

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

  },

}

export { Uniforms };
