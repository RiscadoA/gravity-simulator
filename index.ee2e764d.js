class t{constructor(t,e){this.x=t,this.y=e}add(e){return new t(this.x+e.x,this.y+e.y)}sub(e){return new t(this.x-e.x,this.y-e.y)}mul(e){return new t(this.x*e,this.y*e)}div(e){return new t(this.x/e,this.y/e)}dot(t){return this.x*t.x+this.y*t.y}sqrLength(){return this.dot(this)}length(){return Math.sqrt(this.sqrLength())}normalize(){return this.div(this.length())}perpendicular(){return new t(-this.y,this.x)}}class e{constructor(t=[1,0,0,0,1,0,0,0,1]){this.elements=new Float32Array(t)}mul(s){if(s instanceof e){const t=new e;for(let e=0;e<3;e++)for(let i=0;i<3;i++){let o=0;for(let t=0;t<3;t++)o+=this.elements[3*e+t]*s.elements[3*t+i];t.elements[3*e+i]=o}return t}if(s instanceof t){const e=new t(0,0);return e.x+=this.elements[0]*s.x,e.x+=this.elements[3]*s.y,e.x+=this.elements[6],e.y+=this.elements[1]*s.x,e.y+=this.elements[4]*s.y,e.y+=this.elements[7],e}{const t=new e;for(let e=0;e<9;e++)t.elements[e]=this.elements[e]*s;return t}}transpose(){const t=new e;for(let e=0;e<3;e++)for(let s=0;s<3;s++)t.elements[3*e+s]=this.elements[3*s+e];return t}determinant(){return this.elements[0]*(this.elements[4]*this.elements[8]-this.elements[5]*this.elements[7])-this.elements[1]*(this.elements[3]*this.elements[8]-this.elements[5]*this.elements[6])+this.elements[2]*(this.elements[3]*this.elements[7]-this.elements[4]*this.elements[6])}adjunt(){const t=new e,s=this.elements;return t.elements[0]=s[4]*s[8]-s[5]*s[7],t.elements[1]=s[2]*s[7]-s[1]*s[8],t.elements[2]=s[1]*s[5]-s[2]*s[4],t.elements[3]=s[5]*s[6]-s[3]*s[8],t.elements[4]=s[0]*s[8]-s[2]*s[6],t.elements[5]=s[2]*s[3]-s[0]*s[5],t.elements[6]=s[3]*s[7]-s[4]*s[6],t.elements[7]=s[1]*s[6]-s[0]*s[7],t.elements[8]=s[0]*s[4]-s[1]*s[3],t}inverse(){const t=this.determinant();if(0===t)throw new Error("Cannot invert matrix with determinant 0.");return this.adjunt().mul(1/t)}static identity(){return new e}static translation(t){return new e([1,0,0,0,1,0,t.x,t.y,1])}static scale(t){return new e([t.x,0,0,0,t.y,0,0,0,1])}}class s{constructor(t,e,s,i=1){this.r=t,this.g=e,this.b=s,this.a=i}add(t){const e=Math.min(1,this.r+t.r),i=Math.min(1,this.g+t.g),o=Math.min(1,this.b+t.b),n=Math.min(1,this.a+t.a);return new s(e,i,o,n)}mix(t){const e=(this.r+t.r)/2,i=(this.g+t.g)/2,o=(this.b+t.b)/2,n=(this.a+t.a)/2;return new s(e,i,o,n)}mul(t){const e=Math.min(1,this.r*t),i=Math.min(1,this.g*t),o=Math.min(1,this.b*t);return new s(e,i,o,this.a)}div(t){return this.mul(1/t)}static random(){return new s(Math.random(),Math.random(),Math.random())}}class i{constructor(t,e,s){this.center=t,this.radius=e,this.color=s}}class o{constructor(e,s){this.position=new t(0,0),this._scale=1,this.aspectRatio=s/e,this.updateTransform()}getTransform(){return this.transform}setPosition(t){this.position=t,this.updateTransform()}set scale(t){this._scale=t,this.updateTransform()}get scale(){return this._scale}move(t){this.setPosition(this.position.add(t.div(this.scale)))}zoom(t){this.scale/=t}screenToWorld(t){return this.transform.inverse().mul(t)}updateTransform(){const s=e.translation(new t(this.position.x,this.position.y)),i=e.scale(new t(this.scale*this.aspectRatio,this.scale));this.transform=s.mul(i)}}const n=new s(.05,.05,.05);class r{constructor(t){this.commands=[],this.canvas=t,this.context=this.canvas.getContext("webgl"),this.initShaders(),this.initVertexBuffers(),this.view=new o(this.canvas.width,this.canvas.height)}drawCircle(t,e,s){this.commands.push(new i(t,e,s))}zoom(t){this.view.zoom(t)}move(t){this.view.move(t)}flush(){this.context.clearColor(n.r,n.g,n.b,1),this.context.clear(this.context.COLOR_BUFFER_BIT),this.context.bindBuffer(this.context.ARRAY_BUFFER,this.vertexBuffer),this.context.vertexAttribPointer(this.positionAttribute,2,this.context.FLOAT,!1,0,0),this.context.enableVertexAttribArray(this.positionAttribute),this.context.useProgram(this.program);for(let s of this.commands)if(s instanceof i){const i=e.translation(s.center),o=e.scale(new t(s.radius,s.radius)).mul(i).mul(this.view.getTransform());this.context.uniformMatrix3fv(this.transformUniform,!1,o.elements),this.context.uniform3f(this.colorUniform,s.color.r,s.color.g,s.color.b),this.context.drawArrays(this.context.TRIANGLE_FAN,this.circle[0],this.circle[1])}this.commands=[]}screenToWorld(e){let s=new t(e.x/this.canvas.width,e.y/this.canvas.height);return s.x=e.x/this.canvas.width*2-1,s.y=-(e.y/this.canvas.height*2-1),this.view.screenToWorld(s)}get scale(){return this.view.scale}initShaders(){this.vertexShader=this.context.createShader(this.context.VERTEX_SHADER),this.context.shaderSource(this.vertexShader,"\n      attribute vec2 position;\n\n      uniform mat3 transform;\n\n      void main() {\n        vec2 transformed = (transform * vec3(position, 1.0)).xy;\n        gl_Position = vec4(transformed, 0.0, 1.0);\n      }\n    "),this.context.compileShader(this.vertexShader),this.fragmentShader=this.context.createShader(this.context.FRAGMENT_SHADER),this.context.shaderSource(this.fragmentShader,"\n      uniform mediump vec3 color;\n\n      void main() {\n        gl_FragColor = vec4(color, 1.0);\n      }\n    "),this.context.compileShader(this.fragmentShader),this.program=this.context.createProgram(),this.context.attachShader(this.program,this.vertexShader),this.context.attachShader(this.program,this.fragmentShader),this.context.linkProgram(this.program),this.positionAttribute=this.context.getAttribLocation(this.program,"position"),this.transformUniform=this.context.getUniformLocation(this.program,"transform"),this.colorUniform=this.context.getUniformLocation(this.program,"color")}initVertexBuffers(){this.circle=[0,34];let t=[];t.push(0,0);for(let e=0;e<=32;e++){let s=e/32*Math.PI*2;t.push(Math.cos(s),Math.sin(s))}this.vertexBuffer=this.context.createBuffer(),this.context.bindBuffer(this.context.ARRAY_BUFFER,this.vertexBuffer),this.context.bufferData(this.context.ARRAY_BUFFER,new Float32Array(t),this.context.STATIC_DRAW)}}class h{}class a{constructor(){this.mass=1,this.position=new t(0,0),this.velocity=new t(0,0),this.color=s.random()}get position(){return this._position}set position(e){this._position=new t(e.x,e.y)}get velocity(){return this._velocity}set velocity(e){this._velocity=new t(e.x,e.y)}get mass(){return this._mass}set mass(t){this._mass=t,this._radius=.75*Math.PI*this.mass**(1/3)/200}get radius(){return this._radius}applyForce(t,e){this.applyImpulse(t.mul(e))}applyImpulse(t){this.velocity=this.velocity.add(t.mul(1/this.mass))}update(t){this.position=this.position.add(this.velocity.mul(t))}intersects(t){if(t instanceof a){return this.position.sub(t.position).sqrLength()<=(this.radius+t.radius)**2}return this.position.sub(t).sqrLength()<=this.radius**2}merge(t){let e=new a;e.mass=this.mass+t.mass,e.position=this.position.mul(this.mass).add(t.position.mul(t.mass)).div(e.mass),e.velocity=this.velocity.mul(this.mass).add(t.velocity.mul(t.mass)).div(e.mass);const s=this.color.mul(this.mass/e.mass),i=t.color.mul(t.mass/e.mass);return e.color=s.add(i),e}}class l extends h{constructor(t,e,s){super(),this.world=t,this.renderer=e,this.mass=s}activate(){this.body=new a,this.mouseDown=null,this.mouseMoved=!1}draw(){this.mouseMoved&&(this.body.mass=this.mass.value,this.renderer.drawCircle(this.body.position,this.body.radius,this.body.color))}onMouseDown(t){this.body.position=this.renderer.screenToWorld(t),this.mouseDown=t}onMouseUp(t){if(this.mouseDown){let e=t.sub(this.mouseDown);e.y*=-1,this.body.velocity=e.mul(.001*this.renderer.scale),this.world.addBody(this.body)}this.activate()}onMouseMove(t){this.mouseDown||(this.body.position=this.renderer.screenToWorld(t)),this.mouseMoved=!0}}class c extends h{constructor(t,e){super(),this.world=t,this.renderer=e}activate(){}draw(){}onMouseDown(t){}onMouseUp(t){this.world.removeBody(this.renderer.screenToWorld(t))}onMouseMove(t){}}class d extends h{constructor(t){super(),this.renderer=t}activate(){this.lastPosition=null}draw(){}onMouseDown(t){this.lastPosition=t}onMouseUp(t){this.lastPosition=null}onMouseMove(t){if(!this.lastPosition)return;let e=t.sub(this.lastPosition);e.y*=-1,this.lastPosition=t,this.renderer.move(e.mul(.001))}}class m{constructor(t,e,s){this.input=t,this.display=e,this.type=s,this.input.addEventListener("input",this.updateDisplay.bind(this))}get value(){switch(this.type){case"linear":return this.input.valueAsNumber;case"exponential":return Math.pow(10,this.input.valueAsNumber)}}set value(t){switch(this.type){case"linear":this.input.valueAsNumber=t;break;case"exponential":this.input.valueAsNumber=Math.log10(t)}this.updateDisplay()}updateDisplay(){this.value<.01||this.value>9999.99?this.display.innerText=this.value.toExponential(1):this.display.innerText=this.value.toFixed(2)}}class u{constructor(t){this.element=t,this.onClickCallback=()=>{},this.element.addEventListener("click",(t=>this.onClickCallback()))}setOnClick(t){this.onClickCallback=t}}class v{constructor(){this.state="",this.toggles=[],this.stateChangeCallback=t=>{}}get current(){return this.state}set current(t){this.state!==t&&(this.toggles.forEach((e=>e[1].activated=e[0]===t)),this.state=t,this.stateChangeCallback(t))}add(t,e){this.toggles.push([t,e]),e.setOnActivated((()=>this.onToggleActivated(t))),e.setOnDeactivated((()=>this.onToggleDeactivated(t)))}setOnStateChange(t){this.stateChangeCallback=t}onToggleActivated(t){this.current=t}onToggleDeactivated(t){this.state===t&&(this.current="")}}class p extends u{constructor(t){super(t),this.state=!1,this.onActivatedCallback=()=>{},this.onDeactivatedCallback=()=>{},this.setOnClick(this.onClick.bind(this))}get activated(){return this.state}set activated(t){this.state=t,this.element.classList.toggle("on",t)}setOnActivated(t){this.onActivatedCallback=t}setOnDeactivated(t){this.onDeactivatedCallback=t}onClick(){this.activated=!this.activated,this.activated?this.onActivatedCallback():this.onDeactivatedCallback()}}class g{constructor(){this.bodies=[]}addBody(t){this.bodies.push(t)}removeBody(t){for(let e=0;e<this.bodies.length;e++)this.bodies[e].intersects(t)&&this.bodies.splice(e,1)}clear(){this.bodies=[]}update(t){for(let e=0;e<this.bodies.length;e++)this.bodies[e].update(t);for(let e=0;e<this.bodies.length;e++)for(let s=e+1;s<this.bodies.length;s++){const i=this.bodies[e],o=this.bodies[s],n=i.position.sub(o.position),r=n.sqrLength(),h=n.normalize().mul(1e-6*i.mass*o.mass/r);this.bodies[s].applyForce(h,t),this.bodies[e].applyForce(h.mul(-1),t)}for(let t=0;t<this.bodies.length;t++)for(let e=t+1;e<this.bodies.length;e++)this.bodies[t].intersects(this.bodies[e])&&(this.bodies[t]=this.bodies[t].merge(this.bodies[e]),this.bodies.splice(e,1))}draw(t){for(let e=0;e<this.bodies.length;e++)t.drawCircle(this.bodies[e].position,this.bodies[e].radius,this.bodies[e].color)}}(new class{constructor(){const t=document.getElementById("canvas");t.width=window.innerWidth,t.height=window.innerHeight,this.renderer=new r(t),this.world=new g,t.addEventListener("mousedown",this.onMouseDown.bind(this)),t.addEventListener("mouseup",this.onMouseUp.bind(this)),t.addEventListener("mousemove",this.onMouseMove.bind(this)),t.addEventListener("wheel",(t=>{this.renderer.zoom(t.deltaY>0?1.1:.9),t.preventDefault()})),this.speed=new m(document.getElementById("speedInput"),document.getElementById("speedValue"),"exponential"),this.speed.value=1,this.mass=new m(document.getElementById("massInput"),document.getElementById("massValue"),"exponential"),this.mass.value=1,this.resetButton=new u(document.getElementById("resetButton")),this.settingsButton=new u(document.getElementById("settingsButton")),this.addBodyToggle=new p(document.getElementById("addBodyToggle")),this.removeBodyToggle=new p(document.getElementById("removeBodyToggle")),this.moveCameraToggle=new p(document.getElementById("moveCameraToggle")),this.tools=new Map,this.tools.set("addBody",new l(this.world,this.renderer,this.mass)),this.tools.set("removeBody",new c(this.world,this.renderer)),this.tools.set("moveCamera",new d(this.renderer)),this.tool=void 0,this.toolSwitch=new v,this.toolSwitch.add("addBody",this.addBodyToggle),this.toolSwitch.add("removeBody",this.removeBodyToggle),this.toolSwitch.add("moveCamera",this.moveCameraToggle),this.toolSwitch.setOnStateChange((t=>{this.tool=this.tools.get(t),this.tool&&this.tool.activate()}))}start(){this.animate(0)}animate(t){this.world.update(this.speed.value*t*1e-5),this.tool&&this.tool.draw(),this.world.draw(this.renderer),this.renderer.flush(),window.requestAnimationFrame(this.animate.bind(this))}onMouseDown(e){0==e.button&&(this.tool&&this.tool.onMouseDown(new t(e.offsetX,e.offsetY)),e.preventDefault())}onMouseUp(e){0==e.button&&(this.tool&&this.tool.onMouseUp(new t(e.offsetX,e.offsetY)),e.preventDefault())}onMouseMove(e){this.tool&&this.tool.onMouseMove(new t(e.offsetX,e.offsetY)),e.preventDefault()}}).start();
//# sourceMappingURL=index.ee2e764d.js.map
