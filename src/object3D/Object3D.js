function Object3D(name, gui, object3D) {

  this.folder = gui.addFolder(name);
  this.folder.open();

  this.object3D = object3D;

  const GuiValues = function() {

    this.visible = object3D.visible;

    this.position_x = object3D.position.x;
    this.position_y = object3D.position.y;
    this.position_z = object3D.position.z;

    this.rotation_x = object3D.rotation.x;
    this.rotation_y = object3D.rotation.y;
    this.rotation_z = object3D.rotation.z;

    this.scale_x = object3D.scale.x;
    this.scale_y = object3D.scale.y;
    this.scale_z = object3D.scale.z;

  };
  this.vals = new GuiValues();

  for (var key in this.vals) {

    this.init(key, this.vals[key]);

  }

}


Object3D.prototype = {

  init: function(key, val) {

    switch (key) {

      case 'visible': {

        this.set('bool', key, val);

        break;

      };

      default: {

        this.set('number', key, val);

        break;

      }

    };

  },

  set: function(type, key, value) {

    let op_def = {
      min: -2,
      max: 2,
      step: 0.01,
    };

    if (0 <= key.indexOf('rotation')) {

      op_def.min = -180;
      op_def.max = 180;
      op_def.step = 1;

    }

    if (0 <= key.indexOf('scale')) {

      op_def.min = 0.1;
      op_def.max = 5;

    }

    if (this.validation(op_def)) {

      this.add(type, key, value, op_def);

    }

  },

  validation: function(op) {

    return true;

  },

  add: function(type, key, value, op) {

    switch (type) {

      case 'bool': {

        this.folder.add(
          this.vals,
          key,
        ).onChange(()=> {
          this.change()
        });

        break;

      };

      default: {

        this.folder.add(
          this.vals,
          key,
          op.min,
          op.max,
        ).step(op.step).onChange(()=> {
          this.change()
        });

      };

    };

  },

  change: function() {

    this.object3D.visible = this.vals.visible;

    this.object3D.position.set(
      this.vals.position_x,
      this.vals.position_y,
      this.vals.position_z,
    );

    this.object3D.rotation.set(
      this.vals.rotation_x * Math.PI / 180,
      this.vals.rotation_y * Math.PI / 180,
      this.vals.rotation_z * Math.PI / 180,
    );

    this.object3D.scale.set(
      this.vals.scale_x,
      this.vals.scale_y,
      this.vals.scale_z,
    );

  },
}

export { Object3D };
