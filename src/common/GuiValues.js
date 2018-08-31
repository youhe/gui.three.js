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
        .onChange(()=> {this.parentClass.change()});

        break;

      };

      case 'c': {

        this.folder.addColor(
          this, key
        )
        .onChange(()=> {this.parentClass.change()});

        break;

      };

      case 'num': {

        if (this.validation_type_f(val, ops)) return;

        this.folder.add(
          this, key,
          ops.min, ops.max
        ).step(ops.step)
        .onChange(()=> {this.parentClass.change()});

        break;

      };

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

}

export { GuiValues };
