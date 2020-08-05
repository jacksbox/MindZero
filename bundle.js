!function(t){var s={};function i(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=s,i.d=function(t,s,e){i.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:e})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,s){if(1&s&&(t=i(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var n in t)i.d(e,n,function(s){return t[s]}.bind(null,n));return e},i.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(s,"a",s),s},i.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},i.p="",i(i.s=0)}([function(t,s,i){"use strict";i.r(s);class e{constructor(t=0,s=0){this.x=t,this.y=s}add(t){this.x+=t.x,this.y+=t.y}static Add(t,s){return new e(t.x+s.x,t.y+s.y)}sub(t){this.x-=t.x,this.y-=t.y}static Sub(t,s){return new e(t.x-s.x,t.y-s.y)}clone(){return new e(this.x,this.y)}static Clone(t){return new e(t.x,t.y)}distance(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}static Distance(t,s){return Math.sqrt(Math.pow(t.x-t.x,2)+Math.pow(s.y-t.y,2))}limitX(t){this.x>t?this.x=t:this.x<-t&&(this.x=-t)}limitY(t){this.y>t?this.y=t:this.y<-t&&(this.y=-t)}limit(t){this.limitX(t),this.limitY(t)}static Limit(t,s){t.limit(s)}toArray(){return[this.x,this.y]}}var n=e;var h=class{constructor(t,s){this.w=t,this.h=s,this.min=new n(0,0),this.max=new n(t,s)}clear(t){t.clearRect(this.min.x,this.min.y,this.w,this.h)}isOutOfBounds(t){return t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y}};const r=t=>Math.random()*t-1;let a=0;class o{constructor(t){this.directions=new Array(t).fill(null).map(()=>new n(r(2),r(2))),this.stepLimit=t,this.step=0,this.id=a++}isEmpty(){return this.step===this.stepLimit-1}next(){const t=this.directions[this.step];return this.step++,t}clone(t=null){const s=new o(0);return s.directions=t?this.directions.slice(0,t).map(t=>t.clone()):this.directions.map(t=>t.clone()),s}mutate(t){const s=t?.005:.01;let i=0;this.directions=this.directions.map(t=>i>0||Math.random()<s?(i=i>0?i--:0,new n(r(2),r(2))):t)}}var l=o;class c{constructor(t,s,i){this.radius=4,this.start=new n(t,s),this.pos=new n(t,s),this.vel=new n,this.brain=new l(i),this.fitness=0,this.primus=!1,this.isDead=!1,this.hitObstacle=!1,this.reachedGoal=!1,this.hasHitGoal=!1}draw(t,s){s.beginPath(),s.arc(this.pos.x-this.radius,this.pos.y-this.radius,this.radius,0,2*Math.PI),this.primus?(s.strokeStyle="green",s.lineWidth=4,s.stroke()):s.fillStyle=t,s.fill()}update(t,s,i){this.isDead||this.reachedGoal||(this.move(),i.isOutOfBounds(this.pos)?this.isDead=!0:s.checkCollisionWith(this.pos)?(this.isDead=!0,this.hitObstacle=!0):t.checkCollisionWith(this.pos)&&(this.reachedGoal=!0))}move(){this.brain.isEmpty()?this.isDead=!0:(this.vel.add(this.brain.next()),this.vel.limit(4),this.pos.add(this.vel))}calcFitness(){this.fitness=this.reachedGoal?1:1/Math.pow(this.pos.distance(new n(400,80)),2),this.hitObstacle?this.fitness/=2:this.reachedGoal&&(this.fitness=1.5*this.fitness+100/(this.brain.step*this.brain.step))}getChild(t){const s=new c(this.start.x,this.start.y,0);return s.brain=this.brain.clone(t),s.brain.stepLimit=t,s.hasHitGoal=this.reachedGoal,s}mutate(){this.brain.mutate(this.hasHitGoal)}}var d=c;var u=new class{constructor(t){this.gen=0}init(t){this.swarms=t,this.swarms.forEach(t=>this.createDiv(t.color)),this.update()}update(){this.gen++,document.getElementById("gen").innerHTML=this.gen,this.swarms.forEach(t=>{document.getElementById(t.color).innerHTML=t.stepsInBestTry?t.stepsInBestTry:"-"})}createDiv(t){const s=document.createElement("div");s.id=t,s.style=`color: ${t}; padding: 10px`,document.getElementById("steps").appendChild(s)}};var p=class{constructor(t,s,i,e){this.size=t,this.initialStepLimit=s,this.color=i,this.origin=e,this.dots=new Array(this.size).fill(null).map(()=>new d(e.x,e.y,s)),this.stepsInBestTry=null}evolve(){this.calcFitness(),this.calcFitnessSum();const t=this.selectPrimus(),s=Math.min(Math.floor(1.2*(t.reachedGoal?t.brain.step+1:t.brain.stepLimit)),this.initialStepLimit),i=t.getChild(s);i.brain.id=t.brain.id,i.primus=!0,this.stepsInBestTry=s,this.dots=this.dots.map(()=>this.selectParent().getChild(s)),this.mutate(),this.dots[this.dots.length-1]=i}mutate(){this.dots.forEach(t=>t.mutate())}selectPrimus(){let t=this.dots[0];const s=this.dots.length;for(let i=1;i<s;i++)this.dots[i].fitness>t.fitness&&(t=this.dots[i]);return t}selectParent(){const t=(s=this.fitnessSum,Math.random()*s);var s;let i=0;const e=this.dots.length;for(let s=0;s<e;s++)if(i+=this.dots[s].fitness,i>t)return this.dots[s]}calcFitness(){this.dots.forEach(t=>t.calcFitness())}calcFitnessSum(){this.fitnessSum=this.dots.reduce((t,s)=>t+s.fitness,0)}update(t,s,i){this.dots.forEach(e=>e.update(t,s,i))}draw(t){this.dots.forEach(s=>s.draw(this.color,t))}allStopped(){const t=this.dots.length;for(let s=0;s<t;s++)if(!this.dots[s].isDead&&!this.dots[s].reachedGoal)return!1;return!0}};var m=class{constructor(t,s,i,e){this.pos=new n(t,s),this.radius=i,this.color=e}draw(t){t.beginPath(),t.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill()}checkCollisionWith(t){return this.pos.distance(t)<this.radius}};var y=class{constructor(t,s,i,e){this.pos=new n(t,s),this.w=i,this.h=e,this.min=new n(t,s),this.max=new n(t+i,s+e)}draw(t){t.beginPath(),t.rect(this.pos.x,this.pos.y,this.w,this.h),t.fillStyle="black",t.fill()}checkCollisionWith(t){return t.x>this.min.x&&t.x<this.max.x&&t.y>this.min.y&&t.y<this.max.y}};const f=document.getElementById("canvas"),w=f.getContext("2d"),x=new h(800,800);f.width=x.w,f.height=x.h;const b=new n(400,700),v=[new p(500,500,"purple",b),new p(500,500,"black",b),new p(500,500,"orange",b),new p(500,500,"gray",b)],g=new m(400,80,6,"red"),M=new y(100,300,500,10);u.init(v);const S=()=>{v.every(t=>t.allStopped())?(v.forEach(t=>t.evolve()),u.update()):(x.clear(w),M.draw(w),g.draw(w),v.forEach(t=>{t.update(g,M,x),t.draw(w)})),window.requestAnimationFrame(S)};S()}]);