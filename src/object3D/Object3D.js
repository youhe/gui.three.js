import { GuiValues } from '../common/GuiValues.js';

function Object3D(name, gui, object3D) {

  this.object3D = object3D;

  this.vals = new GuiValues();
  this.vals.init(name, gui, this);

  this.vals.add(
    'bool', 'visible',
    this.object3D.visible,
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
    pos_ops
  );
  this.vals.add(
    'num', 'pos_y',
    this.object3D.position.y,
    pos_ops
  );
  this.vals.add(
    'num', 'pos_z',
    this.object3D.position.z,
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
    rot_ops
  );
  this.vals.add(
    'num', 'rot_y',
    this.object3D.rotation.y,
    rot_ops
  );
  this.vals.add(
    'num', 'rot_z',
    this.object3D.rotation.z,
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
    scale_ops
  );
  this.vals.add(
    'num', 'scale_y',
    this.object3D.scale.y,
    scale_ops
  );
  this.vals.add(
    'num', 'scale_z',
    this.object3D.scale.z,
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

}

export { Object3D };
