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
        .onChange(()=> {parentClass.change()});

        break;

      };

      case 'c': {

        this.folder.addColor(
          this, key
        )
        .onChange(()=> {parentClass.change()});

        break;

      };

      case 'num': {

        if (this.validation_type_f(val, ops)) return;

        this.folder.add(
          this, key,
          ops.min, ops.max
        ).step(ops.step)
        .onChange(()=> {parentClass.change()});

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
