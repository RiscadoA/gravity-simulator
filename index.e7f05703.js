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
document.addEventListener('DOMContentLoaded', ()=>{
    const app = new _app.App();
    app.start();
});

},{"./app/app":"dOyN2"}],"dOyN2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Application class.
 */ parcelHelpers.export(exports, "App", ()=>App
);
var _math = require("./math");
var _presets = require("./presets");
var _renderer = require("./renderer");
var _tools = require("./tools");
var _ui = require("./ui");
var _world = require("./world");
/** Multiplier of the time step passed to the update functions. */ const TIME_SCALE = 0.000002;
/** Help page URL. */ const HELP_URL = 'https://riscadoa.com/portfolio/gravity-simulator/';
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
            this.renderer.view.triggerViewChange();
        });
        // Initialize UI sliders
        this.bodyMass = new _ui.Slider(document.getElementById('bodyMass'), 0.1, 100000000, 1, 'exponential');
        this.bodyMass.value = 1;
        this.simulationSpeed = new _ui.Slider(document.getElementById('simulationSpeed'), 0.001, 100, 1, 'exponential');
        this.simulationSpeed.value = 1;
        // Initialize UI buttons
        this.resetButton = new _ui.Button(document.getElementById('resetButton'));
        this.settingsButton = new _ui.Button(document.getElementById('settingsButton'));
        this.zoomInButton = new _ui.Button(document.getElementById('zoomInButton'));
        this.zoomOutButton = new _ui.Button(document.getElementById('zoomOutButton'));
        this.helpButton = new _ui.Button(document.getElementById('helpButton'));
        // Initialize UI toggles
        this.trailsToggle = new _ui.Toggle(document.getElementById('trailsToggle'));
        this.bodyAdderToggle = new _ui.Toggle(document.getElementById('bodyAdderToggle'));
        this.bodyRemoverToggle = new _ui.Toggle(document.getElementById('bodyRemoverToggle'));
        this.bodyMoverToggle = new _ui.Toggle(document.getElementById('bodyMoverToggle'));
        this.cameraMoverToggle = new _ui.Toggle(document.getElementById('cameraMoverToggle'));
        this.bodyFollowerToggle = new _ui.Toggle(document.getElementById('bodyFollowerToggle'));
        // Initialize tools
        this.tools = new Map();
        this.tools.set('bodyAdder', new _tools.BodyAdder(this.world, this.renderer.view, this.bodyMass));
        this.tools.set('bodyRemover', new _tools.BodyRemover(this.world, this.renderer.view));
        this.tools.set('bodyMover', new _tools.BodyMover(this.world, this.renderer.view));
        this.tools.set('cameraMover', new _tools.CameraMover(this.renderer.view));
        this.tools.set('bodyFollower', new _tools.BodyFollower(this.world, this.renderer.view));
        this.tool = undefined;
        // Intiailize UI tool switch
        this.toolSwitch = new _ui.Switch();
        this.toolSwitch.add('bodyAdder', this.bodyAdderToggle);
        this.toolSwitch.add('bodyRemover', this.bodyRemoverToggle);
        this.toolSwitch.add('bodyMover', this.bodyMoverToggle);
        this.toolSwitch.add('cameraMover', this.cameraMoverToggle);
        this.toolSwitch.add('bodyFollower', this.bodyFollowerToggle);
        this.toolSwitch.setOnStateChange((tool)=>{
            this.tool = this.tools.get(tool);
            if (this.tool) this.tool.activate();
        });
        // Trails callbacks
        this.trailsToggle.setOnActivated(()=>{
            this.renderer.trailsEnabled = true;
        });
        this.trailsToggle.setOnDeactivated(()=>{
            this.renderer.trailsEnabled = false;
        });
        // Zoom callbacks
        this.zoomInButton.setOnClick(()=>{
            this.renderer.view.zoom(0.75);
            this.renderer.view.triggerViewChange();
        });
        this.zoomOutButton.setOnClick(()=>{
            this.renderer.view.zoom(1.25);
            this.renderer.view.triggerViewChange();
        });
        // Help callback
        this.helpButton.setOnClick(()=>{
            window.open(HELP_URL);
        });
        // Initialize preset selector
        this.presetSelector = new _presets.Selector(this.world, this.renderer.view);
        this.presetSelector.add(new _presets.Empty());
        this.presetSelector.add(new _presets.Planets());
        this.presetSelector.add(new _presets.Moons());
        this.presetSelector.add(new _presets.Binary());
        this.presetSelector.add(new _presets.CustomSimple());
        this.presetSelector.add(new _presets.CustomBinary());
        this.presetSelector.finish('planets');
        this.resetButton.setOnClick(()=>{
            this.world.clear();
            this.presetSelector.apply();
        });
        this.settingsButton.setOnClick(()=>{
            if (this.presetSelector.open) this.presetSelector.hide();
            else this.presetSelector.show();
        });
        this.presetSelector.apply();
    }
    /**
   * Starts the application's main loop.
   */ start() {
        this.animate(0);
    }
    /**
   * Updates and draws the application.
   * @param dt Time step in milliseconds.
   */ animate(dt) {
        this.world.update(this.simulationSpeed.value * dt * TIME_SCALE);
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

},{"./math":"9zUrS","./presets":"b365J","./renderer":"bK5TX","./tools":"acJ2D","./ui":"eFpQJ","./world":"8br0T","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9zUrS":[function(require,module,exports) {
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
   * Clones this 2D vector.
   * @returns The new vector.
   */ clone() {
        return new Vec2(this.x, this.y);
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
    /**
   * Returns the rotation matrix.
   * @param angle The angle in radians.
   * @returns The rotation matrix.
   */ static rotation(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat3([
            c,
            s,
            0,
            -s,
            c,
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

},{}],"b365J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Preset", ()=>_preset.Preset
);
parcelHelpers.export(exports, "Selector", ()=>_selector.Selector
);
parcelHelpers.export(exports, "Empty", ()=>_empty.Empty
);
parcelHelpers.export(exports, "Planets", ()=>_planets.Planets
);
parcelHelpers.export(exports, "Moons", ()=>_moons.Moons
);
parcelHelpers.export(exports, "Binary", ()=>_binary.Binary
);
parcelHelpers.export(exports, "CustomSimple", ()=>_customSimple.CustomSimple
);
parcelHelpers.export(exports, "CustomBinary", ()=>_customBinary.CustomBinary
);
var _preset = require("./preset");
var _selector = require("./selector");
var _empty = require("./empty");
var _planets = require("./planets");
var _moons = require("./moons");
var _binary = require("./binary");
var _customSimple = require("./custom_simple");
var _customBinary = require("./custom_binary");

},{"./preset":"5QPQU","./selector":"7FAqz","./empty":"3m14K","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./custom_simple":"f3N5j","./custom_binary":"ibF6B","./planets":"g9999","./moons":"5z03N","./binary":"a7yN0"}],"5QPQU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generic preset for generating worlds.
 */ parcelHelpers.export(exports, "Preset", ()=>Preset
);
class Preset {
    /**
   * @param id The preset identifier.
   * @param form The preset form.
   */ constructor(id, form = null){
        this._id = id;
        this._form = form;
    }
    /**
   * Gets the preset's id;
   */ get id() {
        return this._id;
    }
    /**
   * Gets the preset's form.
   */ get form() {
        return this._form;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"7FAqz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class used to select presets.
 */ parcelHelpers.export(exports, "Selector", ()=>Selector
);
var _form = require("../ui/form");
class Selector {
    /**
   * @param world The world to affect.
   * @param view View being used.
   */ constructor(world, view){
        this._world = world;
        this._view = view;
        this._presets = [];
        this._selected = null;
        this._form = _form.Form.create('selector');
        this._open = false;
    }
    /**
   * Adds a preset to the selector.
   * @param preset The preset to add.
   */ add(preset) {
        this._presets.push(preset);
        this._form.addToggle(preset.id);
    }
    /**
   * Finishes building the selector.
   */ finish(initial) {
        this._form.addSwitch('preset', ...this._presets.map((p)=>p.id
        ));
        this._form.setOnCancel(this.onSelectionCanceled.bind(this));
        this._form.setOnSubmit(this.onSelectionSubmitted.bind(this));
        this._selected = this._presets.find((p)=>p.id === initial
        );
    }
    /**
   * Shows the selector.
   */ show() {
        if (!this._open) {
            this._form.show();
            if (this._selected) this._form.setState('preset', this._selected.id);
        }
        this._open = true;
    }
    /**
   * Hides the selector.
   */ hide() {
        if (this._selected && this._selected.form && this._selected.form.open) this._selected.form.hide();
        if (this._form.open) this._form.hide();
        this._open = false;
    }
    /**
   * Checks if the selector is open.
   */ get open() {
        return this._open;
    }
    /**
   * Applies the last selected preset.
   * @param view View being used.
   */ apply() {
        this._world.clear();
        if (this._selected) this._selected.generate(this._world, this._view);
    }
    /**
   * Callback called when the selection form is canceled.
   */ onSelectionCanceled() {
        this._form.hide();
        this._open = false;
    }
    /**
   * Callback called when the selection form is submitted.
   */ onSelectionSubmitted() {
        const state = this._form.getState('preset');
        this._form.hide();
        this._selected = this._presets.find((p)=>p.id === state
        );
        if (this._selected.form) {
            this._selected.form.show();
            this._selected.form.setOnCancel(this.onSettingsCanceled.bind(this));
            this._selected.form.setOnSubmit(this.onSettingsSubmitted.bind(this));
        } else this.onSettingsSubmitted();
    }
    /**
   * Callback called when the settings form is canceled.
   */ onSettingsCanceled() {
        this._selected?.form?.hide();
        this._form.show();
    }
    /**
   * Callback called when the settings form is submitted.
   */ onSettingsSubmitted() {
        this.apply();
        this._selected?.form?.hide();
        this._open = false;
    }
}

},{"../ui/form":"lTd4l","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lTd4l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a form. A form is a collection of form fields.
 */ parcelHelpers.export(exports, "Form", ()=>Form
);
var _button = require("./button");
var _slider = require("./slider");
var _switch = require("./switch");
var _toggle = require("./toggle");
class Form {
    /**
   * @param root The form's root element.
   */ constructor(root){
        this._fields = new Map();
        this._root = root;
        this._cancel = new _button.Button(this._root.querySelector('#cancel'));
        this._submit = new _button.Button(this._root.querySelector('#submit'));
    }
    /**
   * Creates a new form.
   * @param id Form identifier.
   */ static create(id) {
        return new Form(document.querySelector(`.form>#${id}`));
    }
    /**
   * Adds a toggle field to the form.
   * @param id The toggle's id.
   */ addToggle(id1) {
        const element = this._root.querySelector(`#${id1}`);
        if (element && element instanceof HTMLButtonElement) this._fields.set(id1, new _toggle.Toggle(element));
    }
    /**
   * Adds a switch to the form.
   * @param id The switch's id.
   * @param toggles The switch's toggles' ids.
   */ addSwitch(id2, ...toggles) {
        const s = new _switch.Switch();
        toggles.forEach((i)=>{
            this.addToggle(i);
            s.add(i, this._fields.get(i));
        });
        this._fields.set(id2, s);
    }
    /**
   * Adds a slider field to the form.
   * @param id The slider's id.
   * @param min The slider's minimum value.
   * @param max The slider's maximum value.
   * @param initial The slider's initial value.
   * @param type The slider's type.
   */ addSlider(id3, min, max, initial, type) {
        const element = this._root.querySelector(`#${id3}`);
        if (element && element instanceof HTMLDivElement) this._fields.set(id3, new _slider.Slider(element, min, max, initial, type));
    }
    /**
   * Shows the form.
   */ show() {
        this._root.classList.toggle('hidden', false);
    }
    /**
   * Hides the form.
   */ hide() {
        this._root.classList.toggle('hidden', true);
    }
    /**
   * Checks if the form is open.
   */ get open() {
        return !this._root.classList.contains('hidden');
    }
    /**
   * Checks if the toggle with the given id is on.
   * @param id The toggle's id.
   * @returns True if the toggle is on, false otherwise.
   */ isOn(id4) {
        return this._fields.get(id4).activated;
    }
    /**
   * Gets the value of the slider with the given id.
   * @param id The slider's id.
   * @returns The slider's value.
   */ getValue(id5) {
        return this._fields.get(id5).value;
    }
    /**
   * Gets the state of the switch with the given id.
   * @param id The switch's id.
   * @returns The switch's state.
   */ getState(id6) {
        return this._fields.get(id6).current;
    }
    /**
   * Sets the state of the switch with the given id.
   * @param id The switch's id.
   * @param state The new state.
   */ setState(id7, state) {
        this._fields.get(id7).current = state;
    }
    /**
   * Sets the form cancelled callback.
   * @param callback The callback.
   */ setOnCancel(callback) {
        this._cancel.setOnClick(callback);
    }
    /**
   * Sets the form submitted callback.
   * @param callback The callback.
   */ setOnSubmit(callback1) {
        this._submit.setOnClick(callback1);
    }
}

},{"./button":"b0yVv","./slider":"3OpYJ","./switch":"bkyAD","./toggle":"aOqPX","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"b0yVv":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3OpYJ":[function(require,module,exports) {
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
   * @param min The minimum value.
   * @param max The maximum value.
   * @param initial The initial value.
   * @param type The slider type.
   */ constructor(slider, min, max, initial, type){
        this._root = slider;
        this._input = this._root.querySelector('input');
        this._display = this._root.querySelector('div');
        this._type = type;
        switch(this._type){
            case 'integer':
                this._input.min = min.toString();
                this._input.max = max.toString();
                this._input.value = initial.toString();
                this._input.step = 1..toString();
                break;
            case 'linear':
                this._input.min = min.toString();
                this._input.max = max.toString();
                this._input.value = initial.toString();
                this._input.step = 0.1.toString();
                break;
            case 'exponential':
                this._input.min = Math.log10(min).toString();
                this._input.max = Math.log10(max).toString();
                this._input.value = Math.log10(initial).toString();
                this._input.step = 0.1.toString();
                break;
        }
        this._input.addEventListener('input', this.updateDisplay.bind(this));
        this.updateDisplay();
    }
    /**
   * @returns The current value of the slider.
   */ get value() {
        switch(this._type){
            case 'integer':
            case 'linear':
                return this._input.valueAsNumber;
            case 'exponential':
                return Math.pow(10, this._input.valueAsNumber);
        }
    }
    /**
   * Sets the value of the slider.
   */ set value(value) {
        switch(this._type){
            case 'integer':
            case 'linear':
                this._input.valueAsNumber = value;
                break;
            case 'exponential':
                this._input.valueAsNumber = Math.log10(value);
                break;
        }
        this.updateDisplay();
    }
    /**
   * Updates the display of the slider.
   */ updateDisplay() {
        if (this._type === 'integer') this._display.innerText = this.value.toString();
        else if (this.value < 0.01 && this.value != 0 || this.value > 9999.99) this._display.innerText = this.value.toExponential(1);
        else this._display.innerText = this.value.toFixed(2);
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

},{"./button":"b0yVv","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3m14K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generates an empty set.
 */ parcelHelpers.export(exports, "Empty", ()=>Empty
);
var _preset = require("./preset");
class Empty extends _preset.Preset {
    constructor(){
        super('empty');
    }
    generate(_1, _2) {
    // Do nothing
    }
}

},{"./preset":"5QPQU","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"f3N5j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generates a custom system with a single star.
 */ parcelHelpers.export(exports, "CustomSimple", ()=>CustomSimple
);
var _body = require("../body");
var _math = require("../math");
var _form = require("../ui/form");
var _world = require("../world");
var _preset = require("./preset");
class CustomSimple extends _preset.Preset {
    constructor(){
        // Create form
        const form = _form.Form.create('customSimple');
        form.addSlider('starMass', 0.1, 100000000, 1000, 'exponential');
        form.addSlider('bodyCount', 1, 2000, 100, 'integer');
        form.addSlider('bodyMass', 0.1, 100000, 1, 'exponential');
        form.addSlider('bodyMassSpread', 0, 1, 0.5, 'linear');
        form.addSlider('bodyDistance', 0.1, 25, 1, 'linear');
        form.addSlider('bodyDistanceSpread', 0, 1, 0.5, 'linear');
        super('customSimple', form);
    }
    generate(world, view) {
        view.reset();
        // Get settings from form
        const starMass = this.form.getValue('starMass');
        const bodyCount = this.form.getValue('bodyCount');
        const bodyMass = this.form.getValue('bodyMass');
        const bodyMassSpread = this.form.getValue('bodyMassSpread');
        const bodyDistance = this.form.getValue('bodyDistance');
        const bodyDistanceSpread = this.form.getValue('bodyDistanceSpread');
        const bodyMinMass = Math.max(0.01, bodyMass * (1 - bodyMassSpread));
        const bodyMaxMass = bodyMass * (1 + bodyMassSpread);
        const bodyMinDistance = bodyDistance * (1 - bodyDistanceSpread);
        const bodyMaxDistance = bodyDistance * (1 + bodyDistanceSpread);
        // Add star
        const star = new _body.Body();
        star.mass = starMass;
        world.addBody(star);
        for(let i = 0; i < bodyCount; ++i){
            // Add body
            const body = new _body.Body();
            body.mass = Math.random() * (bodyMaxMass - bodyMinMass) + bodyMinMass;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (bodyMaxDistance - bodyMinDistance) + bodyMinDistance + star.radius + body.radius;
            body.position = new _math.Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
            body.velocity = body.position.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * starMass / distance));
            world.addBody(body);
        }
    }
}

},{"../body":"4UTpg","../math":"9zUrS","../ui/form":"lTd4l","../world":"8br0T","./preset":"5QPQU","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"4UTpg":[function(require,module,exports) {
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
        this.color = _color.Color.random().mul(0.8).add(new _color.Color(0.2, 0.2, 0.2));
        this.destroyed = false;
        this.onMergeCallbacks = [];
    }
    /**
   * Gets the body's position.
   */ get position() {
        return this._position.clone();
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
        if (!this.static) this.position = this.position.add(this.velocity.mul(dt1));
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
   * Sets the merge callback.
   * @param callback The callback.
   */ addOnMerge(callback) {
        this.onMergeCallbacks.push(callback);
    }
    /**
   * Removes a merge callback.
   * @param callback The callback.
   */ removeOnMerge(callback1) {
        const index = this.onMergeCallbacks.indexOf(callback1);
        if (index >= 0) this.onMergeCallbacks.splice(index, 1);
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
        this.destroyed = true;
        for (const c of other1.onMergeCallbacks)c(b);
        for (const c1 of this.onMergeCallbacks)c1(b);
        return b;
    }
}

},{"./math":"9zUrS","./renderer/color":"ak01f","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ak01f":[function(require,module,exports) {
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
   * @param body The body to remove.
   */ removeBody(body1) {
        body1.destroyed = true;
        this.bodies.splice(this.bodies.indexOf(body1), 1);
    }
    /**
   * Picks a body in the world.
   * @param position The position to pick.
   * @return The body at the position, or null if no body is at the position.
   */ pickBody(position) {
        for(let i = 0; i < this.bodies.length; i++){
            if (this.bodies[i].intersects(position)) return this.bodies[i];
        }
        return null;
    }
    /**
   * Deletes all bodies in the world.
   */ clear() {
        for(let i = 0; i < this.bodies.length; i++)this.bodies[i].destroyed = true;
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
        for(let i = 0; i < this.bodies.length; i++)renderer.drawCircle(this.bodies[i].position, this.bodies[i].radius, this.bodies[i].color, true);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ibF6B":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generates a binary star system.
 */ parcelHelpers.export(exports, "CustomBinary", ()=>CustomBinary
);
var _body = require("../body");
var _math = require("../math");
var _form = require("../ui/form");
var _world = require("../world");
var _preset = require("./preset");
class CustomBinary extends _preset.Preset {
    constructor(){
        // Create form
        const form = _form.Form.create('customBinary');
        form.addSlider('starsMass', 0.1, 100000000, 1000, 'exponential');
        form.addSlider('starsDistance', 0.1, 100, 0.15, 'exponential');
        form.addSlider('bodyCount', 1, 2000, 100, 'integer');
        form.addSlider('bodyMass', 0.1, 100000, 1, 'exponential');
        form.addSlider('bodyMassSpread', 0, 1, 1, 'linear');
        form.addSlider('bodyDistance', 0.1, 25, 4, 'linear');
        form.addSlider('bodyDistanceSpread', 0, 1, 0.8, 'linear');
        super('customBinary', form);
    }
    generate(world, view) {
        view.reset();
        // Get settings from form
        const starsMass = this.form.getValue('starsMass');
        const starsDistance = this.form.getValue('starsDistance');
        const bodyCount = this.form.getValue('bodyCount');
        const bodyMass = this.form.getValue('bodyMass');
        const bodyMassSpread = this.form.getValue('bodyMassSpread');
        const bodyDistance = this.form.getValue('bodyDistance');
        const bodyDistanceSpread = this.form.getValue('bodyDistanceSpread');
        const bodyMinMass = Math.max(0.01, bodyMass * (1 - bodyMassSpread));
        const bodyMaxMass = bodyMass * (1 + bodyMassSpread);
        const bodyMinDistance = bodyDistance * (1 - bodyDistanceSpread);
        const bodyMaxDistance = bodyDistance * (1 + bodyDistanceSpread);
        // Add stars
        const starA = new _body.Body();
        const starB = new _body.Body();
        starA.mass = starsMass;
        starB.mass = starsMass;
        starA.position = new _math.Vec2(-starA.radius - starsDistance, 0);
        starB.position = new _math.Vec2(+starB.radius + starsDistance, 0);
        const reducedMass = starsMass / 2;
        starA.velocity = starA.position.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * reducedMass / (starA.position.length() * 2)));
        starB.velocity = starB.position.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * reducedMass / (starB.position.length() * 2)));
        world.addBody(starA);
        world.addBody(starB);
        for(let i = 0; i < bodyCount; ++i){
            // Add body
            const body = new _body.Body();
            body.mass = Math.random() * (bodyMaxMass - bodyMinMass) + bodyMinMass;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (bodyMaxDistance - bodyMinDistance) + bodyMinDistance + starA.radius + starB.radius + starsDistance + body.radius;
            body.position = new _math.Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
            body.velocity = body.position.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * starsMass * 2 / distance));
            world.addBody(body);
        }
    }
}

},{"../body":"4UTpg","../math":"9zUrS","../ui/form":"lTd4l","../world":"8br0T","./preset":"5QPQU","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"g9999":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generates a simple star system with a single star and planets.
 */ parcelHelpers.export(exports, "Planets", ()=>Planets
);
var _body = require("../body");
var _math = require("../math");
var _world = require("../world");
var _preset = require("./preset");
class Planets extends _preset.Preset {
    constructor(){
        super('planets');
    }
    generate(world, view) {
        view.reset();
        view.scale = 0.05;
        // Add star
        const star = new _body.Body();
        star.mass = 100000;
        world.addBody(star);
        for(let i = 0; i < 8; ++i){
            const angle = Math.random() * Math.PI * 2;
            const distance = (Math.random() * 0.1 + 1) * i * i * 0.5 + 2;
            // Add body
            const body = new _body.Body();
            body.mass = Math.random() * 10 + 1 + 10 * i;
            body.position = new _math.Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
            body.velocity = body.position.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * star.mass / distance));
            world.addBody(body);
        }
    }
}

},{"../body":"4UTpg","../math":"9zUrS","../world":"8br0T","./preset":"5QPQU","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5z03N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generates a star system with planets and moons.
 */ parcelHelpers.export(exports, "Moons", ()=>Moons
);
var _body = require("../body");
var _math = require("../math");
var _world = require("../world");
var _preset = require("./preset");
class Moons extends _preset.Preset {
    constructor(){
        super('moons');
    }
    generate(world, view) {
        view.reset();
        view.scale = 0.015;
        // Add star
        const star = new _body.Body();
        star.mass = 100000;
        world.addBody(star);
        for(let i = 0; i < 3; i++){
            const planet = new _body.Body();
            planet.mass = 1000 + 1000 * i;
            planet.position = new _math.Vec2(-20 - 10 * i * i * (1 + Math.random()), 0);
            planet.velocity = planet.position.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * star.mass / planet.position.length()));
            world.addBody(planet);
            const moonCount = Math.floor(Math.random() * 3) + 1 + 3 * i;
            for(let j = 0; j < moonCount; j++){
                const moon = new _body.Body();
                moon.mass = Math.random() * 2 + 1;
                const angle = Math.random() * Math.PI * 2;
                const distance = (Math.random() * 0.1 + 1) * j * j * 0.1 + 0.1 + planet.radius + moon.radius;
                moon.position = planet.position.add(new _math.Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance));
                moon.velocity = planet.velocity.add(moon.position.sub(planet.position).perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * planet.mass / distance)));
                world.addBody(moon);
            }
        }
    }
}

},{"../body":"4UTpg","../math":"9zUrS","../world":"8br0T","./preset":"5QPQU","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"a7yN0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generates a binary star system.
 */ parcelHelpers.export(exports, "Binary", ()=>Binary
);
var _body = require("../body");
var _math = require("../math");
var _world = require("../world");
var _preset = require("./preset");
class Binary extends _preset.Preset {
    constructor(){
        super('binary');
    }
    generate(world, view) {
        view.reset();
        view.scale = 0.2;
        // Get settings from form
        const starsMass = 1000;
        const starsDistance = 0.15;
        const bodyCount = 100;
        const bodyMass = 1;
        const bodyMassSpread = 1;
        const bodyDistance = 4;
        const bodyDistanceSpread = 0.8;
        const bodyMinMass = Math.max(0.01, bodyMass * (1 - bodyMassSpread));
        const bodyMaxMass = bodyMass * (1 + bodyMassSpread);
        const bodyMinDistance = bodyDistance * (1 - bodyDistanceSpread);
        const bodyMaxDistance = bodyDistance * (1 + bodyDistanceSpread);
        // Add stars
        const starA = new _body.Body();
        const starB = new _body.Body();
        starA.mass = starsMass;
        starB.mass = starsMass;
        starA.position = new _math.Vec2(-starA.radius - starsDistance, 0);
        starB.position = new _math.Vec2(+starB.radius + starsDistance, 0);
        const reducedMass = starsMass / 2;
        starA.velocity = starA.position.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * reducedMass / (starA.position.length() * 2)));
        starB.velocity = starB.position.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * reducedMass / (starB.position.length() * 2)));
        world.addBody(starA);
        world.addBody(starB);
        for(let i = 0; i < bodyCount; ++i){
            // Add body
            const body = new _body.Body();
            body.mass = Math.random() * (bodyMaxMass - bodyMinMass) + bodyMinMass;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (bodyMaxDistance - bodyMinDistance) + bodyMinDistance + starA.radius + starB.radius + starsDistance + body.radius;
            body.position = new _math.Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);
            body.velocity = body.position.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * starsMass * 2 / distance));
            world.addBody(body);
        }
    }
}

},{"./preset":"5QPQU","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","../body":"4UTpg","../world":"8br0T","../math":"9zUrS"}],"bK5TX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "View", ()=>_view.View
);
/**
 * Class used to render the app.
 */ parcelHelpers.export(exports, "Renderer", ()=>Renderer
);
var _math = require("../math");
var _drawCircle = require("./draw_circle");
var _drawLine = require("./draw_line");
var _program = require("./program");
var _view = require("./view");
/** Number of divisions used for drawing circles. */ const CIRCLE_DIVISIONS = 32;
/** Line thickness scale. */ const LINE_THICKNESS_SCALE = 0.0025;
/** Trail thickness scale. */ const TRAIL_THICKNESS_SCALE = 0.5;
/** Trail minimum thickness scale. */ const TRAIL_MIN_THICKNESS = 0.0015;
/** Arrow head scale. */ const ARROW_HEAD_SCALE = 0.02;
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
        this.initTrails();
        // Initialize view.
        this.view = new _view.View(this.canvas.width, this.canvas.height);
        this.view.setOnViewChange(()=>{
            if (this._trailsEnabled) {
                // Clear the trails texture.
                this.context.bindFramebuffer(this.context.FRAMEBUFFER, this.trailsFramebuffer);
                this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
                this.context.clearColor(0, 0, 0, 0);
                this.context.clear(this.context.COLOR_BUFFER_BIT);
            }
        });
    }
    /**
   * Draws a circle.
   * @param center The center of the circle.
   * @param radius The radius of the circle.
   * @param color The color of the circle.
   * @param drawTrails Should trails be drawn?
   */ drawCircle(center, radius, color, drawTrails) {
        this.commands.push(new _drawCircle.DrawCircle(center, radius, color, drawTrails));
    }
    /**
   * Draws a line.
   * @param start The start of the line.
   * @param end The end of the line.
   * @param thickness Thickness of the line.
   * @param color The color of the line.
   */ drawLine(start, end, thickness, color1) {
        this.commands.push(new _drawLine.DrawLine(start, end, thickness, color1));
    }
    /**
   * Draws an arrow.
   * @param start The start of the arrow.
   * @param end The end of the arrow.
   * @param color The color of the arrow.
   */ drawArrow(start1, end1, color2) {
        const offset = end1.sub(start1);
        const perpendicular = offset.perpendicular();
        const diagonal1 = offset.add(perpendicular).normalize();
        const diagonal2 = offset.sub(perpendicular).normalize();
        this.drawLine(start1, end1, 1 / this.view.scale, color2);
        this.drawLine(end1, end1.add(diagonal1.mul(-ARROW_HEAD_SCALE / this.view.scale)), 1 / this.view.scale, color2);
        this.drawLine(end1, end1.add(diagonal2.mul(-ARROW_HEAD_SCALE / this.view.scale)), 1 / this.view.scale, color2);
    }
    /**
   * Flushes the renderer, showing the current state of the app.
   */ flush() {
        if (this._trailsEnabled) {
            // Bind the trails framebuffer.
            this.context.bindFramebuffer(this.context.FRAMEBUFFER, this.trailsFramebuffer);
            this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
            // Bind the buffers and shaders.
            this.drawProgram.use();
            this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
            this.context.vertexAttribPointer(this.drawPositionAttribute, 2, this.context.FLOAT, false, 0, 0);
            this.context.enableVertexAttribArray(this.drawPositionAttribute);
            // Draw all commands that require trails.
            for (let command of this.commands)this.executeTrailCommand(command);
            // Apply fade.
            this.context.enable(this.context.BLEND);
            this.context.blendEquation(this.context.FUNC_REVERSE_SUBTRACT);
            this.context.blendFuncSeparate(this.context.SRC_ALPHA, this.context.ONE, this.context.ZERO, this.context.ONE);
            this.fadeProgram.use();
            this.context.uniform1f(this.fadeValueUniform, 1 / 255);
            this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
            this.context.vertexAttribPointer(this.fadePositionAttribute, 2, this.context.FLOAT, false, 0, 0);
            this.context.enableVertexAttribArray(this.fadePositionAttribute);
            this.context.drawArrays(this.context.TRIANGLE_FAN, this.quad[0], this.quad[1]);
            this.context.disable(this.context.BLEND);
        }
        // Clear the screen with the background color.
        this.context.bindFramebuffer(this.context.FRAMEBUFFER, null);
        this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.context.clearColor(0, 0, 0, 1);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
        if (this._trailsEnabled) {
            // Draw trails texture.
            this.trailsProgram.use();
            this.context.bindTexture(this.context.TEXTURE_2D, this.trailsTexture);
            this.context.uniform1i(this.trailsTextureUniform, 0);
            this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
            this.context.vertexAttribPointer(this.trailsPositionAttribute, 2, this.context.FLOAT, false, 0, 0);
            this.context.enableVertexAttribArray(this.trailsPositionAttribute);
            this.context.drawArrays(this.context.TRIANGLE_FAN, this.quad[0], this.quad[1]);
        }
        // Bind the buffers and shaders.
        this.drawProgram.use();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
        this.context.vertexAttribPointer(this.drawPositionAttribute, 2, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(this.drawPositionAttribute);
        // Execute all draw commands.
        for (let command of this.commands)this.executeCommand(command);
        this.commands = [];
    }
    /**
   * Enables or disables trails.
   */ set trailsEnabled(enabled) {
        this._trailsEnabled = enabled;
        if (this._trailsEnabled) {
            // Clear the trails texture.
            this.context.bindFramebuffer(this.context.FRAMEBUFFER, this.trailsFramebuffer);
            this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.context.clearColor(0, 0, 0, 0);
            this.context.clear(this.context.COLOR_BUFFER_BIT);
        }
    }
    /**
   * Checks if trails are enabled.
   */ get trailsEnabled() {
        return this._trailsEnabled;
    }
    /**
   * Initializes shaders used for drawing.
   */ initShaders() {
        // Create draw program.
        this.drawProgram = new _program.Program(this.context, `
        attribute vec2 position;

        uniform mat3 transform;

        void main() {
          vec2 transformed = (transform * vec3(position, 1.0)).xy;
          gl_Position = vec4(transformed, 0.0, 1.0);
        }
        `, `
        uniform mediump vec3 color;

        void main() {
          gl_FragColor = vec4(color, 1.0);
        }
        `);
        // Get program attribute locations.
        this.drawPositionAttribute = this.drawProgram.getAttributeLocation('position');
        // Get shader program uniform locations.
        this.drawTransformUniform = this.drawProgram.getUniformLocation('transform');
        this.drawColorUniform = this.drawProgram.getUniformLocation('color');
        // Create trails program.
        this.trailsProgram = new _program.Program(this.context, `
      attribute vec2 position;

      varying vec2 uvs;
      
      void main() {
        uvs = (position + 1.0) / 2.0;
        gl_Position = vec4(position, 0.0, 1.0);
      }
      `, `
      precision mediump float;

      uniform sampler2D trails;

      varying vec2 uvs;

      void main() {
        vec4 color = texture2D(trails, uvs);
        if (color.a == 0.0) discard;
        gl_FragColor = vec4(texture2D(trails, uvs));
      }
      `);
        // Get program attribute locations.
        this.trailsPositionAttribute = this.trailsProgram.getAttributeLocation('position');
        // Get shader program uniform locations.
        this.trailsTextureUniform = this.trailsProgram.getUniformLocation('trails');
        // Create fade program.
        this.fadeProgram = new _program.Program(this.context, `
      attribute vec2 position;
      
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
      `, `
      precision mediump float;

      uniform float fade;

      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, fade);
      }
      `);
        // Get program attribute locations.
        this.fadePositionAttribute = this.fadeProgram.getAttributeLocation('position');
        // Get shader program uniform locations.
        this.fadeValueUniform = this.fadeProgram.getUniformLocation('fade');
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
        // Generate line vertices
        this.line = [
            vertices.length / 2,
            4
        ];
        vertices.push(-1, 0);
        vertices.push(-1, 1);
        vertices.push(1, 1);
        vertices.push(1, 0);
        // Generate quad vertices
        this.quad = [
            vertices.length / 2,
            4
        ];
        vertices.push(-1, -1);
        vertices.push(-1, 1);
        vertices.push(1, 1);
        vertices.push(1, -1);
        // Generate vertex buffer
        this.vertexBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);
    }
    /**
   * Initializes the trails framebuffer and texture.
   */ initTrails() {
        this._trailsEnabled = false;
        // Create framebuffer
        this.trailsFramebuffer = this.context.createFramebuffer();
        this.context.bindFramebuffer(this.context.FRAMEBUFFER, this.trailsFramebuffer);
        // Create texture
        this.trailsTexture = this.context.createTexture();
        this.context.bindTexture(this.context.TEXTURE_2D, this.trailsTexture);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.NEAREST);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.NEAREST);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
        this.context.texImage2D(this.context.TEXTURE_2D, 0, this.context.RGBA, this.canvas.width, this.canvas.height, 0, this.context.RGBA, this.context.UNSIGNED_BYTE, null);
        // Attach texture to framebuffer
        this.context.framebufferTexture2D(this.context.FRAMEBUFFER, this.context.COLOR_ATTACHMENT0, this.context.TEXTURE_2D, this.trailsTexture, 0);
        // Check framebuffer status
        if (this.context.checkFramebufferStatus(this.context.FRAMEBUFFER) !== this.context.FRAMEBUFFER_COMPLETE) throw new Error('Trails framebuffer is not complete');
        // Clear framebuffer.
        this.context.clearColor(0, 0, 0, 1);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
        // Unbind framebuffer
        this.context.bindFramebuffer(this.context.FRAMEBUFFER, null);
    }
    /**
   * Executes a draw trail command.
   * @param command Command to execute.
   */ executeTrailCommand(command) {
        if (!command.drawTrails) return;
        if (command instanceof _drawCircle.DrawCircle) {
            const radius = Math.max(command.radius * TRAIL_THICKNESS_SCALE, TRAIL_MIN_THICKNESS / this.view.scale);
            const translation = _math.Mat3.translation(command.center);
            const scale = _math.Mat3.scale(new _math.Vec2(radius, radius));
            const transform = scale.mul(translation).mul(this.view.transform);
            this.context.uniformMatrix3fv(this.drawTransformUniform, false, transform.elements);
            this.context.uniform3f(this.drawColorUniform, command.color.r, command.color.g, command.color.b);
            this.context.drawArrays(this.context.TRIANGLE_FAN, this.circle[0], this.circle[1]);
        } else if (command instanceof _drawLine.DrawLine) {
            const translation = _math.Mat3.translation(command.start);
            const direction = command.end.sub(command.start);
            const scale = _math.Mat3.scale(new _math.Vec2(command.thickness * LINE_THICKNESS_SCALE, direction.length()));
            const rotation = _math.Mat3.rotation(Math.atan2(direction.y, direction.x) - Math.PI / 2);
            const transform = scale.mul(rotation).mul(translation).mul(this.view.transform);
            this.context.uniformMatrix3fv(this.drawTransformUniform, false, transform.elements);
            this.context.uniform3f(this.drawColorUniform, command.color.r, command.color.g, command.color.b);
            this.context.drawArrays(this.context.TRIANGLE_FAN, this.line[0], this.line[1]);
        }
    }
    /**
   * Executes a draw command.
   * @param command Command to execute.
   */ executeCommand(command1) {
        if (command1 instanceof _drawCircle.DrawCircle) {
            const radius = Math.max(command1.radius, TRAIL_MIN_THICKNESS / this.view.scale);
            const translation = _math.Mat3.translation(command1.center);
            const scale = _math.Mat3.scale(new _math.Vec2(radius, radius));
            const transform = scale.mul(translation).mul(this.view.transform);
            this.context.uniformMatrix3fv(this.drawTransformUniform, false, transform.elements);
            this.context.uniform3f(this.drawColorUniform, command1.color.r, command1.color.g, command1.color.b);
            this.context.drawArrays(this.context.TRIANGLE_FAN, this.circle[0], this.circle[1]);
        } else if (command1 instanceof _drawLine.DrawLine) {
            const translation = _math.Mat3.translation(command1.start);
            const direction = command1.end.sub(command1.start);
            const scale = _math.Mat3.scale(new _math.Vec2(command1.thickness * LINE_THICKNESS_SCALE, direction.length()));
            const rotation = _math.Mat3.rotation(Math.atan2(direction.y, direction.x) - Math.PI / 2);
            const transform = scale.mul(rotation).mul(translation).mul(this.view.transform);
            this.context.uniformMatrix3fv(this.drawTransformUniform, false, transform.elements);
            this.context.uniform3f(this.drawColorUniform, command1.color.r, command1.color.g, command1.color.b);
            this.context.drawArrays(this.context.TRIANGLE_FAN, this.line[0], this.line[1]);
        }
    }
}

},{"../math":"9zUrS","./draw_line":"cQRBN","./draw_circle":"fpeFl","./view":"l5tb4","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./program":"iu31C"}],"cQRBN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a command used to draw an line on the screen.
 */ parcelHelpers.export(exports, "DrawLine", ()=>DrawLine
);
var _command = require("./command");
class DrawLine extends _command.Command {
    /**
   * @param start Start position of the line.
   * @param end End position of the line.
   * @param thickness Thickness of the line.
   * @param color Color of the line.
   */ constructor(start, end, thickness, color){
        super(false);
        this.start = start;
        this.end = end;
        this.thickness = thickness;
        this.color = color;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./command":"5eFNB"}],"5eFNB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Draw command base class.
 */ parcelHelpers.export(exports, "Command", ()=>Command
);
class Command {
    /**
   * @param drawTrails Should trails be drawn?
   */ constructor(drawTrails){
        this.drawTrails = drawTrails;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fpeFl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a command used to draw a circle.
 */ parcelHelpers.export(exports, "DrawCircle", ()=>DrawCircle
);
var _command = require("./command");
class DrawCircle extends _command.Command {
    /**
   * @param center Position of the circle center.
   * @param radius Radius of the circle.
   * @param color Color of the circle.
   * @param drawTrails Whether to draw trails.
   */ constructor(center, radius, color, drawTrails){
        super(drawTrails);
        this.center = center;
        this.radius = radius;
        this.color = color;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./command":"5eFNB"}],"l5tb4":[function(require,module,exports) {
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
        this.aspectRatio = height / width;
        this.width = width;
        this.height = height;
        this.onViewChangeCallback = ()=>{
        };
        this.onZoomChangeCallback = ()=>{
        };
        this.reset();
    }
    /**
   * Gets the transform matrix.
   */ get transform() {
        return this._transform;
    }
    /**
   * Sets the view's position.
   */ set position(position) {
        this._position = position;
        this.updateTransform();
    }
    /**
   * Gets the view's position.
   */ get position() {
        return this._position.clone();
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
   * Resets this view.
   */ reset() {
        this.position = new _math.Vec2(0, 0);
        this.scale = 1;
        this.triggerViewChange();
    }
    /**
   * Moves the view by a given amount.
   * @param delta The amount to move.
   */ move(delta) {
        this.position = this.position.add(delta.div(this.scale));
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
   * Triggers the view change callback.
   */ triggerViewChange() {
        this.onViewChangeCallback();
    }
    /**
   * Sets the view change callback.
   * @param callback The callback.
   */ setOnViewChange(callback) {
        this.onViewChangeCallback = callback;
    }
    /**
   * Sets the zoom change callback.
   * @param callback The callback.
   */ setOnZoomChange(callback1) {
        this.onZoomChangeCallback = callback1;
    }
    /**
   * Updates the transform matrix.
   */ updateTransform() {
        const translation = _math.Mat3.translation(new _math.Vec2(this.position.x, this.position.y));
        const scale = _math.Mat3.scale(new _math.Vec2(this.scale * this.aspectRatio, this.scale));
        this._transform = translation.mul(scale);
    }
}

},{"../math":"9zUrS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"iu31C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * WebGL program wrapper.
 */ parcelHelpers.export(exports, "Program", ()=>Program
);
class Program {
    /**
   * @param context Context used.
   * @param vs Vertex shader source code.
   * @param fs Fragment shader source code.
   */ constructor(context, vs, fs){
        this._context = context;
        this._vs = this.createShader(this._context.VERTEX_SHADER, vs);
        this._fs = this.createShader(this._context.FRAGMENT_SHADER, fs);
        const program = this._context.createProgram();
        this._context.attachShader(program, this._vs);
        this._context.attachShader(program, this._fs);
        this._context.linkProgram(program);
        if (!this._context.getProgramParameter(program, this._context.LINK_STATUS)) throw new Error(this._context.getProgramInfoLog(program));
        this._program = program;
    }
    /**
   * Uses the program.
   */ use() {
        this._context.useProgram(this._program);
    }
    /**
   * Gets the attribute location.
   * @param name Name of attribute.
   * @returns Attribute location.
   */ getAttributeLocation(name) {
        return this._context.getAttribLocation(this._program, name);
    }
    /**
   * Gets the uniform location.
   * @param name Name of uniform.
   * @returns Uniform location.
   */ getUniformLocation(name1) {
        return this._context.getUniformLocation(this._program, name1);
    }
    /**
   * Creates a shader.
   * @param type Type of shader.
   * @param source Source code of shader.
   * @returns Shader.
   */ createShader(type, source) {
        const shader = this._context.createShader(type);
        this._context.shaderSource(shader, source);
        this._context.compileShader(shader);
        if (!this._context.getShaderParameter(shader, this._context.COMPILE_STATUS)) throw new Error(this._context.getShaderInfoLog(shader));
        return shader;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"acJ2D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BodyAdder", ()=>_bodyAdder.BodyAdder
);
parcelHelpers.export(exports, "BodyFollower", ()=>_bodyFollower.BodyFollower
);
parcelHelpers.export(exports, "BodyMover", ()=>_bodyMover.BodyMover
);
parcelHelpers.export(exports, "BodyRemover", ()=>_bodyRemover.BodyRemover
);
parcelHelpers.export(exports, "CameraMover", ()=>_cameraMover.CameraMover
);
parcelHelpers.export(exports, "Tool", ()=>_tool.Tool
);
var _bodyAdder = require("./body_adder");
var _bodyFollower = require("./body_follower");
var _bodyMover = require("./body_mover");
var _bodyRemover = require("./body_remover");
var _cameraMover = require("./camera_mover");
var _tool = require("./tool");

},{"./tool":"5kQCS","./body_adder":"3vvBg","./body_remover":"9vhWm","./camera_mover":"c6DGr","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./body_mover":"3HXbS","./body_follower":"lymk9"}],"5kQCS":[function(require,module,exports) {
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
/** Velocity multiplier for throwing bodies. */ const VELOCITY_MULTIPLIER = 0.0004;
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
        renderer.drawCircle(this.body.position, this.body.radius, this.body.color, false);
        if (this.mouseDown) renderer.drawArrow(this.body.position, this.view.screenToWorld(this.mousePos), this.body.color);
    }
    onMouseDown(position) {
        this.body.position = this.view.screenToWorld(position);
        this.mouseDown = position;
    }
    onMouseUp(position1) {
        if (this.mouseDown) {
            let delta = position1.sub(this.mouseDown);
            delta.y *= -1;
            this.body.position = this.view.screenToWorld(this.mouseDown);
            this.body.velocity = delta.mul(VELOCITY_MULTIPLIER / this.view.scale);
            this.world.addBody(this.body);
            this.mouseDown = null;
            this.body = new _body.Body();
            this.body.position = this.view.screenToWorld(position1);
        }
    }
    onMouseMove(position2) {
        this.mousePos = position2;
        if (!this.mouseDown) this.body.position = this.view.screenToWorld(this.mousePos);
        this.mouseMoved = true;
    }
}

},{"../body":"4UTpg","./tool":"5kQCS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9vhWm":[function(require,module,exports) {
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
        const body = this.world.pickBody(this.view.screenToWorld(position));
        if (body) this.world.removeBody(body);
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
        if (this.lastPosition) this.view.triggerViewChange();
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
        this.view.triggerViewChange();
    }
}

},{"./tool":"5kQCS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3HXbS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Tool for moving bodies in the world.
 */ parcelHelpers.export(exports, "BodyMover", ()=>BodyMover
);
var _tool = require("./tool");
class BodyMover extends _tool.Tool {
    /**
   * @param world The world whoose bodies will be moved.
   * @param view The view being used to render.
   */ constructor(world, view){
        super();
        this.world = world;
        this.view = view;
        this.callback = this.setBody.bind(this);
    }
    activate() {
        this.body = null;
    }
    draw(_) {
    // Do nothing.
    }
    onMouseDown(position) {
        this.setBody(this.world.pickBody(this.view.screenToWorld(position)));
        if (this.body) this.body.position = this.view.screenToWorld(position);
    }
    onMouseUp(position1) {
        if (this.body) {
            this.body.position = this.view.screenToWorld(position1);
            this.setBody(null);
        }
    }
    onMouseMove(position2) {
        if (this.body) this.body.position = this.view.screenToWorld(position2);
    }
    setBody(body) {
        if (this.body) {
            this.body.removeOnMerge(this.callback);
            this.body.static = false;
        }
        this.body = body;
        if (this.body) {
            this.body.static = true;
            this.body?.addOnMerge(this.callback);
        }
    }
}

},{"./tool":"5kQCS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lymk9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Tool for making the view follow a body.
 */ parcelHelpers.export(exports, "BodyFollower", ()=>BodyFollower
);
var _tool = require("./tool");
class BodyFollower extends _tool.Tool {
    /**
   * @param world The world where bodies will be followed.
   * @param view The view that will be moved.
   */ constructor(world, view){
        super();
        this.world = world;
        this.view = view;
        this.body = null;
        this.callback = this.setBody.bind(this);
    }
    activate() {
        this.body = null;
    }
    draw() {
        if (this.body) {
            if (this.body.destroyed) this.setBody(null);
            else this.view.position = this.body.position.mul(-1);
        }
    }
    onMouseDown(position) {
        this.setBody(this.world.pickBody(this.view.screenToWorld(position)));
    }
    onMouseUp(_) {
    // Do nothing
    }
    onMouseMove(_1) {
    // Do nothing
    }
    setBody(body) {
        if (this.body) this.body.removeOnMerge(this.callback);
        this.body = body;
        if (this.body) this.body.addOnMerge(this.callback);
        this.view.triggerViewChange();
    }
}

},{"./tool":"5kQCS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"eFpQJ":[function(require,module,exports) {
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

},{"./slider":"3OpYJ","./button":"b0yVv","./switch":"bkyAD","./toggle":"aOqPX","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["11zn2","jZgE0"], "jZgE0", "parcelRequire34d4")

//# sourceMappingURL=index.e7f05703.js.map
