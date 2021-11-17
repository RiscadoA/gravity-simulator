class t{constructor(t,e){this.x=t,this.y=e}add(e){return new t(this.x+e.x,this.y+e.y)}sub(e){return new t(this.x-e.x,this.y-e.y)}mul(e){return new t(this.x*e,this.y*e)}div(e){return new t(this.x/e,this.y/e)}dot(t){return this.x*t.x+this.y*t.y}sqrLength(){return this.dot(this)}length(){return Math.sqrt(this.sqrLength())}normalize(){return this.div(this.length())}perpendicular(){return new t(-this.y,this.x)}}class e{constructor(t=[1,0,0,0,1,0,0,0,1]){this.elements=new Float32Array(t)}mul(s){if(s instanceof e){const t=new e;for(let e=0;e<3;e++)for(let i=0;i<3;i++){let o=0;for(let t=0;t<3;t++)o+=this.elements[3*e+t]*s.elements[3*t+i];t.elements[3*e+i]=o}return t}if(s instanceof t){const e=new t(0,0);return e.x+=this.elements[0]*s.x,e.x+=this.elements[3]*s.y,e.x+=this.elements[6],e.y+=this.elements[1]*s.x,e.y+=this.elements[4]*s.y,e.y+=this.elements[7],e}{const t=new e;for(let e=0;e<9;e++)t.elements[e]=this.elements[e]*s;return t}}transpose(){const t=new e;for(let e=0;e<3;e++)for(let s=0;s<3;s++)t.elements[3*e+s]=this.elements[3*s+e];return t}determinant(){return this.elements[0]*(this.elements[4]*this.elements[8]-this.elements[5]*this.elements[7])-this.elements[1]*(this.elements[3]*this.elements[8]-this.elements[5]*this.elements[6])+this.elements[2]*(this.elements[3]*this.elements[7]-this.elements[4]*this.elements[6])}adjunt(){const t=new e,s=this.elements;return t.elements[0]=s[4]*s[8]-s[5]*s[7],t.elements[1]=s[2]*s[7]-s[1]*s[8],t.elements[2]=s[1]*s[5]-s[2]*s[4],t.elements[3]=s[5]*s[6]-s[3]*s[8],t.elements[4]=s[0]*s[8]-s[2]*s[6],t.elements[5]=s[2]*s[3]-s[0]*s[5],t.elements[6]=s[3]*s[7]-s[4]*s[6],t.elements[7]=s[1]*s[6]-s[0]*s[7],t.elements[8]=s[0]*s[4]-s[1]*s[3],t}inverse(){const t=this.determinant();if(0===t)throw new Error("Cannot invert matrix with determinant 0.");return this.adjunt().mul(1/t)}static identity(){return new e}static translation(t){return new e([1,0,0,0,1,0,t.x,t.y,1])}static scale(t){return new e([t.x,0,0,0,t.y,0,0,0,1])}static rotation(t){const s=Math.cos(t),i=Math.sin(t);return new e([s,i,0,-i,s,0,0,0,1])}}class s{constructor(t,e=null){this._id=t,this._form=e}get id(){return this._id}get form(){return this._form}}class i{constructor(t){this.element=t,this.onClickCallback=()=>{},this.element.addEventListener("click",(t=>this.onClickCallback()))}setOnClick(t){this.onClickCallback=t}}class o{constructor(t,e,s,i,o){switch(this._root=t,this._input=this._root.querySelector("input"),this._display=this._root.querySelector("div"),this._type=o,this._type){case"integer":this._input.min=e.toString(),this._input.max=s.toString(),this._input.value=i.toString(),this._input.step=1..toString();break;case"linear":this._input.min=e.toString(),this._input.max=s.toString(),this._input.value=i.toString(),this._input.step=.1.toString();break;case"exponential":this._input.min=Math.log10(e).toString(),this._input.max=Math.log10(s).toString(),this._input.value=Math.log10(i).toString(),this._input.step=.1.toString()}this._input.addEventListener("input",this.updateDisplay.bind(this)),this.updateDisplay()}get value(){switch(this._type){case"integer":case"linear":return this._input.valueAsNumber;case"exponential":return Math.pow(10,this._input.valueAsNumber)}}set value(t){switch(this._type){case"integer":case"linear":this._input.valueAsNumber=t;break;case"exponential":this._input.valueAsNumber=Math.log10(t)}this.updateDisplay()}updateDisplay(){"integer"===this._type?this._display.innerText=this.value.toString():this.value<.01||this.value>9999.99?this._display.innerText=this.value.toExponential(1):this._display.innerText=this.value.toFixed(2)}}class n{constructor(){this.state="",this.toggles=[],this.stateChangeCallback=t=>{}}get current(){return this.state}set current(t){this.state!==t&&(this.toggles.forEach((e=>e[1].activated=e[0]===t)),this.state=t,this.stateChangeCallback(t))}add(t,e){this.toggles.push([t,e]),e.setOnActivated((()=>this.onToggleActivated(t))),e.setOnDeactivated((()=>this.onToggleDeactivated(t)))}setOnStateChange(t){this.stateChangeCallback=t}onToggleActivated(t){this.current=t}onToggleDeactivated(t){this.state===t&&(this.current="")}}class r extends i{constructor(t){super(t),this.state=!1,this.onActivatedCallback=()=>{},this.onDeactivatedCallback=()=>{},this.setOnClick(this.onClick.bind(this))}get activated(){return this.state}set activated(t){this.state=t,this.element.classList.toggle("on",t)}setOnActivated(t){this.onActivatedCallback=t}setOnDeactivated(t){this.onDeactivatedCallback=t}onClick(){this.activated=!this.activated,this.activated?this.onActivatedCallback():this.onDeactivatedCallback()}}class h{constructor(t){this._fields=new Map,this._root=t,console.log(this._root),this._cancel=new i(this._root.querySelector("#cancel")),this._submit=new i(this._root.querySelector("#submit"))}static create(t){return new h(document.querySelector(`.form>#${t}`))}addToggle(t){const e=this._root.querySelector(`#${t}`);e&&e instanceof HTMLButtonElement&&this._fields.set(t,new r(e))}addSwitch(t,...e){const s=new n;e.forEach((t=>{this.addToggle(t),s.add(t,this._fields.get(t))})),this._fields.set(t,s)}addSlider(t,e,s,i,n){const r=this._root.querySelector(`#${t}`);r&&r instanceof HTMLDivElement&&this._fields.set(t,new o(r,e,s,i,n))}show(){this._root.classList.toggle("hidden",!1)}hide(){this._root.classList.toggle("hidden",!0)}get open(){return!this._root.classList.contains("hidden")}isOn(t){return this._fields.get(t).activated}getValue(t){return this._fields.get(t).value}getState(t){return this._fields.get(t).current}setState(t,e){this._fields.get(t).current=e}setOnCancel(t){this._cancel.setOnClick(t)}setOnSubmit(t){this._submit.setOnClick(t)}}class a{constructor(t){this._world=t,this._presets=[],this._selected=null,this._form=h.create("selector"),this._open=!1}add(t){this._presets.push(t),this._form.addToggle(t.id)}finish(t){this._form.addSwitch("preset",...this._presets.map((t=>t.id))),this._form.setOnCancel(this.onSelectionCanceled.bind(this)),this._form.setOnSubmit(this.onSelectionSubmitted.bind(this)),this._selected=this._presets.find((e=>e.id===t))}show(){this._open||(this._form.show(),this._selected&&this._form.setState("preset",this._selected.id)),this._open=!0}hide(){this._selected&&this._selected.form&&this._selected.form.open&&this._selected.form.hide(),this._form.open&&this._form.hide(),this._open=!1}get open(){return this._open}apply(){this._world.clear(),this._selected&&this._selected.generate(this._world)}onSelectionCanceled(){this._form.hide(),this._open=!1}onSelectionSubmitted(){const t=this._form.getState("preset");this._form.hide(),this._selected=this._presets.find((e=>e.id===t)),this._selected.form?(this._selected.form.show(),this._selected.form.setOnCancel(this.onSettingsCanceled.bind(this)),this._selected.form.setOnSubmit(this.onSettingsSubmitted.bind(this))):this.onSettingsSubmitted()}onSettingsCanceled(){this._selected?.form?.hide(),this._form.show()}onSettingsSubmitted(){this.apply(),this._selected?.form?.hide(),this._open=!1}}class l extends s{constructor(){super("empty")}generate(t){}}class d{constructor(t,e,s,i=1){this.r=t,this.g=e,this.b=s,this.a=i}add(t){const e=Math.min(1,this.r+t.r),s=Math.min(1,this.g+t.g),i=Math.min(1,this.b+t.b),o=Math.min(1,this.a+t.a);return new d(e,s,i,o)}mix(t){const e=(this.r+t.r)/2,s=(this.g+t.g)/2,i=(this.b+t.b)/2,o=(this.a+t.a)/2;return new d(e,s,i,o)}mul(t){const e=Math.min(1,this.r*t),s=Math.min(1,this.g*t),i=Math.min(1,this.b*t);return new d(e,s,i,this.a)}div(t){return this.mul(1/t)}static random(){return new d(Math.random(),Math.random(),Math.random())}}class c{constructor(){this.mass=1,this.position=new t(0,0),this.velocity=new t(0,0),this.color=d.random().mul(.8).add(new d(.2,.2,.2))}get position(){return this._position}set position(e){this._position=new t(e.x,e.y)}get velocity(){return this._velocity}set velocity(e){this._velocity=new t(e.x,e.y)}get mass(){return this._mass}set mass(t){this._mass=t,this._radius=.75*Math.PI*this.mass**(1/3)/200}get radius(){return this._radius}applyForce(t,e){this.applyImpulse(t.mul(e))}applyImpulse(t){this.velocity=this.velocity.add(t.mul(1/this.mass))}update(t){this.position=this.position.add(this.velocity.mul(t))}intersects(t){if(t instanceof c){return this.position.sub(t.position).sqrLength()<=(this.radius+t.radius)**2}return this.position.sub(t).sqrLength()<=this.radius**2}merge(t){let e=new c;e.mass=this.mass+t.mass,e.position=this.position.mul(this.mass).add(t.position.mul(t.mass)).div(e.mass),e.velocity=this.velocity.mul(this.mass).add(t.velocity.mul(t.mass)).div(e.mass);const s=this.color.mul(this.mass/e.mass),i=t.color.mul(t.mass/e.mass);return e.color=s.add(i),e}}class u{constructor(){this.bodies=[]}addBody(t){this.bodies.push(t)}removeBody(t){for(let e=0;e<this.bodies.length;e++)this.bodies[e].intersects(t)&&this.bodies.splice(e,1)}clear(){this.bodies=[]}update(t){for(let e=0;e<this.bodies.length;e++)this.bodies[e].update(t);for(let e=0;e<this.bodies.length;e++)for(let s=e+1;s<this.bodies.length;s++){const i=this.bodies[e],o=this.bodies[s],n=i.position.sub(o.position),r=n.sqrLength(),h=n.normalize().mul(1e-6*i.mass*o.mass/r);this.bodies[s].applyForce(h,t),this.bodies[e].applyForce(h.mul(-1),t)}for(let t=0;t<this.bodies.length;t++)for(let e=t+1;e<this.bodies.length;e++)this.bodies[t].intersects(this.bodies[e])&&(this.bodies[t]=this.bodies[t].merge(this.bodies[e]),this.bodies.splice(e,1))}draw(t){for(let e=0;e<this.bodies.length;e++)t.drawCircle(this.bodies[e].position,this.bodies[e].radius,this.bodies[e].color)}}class m extends s{constructor(){super("simpleStarSystem")}generate(e){const s=new c;s.mass=1e4,e.addBody(s);for(let i=0;i<100;++i){const i=Math.random()*Math.PI*2,o=3*Math.random()+1,n=new c;n.mass=9*Math.random()+1,n.position=new t(Math.cos(i)*o,Math.sin(i)*o),n.velocity=n.position.perpendicular().normalize().mul(Math.sqrt(1e-6*s.mass/o)),e.addBody(n)}}}class p extends s{constructor(){const t=h.create("customStarSystem");t.addSlider("starMass",.1,1e8,1e3,"exponential"),t.addSlider("bodyCount",1,1e3,100,"integer"),t.addSlider("bodyMinMass",.1,1e5,1,"exponential"),t.addSlider("bodyMaxMass",.1,1e5,1,"exponential"),t.addSlider("bodyMinDistance",.1,25,1,"linear"),t.addSlider("bodyMaxDistance",.1,25,5,"linear"),super("customStarSystem",t)}generate(e){const s=this.form.getValue("starMass"),i=this.form.getValue("bodyCount");let o=this.form.getValue("bodyMinMass"),n=this.form.getValue("bodyMaxMass"),r=this.form.getValue("bodyMinDistance"),h=this.form.getValue("bodyMaxDistance");n<o&&([n,o]=[o,n]),h<r&&([h,r]=[r,h]);const a=new c;a.mass=s,e.addBody(a);for(let l=0;l<i;++l){const i=new c;i.mass=Math.random()*(n-o)+o;const l=Math.random()*Math.PI*2,d=Math.random()*(h-r)+r+a.radius+i.radius;i.position=new t(Math.cos(l)*d,Math.sin(l)*d),i.velocity=i.position.perpendicular().normalize().mul(Math.sqrt(1e-6*s/d)),e.addBody(i)}}}class g{constructor(t,e,s,i){this.start=t,this.end=e,this.thickness=s,this.color=i}}class w{constructor(t,e,s){this.center=t,this.radius=e,this.color=s}}class f{constructor(e,s){this.position=new t(0,0),this._scale=1,this.aspectRatio=s/e,this.width=e,this.height=s,this.updateTransform(),this.onZoomChangeCallback=()=>{}}getTransform(){return this.transform}setPosition(t){this.position=t,this.updateTransform()}set scale(t){this._scale=t,this.updateTransform(),this.onZoomChangeCallback()}get scale(){return this._scale}move(t){this.setPosition(this.position.add(t.div(this.scale)))}zoom(t){this.scale/=t}screenToWorld(e){let s=new t(e.x/this.width,e.y/this.height);return s=s.sub(new t(.5,.5)).mul(2),s.y*=-1,this.transform.inverse().mul(s)}setOnZoomChange(t){this.onZoomChangeCallback=t}updateTransform(){const s=e.translation(new t(this.position.x,this.position.y)),i=e.scale(new t(this.scale*this.aspectRatio,this.scale));this.transform=s.mul(i)}}const v=new d(.05,.05,.05);class b{constructor(t){this.commands=[],this.canvas=t,this.context=this.canvas.getContext("webgl"),this.initShaders(),this.initVertexBuffers(),this.view=new f(this.canvas.width,this.canvas.height)}drawCircle(t,e,s){this.commands.push(new w(t,e,s))}drawLine(t,e,s,i){this.commands.push(new g(t,e,s,i))}drawArrow(t,e,s){const i=e.sub(t),o=i.perpendicular(),n=i.add(o).normalize(),r=i.sub(o).normalize();this.drawLine(t,e,1/this.view.scale,s),this.drawLine(e,e.add(n.mul(-.02/this.view.scale)),1/this.view.scale,s),this.drawLine(e,e.add(r.mul(-.02/this.view.scale)),1/this.view.scale,s)}flush(){this.context.clearColor(v.r,v.g,v.b,1),this.context.clear(this.context.COLOR_BUFFER_BIT),this.context.bindBuffer(this.context.ARRAY_BUFFER,this.vertexBuffer),this.context.vertexAttribPointer(this.positionAttribute,2,this.context.FLOAT,!1,0,0),this.context.enableVertexAttribArray(this.positionAttribute),this.context.useProgram(this.program);for(let s of this.commands)if(s instanceof w){const i=e.translation(s.center),o=e.scale(new t(s.radius,s.radius)).mul(i).mul(this.view.getTransform());this.context.uniformMatrix3fv(this.transformUniform,!1,o.elements),this.context.uniform3f(this.colorUniform,s.color.r,s.color.g,s.color.b),this.context.drawArrays(this.context.TRIANGLE_FAN,this.circle[0],this.circle[1])}else if(s instanceof g){const i=e.translation(s.start),o=s.end.sub(s.start),n=e.scale(new t(.0025*s.thickness,o.length())),r=e.rotation(Math.atan2(o.y,o.x)-Math.PI/2),h=n.mul(r).mul(i).mul(this.view.getTransform());this.context.uniformMatrix3fv(this.transformUniform,!1,h.elements),this.context.uniform3f(this.colorUniform,s.color.r,s.color.g,s.color.b),this.context.drawArrays(this.context.TRIANGLE_FAN,this.line[0],this.line[1])}this.commands=[]}initShaders(){this.vertexShader=this.context.createShader(this.context.VERTEX_SHADER),this.context.shaderSource(this.vertexShader,"\n      attribute vec2 position;\n\n      uniform mat3 transform;\n\n      void main() {\n        vec2 transformed = (transform * vec3(position, 1.0)).xy;\n        gl_Position = vec4(transformed, 0.0, 1.0);\n      }\n    "),this.context.compileShader(this.vertexShader),this.fragmentShader=this.context.createShader(this.context.FRAGMENT_SHADER),this.context.shaderSource(this.fragmentShader,"\n      uniform mediump vec3 color;\n\n      void main() {\n        gl_FragColor = vec4(color, 1.0);\n      }\n    "),this.context.compileShader(this.fragmentShader),this.program=this.context.createProgram(),this.context.attachShader(this.program,this.vertexShader),this.context.attachShader(this.program,this.fragmentShader),this.context.linkProgram(this.program),this.positionAttribute=this.context.getAttribLocation(this.program,"position"),this.transformUniform=this.context.getUniformLocation(this.program,"transform"),this.colorUniform=this.context.getUniformLocation(this.program,"color")}initVertexBuffers(){this.circle=[0,34];let t=[];t.push(0,0);for(let e=0;e<=32;e++){let s=e/32*Math.PI*2;t.push(Math.cos(s),Math.sin(s))}this.line=[t.length/2,4],t.push(-1,0),t.push(-1,1),t.push(1,1),t.push(1,0),this.vertexBuffer=this.context.createBuffer(),this.context.bindBuffer(this.context.ARRAY_BUFFER,this.vertexBuffer),this.context.bufferData(this.context.ARRAY_BUFFER,new Float32Array(t),this.context.STATIC_DRAW)}}class y{}class _ extends y{constructor(t,e,s){super(),this.world=t,this.view=e,this.mass=s}activate(){this.body=new c,this.mouseDown=null,this.mouseMoved=!1}draw(t){this.mouseMoved&&(this.body.mass=this.mass.value,t.drawCircle(this.body.position,this.body.radius,this.body.color),this.mouseDown&&t.drawArrow(this.body.position,this.view.screenToWorld(this.mousePos),this.body.color))}onMouseDown(t){this.body.position=this.view.screenToWorld(t),this.mouseDown=t}onMouseUp(t){if(this.mouseDown){let e=t.sub(this.mouseDown);e.y*=-1,this.body.velocity=e.mul(4e-4/this.view.scale),this.world.addBody(this.body),this.mouseDown=null,this.body=new c,this.body.position=this.view.screenToWorld(t)}}onMouseMove(t){this.mousePos=t,this.mouseDown||(this.body.position=this.view.screenToWorld(this.mousePos)),this.mouseMoved=!0}}class x extends y{constructor(t,e){super(),this.world=t,this.view=e}activate(){}draw(){}onMouseDown(t){}onMouseUp(t){this.world.removeBody(this.view.screenToWorld(t))}onMouseMove(t){}}class S extends y{constructor(t){super(),this.view=t}activate(){this.lastPosition=null}draw(){}onMouseDown(t){this.lastPosition=t}onMouseUp(t){this.lastPosition=null}onMouseMove(t){if(!this.lastPosition)return;let e=t.sub(this.lastPosition);e.y*=-1,this.lastPosition=t,this.view.move(e.mul(.001))}}class M{constructor(){const e=document.getElementById("canvas");e.width=window.innerWidth,e.height=window.innerHeight,this.renderer=new b(e),this.renderer.view.setOnZoomChange(this.onMouseMove.bind(this)),this.world=new u,e.addEventListener("mousedown",(e=>{0===e.button&&(this.mousePos=new t(e.offsetX,e.offsetY),this.onMouseDown(),e.preventDefault())})),e.addEventListener("mouseup",(e=>{0===e.button&&(this.mousePos=new t(e.offsetX,e.offsetY),this.onMouseUp(),e.preventDefault())})),e.addEventListener("mousemove",(e=>{this.mousePos=new t(e.offsetX,e.offsetY),this.onMouseMove(),e.preventDefault()})),e.addEventListener("wheel",(t=>{this.renderer.view.zoom(t.deltaY>0?1.1:.9),t.preventDefault()})),this.bodyMass=new o(document.getElementById("bodyMass"),.1,1e8,1,"exponential"),this.bodyMass.value=1,this.simulationSpeed=new o(document.getElementById("simulationSpeed"),.01,100,1,"exponential"),this.simulationSpeed.value=1,this.resetButton=new i(document.getElementById("resetButton")),this.settingsButton=new i(document.getElementById("settingsButton")),this.zoomInButton=new i(document.getElementById("zoomInButton")),this.zoomOutButton=new i(document.getElementById("zoomOutButton")),this.bodyAdderToggle=new r(document.getElementById("bodyAdderToggle")),this.bodyRemoverToggle=new r(document.getElementById("bodyRemoverToggle")),this.cameraMoverToggle=new r(document.getElementById("cameraMoverToggle")),this.tools=new Map,this.tools.set("bodyAdder",new _(this.world,this.renderer.view,this.bodyMass)),this.tools.set("bodyRemover",new x(this.world,this.renderer.view)),this.tools.set("cameraMover",new S(this.renderer.view)),this.tool=void 0,this.toolSwitch=new n,this.toolSwitch.add("bodyAdder",this.bodyAdderToggle),this.toolSwitch.add("bodyRemover",this.bodyRemoverToggle),this.toolSwitch.add("cameraMover",this.cameraMoverToggle),this.toolSwitch.setOnStateChange((t=>{this.tool=this.tools.get(t),this.tool&&this.tool.activate()})),this.zoomInButton.setOnClick((()=>{this.renderer.view.zoom(.75)})),this.zoomOutButton.setOnClick((()=>{this.renderer.view.zoom(1.25)})),this.presetSelector=new a(this.world),this.presetSelector.add(new l),this.presetSelector.add(new m),this.presetSelector.add(new p),this.presetSelector.finish("simpleStarSystem"),this.resetButton.setOnClick((()=>{this.world.clear(),this.presetSelector.apply()})),this.settingsButton.setOnClick((()=>{this.presetSelector.open?this.presetSelector.hide():this.presetSelector.show()})),this.presetSelector.apply()}start(){this.animate(0)}animate(t){this.world.update(this.simulationSpeed.value*t*5e-6),this.tool&&this.tool.draw(this.renderer),this.world.draw(this.renderer),this.renderer.flush(),window.requestAnimationFrame(this.animate.bind(this))}onMouseDown(){this.tool&&this.tool.onMouseDown(this.mousePos)}onMouseUp(){this.tool&&this.tool.onMouseUp(this.mousePos)}onMouseMove(){this.tool&&this.tool.onMouseMove(this.mousePos)}}document.addEventListener("DOMContentLoaded",(()=>{(new M).start()}));
//# sourceMappingURL=index.a44e2a87.js.map
