class t{constructor(t,e){this.x=t,this.y=e}add(e){return new t(this.x+e.x,this.y+e.y)}sub(e){return new t(this.x-e.x,this.y-e.y)}mul(e){return new t(this.x*e,this.y*e)}div(e){return new t(this.x/e,this.y/e)}dot(t){return this.x*t.x+this.y*t.y}sqrLength(){return this.dot(this)}length(){return Math.sqrt(this.sqrLength())}normalize(){return this.div(this.length())}perpendicular(){return new t(-this.y,this.x)}}class e{constructor(t=[1,0,0,0,1,0,0,0,1]){this.elements=new Float32Array(t)}mul(s){if(s instanceof e){const t=new e;for(let e=0;e<3;e++)for(let i=0;i<3;i++){let n=0;for(let t=0;t<3;t++)n+=this.elements[3*e+t]*s.elements[3*t+i];t.elements[3*e+i]=n}return t}if(s instanceof t){const e=new t(0,0);return e.x+=this.elements[0]*s.x,e.x+=this.elements[1]*s.y,e.x+=this.elements[2],e.y+=this.elements[0]*s.x,e.y+=this.elements[1]*s.y,e.y+=this.elements[2],e}{const t=new e;for(let e=0;e<9;e++)t.elements[e]=this.elements[e]*s;return t}}transpose(){const t=new e;for(let e=0;e<3;e++)for(let s=0;s<3;s++)t.elements[3*e+s]=this.elements[3*s+e];return t}determinant(){return this.elements[0]*(this.elements[4]*this.elements[8]-this.elements[5]*this.elements[7])-this.elements[1]*(this.elements[3]*this.elements[8]-this.elements[5]*this.elements[6])+this.elements[2]*(this.elements[3]*this.elements[7]-this.elements[4]*this.elements[6])}cofactor(){const t=new e;for(let e=0;e<3;e++)for(let s=0;s<3;s++){const i=(e+s)%2==0?1:-1;t.elements[3*e+s]=i*(this.elements[(e+1)%3*3+(s+1)%3]*this.elements[(e+2)%3*3+(s+2)%3]-this.elements[(e+1)%3*3+(s+2)%3]*this.elements[(e+2)%3*3+(s+1)%3])}return t}inverse(){const t=this.determinant();if(0===t)throw new Error("Cannot invert matrix with determinant 0.");return this.cofactor().transpose().mul(1/t)}static identity(){return new e}static translation(t){return new e([1,0,0,0,1,0,t.x,t.y,1])}static scale(t){return new e([t.x,0,0,0,t.y,0,0,0,1])}}class s{constructor(t,e,s,i=1){this.r=t,this.g=e,this.b=s,this.a=i}add(t){const e=Math.min(1,this.r+t.r),i=Math.min(1,this.g+t.g),n=Math.min(1,this.b+t.b),o=Math.min(1,this.a+t.a);return new s(e,i,n,o)}mix(t){const e=(this.r+t.r)/2,i=(this.g+t.g)/2,n=(this.b+t.b)/2,o=(this.a+t.a)/2;return new s(e,i,n,o)}mul(t){const e=Math.min(1,this.r*t),i=Math.min(1,this.g*t),n=Math.min(1,this.b*t);return new s(e,i,n,this.a)}div(t){return this.mul(1/t)}static random(){return new s(Math.random(),Math.random(),Math.random())}}class i{constructor(t,e,s){this.center=t,this.radius=e,this.color=s}}class n{constructor(e,s){this.position=new t(0,0),this.scale=1,this.aspectRatio=s/e,this.updateTransform()}getTransform(){return this.transform}setPosition(t){this.position=t,this.updateTransform()}setScale(t){this.scale=t,this.updateTransform()}move(t){this.setPosition(this.position.add(t.div(this.scale)))}zoom(t){this.setScale(this.scale/t)}screenToWorld(t){return this.transform.inverse().mul(t)}updateTransform(){const s=e.translation(new t(this.position.x,this.position.y)),i=e.scale(new t(this.scale*this.aspectRatio,this.scale));this.transform=s.mul(i)}}const o=new s(.05,.05,.05);class r{constructor(t){this.commands=[],this.canvas=t,this.context=this.canvas.getContext("webgl"),this.initShaders(),this.initVertexBuffers(),this.view=new n(this.canvas.width,this.canvas.height)}drawCircle(t,e,s){this.commands.push(new i(t,e,s))}zoom(t){this.view.zoom(t)}move(t){this.view.move(t)}flush(){this.context.clearColor(o.r,o.g,o.b,1),this.context.clear(this.context.COLOR_BUFFER_BIT),this.context.bindBuffer(this.context.ARRAY_BUFFER,this.vertexBuffer),this.context.vertexAttribPointer(this.positionAttribute,2,this.context.FLOAT,!1,0,0),this.context.enableVertexAttribArray(this.positionAttribute),this.context.useProgram(this.program);for(let s of this.commands)if(s instanceof i){const i=e.translation(s.center),n=e.scale(new t(s.radius,s.radius)).mul(i).mul(this.view.getTransform());this.context.uniformMatrix3fv(this.transformUniform,!1,n.elements),this.context.uniform3f(this.colorUniform,s.color.r,s.color.g,s.color.b),this.context.drawArrays(this.context.TRIANGLE_FAN,this.circle[0],this.circle[1])}this.commands=[]}screenToWorld(t){return t.x=t.x/this.canvas.width*2-1,t.y=t.y/this.canvas.width*2-1,this.view.screenToWorld(t)}initShaders(){this.vertexShader=this.context.createShader(this.context.VERTEX_SHADER),this.context.shaderSource(this.vertexShader,"\n      attribute vec2 position;\n\n      uniform mat3 transform;\n\n      void main() {\n        vec2 transformed = (transform * vec3(position, 1.0)).xy;\n        gl_Position = vec4(transformed, 0.0, 1.0);\n      }\n    "),this.context.compileShader(this.vertexShader),this.fragmentShader=this.context.createShader(this.context.FRAGMENT_SHADER),this.context.shaderSource(this.fragmentShader,"\n      uniform mediump vec3 color;\n\n      void main() {\n        gl_FragColor = vec4(color, 1.0);\n      }\n    "),this.context.compileShader(this.fragmentShader),this.program=this.context.createProgram(),this.context.attachShader(this.program,this.vertexShader),this.context.attachShader(this.program,this.fragmentShader),this.context.linkProgram(this.program),this.positionAttribute=this.context.getAttribLocation(this.program,"position"),this.transformUniform=this.context.getUniformLocation(this.program,"transform"),this.colorUniform=this.context.getUniformLocation(this.program,"color")}initVertexBuffers(){this.circle=[0,34];let t=[];t.push(0,0);for(let e=0;e<=32;e++){let s=e/32*Math.PI*2;t.push(Math.cos(s),Math.sin(s))}this.vertexBuffer=this.context.createBuffer(),this.context.bindBuffer(this.context.ARRAY_BUFFER,this.vertexBuffer),this.context.bufferData(this.context.ARRAY_BUFFER,new Float32Array(t),this.context.STATIC_DRAW)}}class h{constructor(t,e,s){this.input=t,this.display=e,this.type=s,this.input.addEventListener("input",this.updateDisplay.bind(this))}get value(){switch(this.type){case"linear":return this.input.valueAsNumber;case"exponential":return Math.pow(10,this.input.valueAsNumber)}}set value(t){switch(this.type){case"linear":this.input.valueAsNumber=t;break;case"exponential":this.input.valueAsNumber=Math.log10(t)}this.updateDisplay()}updateDisplay(){this.value<.01||this.value>9999.99?this.display.innerText=this.value.toExponential(1):this.display.innerText=this.value.toFixed(2)}}class a{constructor(t){this.element=t,this.onClickCallback=()=>{},this.element.addEventListener("click",(t=>this.onClickCallback()))}setOnClick(t){this.onClickCallback=t}}class l{constructor(){this.state="",this.toggles=[]}get current(){return this.state}set current(t){this.toggles.forEach((e=>e[1].activated=e[0]===t)),this.state=t}add(t,e){this.toggles.push([t,e]),e.setOnActivated((()=>this.onToggleActivated(t)))}onToggleActivated(t){this.current=t}}class d extends a{constructor(t){super(t),this.state=!1,this.onActivatedCallback=()=>{},this.setOnClick(this.onClick.bind(this))}get activated(){return this.state}set activated(t){this.state=t,this.element.classList.toggle("on",t)}setOnActivated(t){this.onActivatedCallback=t}onClick(){this.activated=!this.activated,this.activated&&this.onActivatedCallback()}}class c{constructor(t,e,s,i){this.setMass(t),this.position=e,this.velocity=s,this.color=i}getMass(){return this.mass}getRadius(){return this.radius}getPosition(){return this.position}getVelocity(){return this.velocity}getColor(){return this.color}setMass(t){this.mass=t,this.radius=.75*Math.PI*this.mass**(1/3)/100}applyForce(t,e){this.applyImpulse(t.mul(e))}applyImpulse(t){this.velocity=this.velocity.add(t.mul(1/this.mass))}update(t){this.position=this.position.add(this.velocity.mul(t))}intersects(t){if(t instanceof c){return this.position.sub(t.position).sqrLength()<=(this.radius+t.radius)**2}return this.position.sub(t).sqrLength()<=this.radius**2}merge(t){const e=this.mass+t.mass,s=this.position.mul(this.mass).add(t.position.mul(t.mass)).div(e),i=this.velocity.mul(this.mass).add(t.velocity.mul(t.mass)).div(e),n=this.color.mul(this.mass/e),o=t.color.mul(t.mass/e),r=n.add(o);return new c(e,s,i,r)}}class m{constructor(){this.bodies=[]}addBody(t,e,i){this.bodies.push(new c(t,e,i,s.random().add(new s(.1,.1,.1))))}removeBody(t){for(let e=0;e<this.bodies.length;e++)this.bodies[e].intersects(t)&&this.bodies.splice(e,1)}clear(){this.bodies=[]}update(t){for(let e=0;e<this.bodies.length;e++)this.bodies[e].update(t);for(let e=0;e<this.bodies.length;e++)for(let s=e+1;s<this.bodies.length;s++){const i=this.bodies[e],n=this.bodies[s],o=i.getPosition().sub(n.getPosition()),r=o.sqrLength(),h=o.normalize().mul(1e-6*i.getMass()*n.getMass()/r);this.bodies[s].applyForce(h,t),this.bodies[e].applyForce(h.mul(-1),t)}for(let t=0;t<this.bodies.length;t++)for(let e=t+1;e<this.bodies.length;e++)this.bodies[t].intersects(this.bodies[e])&&(this.bodies[t]=this.bodies[t].merge(this.bodies[e]),this.bodies.splice(e,1))}draw(t){for(let e=0;e<this.bodies.length;e++)t.drawCircle(this.bodies[e].getPosition(),this.bodies[e].getRadius(),this.bodies[e].getColor())}}(new class{constructor(){this.mouseDown=null;const e=document.getElementById("canvas");e.width=window.innerWidth,e.height=window.innerHeight,e.addEventListener("mousedown",this.onMouseDown.bind(this)),e.addEventListener("mouseup",this.onMouseUp.bind(this)),e.addEventListener("mousemove",this.onMouseMove.bind(this)),e.addEventListener("wheel",(t=>{this.renderer.zoom(t.deltaY>0?1.1:.9),t.preventDefault()})),this.resetButton=new a(document.getElementById("resetButton")),this.settingsButton=new a(document.getElementById("settingsButton")),this.addBodyToggle=new d(document.getElementById("addBodyToggle")),this.removeBodyToggle=new d(document.getElementById("removeBodyToggle")),this.moveCameraToggle=new d(document.getElementById("moveCameraToggle")),this.inputMode=new l,this.inputMode.add("addBody",this.addBodyToggle),this.inputMode.add("removeBody",this.removeBodyToggle),this.inputMode.add("moveCamera",this.moveCameraToggle),this.speed=new h(document.getElementById("speedInput"),document.getElementById("speedValue"),"exponential"),this.speed.value=1,this.mass=new h(document.getElementById("massInput"),document.getElementById("massValue"),"linear"),this.mass.value=1,this.renderer=new r(e),this.world=new m;this.world.addBody(1e3,new t(0,0),new t(0,0));for(let e=0;e<100;++e){const s=.1,i=e/100*Math.PI*2,n=1,o=new t(Math.cos(i)*n,Math.sin(i)*n),r=o.perpendicular().normalize().mul(Math.sqrt(.001/n));this.world.addBody(s,o,r)}}start(){this.animate(0)}animate(t){this.world.update(this.speed.value*t*1e-5),this.world.draw(this.renderer),this.renderer.flush(),window.requestAnimationFrame(this.animate.bind(this))}onMouseDown(e){0==e.button&&(this.mouseDown=new t(e.offsetX,e.offsetY),this.lastMousePosition=this.mouseDown,e.preventDefault())}onMouseUp(t){0==t.button&&(this.mouseDown=null,t.preventDefault())}onMouseMove(e){if(null===this.mouseDown)return;const s=new t(e.offsetX,e.offsetY),i=s.sub(this.mouseDown),n=s.sub(this.lastMousePosition);switch(this.lastMousePosition=s,this.inputMode.current){case"addBody":this.world.addBody(this.mass.value,this.renderer.screenToWorld(s),i.mul(.1));break;case"removeBody":this.world.removeBody(this.renderer.screenToWorld(s));break;case"moveCamera":const e=new t(n.x,-n.y);this.renderer.move(e.mul(.001))}e.preventDefault()}}).start();
//# sourceMappingURL=index.8afcc58d.js.map
