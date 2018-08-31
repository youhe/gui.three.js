(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.GUITHREE = {})));
}(this, (function (exports) { 'use strict';

	function GuiValues() {

	  this.folder = null;

	}

	GuiValues.prototype = {

	  init: function(name, gui, parentClass) {

	    this.folder = gui.addFolder(name);
	    this.folder.open();
	    this.parentClass = parentClass;

	  },

	  add: function(type, key, val, ops) {

	    this[key] = val;

	    switch (type) {

	      case 'bool': {

	        this.folder.add(
	          this, key,
	        )
	        .onChange(()=> {this.parentClass.change();});

	        break;

	      }

	      case 'c': {

	        this.folder.addColor(
	          this, key
	        )
	        .onChange(()=> {this.parentClass.change();});

	        break;

	      }

	      case 'num': {

	        if (this.validation_type_f(val, ops)) return;

	        this.folder.add(
	          this, key,
	          ops.min, ops.max
	        ).step(ops.step)
	        .onChange(()=> {this.parentClass.change();});

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

	};

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
	      }

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
	      }

	      case 'v2':
	      case 'v3':
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
	      }

	      case 'm2v':
	      case 'm3v':
	      case 'm4v': {

	        break;
	      }

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
	      }

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

	    }
	  },

	};

	exports.Object3D = Object3D;
	exports.Uniforms = Uniforms;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
