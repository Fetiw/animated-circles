/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Describes object (circle) drawn on canvas and its attributes. */
var Shape = function () {
  function Shape(x, y, radius, ax, ay, m, color) {
    var vx = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
    var vy = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;

    _classCallCheck(this, Shape);

    this.x = x;
    this.y = y;
    this.r = radius;
    this.ax = ax;
    this.ay = ay;
    this.m = m;
    this.vx = vx;
    this.vy = vy;
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  _createClass(Shape, [{
    key: 'move',
    value: function move(dt) {
      this.vx += this.ax * dt;
      this.vy += this.ay * dt;
      if (this.vx > maxSpeed) {
        this.vx = maxSpeed;
      }
      if (this.vx < -maxSpeed) {
        this.vx = -maxSpeed;
      }
      if (this.vy > maxSpeed) {
        this.vy = maxSpeed;
      }
      if (this.vy < -maxSpeed) {
        this.vy = -maxSpeed;
      }
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }
  }, {
    key: 'draw',
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
      ctx.fillStyle = this.color;
      ctx.closePath();
      ctx.fill();
    }
  }, {
    key: 'resolveEdgeCollision',
    value: function resolveEdgeCollision() {
      // Detect collision with right wall.
      if (this.x + this.r > c.width) {
        // Need to know how much we overshot the canvas width so we know how far
        // to 'bounce'.
        this.x = c.width - this.r;
        this.vx = -this.vx;
        this.ax = -this.ax;
      }

      // Detect collision with bottom wall.
      else if (this.y + this.r > c.height) {
          this.y = c.height - this.r;
          this.vy = -this.vy;
          this.ay = -this.ay;
        }

        // Detect collision with left wall.
        else if (this.x - this.r < 0) {
            this.x = this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
          }
          // Detect collision with top wall.
          else if (this.y - this.r < 0) {
              this.y = this.r;
              this.vy = -this.vy;
              this.ay = -this.ay;
            }
    }
  }]);

  return Shape;
}();

/** Object describing collision between 2 objects */


var Collision = function Collision(o1, o2, dx, dy, d) {
  _classCallCheck(this, Collision);

  this.o1 = o1;
  this.o2 = o2;

  this.dx = dx;
  this.dy = dy;
  this.d = d;
};

function checkCollision(o1, o2) {
  var dx = o2.x - o1.x;
  var dy = o2.y - o1.y;
  var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  if (d < o1.r + o2.r) {
    return {
      collisionInfo: new Collision(o1, o2, dx, dy, d),
      collided: true
    };
  }
  return {
    collisionInfo: null,
    collided: false
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resolveCollision(info) {
  // "info" is a Collision object from above
  var nx = info.dx / info.d; // Compute iegen vectors
  var ny = info.dy / info.d;
  var s = info.o1.r + info.o2.r - info.d;
  info.o1.x -= nx * s / 2; // Move first object by half of collision size
  info.o1.y -= ny * s / 2;
  info.o2.x += nx * s / 2; // Move other object by half of collision size in
  // opposite direction
  info.o2.y += ny * s / 2;
}

function resolveCollisionWithBounce(info) {
  var nx = info.dx / info.d;
  var ny = info.dy / info.d;
  var s = info.o1.r + info.o2.r - info.d;
  info.o1.x -= nx * s / 2;
  info.o1.y -= ny * s / 2;
  info.o2.x += nx * s / 2;
  info.o2.y += ny * s / 2;

  // Magic...
  var k = -2 * ((info.o2.vx - info.o1.vx) * nx + (info.o2.vy - info.o1.vy) * ny) / (1 / info.o1.m + 1 / info.o2.m);
  info.o1.vx -= k * nx / info.o1.m; // Same as before, just added "k" and
  // switched to "m" instead of "s/2"
  info.o1.vy -= k * ny / info.o1.m;
  info.o2.vx += k * nx / info.o2.m;
  info.o2.vy += k * ny / info.o2.m;
}

function moveWithGravity(dt, o) {
  // "o" refers to Array of objects we are moving
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = o[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var o1 = _step.value;
      // Zero-out accumulator of forces for each object
      o1.fx = 0;
      o1.fy = 0;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = o.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          i = _step2$value[0],
          _o = _step2$value[1];

      // For each pair of objects...
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = o.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              j = _step4$value[0],
              o2 = _step4$value[1];

          if (i < j) {
            // To not do same pair twice
            var dx = o2.x - _o.x; // Compute distance between centers of objects
            var dy = o2.y - _o.y;
            var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            if (r < 1) {
              // To avoid division by 0
              r = 1;
            }
            var f = 1000 * _o.m * o2.m / Math.pow(r, 2); // Compute force for
            // this pair
            var fx = f * dx / r; // Break it down
            var fy = f * dy / r;
            _o.fx += fx; // Accumulate for first object
            _o.fy += fy;
            o2.fx -= fx; // And for second object in opposite direction
            o2.fy -= fy;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = o[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _o2 = _step3.value;
      // for each object update...
      var ax = _o2.fx / _o2.m; // ...acceleration
      var ay = _o2.fy / _o2.m;

      _o2.vx += ax * dt; // ...speed
      _o2.vy += ay * dt;

      _o2.x += _o2.vx * dt; // ...position
      _o2.y += _o2.vy * dt;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

var CollisionTypes = Object.freeze({
  'push': resolveCollision,
  'bounce': resolveCollisionWithBounce
});
var gravity = false;

var currentCollisionType = CollisionTypes.push;

var maxSpeed = 70;
var c = document.getElementById('canvas');
var ctx = c.getContext('2d');

var objects = [];

function createBouncingExample() {

  objects = [];

  for (var i = 0; i < 30; i++) {
    var radius = getRandomInt(5, 30);
    var x = getRandomInt(radius, c.offsetWidth - radius);
    var y = getRandomInt(radius, c.offsetHeight - radius);
    objects.push(new Shape(x, y, radius, getRandomInt(-1, 1), getRandomInt(-1, 1), radius * 10));
  }

  console.log(objects);
}

window.onload = createBouncingExample;

function createShape(event) {
  var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var mass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

  var x = event.pageX - c.offsetLeft;
  var y = event.pageY - c.offsetTop;

  objects.push(new Shape(x, y, radius, getRandomInt(-1, 1), getRandomInt(-1, 1), mass));
}

c.addEventListener('mousedown', function () {
  createShape(event, Math.floor(Math.random(20) * Math.floor(30)), Math.ceil(100));
});

function animate() {
  ctx.clearRect(0, 0, c.width, c.height);

  if (gravity) {
    moveWithGravity(0.1, objects);
  } else {
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = objects[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var o = _step5.value;

        o.move(0.1);
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }

  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = objects[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _o3 = _step6.value;

      _o3.resolveEdgeCollision();
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  var collisions = [];
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = objects.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var _step7$value = _slicedToArray(_step7.value, 2),
          i = _step7$value[0],
          o1 = _step7$value[1];

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = objects.entries()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _step10$value = _slicedToArray(_step10.value, 2),
              j = _step10$value[0],
              o2 = _step10$value[1];

          if (i < j) {
            var _checkCollision = checkCollision(o1, o2),
                collisionInfo = _checkCollision.collisionInfo,
                collided = _checkCollision.collided;

            if (collided) {
              collisions.push(collisionInfo);
            }
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = collisions[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var col = _step8.value;

      currentCollisionType(col); // resolveCollision(col)
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = objects[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var _o4 = _step9.value;

      _o4.draw();
    }
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9.return) {
        _iterator9.return();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }

  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

/***/ })
/******/ ]);