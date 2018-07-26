(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.GUITHREE = {})));
}(this, (function (exports) { 'use strict';

	function Object3D(name, gui, object3D) {

	  this.folder = gui.addFolder(name);
	  this.folder.open();

	  this.object3D = object3D;

	  var GuiValues = function() {

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

	      }

	      default: {

	        this.set('number', key, val);

	        break;

	      }

	    }
	  },

	  set: function(type, key, value) {

	    var op_def = {
	      min: -2,
	      max: 2,
	      step: 0.01
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
	          this.vals, key
	        ).onChange(()=> {
	          this.change();
	        });

	        break;

	      }

	      default: {

	        this.folder.add(
	          this.vals,
	          key,
	          op.min,
	          op.max
	        ).step(op.step)
	        .onChange(()=> {
	          this.change();
	        });

	      }

	    }
	  },

	  change: function() {

	    this.object3D.visible = this.vals.visible;

	    this.object3D.position.set(
	      this.vals.position_x,
	      this.vals.position_y,
	      this.vals.position_z
	    );

	    this.object3D.rotation.set(
	      this.vals.rotation_x * Math.PI / 180,
	      this.vals.rotation_y * Math.PI / 180,
	      this.vals.rotation_z * Math.PI / 180
	    );

	    this.object3D.scale.set(
	      this.vals.scale_x,
	      this.vals.scale_y,
	      this.vals.scale_z
	    );

	  },
	};

	function GuiValues() {

	  this.types = {};
	  this.values = {};

	}

	GuiValues.prototype = {

	  add: function(type, key, value) {

	    this.types[key] = type;
	    this.values[key] = value;

	  },

	  getKey: function(key) {

	    switch (this.types[key]) {

	      case 'v2': {

	        if (0 <= key.indexOf('_x')) {
	          return key.slice(0, -2);
	        }
	        return '';

	        break;

	      }

	      case 'v3': {

	        if (0 <= key.indexOf('_x')) {
	          return key.slice(0, -2);
	        }
	        return '';

	        break;

	      }

	      case 'v4': {

	        if (0 <= key.indexOf('_x')) {
	          return key.slice(0, -2);
	        }
	        return '';

	        break;

	      }

	      default: {

	        return key;

	        break;

	      }

	    }

	  },

	  getValue: function(key) {

	    switch (this.types[key]) {

	      case 'v2': {

	        var tKey = key.slice(0, -2);
	        return new THREE.Vector2(
	          this.values[tKey + '_x'],
	          this.values[tKey + '_y']
	        );

	        break;

	      }

	      case 'v3': {

	        var tKey = key.slice(0, -2);
	        return [
	          this.values[tKey + '_x'],
	          this.values[tKey + '_y'],
	          this.values[tKey + '_z']
	        ];

	        break;

	      }

	      case 'v4': {

	        var tKey = key.slice(0, -2);
	        return [
	          this.values[tKey + '_x'],
	          this.values[tKey + '_y'],
	          this.values[tKey + '_z'],
	          this.values[tKey + '_w']
	        ];

	        break;

	      }

	      case 'c': {

	        return {
	          r: this.values[key].r / 255,
	          g: this.values[key].g / 255,
	          b: this.values[key].b / 255
	        };

	        break;

	      }

	      default: {

	        return this.values[key];

	        break;

	      }

	    }

	  }

	};

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

	    var type = vals.type;

	    switch (type) {

	      case 'bool': {

	        this.set(type, key, vals.value, vals.options);

	        break;

	      }

	      case 'i': {

	        this.set(type, key, vals.value, vals.options);

	        break;

	      }

	      case 'f': {

	        this.set(type, key, vals.value, vals.options);

	        break;

	      }

	      case 'v2': {

	        this.set(type, key + '_x', vals.value[0], vals.options);
	        this.set(type, key + '_y', vals.value[1], vals.options);

	        break;

	      }

	      case 'v3': {

	        this.set(type, key + '_x', vals.value[0], vals.options);
	        this.set(type, key + '_y', vals.value[1], vals.options);
	        this.set(type, key + '_z', vals.value[2], vals.options);

	        break;

	      }

	      case 'v4': {

	        this.set(type, key + '_x', vals.value[0], vals.options);
	        this.set(type, key + '_y', vals.value[1], vals.options);
	        this.set(type, key + '_z', vals.value[2], vals.options);
	        this.set(type, key + '_w', vals.value[2], vals.options);

	        break;

	      }

	      case 'c': {

	        var tValue = {};
	        tValue.r = vals.value.r * 255;
	        tValue.g = vals.value.g * 255;
	        tValue.b = vals.value.b * 255;
	        this.set(type, key, tValue, vals.options);

	        break;

	      }

	    }

	  },

	  set: function(type, key, value, op) {

	    var op_def = {
	      visible: true,
	      min: value / 2,
	      max: value * 10,
	      step: 0.1
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
	          key
	        )
	        .onChange(()=> {
	          this.change();
	        });

	        break;

	      }

	      case 'c': {

	        this.folder.addColor(
	          this.vals.values,
	          key
	        )
	        .onChange(()=> {
	          this.change();
	        });

	        break;

	      }

	      default: {

	        this.folder.add(
	          this.vals.values,
	          key,
	          op.min,
	          op.max
	        ).step(op.step)
	        .onChange(()=> {
	          this.change();
	        });

	        break;

	      }

	    }

	  },

	  change: function() {

	    for (var key in this.vals.values) {
	      var tKey = this.vals.getKey(key);

	      if (tKey != '') {

	        var value = this.vals.getValue(key);
	        this.uniforms[tKey].value = value;
	        this.uniforms[tKey].needsUpdate = true;

	      }

	    }

	  },
	};

	exports.Object3D = Object3D;
	exports.Uniforms = Uniforms;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
