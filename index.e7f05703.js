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
var _math = require("./app/math");
// Initialize canvas
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Initialize app
const app = new _app.App(canvas);
// Add drag event
let dragging = false;
let lastMousePos = new _math.Vec2(0, 0);
canvas.addEventListener('mousedown', (event)=>{
    if (event.button == 1) {
        dragging = true;
        lastMousePos = new _math.Vec2(event.offsetX, event.offsetY);
    }
    event.preventDefault();
}, false);
canvas.addEventListener('mousemove', (event)=>{
    if (dragging) {
        const mousePos = new _math.Vec2(event.offsetX, event.offsetY);
        let delta = mousePos.sub(lastMousePos);
        delta.y = -delta.y;
        lastMousePos = mousePos;
        app.move(delta.mul(0.001));
    }
    event.preventDefault();
}, false);
canvas.addEventListener('mouseup', (event)=>{
    if (event.button == 1) dragging = false;
    event.preventDefault();
}, false);
// Add zoom event
canvas.addEventListener('wheel', (event)=>{
    if (event.deltaY > 0) app.zoom(1.1);
    else app.zoom(0.9);
    event.preventDefault();
}, false);
// Main application loop
let lastTime = 0;
function step(currentTime) {
    const dt = currentTime - lastTime;
    lastTime = currentTime;
    app.update(dt);
    app.draw();
    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

},{"./app/app":"dOyN2","./app/math":"9zUrS"}],"dOyN2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "App", ()=>App
);
var _math = require("./math");
var _renderer = require("./renderer");
var _world = require("./world");
/** Multiplier of the time step passed to the update functions. */ const TIME_SCALE = 0.001;
class App {
    /**
   * @param canvas HTML element to attach the application to.
   */ constructor(canvas){
        // Create renderer.
        this.renderer = new _renderer.Renderer(canvas);
        // Create physics world.
        this.world = new _world.World();
        // Create a few bodies.
        const CENTRAL_MASS = 10000;
        this.world.addBody(CENTRAL_MASS, new _math.Vec2(0, 0), new _math.Vec2(0, 0));
        for(let i = 0; i < 1000; ++i){
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 7 + 1;
            const pos = new _math.Vec2(Math.cos(angle) * radius, Math.sin(angle) * radius);
            const vel = pos.perpendicular().normalize().mul(Math.sqrt(_world.GRAVITY_CONSTANT * CENTRAL_MASS / radius));
            this.world.addBody(1, pos, vel);
        }
    }
    /**
   * Draws the application.
   */ draw() {
        this.world.draw(this.renderer);
        this.renderer.flush();
    }
    /**
   * Updates the application.
   * @param dt Time step in seconds.
   */ update(dt) {
        this.world.update(dt * TIME_SCALE);
    }
    /**
   * Zooms the view in.
   * @param factor The zoom factor.
   */ zoom(factor) {
        this.renderer.zoom(factor);
    }
    /**
   * Moves the view.
   * @param delta The delta to move the view by.
   */ move(delta) {
        this.renderer.move(delta);
    }
}

},{"./renderer":"bK5TX","./world":"8br0T","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./math":"9zUrS"}],"bK5TX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class used to render the app.
 */ parcelHelpers.export(exports, "Renderer", ()=>Renderer
);
var _math = require("../math");
var _view = require("./view");
var _color = require("./color");
var _drawCircle = require("./draw_circle");
/** Background color of the application. */ const BACKGROUND_COLOR = new _color.Color(0, 0, 0);
/** Number of divisions used for drawing circles. */ const CIRCLE_DIVISIONS = 32;
class Renderer {
    /**
   * @param canvas Canvas to use.
   */ constructor(canvas){
        this.commands = [];
        // Get the WebGL context.
        this.context = canvas.getContext('webgl');
        // Initialize shaders and vertex buffers.
        this.initShaders();
        this.initVertexBuffers();
        // Initialize view.
        this.view = new _view.View(canvas.width, canvas.height);
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
   * Zooms the view in.
   * @param factor The zoom factor.
   */ zoom(factor) {
        this.view.zoom(factor);
    }
    /**
   * Moves the view.
   * @param delta The delta to move the view by.
   */ move(delta) {
        this.view.move(delta);
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

},{"./color":"ak01f","./draw_circle":"fpeFl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./view":"l5tb4","../math":"9zUrS"}],"ak01f":[function(require,module,exports) {
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

},{}],"fpeFl":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"l5tb4":[function(require,module,exports) {
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
        this.scale = 1;
        this.aspectRatio = height / width;
        this.updateTransform();
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
   * @param scale The new scale.
   */ setScale(scale) {
        this.scale = scale;
        this.updateTransform();
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
        this.setScale(this.scale / multiplier);
    }
    /**
   * Updates the transform matrix.
   */ updateTransform() {
        const translation = _math.Mat3.translation(new _math.Vec2(this.position.x, this.position.y));
        const scale = _math.Mat3.scale(new _math.Vec2(this.scale * this.aspectRatio, this.scale));
        this.transform = translation.mul(scale);
    }
}

},{"../math":"9zUrS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9zUrS":[function(require,module,exports) {
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
            result.x += this.elements[1] * other.y;
            result.x += this.elements[2];
            result.y += this.elements[0] * other.x;
            result.y += this.elements[1] * other.y;
            result.y += this.elements[2];
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8br0T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GRAVITY_CONSTANT", ()=>GRAVITY_CONSTANT
);
/**
 * Represents a world of bodies.
 */ parcelHelpers.export(exports, "World", ()=>World
);
var _body = require("./body");
var _color = require("./renderer/color");
const GRAVITY_CONSTANT = 0.000001;
class World {
    // Default constructor.
    constructor(){
        this.bodies = [];
    }
    /**
   * Adds a body to the world.
   * @param mass The mass of the body.
   * @param position The initial position of the body.
   * @param velocity The initial velocity of the body.
   */ addBody(mass, position, velocity) {
        this.bodies.push(new _body.Body(mass, position, velocity, _color.Color.random().add(new _color.Color(0.1, 0.1, 0.1))));
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
            const offset = body1.getPosition().sub(body2.getPosition());
            const sqrDistance = offset.sqrLength();
            const direction = offset.normalize();
            const force = direction.mul(GRAVITY_CONSTANT * body1.getMass() * body2.getMass() / sqrDistance);
            // Apply the force to the bodies.
            this.bodies[j].applyForce(force, dt);
            this.bodies[i1].applyForce(force.mul(-1), dt);
        }
        // Check for collisions between bodies.
        for(let i2 = 0; i2 < this.bodies.length; i2++){
            for(let j = i2 + 1; j < this.bodies.length; j++)// Check for collision.
            if (this.bodies[i2].collides(this.bodies[j])) {
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
        for(let i = 0; i < this.bodies.length; i++)renderer.drawCircle(this.bodies[i].getPosition(), this.bodies[i].getRadius(), this.bodies[i].getColor());
    }
}

},{"./body":"4UTpg","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./renderer/color":"ak01f"}],"4UTpg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a body in the simulation.
 */ parcelHelpers.export(exports, "Body", ()=>Body
);
/** The density of bodies. */ const BODY_DENSITY = 100;
class Body {
    /**
   * @param mass The body's initial mass.
   * @param position The body's initial position.
   * @param velocity The body's initial velocity.
   * @param color The body's color.
   */ constructor(mass, position, velocity, color){
        this.setMass(mass);
        this.position = position;
        this.velocity = velocity;
        this.color = color;
    }
    /**
   * Gets the body's mass.
   * @returns The body's mass.
   */ getMass() {
        return this.mass;
    }
    /**
   * Gets the body's radius.
   * @returns The body's radius.
   */ getRadius() {
        return this.radius;
    }
    /**
   * Gets the body's position.
   * @returns The 2D vector which represents the body's position.
   */ getPosition() {
        return this.position;
    }
    /**
   * Gets the body's velocity.
   * @returns The body's velocity.
   */ getVelocity() {
        return this.velocity;
    }
    /**
   * Gets the body's color.
   * @return The body's color.
   */ getColor() {
        return this.color;
    }
    /**
   * Sets the body's mass.
   * @param mass The body's new mass.
   */ setMass(mass1) {
        this.mass = mass1;
        this.radius = 0.75 * Math.PI * this.mass ** (1 / 3) / BODY_DENSITY;
    }
    /**
   * Applies a force to the body.
   * @param force The force to apply to the body.
   * @param dt The time step.
   */ applyForce(force, dt) {
        this.velocity = this.velocity.add(force.mul(dt / this.mass));
    }
    /**
   * Updates the body's position.
   * @param dt The time step.
   */ update(dt1) {
        this.position = this.position.add(this.velocity.mul(dt1));
    }
    /**
   * Checks if this body is colliding with another.
   * @param other The other body.
   * @returns Whether the bodies are colliding.
   */ collides(other) {
        // The square of the distance is used to avoid calculating the square root.
        const sqrDistance = this.position.sub(other.position).sqrLength();
        const sqrRadius = (this.radius + other.radius) ** 2;
        return sqrDistance <= sqrRadius;
    }
    /**
   * Merges this body with another.
   * @param other The other body.
   * @returns The new body.
   */ merge(other1) {
        const mass = this.mass + other1.mass;
        const position = this.mass > other1.mass ? this.position : other1.position;
        const velocity = this.velocity.mul(this.mass).add(other1.velocity.mul(other1.mass)).div(mass);
        const colorA = this.color.mul(this.mass / mass);
        const colorB = other1.color.mul(other1.mass / mass);
        const color = colorA.add(colorB);
        return new Body(mass, position, velocity, color);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["11zn2","jZgE0"], "jZgE0", "parcelRequire34d4")

//# sourceMappingURL=index.e7f05703.js.map
