// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/binary-tree-visualizer/lib/config/theme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.setTheme = setTheme;
const theme = {
  radius: 20,
  growthAndShrinkTimes: 1.25,
  leafNodeSpace: 75,
  lineHeight: 90,
  textFont: 'Poppins',
  strokeColor: '#f56042',
  colorArray: [{
    bgColor: '#fff2e0',
    borderColor: '#f56042'
  }]
};
/**
 * Set the user defined theme if required
 *
 * @param {Theme} userDefinedTheme
 */

function setTheme(userDefinedTheme) {
  const {
    radius = theme.radius,
    growthAndShrinkTimes = theme.growthAndShrinkTimes,
    leafNodeSpace = theme.leafNodeSpace,
    lineHeight = theme.lineHeight,
    colorArray = theme.colorArray,
    textFont = theme.textFont,
    strokeColor = theme.strokeColor
  } = userDefinedTheme;
  theme.radius = radius;
  theme.growthAndShrinkTimes = growthAndShrinkTimes;
  theme.leafNodeSpace = leafNodeSpace;
  theme.lineHeight = lineHeight;
  theme.colorArray = colorArray;
  theme.textFont = textFont;
  theme.strokeColor = strokeColor;
}

var _default = theme;
exports.default = _default;
},{}],"node_modules/binary-tree-visualizer/lib/shapes/Circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(require("../config/theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Rate at which circle will grow or shrink
 */
const growthRate = 0.3;
/**
 * Describes a circle in the canvas
 */

class Circle {
  /**
   * For constructing a new circle
   *
   * @param {string} value
   * @param {number} radius
   * @param {CircleColorSettings} colorSettings
   */
  constructor(value, radius, colorSettings) {
    /**
     * The colorId of the circle
     */
    this.colorId = '';
    /**
     * X Position of the circle
     */

    this.x = -1;
    /**
     * Y Position of the circle
     */

    this.y = -1;
    this.value = value;
    this.colorSettings = colorSettings;
    this.radiusSettings = {
      currentRadius: radius,
      originalRadius: radius,
      maxRadius: radius * _theme.default.growthAndShrinkTimes,
      minRadius: radius / _theme.default.growthAndShrinkTimes
    };
  }
  /**
   * Draw the circle
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} radius
   * @param {string} color
   */


  drawCircle(ctx, radius, color) {
    const {
      x,
      y
    } = this;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
  /**
   * Draw the border
   *
   * @param {CanvasRenderingContext2D} ctx
   */


  drawBorder(ctx) {
    const {
      x,
      y,
      colorSettings,
      radiusSettings: {
        currentRadius: radius
      }
    } = this;
    const {
      borderColor
    } = colorSettings;
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  }
  /**
   * Write the text
   *
   * @param {CanvasRenderingContext2D} ctx
   */


  writeText(ctx) {
    const {
      x,
      y,
      value,
      colorSettings
    } = this;
    const {
      borderColor
    } = colorSettings; // @todo: Make this configurable
    // Decide font size

    let fontSize = '10pt';
    let ySpacing = 5;

    if (value.length > 3) {
      fontSize = '8pt';
      ySpacing = 3;
    }

    ctx.fillStyle = borderColor;
    ctx.font = `${fontSize} ${_theme.default.textFont}`;
    ctx.textAlign = 'center';
    ctx.fillText(value, x, y + ySpacing);
  }
  /**
   * Get the current radius
   *
   * @return {number}
   */


  getRadius() {
    const {
      radiusSettings: {
        currentRadius: radius
      }
    } = this;
    return radius;
  }
  /**
   * Increase radius of the circle
   * @param {number} maxRadius
   * @return {boolean} - Weather size was changed
   */


  grow(maxRadius = this.radiusSettings.maxRadius) {
    const {
      radiusSettings: {
        currentRadius
      }
    } = this;

    if (currentRadius < maxRadius) {
      const originalIncreasedRadius = currentRadius + growthRate;
      this.radiusSettings.currentRadius = originalIncreasedRadius > maxRadius ? maxRadius : originalIncreasedRadius;
      return true;
    }

    return false;
  }
  /**
   * Decrease the radius of the circle
   * @param {number} minRadius
   * @return {boolean} - Weather size was changed
   */


  shrink(minRadius = this.radiusSettings.minRadius) {
    const {
      radiusSettings: {
        currentRadius
      }
    } = this;

    if (currentRadius > minRadius) {
      const originalDecreasedRadius = currentRadius - growthRate;
      this.radiusSettings.currentRadius = originalDecreasedRadius < minRadius ? minRadius : originalDecreasedRadius;
      return true;
    }

    return false;
  }
  /**
   * Bring the circle back to its original radius
   * @return {boolean} - Weather size was changed
   */


  restoreCircle() {
    const {
      radiusSettings: {
        currentRadius,
        originalRadius
      }
    } = this;

    if (currentRadius > originalRadius) {
      return this.shrink(originalRadius);
    }

    if (currentRadius < originalRadius) {
      return this.grow(originalRadius);
    }

    return false;
  }
  /**
   * Set the color id of the circle
   *
   * @param {string} colorId
   */


  setColorId(colorId) {
    this.colorId = colorId;
  }
  /**
   * Set the x and y coordinates of the circle
   *
   * @param {number} x
   * @param {number} y
   */


  setCoordinates(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * Draw the circle on the screen
   * Draw the border
   * Add the text
   *
   * @param {CanvasComponent} comp
   * @return {string} - The color id represented by the unique color
   */


  draw(comp) {
    const {
      radiusSettings: {
        currentRadius: radius
      },
      colorSettings: {
        bgColor
      }
    } = this; // Draw circle

    this.colorId = this.colorId ? this.colorId : comp.getNextColor();
    this.drawCircle(comp.getContext(), radius, bgColor);
    this.drawCircle(comp.getHitContext(), radius, this.colorId); // Draw border

    this.drawBorder(comp.getContext()); // Write text

    this.writeText(comp.getContext()); // Return the colorId

    return this.colorId;
  }

}

var _default = Circle;
exports.default = _default;
},{"../config/theme":"node_modules/binary-tree-visualizer/lib/config/theme.js"}],"node_modules/binary-tree-visualizer/lib/utils/getRandomColor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(require("../config/theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get a random color settings
 *
 * @return {CircleColorSettings}
 */
function getRandomColor() {
  const {
    colorArray
  } = _theme.default;
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

var _default = getRandomColor;
exports.default = _default;
},{"../config/theme":"node_modules/binary-tree-visualizer/lib/config/theme.js"}],"node_modules/binary-tree-visualizer/lib/tree/BinaryTreeNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Circle = _interopRequireDefault(require("../shapes/Circle"));

var _theme = _interopRequireDefault(require("../config/theme"));

var _getRandomColor = _interopRequireDefault(require("../utils/getRandomColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Describes a node of a binary tree
 */
class BinaryTreeNode {
  /**
   * For constructing a new binary tree node
   *
   * @param {T} value
   */
  constructor(value) {
    this.value = value;
    this.nodeCircle = new _Circle.default(`${value}`, _theme.default.radius, (0, _getRandomColor.default)());
  }
  /**
   * Set the left child
   *
   * @param {BinaryTreeNode} value
   */


  setLeft(value) {
    this.left = value;
  }
  /**
   * Set the right child
   *
   * @param {BinaryTreeNode} value
   */


  setRight(value) {
    this.right = value;
  }
  /**
   * Get the height of the binry tree from the node
   * Height of root is 1
   *
   * @return {number}
   */


  getHeight() {
    var _a, _b;

    const leftHeight = ((_a = this.left) === null || _a === void 0 ? void 0 : _a.getHeight()) || 0;
    const rightHeight = ((_b = this.right) === null || _b === void 0 ? void 0 : _b.getHeight()) || 0;
    return Math.max(leftHeight, rightHeight) + 1;
  }

}

var _default = BinaryTreeNode;
exports.default = _default;
},{"../shapes/Circle":"node_modules/binary-tree-visualizer/lib/shapes/Circle.js","../config/theme":"node_modules/binary-tree-visualizer/lib/config/theme.js","../utils/getRandomColor":"node_modules/binary-tree-visualizer/lib/utils/getRandomColor.js"}],"node_modules/binary-tree-visualizer/lib/tree/BinarySearchTreeNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BinaryTreeNode = _interopRequireDefault(require("./BinaryTreeNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Binary search tree node
 */
class BinarySearchTreeNode extends _BinaryTreeNode.default {
  /**
   * Set the left child of the node
   *
   * @param {BinarySearchTreeNode<T>} value
   */
  setLeft(value) {
    super.setLeft(value);
  }
  /**
   * Set the right child of the node
   *
   * @param {BinarySearchTreeNode<T>} value
   */


  setRight(value) {
    super.setRight(value);
  }
  /**
   * Insert a value into the node
   * (Using Recursion)
   *
   * @param {T} value
   */


  insert(value) {
    // Skip equal value
    if (value === this.value) {
      return;
    } // When value is lesser


    if (value < this.value) {
      if (this.left) {
        this.left.insert(value);
        return;
      }

      this.setLeft(new BinarySearchTreeNode(value));
      return;
    } // When value is greater


    if (this.right) {
      this.right.insert(value);
      return;
    }

    this.setRight(new BinarySearchTreeNode(value));
  }
  /**
   * Find the minimum value from the given node
   *
   * @param {BinarySearchTreeNode<T>} node
   * @return {BinarySearchTreeNode<T>}
   */


  findMinimum() {
    if (this.left) {
      return this.left.findMinimum();
    }

    return this;
  }
  /**
   * Delete this node
   *
   * @param {BinarySearchTreeNode<T>} parent
   * @return {[
   *  BinarySearchTreeNode<T>,
   *  BinarySearchTreeNode<T>
   * ]} [deletedNode, currentRoot]
   */


  deleteThisNode(parent) {
    // Which direction is this node from the parent
    const childDirection = (parent === null || parent === void 0 ? void 0 : parent.left) === this ? 'left' : 'right'; // Case 1: Delete leaf node

    if (!this.left && !this.right) {
      if (parent) {
        delete parent[childDirection];
      }

      return [this];
    } // Case 2: Delete when there is only one child


    if (this.left && !this.right) {
      if (parent) {
        parent[childDirection] = this.left;
      }

      return [this, this.left];
    } else if (this.right && !this.left) {
      if (parent) {
        parent[childDirection] = this.right;
      }

      return [this, this.right];
    } // Case 3: There are 2 children
    // Step 1: Delete the in order successor


    const [deletedNode] = this.right.delete(this.right.findMinimum().value, this); // Step 2: Set the in order successor as the current node
    // Deleted node will always be found

    deletedNode.left = this.left;
    deletedNode.right = this.right;

    if (parent) {
      parent[childDirection] = deletedNode;
    }

    return [this, deletedNode];
  }
  /**
   * Delete a node
   * (Using recursion)
   *
   * @param {T} value
   * @param {BinarySearchTreeNode<T>} parent
   * @return {[
   *  BinarySearchTreeNode<T>,
   *  BinarySearchTreeNode<T>
   * ]} [deletedNode, currentRoot]
   */


  delete(value, parent) {
    // Delete from left node
    if (value < this.value && this.left) {
      const [deletedNode] = this.left.delete(value, this);
      return [deletedNode, this];
    } // Delete from right node


    if (value > this.value && this.right) {
      const [deletedNode] = this.right.delete(value, this);
      return [deletedNode, this];
    } // Delete the current node


    if (this.value === value) {
      const res = this.deleteThisNode(parent);
      delete this.left;
      delete this.right;
      return res;
    }

    return [, this];
  }

}

var _default = BinarySearchTreeNode;
exports.default = _default;
},{"./BinaryTreeNode":"node_modules/binary-tree-visualizer/lib/tree/BinaryTreeNode.js"}],"node_modules/binary-tree-visualizer/lib/tree/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BinarySearchTreeNode", {
  enumerable: true,
  get: function () {
    return _BinarySearchTreeNode.default;
  }
});
Object.defineProperty(exports, "BinaryTreeNode", {
  enumerable: true,
  get: function () {
    return _BinaryTreeNode.default;
  }
});

var _BinaryTreeNode = _interopRequireDefault(require("./BinaryTreeNode"));

var _BinarySearchTreeNode = _interopRequireDefault(require("./BinarySearchTreeNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./BinaryTreeNode":"node_modules/binary-tree-visualizer/lib/tree/BinaryTreeNode.js","./BinarySearchTreeNode":"node_modules/binary-tree-visualizer/lib/tree/BinarySearchTreeNode.js"}],"node_modules/binary-tree-visualizer/lib/utils/getRGBString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Get RGB string from red green and blue values
 *
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {string}
 */
function getRGBString(red, green, blue) {
  return `rgb(${red}, ${green}, ${blue})`;
}

var _default = getRGBString;
exports.default = _default;
},{}],"node_modules/binary-tree-visualizer/lib/helpers/ColorGenerator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getRGBString = _interopRequireDefault(require("../utils/getRGBString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The gap between 2 ids
 */
const gap = 10;
/**
 * For generating color
 */

class ColorGenerator {
  constructor() {
    /**
     * The red color value
     */
    this.red = 0;
    /**
     * The green color value
     */

    this.green = 0;
    /**
     * The blue color value
     */

    this.blue = 1;
  }
  /**
   * Increment a color
   *
   * @param {'red' | 'green' | 'blue'} color
   */


  incrementColor(color) {
    this[color] = (this[color] + gap) % 256;
  }
  /**
   * Get the next color
   * Starts from rgb(0, 0, 0)
   *
   * @return {string}
   */


  getNextColor() {
    // Generate the rgb value
    const color = (0, _getRGBString.default)(this.red, this.green, this.blue); // Increment the color

    this.incrementColor('blue');

    if (this.blue < gap) {
      this.incrementColor('green');

      if (this.green < gap) {
        this.incrementColor('red');
      }
    } // Return the color


    return color;
  }

}

var _default = ColorGenerator;
exports.default = _default;
},{"../utils/getRGBString":"node_modules/binary-tree-visualizer/lib/utils/getRGBString.js"}],"node_modules/binary-tree-visualizer/lib/canvas/Canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ColorGenerator = _interopRequireDefault(require("../helpers/ColorGenerator"));

var _getRGBString = _interopRequireDefault(require("../utils/getRGBString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines one canvas
 */
class CanvasComponent {
  /**
   * For constructing a new canvas component
   *
   * @param {HTMLCanvasElement} $el
   */
  constructor($el) {
    /**
     * The current hovering color
     */
    this.currentHoveringColor = '';
    const $hitEl = document.createElement('canvas');
    this.$el = $el;
    this.$hitEl = $hitEl;
    this.colorGenerator = new _ColorGenerator.default();
  }
  /**
   * Clears the canvas
   */


  clearCanvas() {
    const {
      height,
      width
    } = this.$el;
    this.getContext().clearRect(0, 0, width, height);
  }
  /**
   * Set the maximum width and height
   *
   * @param {number} height
   * @param {number} width
   */


  setMaxWidthAndHeight(height, width) {
    this.$hitEl.height = this.$el.height = height;
    this.$hitEl.width = this.$el.width = width;
  }
  /**
   * Get the hit 2d context
   *
   * @return {CanvasComponent}
   */


  getHitContext() {
    const ctx = this.$hitEl.getContext('2d');

    if (!ctx) {
      throw new Error('Cannot get 2d context');
    }

    return ctx;
  }
  /**
   * Get the 2d context
   *
   * @return {CanvasRenderingContext2D}
   */


  getContext() {
    const ctx = this.$el.getContext('2d');

    if (!ctx) {
      throw new Error('Cannot get 2d context');
    }

    return ctx;
  }
  /**
   * Get the next color from the color generator
   *
   * @return {string}
   */


  getNextColor() {
    return this.colorGenerator.getNextColor();
  }
  /**
   * On hover get the canvas hit color
   *
   * @param {GetColorCallBack} cb
   */


  onHover(cb) {
    this.$el.addEventListener('mousemove', event => {
      const {
        pageX,
        pageY
      } = event;
      const {
        data: pixel
      } = this.getHitContext().getImageData(pageX - this.$el.offsetLeft, pageY - this.$el.offsetTop, 1, 1); // Callback should only be called on color change

      const color = (0, _getRGBString.default)(pixel[0], pixel[1], pixel[2]);

      if (this.currentHoveringColor !== color) {
        this.currentHoveringColor = color;
        cb(color);
      }
    });
  }
  /**
   * On click of canvas get the hit color
   *
   * @param {GetColorCallBack} cb
   */


  onClick(cb) {
    this.$el.addEventListener('click', event => {
      const {
        pageX,
        pageY
      } = event;
      console.log(pageX, pageY);
      const {
        data: pixel
      } = this.getHitContext().getImageData(pageX - this.$el.offsetLeft, pageY - this.$el.offsetTop, 1, 1);
      cb((0, _getRGBString.default)(pixel[0], pixel[1], pixel[2]));
    });
  }

}

var _default = CanvasComponent;
exports.default = _default;
},{"../helpers/ColorGenerator":"node_modules/binary-tree-visualizer/lib/helpers/ColorGenerator.js","../utils/getRGBString":"node_modules/binary-tree-visualizer/lib/utils/getRGBString.js"}],"node_modules/binary-tree-visualizer/lib/enumns/VisualizationType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizationType = void 0;
var VisualizationType;
exports.VisualizationType = VisualizationType;

(function (VisualizationType) {
  VisualizationType[VisualizationType["SIMPLE"] = 0] = "SIMPLE";
  VisualizationType[VisualizationType["PRETTY"] = 1] = "PRETTY";
  VisualizationType[VisualizationType["EXPANDABLE"] = 2] = "EXPANDABLE";
  VisualizationType[VisualizationType["HIGHLIGHT"] = 3] = "HIGHLIGHT";
})(VisualizationType || (exports.VisualizationType = VisualizationType = {}));
},{}],"node_modules/binary-tree-visualizer/lib/utils/tree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCanvasHeightFromTreeHeight = getCanvasHeightFromTreeHeight;
exports.getCanvasWidthFromMaxNodeSpacing = getCanvasWidthFromMaxNodeSpacing;
exports.getMaxLeafNodesFromHeight = getMaxLeafNodesFromHeight;
exports.getRequiredAndActualHeightAndWidth = getRequiredAndActualHeightAndWidth;
exports.getXPositionFromGivenHorizontalNodePosition = getXPositionFromGivenHorizontalNodePosition;

var _theme = _interopRequireDefault(require("../config/theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the max number of leaf nodes from height of the binary tree
 *
 * @param {number} treeHeight - Height of the tree (number of nodes from)
 * @return {number} - Maximum number of leaf nodes
 */
function getMaxLeafNodesFromHeight(treeHeight) {
  return Math.pow(2, treeHeight - 1);
}
/**
 * Maximum canvas width required from number of tree nodes
 *
 * @param {number} maxNodes - Maximum number of nodes
 * @return {number} - The max width required
 */


function getCanvasWidthFromMaxNodeSpacing(maxNodes) {
  return (maxNodes + 2) * _theme.default.leafNodeSpace;
}
/**
 * Get the x position from given horizontal node position
 *
 * @param {number} nodes - The number of nodes from the left
 * @return {number} - The x position
 */


function getXPositionFromGivenHorizontalNodePosition(nodes) {
  return nodes * _theme.default.leafNodeSpace;
}
/**
 * Get canvas height from the tree height
 *
 * @param {number} treeHeight - Height of the tree (number of nodes from)
 * @return {number} - The canvas height in px
 */


function getCanvasHeightFromTreeHeight(treeHeight) {
  return treeHeight * _theme.default.lineHeight;
}
/**
 * Get required and actual height and width
 *
 * @param {number} maxNodeSpacing
 * @param {number} heightOfTree
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @return {{
 *  maxCanvasHeightRequired: number,
 *  maxCanvasWidthRequired:number,
 *  actualMaxHeight: number,
 *  actualMaxWidth: number
 * }}
 */


function getRequiredAndActualHeightAndWidth(maxNodeSpacing, heightOfTree, maxWidth, maxHeight) {
  const maxCanvasWidthRequired = getCanvasWidthFromMaxNodeSpacing(maxNodeSpacing);
  const maxCanvasHeightRequired = getCanvasHeightFromTreeHeight(heightOfTree + 1);
  const actualMaxWidth = maxCanvasWidthRequired > maxWidth ? maxCanvasWidthRequired : maxWidth;
  const actualMaxHeight = maxCanvasHeightRequired > maxHeight ? maxCanvasHeightRequired : maxHeight;
  return {
    maxCanvasHeightRequired,
    maxCanvasWidthRequired,
    actualMaxHeight,
    actualMaxWidth
  };
}
},{"../config/theme":"node_modules/binary-tree-visualizer/lib/config/theme.js"}],"node_modules/binary-tree-visualizer/lib/strokes/BezierCurve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Describes a bezier curve
 */
class BezierCurve {
  /**
   * Construct a new bezier curve
   *
   * @param {string} color
   * @param {Point} start
   * @param {Point} cp1
   * @param {Point} cp2
   * @param {Point} end
   */
  constructor(color, start, cp1, cp2, end) {
    const {
      x: xStart,
      y: yStart
    } = start;
    const {
      x: cp1x,
      y: cp1y
    } = cp1;
    const {
      x: cp2x,
      y: cp2y
    } = cp2;
    const {
      x: xEnd,
      y: yEnd
    } = end;
    this.color = color;
    this.xStart = xStart;
    this.yStart = yStart;
    this.cp1x = cp1x;
    this.cp1y = cp1y;
    this.cp2x = cp2x;
    this.cp2y = cp2y;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
  }
  /**
   * Draw the bezier curve
   *
   * @param {CanvasRenderingContext2D} ctx
   */


  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.xStart, this.yStart);
    ctx.strokeStyle = this.color;
    ctx.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.xEnd, this.yEnd);
    ctx.stroke();
  }

}

var _default = BezierCurve;
exports.default = _default;
},{}],"node_modules/binary-tree-visualizer/lib/utils/connectPointsWithBezierCurve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(require("../config/theme"));

var _BezierCurve = _interopRequireDefault(require("../strokes/BezierCurve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Connect two points with a bezier curve
 *
 * @param {CanvasComponent} canvasComponent
 * @param {HorizontalStartAndEndInput} horizontalConfig
 * @param {VerticalStartAndEndInput} verticalConfig
 */
function connectPointsWithBezierCurve(canvasComponent, horizontalConfig, verticalConfig) {
  // X, Y Calculation
  const {
    xStart,
    xEnd
  } = horizontalConfig;
  const {
    yStart,
    yEnd
  } = verticalConfig;
  const halfY = (yStart + yEnd) / 2;
  const halfX = (xStart + xEnd) / 2; // Draw the bezier curve

  const berzierCurve = new _BezierCurve.default(_theme.default.strokeColor, {
    x: xStart,
    y: yStart
  }, {
    x: halfX,
    y: halfY
  }, {
    x: xEnd,
    y: halfY
  }, {
    x: xEnd,
    y: yEnd
  });
  berzierCurve.draw(canvasComponent.getContext());
}

var _default = connectPointsWithBezierCurve;
exports.default = _default;
},{"../config/theme":"node_modules/binary-tree-visualizer/lib/config/theme.js","../strokes/BezierCurve":"node_modules/binary-tree-visualizer/lib/strokes/BezierCurve.js"}],"node_modules/binary-tree-visualizer/lib/canvas/drawPrettyBinaryTree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = require(".");

var _theme = _interopRequireDefault(require("../config/theme"));

var _tree = require("../utils/tree");

var _connectPointsWithBezierCurve = _interopRequireDefault(require("../utils/connectPointsWithBezierCurve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The current animation frame that is going on
 */
let animationFrameId;
/**
 * Current color that is being hovered on
 */

let hoveredColorId;
/**
 * Spacing map for storing space requirements
 */

let spacingMap;
/**
 * Clear the existing animation frame if any and request an animation frame
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} canvasComponent
 * @param {Point} position
 * @param {boolean} highlightMode
 */

function requestAnimationFrame(root, canvasComponent, position, highlightMode) {
  // Clear existing animation frame
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  } // Request a new one


  animationFrameId = window.requestAnimationFrame(() => {
    canvasComponent.clearCanvas();
    const requiredRedraw = recursivelyDrawNodes(root, canvasComponent, position, highlightMode);

    if (requiredRedraw) {
      requestAnimationFrame(root, canvasComponent, position, highlightMode);
    }
  });
}
/**
 * Draw single node
 *
 * @param {BinaryTreeNode} node
 * @param {CanvasComponent} comp
 * @param {Point} position
 * @param {boolean} highlightMode
 * @return {boolean} Weather redraw is required
 */


function drawSingleNode(node, comp, position, highlightMode) {
  const {
    x,
    y
  } = position;
  node.nodeCircle.setCoordinates(x, y); // Grow or shrink while hover

  const colorId = node.nodeCircle.draw(comp);

  if (colorId === hoveredColorId && highlightMode) {
    return node.nodeCircle.grow();
  } else {
    return node.nodeCircle.restoreCircle();
  }
}
/**
 * Recursively draw all the nodes for a pretty tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} canvasComponent
 * @param {Point} position
 * @param {boolean} highlightMode
 * @return {boolean}
 */


function recursivelyDrawNodes(root, canvasComponent, position, highlightMode) {
  const {
    x: xPosition,
    y: yPosition
  } = position; // Draw the node

  let requiredRedraw = drawSingleNode(root, canvasComponent, {
    x: xPosition,
    y: yPosition
  }, highlightMode);
  root.nodeCircle.setCoordinates(xPosition, yPosition);
  root.nodeCircle.draw(canvasComponent); // Root spacings

  const {
    left,
    right
  } = spacingMap.get(root); // Draw the left child

  if (root.left) {
    const leftOfLeft = spacingMap.get(root.left).left;
    const childYPosition = yPosition + _theme.default.lineHeight;
    const leftPosition = {
      x: xPosition - (0, _tree.getXPositionFromGivenHorizontalNodePosition)(left - leftOfLeft),
      y: childYPosition
    };
    requiredRedraw = recursivelyDrawNodes(root.left, canvasComponent, leftPosition, highlightMode) || requiredRedraw;
    (0, _connectPointsWithBezierCurve.default)(canvasComponent, {
      xStart: xPosition,
      xEnd: leftPosition.x
    }, {
      yStart: yPosition + root.nodeCircle.getRadius(),
      yEnd: childYPosition - root.left.nodeCircle.getRadius()
    });
  } // Draw the right child


  if (root.right) {
    const rightOfRight = spacingMap.get(root.right).right;
    const childYPosition = yPosition + _theme.default.lineHeight;
    const rightPosition = {
      x: xPosition + (0, _tree.getXPositionFromGivenHorizontalNodePosition)(right - rightOfRight),
      y: childYPosition
    };
    requiredRedraw = recursivelyDrawNodes(root.right, canvasComponent, rightPosition, highlightMode) || requiredRedraw;
    (0, _connectPointsWithBezierCurve.default)(canvasComponent, {
      xStart: xPosition,
      xEnd: rightPosition.x
    }, {
      yStart: yPosition + root.nodeCircle.getRadius(),
      yEnd: childYPosition - root.right.nodeCircle.getRadius()
    });
  }

  return requiredRedraw;
}
/**
 * Calculates the spacing required recursively
 *
 * @param {BinaryTreeNode<string | number>} root
 * @return {number} - The spacing requirement of that node
 */


function calculateSpacingMapRecursively(root) {
  const left = root.left ? calculateSpacingMapRecursively(root.left) + 0.5 : 0;
  const right = root.right ? calculateSpacingMapRecursively(root.right) + 0.5 : 0;
  spacingMap.set(root, {
    left,
    right
  });
  return left + right;
}
/**
 * Draw a pretty binary tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {HTMLCanvasElement} canvasElement
 * @param {IndividualInputOptions} options
 */


function drawPrettyBinaryTree(root, canvasElement, options) {
  spacingMap = new Map();
  const maxNodeSpacing = calculateSpacingMapRecursively(root);
  const heightOfTree = root.getHeight();
  const {
    maxHeight,
    maxWidth,
    highlightMode
  } = options; // Calculate canvas spacing requirements

  const {
    maxCanvasWidthRequired,
    actualMaxHeight,
    actualMaxWidth
  } = (0, _tree.getRequiredAndActualHeightAndWidth)(maxNodeSpacing, heightOfTree, maxWidth, maxHeight); // Init calculation

  const left = spacingMap.get(root).left;
  const midPointInCanvas = actualMaxWidth / 2;
  const xStart = midPointInCanvas - maxCanvasWidthRequired / 2; // Initialize the canvas

  const canvasComponent = new _.CanvasComponent(canvasElement);
  canvasComponent.setMaxWidthAndHeight(actualMaxHeight, actualMaxWidth);
  /**
   * Hover event handler
   */

  canvasComponent.onHover(color => {
    hoveredColorId = color;
    requestAnimationFrame(root, canvasComponent, {
      x: xStart + (0, _tree.getXPositionFromGivenHorizontalNodePosition)(left + 1),
      y: (0, _tree.getCanvasHeightFromTreeHeight)(0.5)
    }, Boolean(highlightMode));
  }); // Recursively draw all nodes

  requestAnimationFrame(root, canvasComponent, {
    x: xStart + (0, _tree.getXPositionFromGivenHorizontalNodePosition)(left + 1),
    y: (0, _tree.getCanvasHeightFromTreeHeight)(0.5)
  }, Boolean(highlightMode));
}

var _default = drawPrettyBinaryTree;
exports.default = _default;
},{".":"node_modules/binary-tree-visualizer/lib/canvas/index.js","../config/theme":"node_modules/binary-tree-visualizer/lib/config/theme.js","../utils/tree":"node_modules/binary-tree-visualizer/lib/utils/tree.js","../utils/connectPointsWithBezierCurve":"node_modules/binary-tree-visualizer/lib/utils/connectPointsWithBezierCurve.js"}],"node_modules/binary-tree-visualizer/lib/canvas/drawExpandableBinaryTree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = require(".");

var _theme = _interopRequireDefault(require("../config/theme"));

var _tree = require("../utils/tree");

var _connectPointsWithBezierCurve = _interopRequireDefault(require("../utils/connectPointsWithBezierCurve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The current animation frame that is going on
 */
let animationFrameId;
/**
 * Array of all children that needs printing
 */

let globalPathArray;
/**
 * Current color that is being hovered on
 */

let hoveredColorId;
/**
 * Map storing the colorId to the path array
 */

let colorIdToPathMap = new Map();
/**
 * Clear the existing animation frame if any and request an animation frame
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} comp
 * @param {IndividualInputOptions} options
 */

function requestAnimationFrame(root, comp, options) {
  // Clear existing animation frame
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  } // Request a new one


  animationFrameId = window.requestAnimationFrame(() => animationFrameCB(root, comp, options));
}
/**
 * Get the node height from print array
 *
 * @return {number}
 */


function getNodeHeightFromGlobalPathArray() {
  return globalPathArray.length + 1;
}
/**
 * Get the node width from the print array
 *
 * @return {{
 *  left: number,
 *  right: number
 * }}
 */


function getNodeWidthFromGlobalPathArray() {
  let left = 0;
  let right = 0;
  let current = 0;

  for (const childDirection of globalPathArray) {
    if (childDirection === 'left') {
      current -= 1;
    } else {
      current += 1;
    }

    if (current < 0) {
      left = Math.max(Math.abs(current), left);
    } else {
      right = Math.max(current, right);
    }
  }

  return {
    left,
    right
  };
}
/**
 * Draw single node
 *
 * @param {BinaryTreeNode} node
 * @param {CanvasComponent} comp
 * @param {PathArray} pathArray
 * @param {Point} position
 * @return {boolean} Weather redraw is required
 */


function drawSingleNode(node, comp, pathArray, position) {
  const {
    x,
    y
  } = position;
  const doesNodeHaveChildren = Boolean(node.left || node.right);
  node.nodeCircle.setCoordinates(x, y); // Grow or shrink while hover

  const colorId = node.nodeCircle.draw(comp);
  colorIdToPathMap.set(colorId, pathArray);

  if (colorId === hoveredColorId && doesNodeHaveChildren) {
    return node.nodeCircle.grow();
  } else {
    return node.nodeCircle.restoreCircle();
  }
}
/**
 * Draw both the children if required
 *
 * @param {BinaryTreeNode} node
 * @param {CanvasComponent} comp
 * @param {number} xPosition
 * @param {number} nodeHeight
 * @param {PathArray} pathArray
 * @return {boolean}
 */


function drawChildren(node, comp, xPosition, nodeHeight, pathArray) {
  const currentHeight = (0, _tree.getCanvasHeightFromTreeHeight)(nodeHeight);
  const childHeight = (0, _tree.getCanvasHeightFromTreeHeight)(nodeHeight + 1);
  let requiredRedraw = false; // Draw the left child

  if (node.left) {
    const currentPathArray = node.left.left || node.left.right ? [...pathArray, 'left'] : [...pathArray];
    const xLeft = xPosition - 0.5 * _theme.default.leafNodeSpace;
    requiredRedraw = drawSingleNode(node.left, comp, currentPathArray, {
      x: xLeft,
      y: childHeight
    }) || requiredRedraw;
    (0, _connectPointsWithBezierCurve.default)(comp, {
      xStart: xPosition,
      xEnd: xLeft
    }, {
      yStart: currentHeight + node.nodeCircle.getRadius(),
      yEnd: childHeight - node.left.nodeCircle.getRadius()
    });
  } // Draw the right child


  if (node.right) {
    const currentPathArray = node.right.left || node.right.right ? [...pathArray, 'right'] : [...pathArray];
    const xRight = xPosition + 0.5 * _theme.default.leafNodeSpace;
    requiredRedraw = drawSingleNode(node.right, comp, currentPathArray, {
      x: xRight,
      y: childHeight
    }) || requiredRedraw;
    (0, _connectPointsWithBezierCurve.default)(comp, {
      xStart: xPosition,
      xEnd: xRight
    }, {
      yStart: currentHeight + node.nodeCircle.getRadius(),
      yEnd: childHeight - node.right.nodeCircle.getRadius()
    });
  }

  return requiredRedraw;
}
/**
 * Draw all the nodes by following print array
 *
 * @param {BinaryTreeNode} root
 * @param {CanvasComponent} comp
 * @param {number} xRootPosition
 * @return {boolean} - Weather animated redraw is required
 */


function drawAllNodes(root, comp, xRootPosition) {
  // Draw root
  let currentNode = root;
  let xPosition = xRootPosition;
  let currentNodeHeight = 0.5;
  const currentPathArray = [];
  let requiredRedraw = drawSingleNode(root, comp, [...currentPathArray], {
    x: xPosition,
    y: (0, _tree.getCanvasHeightFromTreeHeight)(currentNodeHeight)
  }); // Draw all the children according to the path

  for (const currentPath of globalPathArray) {
    requiredRedraw = drawChildren(currentNode, comp, xPosition, currentNodeHeight, currentPathArray) || requiredRedraw;

    if (currentPath === 'left') {
      currentNode = currentNode.left;
      xPosition = xPosition - 0.5 * _theme.default.leafNodeSpace;
      currentPathArray.push('left');
    } else {
      currentNode = currentNode.right;
      xPosition = xPosition + 0.5 * _theme.default.leafNodeSpace;
      currentPathArray.push('right');
    }

    currentNodeHeight += 1;
  } // Draw the children of the last element in the path


  requiredRedraw = drawChildren(currentNode, comp, xPosition, currentNodeHeight, currentPathArray) || requiredRedraw; // Return if redraw is required

  return requiredRedraw;
}
/**
 * Animation frame call back function that will recursively be called.
 * In case animation is required
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} comp
 * @param {IndividualInputOptions} options
 */


function animationFrameCB(root, comp, options) {
  // Height and width calculations
  const nodeHeight = getNodeHeightFromGlobalPathArray();
  const {
    left: leftNodeWidth,
    right: rightNodeWidth
  } = getNodeWidthFromGlobalPathArray();
  const requiredHeight = (0, _tree.getCanvasHeightFromTreeHeight)(nodeHeight + 1);
  const requiredWidth = (0, _tree.getCanvasWidthFromMaxNodeSpacing)(leftNodeWidth + rightNodeWidth);
  const actualHeight = Math.max(requiredHeight, options.maxHeight);
  const actualWidth = Math.max(requiredWidth, options.maxWidth);
  const xStart = actualWidth / 2 - requiredWidth / 2; // Set the height and width
  // This also clears the canvas. So no need to clear it manually.

  comp.setMaxWidthAndHeight(actualHeight, actualWidth); // Initialize color id to path map

  colorIdToPathMap = new Map(); // Draw and check if redraw is required

  const requiredRedraw = drawAllNodes(root, comp, xStart + (0, _tree.getXPositionFromGivenHorizontalNodePosition)(leftNodeWidth + 1));

  if (requiredRedraw) {
    requestAnimationFrame(root, comp, options);
  }
}
/**
 * Draw an expandable binary tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {HTMLCanvasElement} canvasElement
 * @param {IndividualInputOptions} options
 */


function drawExpandableBinaryTree(root, canvasElement, options) {
  // Initialization
  const comp = new _.CanvasComponent(canvasElement);
  globalPathArray = [];
  /**
   * Click event handler
   */

  comp.onClick(color => {
    globalPathArray = colorIdToPathMap.get(color) || globalPathArray;
    requestAnimationFrame(root, comp, options);
  });
  /**
   * Hover event handler
   */

  comp.onHover(color => {
    hoveredColorId = color;
    requestAnimationFrame(root, comp, options);
  }); // Draw frame

  requestAnimationFrame(root, comp, options);
}

var _default = drawExpandableBinaryTree;
exports.default = _default;
},{".":"node_modules/binary-tree-visualizer/lib/canvas/index.js","../config/theme":"node_modules/binary-tree-visualizer/lib/config/theme.js","../utils/tree":"node_modules/binary-tree-visualizer/lib/utils/tree.js","../utils/connectPointsWithBezierCurve":"node_modules/binary-tree-visualizer/lib/utils/connectPointsWithBezierCurve.js"}],"node_modules/binary-tree-visualizer/lib/canvas/drawSimpleBinaryTree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _theme = _interopRequireDefault(require("../config/theme"));

var _tree = require("../utils/tree");

var _connectPointsWithBezierCurve = _interopRequireDefault(require("../utils/connectPointsWithBezierCurve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Recursively draw all the nodes
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} canvasComponent
 * @param {number} currentLine
 * @param {HorizontalStartAndEndInput} horizontalConfig
 */
function recursivelyDrawNodes(root, canvasComponent, currentLine, horizontalConfig) {
  // X Calculation
  const {
    xStart,
    xEnd
  } = horizontalConfig;
  const xPosition = (xStart + xEnd) / 2; // Y Calculation

  const yPosition = currentLine * _theme.default.lineHeight; // Draw the node

  root.nodeCircle.setCoordinates(xPosition, yPosition);
  root.nodeCircle.draw(canvasComponent); // Draw the left child nodes
  // Radius is added and subtracted from y to move the line outside the circle

  if (root.left) {
    recursivelyDrawNodes(root.left, canvasComponent, currentLine + 1, {
      xStart,
      xEnd: xPosition
    });
    (0, _connectPointsWithBezierCurve.default)(canvasComponent, {
      xStart: xPosition,
      xEnd: (xStart + xPosition) / 2
    }, {
      yStart: yPosition + _theme.default.radius,
      yEnd: (0, _tree.getCanvasHeightFromTreeHeight)(currentLine + 1) - _theme.default.radius
    });
  }

  if (root.right) {
    recursivelyDrawNodes(root.right, canvasComponent, currentLine + 1, {
      xStart: xPosition,
      xEnd
    });
    (0, _connectPointsWithBezierCurve.default)(canvasComponent, {
      xStart: xPosition,
      xEnd: (xPosition + xEnd) / 2
    }, {
      yStart: yPosition + _theme.default.radius,
      yEnd: (0, _tree.getCanvasHeightFromTreeHeight)(currentLine + 1) - _theme.default.radius
    });
  }
}
/**
 * Draw an explandable binary tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {HTMLCanvasElement} canvasElement
 * @param {IndividualInputOptions} options
 */


function drawSimpleBinaryTree(root, canvasElement, options) {
  const heightOfTree = root.getHeight();
  const maxNumberOfLeafNodes = (0, _tree.getMaxLeafNodesFromHeight)(heightOfTree);
  const {
    maxHeight,
    maxWidth
  } = options; // Max height and width requirements

  const {
    maxCanvasWidthRequired,
    actualMaxHeight,
    actualMaxWidth
  } = (0, _tree.getRequiredAndActualHeightAndWidth)(maxNumberOfLeafNodes, heightOfTree, maxWidth, maxHeight); // Init calculation

  const midPointInCanvas = actualMaxWidth / 2;
  const xStart = midPointInCanvas - maxCanvasWidthRequired / 2 + _theme.default.leafNodeSpace;
  const xEnd = midPointInCanvas + maxCanvasWidthRequired / 2 - _theme.default.leafNodeSpace; // Initialize the canvas

  const canvasComponent = new _Canvas.default(canvasElement);
  canvasComponent.setMaxWidthAndHeight(actualMaxHeight, actualMaxWidth); // Recursively draw the tree

  recursivelyDrawNodes(root, canvasComponent, 0.5, {
    xStart,
    xEnd
  });
}

var _default = drawSimpleBinaryTree;
exports.default = _default;
},{"./Canvas":"node_modules/binary-tree-visualizer/lib/canvas/Canvas.js","../config/theme":"node_modules/binary-tree-visualizer/lib/config/theme.js","../utils/tree":"node_modules/binary-tree-visualizer/lib/utils/tree.js","../utils/connectPointsWithBezierCurve":"node_modules/binary-tree-visualizer/lib/utils/connectPointsWithBezierCurve.js"}],"node_modules/binary-tree-visualizer/lib/canvas/drawBinaryTree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VisualizationType = require("../enumns/VisualizationType");

var _drawPrettyBinaryTree = _interopRequireDefault(require("./drawPrettyBinaryTree"));

var _drawExpandableBinaryTree = _interopRequireDefault(require("./drawExpandableBinaryTree"));

var _drawSimpleBinaryTree = _interopRequireDefault(require("./drawSimpleBinaryTree"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Draw a binary tree in one of the given types
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {HTMLCanvasElement} canvasElement
 * @param {Partial<MainInputOptions>} options
 */
function drawBinaryTree(root, canvasElement, options = {}) {
  const {
    type = _VisualizationType.VisualizationType.SIMPLE,
    maxHeight = window.innerHeight,
    maxWidth = window.innerWidth
  } = options;

  switch (type) {
    case _VisualizationType.VisualizationType.PRETTY:
      (0, _drawPrettyBinaryTree.default)(root, canvasElement, {
        maxHeight,
        maxWidth
      });
      break;

    case _VisualizationType.VisualizationType.EXPANDABLE:
      (0, _drawExpandableBinaryTree.default)(root, canvasElement, {
        maxHeight,
        maxWidth
      });
      break;

    case _VisualizationType.VisualizationType.HIGHLIGHT:
      (0, _drawPrettyBinaryTree.default)(root, canvasElement, {
        maxHeight,
        maxWidth,
        highlightMode: true
      });
      break;

    default:
      (0, _drawSimpleBinaryTree.default)(root, canvasElement, {
        maxHeight,
        maxWidth
      });
      break;
  }
}

var _default = drawBinaryTree;
exports.default = _default;
},{"../enumns/VisualizationType":"node_modules/binary-tree-visualizer/lib/enumns/VisualizationType.js","./drawPrettyBinaryTree":"node_modules/binary-tree-visualizer/lib/canvas/drawPrettyBinaryTree.js","./drawExpandableBinaryTree":"node_modules/binary-tree-visualizer/lib/canvas/drawExpandableBinaryTree.js","./drawSimpleBinaryTree":"node_modules/binary-tree-visualizer/lib/canvas/drawSimpleBinaryTree.js"}],"node_modules/binary-tree-visualizer/lib/canvas/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CanvasComponent", {
  enumerable: true,
  get: function () {
    return _Canvas.default;
  }
});
Object.defineProperty(exports, "drawBinaryTree", {
  enumerable: true,
  get: function () {
    return _drawBinaryTree.default;
  }
});

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _drawBinaryTree = _interopRequireDefault(require("./drawBinaryTree"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Canvas":"node_modules/binary-tree-visualizer/lib/canvas/Canvas.js","./drawBinaryTree":"node_modules/binary-tree-visualizer/lib/canvas/drawBinaryTree.js"}],"node_modules/binary-tree-visualizer/lib/enumns/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VisualizationType = require("./VisualizationType");

Object.keys(_VisualizationType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VisualizationType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _VisualizationType[key];
    }
  });
});
},{"./VisualizationType":"node_modules/binary-tree-visualizer/lib/enumns/VisualizationType.js"}],"node_modules/binary-tree-visualizer/lib/config/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _theme = require("./theme");

Object.keys(_theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _theme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme[key];
    }
  });
});
},{"./theme":"node_modules/binary-tree-visualizer/lib/config/theme.js"}],"node_modules/binary-tree-visualizer/lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tree = require("./tree");

Object.keys(_tree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tree[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tree[key];
    }
  });
});

var _canvas = require("./canvas");

Object.keys(_canvas).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _canvas[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _canvas[key];
    }
  });
});

var _enumns = require("./enumns");

Object.keys(_enumns).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _enumns[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _enumns[key];
    }
  });
});

var _config = require("./config");

Object.keys(_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _config[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _config[key];
    }
  });
});
},{"./tree":"node_modules/binary-tree-visualizer/lib/tree/index.js","./canvas":"node_modules/binary-tree-visualizer/lib/canvas/index.js","./enumns":"node_modules/binary-tree-visualizer/lib/enumns/index.js","./config":"node_modules/binary-tree-visualizer/lib/config/index.js"}],"app.mjs":[function(require,module,exports) {
"use strict";

var _binaryTreeVisualizer = require("binary-tree-visualizer");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var resultBtn = document.getElementById("btn");
var nodesValues = document.getElementById("nodeData");
var output = document.querySelector(".result canvas");
var result = document.querySelector(".result");
var error = document.querySelector(".error");
resultBtn.addEventListener("click", inputToList);

function inputToList(e) {
  e.preventDefault();

  if (nodesValues.value == "") {
    error.style.display = "block";
    return;
  } else {
    result.style.display = "block";
    error.style.display = "none";
    var data = nodesValues.value.split(" ");
    console.log(_typeof(data));
    var list = [];
    data.forEach(function (values) {
      list.push(parseInt(values));
    });
    buildATree(list);
  }
}

function buildATree(list) {
  var root = new _binaryTreeVisualizer.BinarySearchTreeNode(list[0]);

  for (var i = 1; i < list.length; i++) {
    root.insert(list[i]);
  }

  (0, _binaryTreeVisualizer.drawBinaryTree)(root, output);
}
},{"binary-tree-visualizer":"node_modules/binary-tree-visualizer/lib/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "14447" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.mjs"], null)
//# sourceMappingURL=/app.6178ef24.js.map