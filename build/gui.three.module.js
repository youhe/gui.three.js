function GuiValues() {

  this.folder = null;

}

GuiValues.prototype = {

  init: function(name, gui) {

    this.folder = gui.addFolder(name);
    this.folder.open();

  },

  add: function(type, key, val, parentClass, ops) {

    this[key] = val;

    switch (type) {

      case 'bool': {

        this.folder.add(
          this, key,
        )
        .onChange(()=> {parentClass.change();});

        break;

      }

      case 'c': {

        this.folder.addColor(
          this, key
        )
        .onChange(()=> {parentClass.change();});

        break;

      }

      case 'num': {

        if (this.validation_type_f(val, ops)) return;

        this.folder.add(
          this, key,
          ops.min, ops.max
        ).step(ops.step)
        .onChange(()=> {parentClass.change();});

        break;

      }

    }

  },

  validation_type_f: function(val, ops) {
    if (val === null) {
      console.error('Error: value is null.');
      return true;
    }

    if (!ops) {
      console.error('Error: options is null.');
      return true;
    }
  },

};

function Object3D(name, gui, object3D) {

  this.object3D = object3D;

  this.vals = new GuiValues();
  this.vals.init(name, gui);

  this.vals.add(
    'bool', 'visible',
    this.object3D.visible,
    this,
    null
  );

  var pos_ops = {
    min: -2,
    max: 2,
    step: .1
  };
  this.vals.add(
    'num', 'pos_x',
    this.object3D.position.x,
    this,
    pos_ops
  );
  this.vals.add(
    'num', 'pos_y',
    this.object3D.position.y,
    this,
    pos_ops
  );
  this.vals.add(
    'num', 'pos_z',
    this.object3D.position.z,
    this,
    pos_ops
  );

  var rot_ops = {
    min: -180,
    max: 180,
    step: 1
  };
  this.vals.add(
    'num', 'rot_x',
    this.object3D.rotation.x,
    this,
    rot_ops
  );
  this.vals.add(
    'num', 'rot_y',
    this.object3D.rotation.y,
    this,
    rot_ops
  );
  this.vals.add(
    'num', 'rot_z',
    this.object3D.rotation.z,
    this,
    rot_ops
  );

  var scale_ops = {
    min: 0.1,
    max: 5,
    step: .1
  };
  this.vals.add(
    'num', 'scale_x',
    this.object3D.scale.x,
    this,
    scale_ops
  );
  this.vals.add(
    'num', 'scale_y',
    this.object3D.scale.y,
    this,
    scale_ops
  );
  this.vals.add(
    'num', 'scale_z',
    this.object3D.scale.z,
    this,
    scale_ops
  );
}


Object3D.prototype = {

  change: function() {

    this.object3D.visible = this.vals.visible;

    this.object3D.position.set(
      this.vals.pos_x,
      this.vals.pos_y,
      this.vals.pos_z
    );

    this.object3D.rotation.set(
      this.vals.rot_x * Math.PI / 180,
      this.vals.rot_y * Math.PI / 180,
      this.vals.rot_z * Math.PI / 180
    );

    this.object3D.scale.set(
      this.vals.scale_x,
      this.vals.scale_y,
      this.vals.scale_z
    );

  },

};

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

      }

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

      }

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

      }

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

      }

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

        }

        case 'v3': {
          this.uniforms[key].value = {
            x: this.vals[key + '_x'],
            y: this.vals[key + '_y'],
            z: this.vals[key + '_z'],
          };
          this.uniforms[key].needsUpdate = true;

          break;

        }

        default: {
          this.uniforms[key].value = this.vals[key];
          this.uniforms[key].needsUpdate = true;

          break;

        }

      }

    }

  },

};

export { Object3D, Uniforms };
