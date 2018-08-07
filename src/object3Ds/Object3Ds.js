// import { GuiValues } from '../common/GuiValues.js';
//
// function Object3Ds(name, gui, object3D) {
//
//   this.folder = gui.addFolder(name);
//   this.folder.open();
//
//   // var GuiValues = function() {
//   //
//   //   this.visible = object3D.visible;
//   //
//   //   this.obj_num = 1;
//   //
//   //   this.position_x_min = object3D.position.x;
//   //   this.position_y_min = object3D.position.y;
//   //   this.position_z_min = object3D.position.z;
//   //
//   //   this.position_x_max = object3D.position.x;
//   //   this.position_y_max = object3D.position.y;
//   //   this.position_z_max = object3D.position.z;
//   //
//   //   this.rotation_x_min = object3D.rotation.x;
//   //   this.rotation_y_min = object3D.rotation.y;
//   //   this.rotation_z_min = object3D.rotation.z;
//   //
//   //   this.rotation_x_max = object3D.rotation.x;
//   //   this.rotation_y_max = object3D.rotation.y;
//   //   this.rotation_z_max = object3D.rotation.z;
//   //
//   //   this.scale_x_min = object3D.scale.x;
//   //   this.scale_y_min = object3D.scale.y;
//   //   this.scale_z_min = object3D.scale.z;
//   //
//   //   this.scale_x_max = object3D.scale.x;
//   //   this.scale_y_max = object3D.scale.y;
//   //   this.scale_z_max = object3D.scale.z;
//   //
//   // };
//   this.vals = new GuiValues();
//   this.vals.init();
//
//   for (var key in this.vals) {
//
//     this.init(key, this.vals[key]);
//
//   }
//
// }
//
// Object3Ds.prototype = {
//
//   init: function(key, val) {
//
//     switch (key) {
//
//       case 'visible': {
//
//         this.set('bool', key, val);
//
//         break;
//
//       };
//
//       default: {
//
//         this.set('number', key, val);
//
//       }
//
//     };
//
//   },
//
//   set: function() {
//
//   },
//
//   validation: function() {
//
//     return true;
//
//   },
//
//   add: function() {
//
//   },
//
//   change: function() {
//
//   }
//
// }
//
// export { Object3Ds };
