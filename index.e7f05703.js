// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"11zn2":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "3a6cf3c0e7f05703";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"jZgE0":[function(require,module,exports) {
var _app = require("./app/app");
const app = new _app.App();
app.start();

},{"./app/app":"dOyN2"}],"dOyN2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Application class.
 */ parcelHelpers.export(exports, "App", ()=>App
);
var _math = require("./math");
var _renderer = require("./renderer");
var _tools = require("./tools");
var _ui = require("./ui");
var _world = require("./world");
/** Multiplier of the time step passed to the update functions. */ const TIME_SCALE = 0.00001;
class App {
    // Default constructor.
    constructor(){
        // Initialize canvas
        const canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Create renderer.
        this.renderer = new _renderer.Renderer(canvas);
        this.renderer.view.setOnZoomChange(this.onMouseMove.bind(this));
        // Create physics world.
        this.world = new _world.World();
        // Add canvas UI events
        canvas.addEventListener('mousedown', (e)=>{
            if (e.button !== 0) return;
            this.mousePos = new _math.Vec2(e.offsetX, e.offsetY);
            this.onMouseDown();
            e.preventDefault();
        });
        canvas.addEventListener('mouseup', (e)=>{
            if (e.button !== 0) return;
            this.mousePos = new _math.Vec2(e.offsetX, e.offsetY);
            this.onMouseUp();
            e.preventDefault();
        });
        canvas.addEventListener('mousemove', (e)=>{
            this.mousePos = new _math.Vec2(e.offsetX, e.offsetY);
            this.onMouseMove();
            e.preventDefault();
        });
        canvas.addEventListener('wheel', (event)=>{
            this.renderer.view.zoom(event.deltaY > 0 ? 1.1 : 0.9);
            event.preventDefault();
        });
        // Initialize UI sliders
        this.speed = new _ui.Slider(document.getElementById('speedInput'), document.getElementById('speedValue'), 'exponential');
        this.speed.value = 1;
        this.mass = new _ui.Slider(document.getElementById('massInput'), document.getElementById('massValue'), 'exponential');
        this.mass.value = 1;
        // Initialize UI buttons
        this.resetButton = new _ui.Button(document.getElementById('resetButton'));
        this.settingsButton = new _ui.Button(document.getElementById('settingsButton'));
        // Initialize UI toggles
        this.addBodyToggle = new _ui.Toggle(document.getElementById('addBodyToggle'));
        this.removeBodyToggle = new _ui.Toggle(document.getElementById('removeBodyToggle'));
        this.moveCameraToggle = new _ui.Toggle(document.getElementById('moveCameraToggle'));
        // Initialize tools
        this.tools = new Map();
        this.tools.set('addBody', new _tools.BodyAdder(this.world, this.renderer.view, this.mass));
        this.tools.set('removeBody', new _tools.BodyRemover(this.world, this.renderer.view));
        this.tools.set('moveCamera', new _tools.CameraMover(this.renderer.view));
        this.tool = undefined;
        // Intiailize UI tool switch
        this.toolSwitch = new _ui.Switch();
        this.toolSwitch.add('addBody', this.addBodyToggle);
        this.toolSwitch.add('removeBody', this.removeBodyToggle);
        this.toolSwitch.add('moveCamera', this.moveCameraToggle);
        this.toolSwitch.setOnStateChange((tool)=>{
            this.tool = this.tools.get(tool);
            if (this.tool) this.tool.activate();
        });
    // Create a few bodies.
    /*const CENTRAL_MASS = 1000.0;
    this.world.addBody(new Body(CENTRAL_MASS, new Vec2(0.0, 0.0), new Vec2(0.0, 0.0), Color.random()));

    for (let i = 0; i < 100; ++i) {
      const mass = 0.1;
      const angle = (i / 100.0) * Math.PI * 2;
      const distance = 1.0;
      const pos = new Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
      const vel = pos.perpendicular().normalize().mul(Math.sqrt(GRAVITY_CONSTANT * (CENTRAL_MASS) / distance));
      this.world.addBody(new Body(mass, pos, vel, Color.random()));
    }*/ }
    /**
   * Starts the application's main loop.
   */ start() {
        this.animate(0);
    }
    /**
   * Updates and draws the application.
   * @param dt Time step in milliseconds.
   */ animate(dt) {
        this.world.update(this.speed.value * dt * TIME_SCALE);
        if (this.tool) this.tool.draw(this.renderer);
        this.world.draw(this.renderer);
        this.renderer.flush();
        window.requestAnimationFrame(this.animate.bind(this));
    }
    /**
   * Mouse down event listener.
   * @param event The mouse event.
   */ onMouseDown() {
        if (this.tool) this.tool.onMouseDown(this.mousePos);
    }
    /**
   * Mouse up event listener.
   * @param event The mouse event.
   */ onMouseUp() {
        if (this.tool) this.tool.onMouseUp(this.mousePos);
    }
    /**
   * Mouse move event listener.
   * @param event The mouse event.
   */ onMouseMove() {
        if (this.tool) this.tool.onMouseMove(this.mousePos);
    }
}

},{"./math":"9zUrS","./renderer":"bK5TX","./world":"8br0T","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./ui":"eFpQJ","./tools":"acJ2D"}],"9zUrS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Implements a 2D vector, with support for vector math operations.
 */ parcelHelpers.export(exports, "Vec2", ()=>Vec2
);
/**
 * Implements a 3D matrix, with support for matrix math operations.
 */ parcelHelpers.export(exports, "Mat3", ()=>Mat3
);
class Vec2 {
    /**
   * @param x X component.
   * @param y Y component.
   */ constructor(x, y){
        this.x = x;
        this.y = y;
    }
    /**
   * Adds this and another 2D vector and returns the result.
   * @param v Other 2D vector.
   * @returns The result 2D vector.
   */ add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }
    /**
   * Subtracts another 2D vector from this and returns the result.
   * @param v Other 2D vector.
   * @returns The result 2D vector.
   */ sub(v1) {
        return new Vec2(this.x - v1.x, this.y - v1.y);
    }
    /**
   * Multiplies this 2D vector by a scalar and returns the result.
   * @param s Scalar.
   * @returns The result 2D vector.
   */ mul(s) {
        return new Vec2(this.x * s, this.y * s);
    }
    /**
   * Divides this 2D vector by a scalar and returns the result.
   * @param s Scalar.
   * @returns The result 2D vector.
   */ div(s1) {
        return new Vec2(this.x / s1, this.y / s1);
    }
    /**
   * Calculates the dot product of this and another 2D vector and returns the result.
   * @param v Other 2D vector.
   * @returns The result.
   */ dot(v2) {
        return this.x * v2.x + this.y * v2.y;
    }
    /**
   * Calculates the squared length of this 2D vector and returns the result.
   * @returns The result.
   */ sqrLength() {
        return this.dot(this);
    }
    /**
   * Calculates the length of this 2D vector and returns the result.
   * @returns The result.
   */ length() {
        return Math.sqrt(this.sqrLength());
    }
    /**
   * Normalizes this 2D vector and returns the result.
   * @returns The result.
   */ normalize() {
        return this.div(this.length());
    }
    /**
   * Returns a vector perpendicular to this matrix.
   * @returns The result.
   */ perpendicular() {
        return new Vec2(-this.y, this.x);
    }
}
class Mat3 {
    /**
   * @param elements The matrix elements.
   */ constructor(elements = [
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
    ]){
        this.elements = new Float32Array(elements);
    }
    // Implementation of the above two overloads.
    mul(other) {
        if (other instanceof Mat3) {
            const result = new Mat3();
            for(let i = 0; i < 3; i++)for(let j = 0; j < 3; j++){
                let sum = 0;
                for(let k = 0; k < 3; k++)sum += this.elements[i * 3 + k] * other.elements[k * 3 + j];
                result.elements[i * 3 + j] = sum;
            }
            return result;
        } else if (other instanceof Vec2) {
            const result = new Vec2(0, 0);
            result.x += this.elements[0] * other.x;
            result.x += this.elements[3] * other.y;
            result.x += this.elements[6];
            result.y += this.elements[1] * other.x;
            result.y += this.elements[4] * other.y;
            result.y += this.elements[7];
            return result;
        } else {
            const result = new Mat3();
            for(let i = 0; i < 9; i++)result.elements[i] = this.elements[i] * other;
            return result;
        }
    }
    /**
   * Transposes this matrix and returns the result.
   * @returns The result matrix.
   */ transpose() {
        const result = new Mat3();
        for(let i = 0; i < 3; i++)for(let j = 0; j < 3; j++)result.elements[i * 3 + j] = this.elements[j * 3 + i];
        return result;
    }
    /**
   * Calculates the determinant of this matrix and returns the result.
   * @returns The result.
   */ determinant() {
        return this.elements[0] * (this.elements[4] * this.elements[8] - this.elements[5] * this.elements[7]) - this.elements[1] * (this.elements[3] * this.elements[8] - this.elements[5] * this.elements[6]) + this.elements[2] * (this.elements[3] * this.elements[7] - this.elements[4] * this.elements[6]);
    }
    /**
   * Calcultes the adjunt matrix of this matrix and returns the result.
   * @returns The result.
   */ adjunt() {
        const result = new Mat3();
        const els = this.elements;
        result.elements[0] = els[4] * els[8] - els[5] * els[7];
        result.elements[1] = els[2] * els[7] - els[1] * els[8];
        result.elements[2] = els[1] * els[5] - els[2] * els[4];
        result.elements[3] = els[5] * els[6] - els[3] * els[8];
        result.elements[4] = els[0] * els[8] - els[2] * els[6];
        result.elements[5] = els[2] * els[3] - els[0] * els[5];
        result.elements[6] = els[3] * els[7] - els[4] * els[6];
        result.elements[7] = els[1] * els[6] - els[0] * els[7];
        result.elements[8] = els[0] * els[4] - els[1] * els[3];
        return result;
    }
    /**
   * Calculates the inverse of this matrix and returns the result.
   * @returns The result.
   */ inverse() {
        const det = this.determinant();
        if (det === 0) throw new Error('Cannot invert matrix with determinant 0.');
        return this.adjunt().mul(1 / det);
    }
    /**
   * Returns the identity matrix.
   * @returns The identity matrix.
   */ static identity() {
        return new Mat3();
    }
    /**
   * Returns the translation matrix.
   * @param v The vector.
   */ static translation(v3) {
        return new Mat3([
            1,
            0,
            0,
            0,
            1,
            0,
            v3.x,
            v3.y,
            1
        ]);
    }
    /**
   * Returns the scale matrix.
   * @param v The vector.
   * @returns The scale matrix.
   */ static scale(v4) {
        return new Mat3([
            v4.x,
            0,
            0,
            0,
            v4.y,
            0,
            0,
            0,
            1
        ]);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"bK5TX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "View", ()=>_view.View
);
/**
 * Class used to render the app.
 */ parcelHelpers.export(exports, "Renderer", ()=>Renderer
);
var _math = require("../math");
var _color = require("./color");
var _drawCircle = require("./draw_circle");
var _view = require("./view");
/** Background color of the application. */ const BACKGROUND_COLOR = new _color.Color(0.05, 0.05, 0.05);
/** Number of divisions used for drawing circles. */ const CIRCLE_DIVISIONS = 32;
class Renderer {
    /**
   * @param canvas Canvas to use.
   */ constructor(canvas){
        this.commands = [];
        // Get the WebGL context.
        this.canvas = canvas;
        this.context = this.canvas.getContext('webgl');
        // Initialize shaders and vertex buffers.
        this.initShaders();
        this.initVertexBuffers();
        // Initialize view.
        this.view = new _view.View(this.canvas.width, this.canvas.height);
    }
    /**
   * Draws a circle.
   * @param center The center of the circle.
   * @param radius The radius of the circle.
   * @param color The color of the circle.
   */ drawCircle(center, radius, color) {
        this.commands.push(new _drawCircle.DrawCircle(center, radius, color));
    }
    /**
   * Flushes the renderer, showing the current state of the app.
   */ flush() {
        // Clear the screen with the background color.
        this.context.clearColor(BACKGROUND_COLOR.r, BACKGROUND_COLOR.g, BACKGROUND_COLOR.b, 1);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
        // Execute all draw commands.
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
        this.context.vertexAttribPointer(this.positionAttribute, 2, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(this.positionAttribute);
        this.context.useProgram(this.program);
        for (let command of this.commands)if (command instanceof _drawCircle.DrawCircle) {
            const translation = _math.Mat3.translation(command.center);
            const scale = _math.Mat3.scale(new _math.Vec2(command.radius, command.radius));
            const transform = scale.mul(translation).mul(this.view.getTransform());
            this.context.uniformMatrix3fv(this.transformUniform, false, transform.elements);
            this.context.uniform3f(this.colorUniform, command.color.r, command.color.g, command.color.b);
            this.context.drawArrays(this.context.TRIANGLE_FAN, this.circle[0], this.circle[1]);
        }
        this.commands = [];
    }
    /**
   * Initializes shaders used for drawing.
   */ initShaders() {
        // Create vertex shader.
        this.vertexShader = this.context.createShader(this.context.VERTEX_SHADER);
        this.context.shaderSource(this.vertexShader, `
      attribute vec2 position;

      uniform mat3 transform;

      void main() {
        vec2 transformed = (transform * vec3(position, 1.0)).xy;
        gl_Position = vec4(transformed, 0.0, 1.0);
      }
    `);
        this.context.compileShader(this.vertexShader);
        // Create fragment shader.
        this.fragmentShader = this.context.createShader(this.context.FRAGMENT_SHADER);
        this.context.shaderSource(this.fragmentShader, `
      uniform mediump vec3 color;

      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
    `);
        this.context.compileShader(this.fragmentShader);
        // Create shader program.
        this.program = this.context.createProgram();
        this.context.attachShader(this.program, this.vertexShader);
        this.context.attachShader(this.program, this.fragmentShader);
        this.context.linkProgram(this.program);
        // Get shader program attribute locations.
        this.positionAttribute = this.context.getAttribLocation(this.program, 'position');
        // Get shader program uniform locations.
        this.transformUniform = this.context.getUniformLocation(this.program, 'transform');
        this.colorUniform = this.context.getUniformLocation(this.program, 'color');
    }
    /**
   * Initializes vertex buffers used for drawing.
   */ initVertexBuffers() {
        // Generate circle vertices
        this.circle = [
            0,
            CIRCLE_DIVISIONS + 2
        ];
        let vertices = [];
        vertices.push(0, 0);
        for(let i = 0; i <= CIRCLE_DIVISIONS; i++){
            let angle = i / CIRCLE_DIVISIONS * Math.PI * 2;
            vertices.push(Math.cos(angle), Math.sin(angle));
        }
        // Generate vertex buffer
        this.vertexBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);
    }
}

},{"../math":"9zUrS","./view":"l5tb4","./color":"ak01f","./draw_circle":"fpeFl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"l5tb4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A view is a 2D camera that can be used to render a scene.
 */ parcelHelpers.export(exports, "View", ()=>View
);
var _math = require("../math");
class View {
    // Default constructor
    constructor(width, height){
        this.position = new _math.Vec2(0, 0);
        this._scale = 1;
        this.aspectRatio = height / width;
        this.width = width;
        this.height = height;
        this.updateTransform();
        this.onZoomChangeCallback = ()=>{
        };
    }
    /**
   * Gets the transform matrix.
   * @returns The transform matrix.
   */ getTransform() {
        return this.transform;
    }
    /**
   * Sets the view's position.
   * @param position The new position.
   */ setPosition(position) {
        this.position = position;
        this.updateTransform();
    }
    /**
   * Sets the view's scale.
   */ set scale(scale) {
        this._scale = scale;
        this.updateTransform();
        this.onZoomChangeCallback();
    }
    /**
   * Gets the view's scale.
   */ get scale() {
        return this._scale;
    }
    /**
   * Moves the view by a given amount.
   * @param delta The amount to move.
   */ move(delta) {
        this.setPosition(this.position.add(delta.div(this.scale)));
    }
    /**
   * Zooms the view in.
   * @param factor The zoom factor.
   */ zoom(multiplier) {
        this.scale /= multiplier;
    }
    /**
   * Converts from screen coordinates to world coordinates.
   * @param screen The screen coordinates.
   * @return The world coordinates.
   */ screenToWorld(screen) {
        let normalized = new _math.Vec2(screen.x / this.width, screen.y / this.height);
        normalized = normalized.sub(new _math.Vec2(0.5, 0.5)).mul(2);
        normalized.y *= -1;
        return this.transform.inverse().mul(normalized);
    }
    /**
   * Sets the zoom change callback.
   * @param callback The callback.
   */ setOnZoomChange(callback) {
        this.onZoomChangeCallback = callback;
    }
    /**
   * Updates the transform matrix.
   */ updateTransform() {
        const translation = _math.Mat3.translation(new _math.Vec2(this.position.x, this.position.y));
        const scale = _math.Mat3.scale(new _math.Vec2(this.scale * this.aspectRatio, this.scale));
        this.transform = translation.mul(scale);
    }
}

},{"../math":"9zUrS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ak01f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Describes a color.
 */ parcelHelpers.export(exports, "Color", ()=>Color
);
class Color {
    /**
   * @param r The red component of the color.
   * @param g The green component of the color.
   * @param b The blue component of the color.
   * @param a The alpha component of the color.
   */ constructor(r, g, b, a = 1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
   * Adds the given color to this color, returning a new color.
   * @param other The color to add.
   * @returns The new color.
   */ add(other) {
        const r = Math.min(1, this.r + other.r);
        const g = Math.min(1, this.g + other.g);
        const b = Math.min(1, this.b + other.b);
        const a = Math.min(1, this.a + other.a);
        return new Color(r, g, b, a);
    }
    /**
   * Mixes this color with the given color, returning a new color.
   * @param other The color to mix with.
   * @returns The new color.
   */ mix(other1) {
        const r = (this.r + other1.r) / 2;
        const g = (this.g + other1.g) / 2;
        const b = (this.b + other1.b) / 2;
        const a = (this.a + other1.a) / 2;
        return new Color(r, g, b, a);
    }
    /**
   * Multiplies this color by a scalar, returning a new color.
   * @param multiplier The scalar to multiply by.
   * @returns The new color.
   */ mul(multiplier) {
        const r = Math.min(1, this.r * multiplier);
        const g = Math.min(1, this.g * multiplier);
        const b = Math.min(1, this.b * multiplier);
        return new Color(r, g, b, this.a);
    }
    /**
   * Divides this color by a scalar, returning a new color.
   * @param divider The scalar to divide by.
   * @returns The new color.
   */ div(divider) {
        return this.mul(1 / divider);
    }
    /**
   * Generates a random color.
   * @returns A random color.
   */ static random() {
        return new Color(Math.random(), Math.random(), Math.random());
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fpeFl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a command used to draw a circle.
 */ parcelHelpers.export(exports, "DrawCircle", ()=>DrawCircle
);
class DrawCircle {
    /**
   * @param center Position of the circle center. 
   * @param radius Radius of the circle.
   * @param color Color of the circle.
   */ constructor(center, radius, color){
        this.center = center;
        this.radius = radius;
        this.color = color;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8br0T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GRAVITY_CONSTANT", ()=>GRAVITY_CONSTANT
);
/**
 * Represents a world of bodies.
 */ parcelHelpers.export(exports, "World", ()=>World
);
const GRAVITY_CONSTANT = 0.000001;
class World {
    // Default constructor.
    constructor(){
        this.bodies = [];
    }
    /**
   * Adds a body to the world.
   * @param body Body to add.
   */ addBody(body) {
        this.bodies.push(body);
    }
    /**
   * Removes a body from the world.
   * @param position The position of the body to remove.
   */ removeBody(position) {
        for(let i = 0; i < this.bodies.length; i++)if (this.bodies[i].intersects(position)) this.bodies.splice(i, 1);
    }
    /**
   * Deletes all bodies in the world.
   */ clear() {
        this.bodies = [];
    }
    /**
   * Updates the world.
   * @param dt The time step.
   */ update(dt) {
        // Move bodies.
        for(let i = 0; i < this.bodies.length; i++)this.bodies[i].update(dt);
        // Apply gravity to all bodies.
        for(let i1 = 0; i1 < this.bodies.length; i1++)for(let j = i1 + 1; j < this.bodies.length; j++){
            const body1 = this.bodies[i1];
            const body2 = this.bodies[j];
            // Calculate the force of gravity between the two bodies.
            const offset = body1.position.sub(body2.position);
            const sqrDistance = offset.sqrLength();
            const direction = offset.normalize();
            const force = direction.mul(GRAVITY_CONSTANT * body1.mass * body2.mass / sqrDistance);
            // Apply the force to the bodies.
            this.bodies[j].applyForce(force, dt);
            this.bodies[i1].applyForce(force.mul(-1), dt);
        }
        for(let i2 = 0; i2 < this.bodies.length; i2++){
            for(let j = i2 + 1; j < this.bodies.length; j++)// Check for collision.
            if (this.bodies[i2].intersects(this.bodies[j])) {
                // Create a new body from the two bodies.
                this.bodies[i2] = this.bodies[i2].merge(this.bodies[j]);
                // Remove the second body.
                this.bodies.splice(j, 1);
            }
        }
    }
    /**
   * Draws the world.
   * @param renderer Renderer used.
   */ draw(renderer) {
        for(let i = 0; i < this.bodies.length; i++)renderer.drawCircle(this.bodies[i].position, this.bodies[i].radius, this.bodies[i].color);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"eFpQJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Slider", ()=>_slider.Slider
);
parcelHelpers.export(exports, "SliderType", ()=>_slider.SliderType
);
parcelHelpers.export(exports, "Button", ()=>_button.Button
);
parcelHelpers.export(exports, "Switch", ()=>_switch.Switch
);
parcelHelpers.export(exports, "Toggle", ()=>_toggle.Toggle
);
var _slider = require("./slider");
var _button = require("./button");
var _switch = require("./switch");
var _toggle = require("./toggle");

},{"./slider":"3OpYJ","./button":"b0yVv","./switch":"bkyAD","./toggle":"aOqPX","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3OpYJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class used to read slider values from the user.
 */ parcelHelpers.export(exports, "Slider", ()=>Slider
);
class Slider {
    /**
   * @param input Range input element.
   * @param display Value display element.
   * @param type The slider type.
   */ constructor(input, display, type){
        this.input = input;
        this.display = display;
        this.type = type;
        this.input.addEventListener('input', this.updateDisplay.bind(this));
    }
    /**
   * @returns The current value of the slider.
   */ get value() {
        switch(this.type){
            case 'linear':
                return this.input.valueAsNumber;
            case 'exponential':
                return Math.pow(10, this.input.valueAsNumber);
        }
    }
    /**
   * Sets the value of the slider.
   */ set value(value) {
        switch(this.type){
            case 'linear':
                this.input.valueAsNumber = value;
                break;
            case 'exponential':
                this.input.valueAsNumber = Math.log10(value);
                break;
        }
        this.updateDisplay();
    }
    /**
   * Updates the display of the slider.
   */ updateDisplay() {
        if (this.value < 0.01 || this.value > 9999.99) this.display.innerText = this.value.toExponential(1);
        else this.display.innerText = this.value.toFixed(2);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"b0yVv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class used to handle button events.
 */ parcelHelpers.export(exports, "Button", ()=>Button
);
class Button {
    /**
   * @param element The button element.
   */ constructor(element){
        this.element = element;
        this.onClickCallback = ()=>{
        };
        this.element.addEventListener('click', (_)=>this.onClickCallback()
        );
    }
    /**
   * Sets the button click callback.
   */ setOnClick(callback) {
        this.onClickCallback = callback;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bkyAD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A switch made of many toggles, where only one can be active at a time.
 */ parcelHelpers.export(exports, "Switch", ()=>Switch
);
class Switch {
    // Default constructor.
    constructor(){
        this.state = '';
        this.toggles = [];
        this.stateChangeCallback = (_)=>{
        };
    }
    /**
   * The current state of the switch.
   */ get current() {
        return this.state;
    }
    /**
   * Sets the current state of the switch.
   */ set current(name) {
        if (this.state === name) return;
        this.toggles.forEach((toggle)=>toggle[1].activated = toggle[0] === name
        );
        this.state = name;
        this.stateChangeCallback(name);
    }
    /**
   * Adds a toggle to the switch.
   * @param name The name of the toggle.
   * @param toggle The toggle to add.
   */ add(name1, toggle) {
        this.toggles.push([
            name1,
            toggle
        ]);
        toggle.setOnActivated(()=>this.onToggleActivated(name1)
        );
        toggle.setOnDeactivated(()=>this.onToggleDeactivated(name1)
        );
    }
    /**
   * Sets the callback called when the state changes.
   * @param callback The callback to set.
   */ setOnStateChange(callback) {
        this.stateChangeCallback = callback;
    }
    /**
   * Callback for when a toggle is activated.
   * @param name The name of the toggle that was activated.
   */ onToggleActivated(name2) {
        this.current = name2;
    }
    /**
   * Callback for when a toggle is deactivated.
   * @param name The name of the toggle that was deactivated.
   */ onToggleDeactivated(name3) {
        if (this.state === name3) this.current = '';
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aOqPX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A button that toggles between two states.
 */ parcelHelpers.export(exports, "Toggle", ()=>Toggle
);
var _button = require("./button");
class Toggle extends _button.Button {
    /**
   * @param element The button element.
   */ constructor(element){
        super(element);
        this.state = false;
        this.onActivatedCallback = ()=>{
        };
        this.onDeactivatedCallback = ()=>{
        };
        this.setOnClick(this.onClick.bind(this));
    }
    /**
   * Is the toggle activated?
   */ get activated() {
        return this.state;
    }
    /**
   * Set the toggle to activated or deactivated.
   */ set activated(state) {
        this.state = state;
        this.element.classList.toggle('on', state);
    }
    /**
   * Set the toggle activation callback.
   * @param callback The callback to set.
   */ setOnActivated(callback) {
        this.onActivatedCallback = callback;
    }
    /**
   * Set the toggle activation callback.
   * @param callback The callback to set.
   */ setOnDeactivated(callback1) {
        this.onDeactivatedCallback = callback1;
    }
    /**
   * Set the toggle activation callback.
   */ onClick() {
        this.activated = !this.activated;
        if (this.activated) this.onActivatedCallback();
        else this.onDeactivatedCallback();
    }
}

},{"./button":"b0yVv","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"acJ2D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Tool", ()=>_tool.Tool
);
parcelHelpers.export(exports, "BodyAdder", ()=>_bodyAdder.BodyAdder
);
parcelHelpers.export(exports, "BodyRemover", ()=>_bodyRemover.BodyRemover
);
parcelHelpers.export(exports, "CameraMover", ()=>_cameraMover.CameraMover
);
var _tool = require("./tool");
var _bodyAdder = require("./body_adder");
var _bodyRemover = require("./body_remover");
var _cameraMover = require("./camera_mover");

},{"./tool":"5kQCS","./body_adder":"3vvBg","./body_remover":"9vhWm","./camera_mover":"c6DGr","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5kQCS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generic tool class.
 */ parcelHelpers.export(exports, "Tool", ()=>Tool
);
class Tool {
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3vvBg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Tool for adding bodies to the world.
 */ parcelHelpers.export(exports, "BodyAdder", ()=>BodyAdder
);
var _body = require("../body");
var _tool = require("./tool");
/** Velocity multiplier for throwing bodies. */ const VELOCITY_MULTIPLIER = 0.001;
class BodyAdder extends _tool.Tool {
    /**
   * @param world The world to add bodies to.
   * @param view The view being used to render.
   * @param mass The slider which indicates the body's mass.
   */ constructor(world, view, mass){
        super();
        this.world = world;
        this.view = view;
        this.mass = mass;
    }
    activate() {
        this.body = new _body.Body();
        this.mouseDown = null;
        this.mouseMoved = false;
    }
    draw(renderer) {
        if (!this.mouseMoved) return;
        this.body.mass = this.mass.value;
        renderer.drawCircle(this.body.position, this.body.radius, this.body.color);
    }
    onMouseDown(position) {
        this.body.position = this.view.screenToWorld(position);
        this.mouseDown = position;
    }
    onMouseUp(position1) {
        if (this.mouseDown) {
            let delta = position1.sub(this.mouseDown);
            delta.y *= -1;
            this.body.velocity = delta.mul(VELOCITY_MULTIPLIER * this.view.scale);
            this.world.addBody(this.body);
        }
        this.activate();
    }
    onMouseMove(position2) {
        if (!this.mouseDown) this.body.position = this.view.screenToWorld(position2);
        this.mouseMoved = true;
    }
}

},{"../body":"4UTpg","./tool":"5kQCS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"4UTpg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a body in the simulation.
 */ parcelHelpers.export(exports, "Body", ()=>Body
);
var _math = require("./math");
var _color = require("./renderer/color");
/** The density of bodies. */ const BODY_DENSITY = 200;
class Body {
    /**
   * @param mass The body's initial mass.
   * @param position The body's initial position.
   * @param velocity The body's initial velocity.
   * @param color The body's color.
   */ constructor(){
        this.mass = 1;
        this.position = new _math.Vec2(0, 0);
        this.velocity = new _math.Vec2(0, 0);
        this.color = _color.Color.random();
    }
    /**
   * Gets the body's position.
   */ get position() {
        return this._position;
    }
    /**
   * Sets the body's position.
   */ set position(position) {
        this._position = new _math.Vec2(position.x, position.y);
    }
    /**
   * Gets the body's velocity.
   */ get velocity() {
        return this._velocity;
    }
    /**
   * Sets the body's velocity.
   */ set velocity(velocity) {
        this._velocity = new _math.Vec2(velocity.x, velocity.y);
    }
    /**
   * Gets the body's mass.
   */ get mass() {
        return this._mass;
    }
    /**
   * Sets the body's mass.
   */ set mass(mass) {
        this._mass = mass;
        this._radius = 0.75 * Math.PI * this.mass ** (1 / 3) / BODY_DENSITY;
    }
    /**
   * Gets the body's radius.
   */ get radius() {
        return this._radius;
    }
    /**
   * Applies a force to the body.
   * @param force The force to apply to the body.
   * @param dt The time step.
   */ applyForce(force, dt) {
        this.applyImpulse(force.mul(dt));
    }
    /**
   * Applies an impulse to the body.
   * @param impulse The impulse to apply to the body.
   */ applyImpulse(impulse) {
        this.velocity = this.velocity.add(impulse.mul(1 / this.mass));
    }
    /**
   * Updates the body's position.
   * @param dt The time step.
   */ update(dt1) {
        this.position = this.position.add(this.velocity.mul(dt1));
    }
    // Implementation
    intersects(other) {
        if (other instanceof Body) {
            // The square of the distance is used to avoid calculating the square root.
            const sqrDistance = this.position.sub(other.position).sqrLength();
            const sqrRadius = (this.radius + other.radius) ** 2;
            return sqrDistance <= sqrRadius;
        } else return this.position.sub(other).sqrLength() <= this.radius ** 2;
    }
    /**
   * Merges this body with another.
   * @param other The other body.
   * @returns The new body.
   */ merge(other1) {
        let b = new Body();
        b.mass = this.mass + other1.mass;
        b.position = this.position.mul(this.mass).add(other1.position.mul(other1.mass)).div(b.mass);
        b.velocity = this.velocity.mul(this.mass).add(other1.velocity.mul(other1.mass)).div(b.mass);
        const colorA = this.color.mul(this.mass / b.mass);
        const colorB = other1.color.mul(other1.mass / b.mass);
        b.color = colorA.add(colorB);
        return b;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./renderer/color":"ak01f","./math":"9zUrS"}],"9vhWm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Tool for removing bodies to the world.
 */ parcelHelpers.export(exports, "BodyRemover", ()=>BodyRemover
);
var _tool = require("./tool");
class BodyRemover extends _tool.Tool {
    /**
   * @param world The world to remove bodies from.
   * @param view The view being used to render.
   */ constructor(world, view){
        super();
        this.world = world;
        this.view = view;
    }
    activate() {
    // Do nothing.
    }
    draw() {
    // Do nothing.
    }
    onMouseDown(_) {
    // Do nothing.
    }
    onMouseUp(position) {
        this.world.removeBody(this.view.screenToWorld(position));
    }
    onMouseMove(_1) {
    // Do nothing.
    }
}

},{"./tool":"5kQCS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"c6DGr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Tool for moving the camera.
 */ parcelHelpers.export(exports, "CameraMover", ()=>CameraMover
);
var _tool = require("./tool");
/** Camera movement sensibility. */ const SENSIBILITY = 0.001;
class CameraMover extends _tool.Tool {
    /**
   * @param view The view being used to render.
   */ constructor(view){
        super();
        this.view = view;
    }
    activate() {
        this.lastPosition = null;
    }
    draw() {
    // Do nothing.
    }
    onMouseDown(position) {
        this.lastPosition = position;
    }
    onMouseUp(_) {
        this.lastPosition = null;
    }
    onMouseMove(position1) {
        if (!this.lastPosition) return;
        let delta = position1.sub(this.lastPosition);
        delta.y *= -1;
        this.lastPosition = position1;
        this.view.move(delta.mul(SENSIBILITY));
    }
}

},{"./tool":"5kQCS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["11zn2","jZgE0"], "jZgE0", "parcelRequire34d4")

//# sourceMappingURL=index.e7f05703.js.map
