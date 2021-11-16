class t{constructor(t,e,s,i){this.setMass(t),this.position=e,this.velocity=s,this.color=i}getMass(){return this.mass}getRadius(){return this.radius}setMass(t){this.mass=t,this.radius=.75*Math.PI*this.mass**(1/3)/200}applyForce(t,e){this.applyImpulse(t.mul(e))}applyImpulse(t){this.velocity=this.velocity.add(t.mul(1/this.mass))}update(t){this.position=this.position.add(this.velocity.mul(t))}intersects(e){if(e instanceof t){return this.position.sub(e.position).sqrLength()<=(this.radius+e.radius)**2}return this.position.sub(e).sqrLength()<=this.radius**2}merge(e){const s=this.mass+e.mass,i=this.position.mul(this.mass).add(e.position.mul(e.mass)).div(s),n=this.velocity.mul(this.mass).add(e.velocity.mul(e.mass)).div(s),o=this.color.mul(this.mass/s),r=e.color.mul(e.mass/s),h=o.add(r);return new t(s,i,n,h)}}class e{constructor(t,e){this.x=t,this.y=e}add(t){return new e(this.x+t.x,this.y+t.y)}sub(t){return new e(this.x-t.x,this.y-t.y)}mul(t){return new e(this.x*t,this.y*t)}div(t){return new e(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}sqrLength(){return this.dot(this)}length(){return Math.sqrt(this.sqrLength())}normalize(){return this.div(this.length())}perpendicular(){return new e(-this.y,this.x)}}class s{constructor(t=[1,0,0,0,1,0,0,0,1]){this.elements=new Float32Array(t)}mul(t){if(t instanceof s){const e=new s;for(let s=0;s<3;s++)for(let i=0;i<3;i++){let n=0;for(let e=0;e<3;e++)n+=this.elements[3*s+e]*t.elements[3*e+i];e.elements[3*s+i]=n}return e}if(t instanceof e){const s=new e(0,0);return s.x+=this.elements[0]*t.x,s.x+=this.elements[1]*t.y,s.x+=this.elements[2],s.y+=this.elements[3]*t.x,s.y+=this.elements[4]*t.y,s.y+=this.elements[5],s}{const e=new s;for(let s=0;s<9;s++)e.elements[s]=this.elements[s]*t;return e}}transpose(){const t=new s;for(let e=0;e<3;e++)for(let s=0;s<3;s++)t.elements[3*e+s]=this.elements[3*s+e];return t}determinant(){return this.elements[0]*(this.elements[4]*this.elements[8]-this.elements[5]*this.elements[7])-this.elements[1]*(this.elements[3]*this.elements[8]-this.elements[5]*this.elements[6])+this.elements[2]*(this.elements[3]*this.elements[7]-this.elements[4]*this.elements[6])}adjunt(){const t=new s;for(let e=0;e<3;e++)for(let s=0;s<3;s++){const i=(e+s)%2==0?1:-1;t.elements[3*e+s]=i*(this.elements[(e+1)%3*3+(s+1)%3]*this.elements[(e+2)%3*3+(s+2)%3]-this.elements[(e+1)%3*3+(s+2)%3]*this.elements[(e+2)%3*3+(s+1)%3])}return t}inverse(){const t=this.determinant();if(0===t)throw new Error("Cannot invert matrix with determinant 0.");return this.adjunt().mul(1/t)}static identity(){return new s}static translation(t){return new s([1,0,0,0,1,0,t.x,t.y,1])}static scale(t){return new s([t.x,0,0,0,t.y,0,0,0,1])}}class i{constructor(t,e,s,i=1){this.r=t,this.g=e,this.b=s,this.a=i}add(t){const e=Math.min(1,this.r+t.r),s=Math.min(1,this.g+t.g),n=Math.min(1,this.b+t.b),o=Math.min(1,this.a+t.a);return new i(e,s,n,o)}mix(t){const e=(this.r+t.r)/2,s=(this.g+t.g)/2,n=(this.b+t.b)/2,o=(this.a+t.a)/2;return new i(e,s,n,o)}mul(t){const e=Math.min(1,this.r*t),s=Math.min(1,this.g*t),n=Math.min(1,this.b*t);return new i(e,s,n,this.a)}div(t){return this.mul(1/t)}static random(){return new i(Math.random(),Math.random(),Math.random())}}class n{constructor(t,e,s){this.center=t,this.radius=e,this.color=s}}class o{constructor(t,s){this.position=new e(0,0),this.scale=1,this.aspectRatio=s/t,this.updateTransform()}getTransform(){return this.transform}setPosition(t){this.position=t,this.updateTransform()}setScale(t){this.scale=t,this.updateTransform()}move(t){this.setPosition(this.position.add(t.div(this.scale)))}zoom(t){this.setScale(this.scale/t)}screenToWorld(t){return this.transform.inverse().mul(t)}updateTransform(){const t=s.translation(new e(this.position.x,this.position.y)),i=s.scale(new e(this.scale*this.aspectRatio,this.scale));this.transform=t.mul(i)}}const r=new i(.05,.05,.05);class h{constructor(t){this.commands=[],this.canvas=t,this.context=this.canvas.getContext("webgl"),this.initShaders(),this.initVertexBuffers(),this.view=new o(this.canvas.width,this.canvas.height)}drawCircle(t,e,s){this.commands.push(new n(t,e,s))}zoom(t){this.view.zoom(t)}move(t){this.view.move(t)}flush(){this.context.clearColor(r.r,r.g,r.b,1),this.context.clear(this.context.COLOR_BUFFER_BIT),this.context.bindBuffer(this.context.ARRAY_BUFFER,this.vertexBuffer),this.context.vertexAttribPointer(this.positionAttribute,2,this.context.FLOAT,!1,0,0),this.context.enableVertexAttribArray(this.positionAttribute),this.context.useProgram(this.program);for(let t of this.commands)if(t instanceof n){const i=s.translation(t.center),n=s.scale(new e(t.radius,t.radius)).mul(i).mul(this.view.getTransform());this.context.uniformMatrix3fv(this.transformUniform,!1,n.elements),this.context.uniform3f(this.colorUniform,t.color.r,t.color.g,t.color.b),this.context.drawArrays(this.context.TRIANGLE_FAN,this.circle[0],this.circle[1])}this.commands=[]}screenToWorld(t){let s=new e(t.x/this.canvas.width,t.y/this.canvas.height);return s.x=t.x/this.canvas.width*2-1,s.y=-(t.y/this.canvas.height*2-1),this.view.screenToWorld(s)}initShaders(){this.vertexShader=this.context.createShader(this.context.VERTEX_SHADER),this.context.shaderSource(this.vertexShader,"\n      attribute vec2 position;\n\n      uniform mat3 transform;\n\n      void main() {\n        vec2 transformed = (transform * vec3(position, 1.0)).xy;\n        gl_Position = vec4(transformed, 0.0, 1.0);\n      }\n    "),this.context.compileShader(this.vertexShader),this.fragmentShader=this.context.createShader(this.context.FRAGMENT_SHADER),this.context.shaderSource(this.fragmentShader,"\n      uniform mediump vec3 color;\n\n      void main() {\n        gl_FragColor = vec4(color, 1.0);\n      }\n    "),this.context.compileShader(this.fragmentShader),this.program=this.context.createProgram(),this.context.attachShader(this.program,this.vertexShader),this.context.attachShader(this.program,this.fragmentShader),this.context.linkProgram(this.program),this.positionAttribute=this.context.getAttribLocation(this.program,"position"),this.transformUniform=this.context.getUniformLocation(this.program,"transform"),this.colorUniform=this.context.getUniformLocation(this.program,"color")}initVertexBuffers(){this.circle=[0,34];let t=[];t.push(0,0);for(let e=0;e<=32;e++){let s=e/32*Math.PI*2;t.push(Math.cos(s),Math.sin(s))}this.vertexBuffer=this.context.createBuffer(),this.context.bindBuffer(this.context.ARRAY_BUFFER,this.vertexBuffer),this.context.bufferData(this.context.ARRAY_BUFFER,new Float32Array(t),this.context.STATIC_DRAW)}}class a{constructor(t,e,s){this.input=t,this.display=e,this.type=s,this.input.addEventListener("input",this.updateDisplay.bind(this))}get value(){switch(this.type){case"linear":return this.input.valueAsNumber;case"exponential":return Math.pow(10,this.input.valueAsNumber)}}set value(t){switch(this.type){case"linear":this.input.valueAsNumber=t;break;case"exponential":this.input.valueAsNumber=Math.log10(t)}this.updateDisplay()}updateDisplay(){this.value<.01||this.value>9999.99?this.display.innerText=this.value.toExponential(1):this.display.innerText=this.value.toFixed(2)}}class l{constructor(t){this.element=t,this.onClickCallback=()=>{},this.element.addEventListener("click",(t=>this.onClickCallback()))}setOnClick(t){this.onClickCallback=t}}class d{constructor(){this.state="",this.toggles=[]}get current(){return this.state}set current(t){this.toggles.forEach((e=>e[1].activated=e[0]===t)),this.state=t}add(t,e){this.toggles.push([t,e]),e.setOnActivated((()=>this.onToggleActivated(t)))}onToggleActivated(t){this.current=t}}class c extends l{constructor(t){super(t),this.state=!1,this.onActivatedCallback=()=>{},this.setOnClick(this.onClick.bind(this))}get activated(){return this.state}set activated(t){this.state=t,this.element.classList.toggle("on",t)}setOnActivated(t){this.onActivatedCallback=t}onClick(){this.activated=!this.activated,this.activated&&this.onActivatedCallback()}}class u{constructor(){this.bodies=[]}addBody(t){this.bodies.push(t)}removeBody(t){for(let e=0;e<this.bodies.length;e++)this.bodies[e].intersects(t)&&this.bodies.splice(e,1)}clear(){this.bodies=[]}update(t){for(let e=0;e<this.bodies.length;e++)this.bodies[e].update(t);for(let e=0;e<this.bodies.length;e++)for(let s=e+1;s<this.bodies.length;s++){const i=this.bodies[e],n=this.bodies[s],o=i.position.sub(n.position),r=o.sqrLength(),h=o.normalize().mul(1e-6*i.getMass()*n.getMass()/r);this.bodies[s].applyForce(h,t),this.bodies[e].applyForce(h.mul(-1),t)}for(let t=0;t<this.bodies.length;t++)for(let e=t+1;e<this.bodies.length;e++)this.bodies[t].intersects(this.bodies[e])&&(this.bodies[t]=this.bodies[t].merge(this.bodies[e]),this.bodies.splice(e,1))}draw(t){for(let e=0;e<this.bodies.length;e++)t.drawCircle(this.bodies[e].position,this.bodies[e].getRadius(),this.bodies[e].color)}}(new class{constructor(){this.mouseDown=null,this.placingBody=null;const s=document.getElementById("canvas");s.width=window.innerWidth,s.height=window.innerHeight,s.addEventListener("mousedown",this.onMouseDown.bind(this)),s.addEventListener("mouseup",this.onMouseUp.bind(this)),s.addEventListener("mousemove",this.onMouseMove.bind(this)),s.addEventListener("wheel",(t=>{this.renderer.zoom(t.deltaY>0?1.1:.9),t.preventDefault()})),this.resetButton=new l(document.getElementById("resetButton")),this.settingsButton=new l(document.getElementById("settingsButton")),this.addBodyToggle=new c(document.getElementById("addBodyToggle")),this.removeBodyToggle=new c(document.getElementById("removeBodyToggle")),this.moveCameraToggle=new c(document.getElementById("moveCameraToggle")),this.inputMode=new d,this.inputMode.add("addBody",this.addBodyToggle),this.inputMode.add("removeBody",this.removeBodyToggle),this.inputMode.add("moveCamera",this.moveCameraToggle),this.speed=new a(document.getElementById("speedInput"),document.getElementById("speedValue"),"exponential"),this.speed.value=1,this.mass=new a(document.getElementById("massInput"),document.getElementById("massValue"),"exponential"),this.mass.value=1,this.renderer=new h(s),this.world=new u;this.world.addBody(new t(1e3,new e(0,0),new e(0,0),i.random()));for(let s=0;s<100;++s){const n=.1,o=s/100*Math.PI*2,r=1,h=new e(Math.cos(o)*r,Math.sin(o)*r),a=h.perpendicular().normalize().mul(Math.sqrt(.001/r));this.world.addBody(new t(n,h,a,i.random()))}}start(){this.animate(0)}animate(s){if(this.world.update(this.speed.value*s*1e-5),"addBody"==this.inputMode.current&&(this.lastMousePosition||this.mouseDown)){const s=this.renderer.screenToWorld(this.mouseDown?this.mouseDown:this.lastMousePosition);this.placingBody||(this.placingBody=new t(this.mass.value,s,new e(0,0),i.random())),this.placingBody.position=s,this.placingBody.setMass(this.mass.value),this.renderer.drawCircle(s,this.placingBody.getRadius(),this.placingBody.color)}this.world.draw(this.renderer),this.renderer.flush(),window.requestAnimationFrame(this.animate.bind(this))}onMouseDown(t){0==t.button&&(this.mouseDown=new e(t.offsetX,t.offsetY),this.lastMousePosition=this.mouseDown,t.preventDefault())}onMouseUp(t){if(0!=t.button)return;const s=new e(t.offsetX,t.offsetY);let i=s.sub(this.mouseDown);switch(i.y*=-1,this.inputMode.current){case"addBody":this.placingBody.velocity=i.mul(.001),this.world.addBody(this.placingBody),this.placingBody=null;break;case"removeBody":this.world.removeBody(this.renderer.screenToWorld(s))}this.mouseDown=null,t.preventDefault()}onMouseMove(t){const s=new e(t.offsetX,t.offsetY);this.lastMousePosition||(this.lastMousePosition=s);const i=s.sub(this.lastMousePosition);this.lastMousePosition=s,null!==this.mouseDown&&"moveCamera"==this.inputMode.current&&this.renderer.move(new e(i.x,-i.y).mul(.001)),t.preventDefault()}}).start();
//# sourceMappingURL=index.298c9034.js.map
