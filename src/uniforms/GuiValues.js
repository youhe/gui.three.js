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

      };

      case 'v3': {

        if (0 <= key.indexOf('_x')) {
          return key.slice(0, -2);
        }
        return '';

        break;

      };

      case 'v4': {

        if (0 <= key.indexOf('_x')) {
          return key.slice(0, -2);
        }
        return '';

        break;

      };

      default: {

        return key;

        break;

      }

    }

  },

  getValue: function(key) {

    switch (this.types[key]) {

      case 'v2': {

        let tKey = key.slice(0, -2);
        return new THREE.Vector2(
          this.values[tKey + '_x'],
          this.values[tKey + '_y'],
        );

        break;

      };

      case 'v3': {

        let tKey = key.slice(0, -2);
        return [
          this.values[tKey + '_x'],
          this.values[tKey + '_y'],
          this.values[tKey + '_z'],
        ];

        break;

      };

      case 'v4': {

        let tKey = key.slice(0, -2);
        return [
          this.values[tKey + '_x'],
          this.values[tKey + '_y'],
          this.values[tKey + '_z'],
          this.values[tKey + '_w'],
        ];

        break;

      };

      case 'c': {

        return {
          r: this.values[key].r / 255,
          g: this.values[key].g / 255,
          b: this.values[key].b / 255,
        };

        break;

      };

      default: {

        return this.values[key];

        break;

      }

    }

  }

}

export { GuiValues };
