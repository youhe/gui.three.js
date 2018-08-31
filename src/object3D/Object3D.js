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

export { Object3D };
