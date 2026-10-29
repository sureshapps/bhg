gsap.registerPlugin(MorphSVGPlugin,MotionPathPlugin);
const $=s=>document.querySelector(s);

/* ---------- Fractal glass parallax background ---------- */
(function glass(){
  const root=$('#glass'),COLS=7,ROWS=5;
  let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const pts=[];
  for(let r=0;r<=ROWS;r++){pts[r]=[];for(let c=0;c<=COLS;c++){
    const edge=c===0||c===COLS||r===0||r===ROWS;
    pts[r][c]=[c/COLS*100+(edge?0:(rnd()-.5)*10),r/ROWS*100+(edge?0:(rnd()-.5)*12)];
  }}
  const layers=[];
  function add(poly,depth,tint){
    const el=document.createElement('div');el.className=poly?'shard':'layer base';
    if(poly)el.style.clipPath=`polygon(${poly.map(p=>p[0].toFixed(2)+'% '+p[1].toFixed(2)+'%').join(',')})`;
    const img=document.createElement('div');img.className='img';el.append(img);
    if(tint){const t=document.createElement('div');t.className='tint';t.style.background=tint;el.append(t)}
    root.append(el);layers.push({img,depth,qx:gsap.quickTo(img,'x',{duration:1.1,ease:'power3'}),qy:gsap.quickTo(img,'y',{duration:1.1,ease:'power3'}),rot:gsap.quickTo(img,'rotation',{duration:1.4,ease:'power3'})});
  }
  add(null,.15);
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
    const a=pts[r][c],b=pts[r][c+1],d=pts[r+1][c],e=pts[r+1][c+1];
    const tris=(r+c)%2?[[a,b,d],[b,e,d]]:[[a,b,e],[a,e,d]];
    tris.forEach(t=>{
      const depth=(rnd()*2-1)*1.4+(rnd()>.5?.5:-.5);
      const v=rnd(),tint=v>.5?`rgba(255,255,255,${(v-.5)*.16})`:`rgba(0,0,0,${(.5-v)*.3})`;
      add(t,depth,tint);
    });
  }
  const m={x:0,y:0};let lastMove=-1e9;
  addEventListener('pointermove',e=>{lastMove=performance.now();m.x=e.clientX/innerWidth*2-1;m.y=e.clientY/innerHeight*2-1});
  gsap.ticker.add(()=>{
    const now=performance.now();
    if(now-lastMove>2500){const t=now/1000;m.x=Math.sin(t*.35)*.7;m.y=Math.cos(t*.27)*.5}
    const amp=Math.min(innerWidth,innerHeight)*.045;
    layers.forEach(l=>{l.qx(-m.x*amp*l.depth);l.qy(-m.y*amp*l.depth);l.rot(m.x*l.depth*.35)});
  });
})();

/* ---------- Main animation ---------- */
async function start(){
const response=await fetch('assets/shapes.json');if(!response.ok)throw Error('Shapes unavailable');const paths=await response.json();
const image=new Image();image.src='assets/suresh.png';await image.decode();
const audio=new ChromeScore('assets/chrome-score.wav');
let soundEnabled=false;
function syncAudio(){audio.sync(tl.time(),soundEnabled&&!tl.paused()&&tl.progress()<1)}
const shape=$('#shape'),shadow=$('#shadow'),outline=$('#outline');
[shape,shadow,outline].forEach(p=>p.setAttribute('d',paths[0]));
const brush=$('#brush'),length=brush.getTotalLength();
gsap.set(brush,{strokeDasharray:length,strokeDashoffset:length});gsap.set('#final,#comet',{opacity:0});
const tl=gsap.timeline({paused:true,onUpdate:syncAudio,onComplete:()=>audio.stop()});
window.animation=tl;
tl.fromTo('#letter',{opacity:0,scale:.72,transformOrigin:'50% 50%'},{opacity:1,scale:1,duration:1.2,ease:'expo.out'},0);
for(let i=1;i<6;i++){
  const t=1.5+(i-1)*1.65;
  tl.to([shape,shadow,outline],{morphSVG:{shape:paths[i],shapeIndex:'auto'},duration:1.1,ease:'power3.inOut'},t);
  tl.to('#letter',{rotation:i%2?-3:3,transformOrigin:'50% 50%',duration:.5,ease:'sine.inOut',yoyo:true,repeat:1},t);
}
const end=10.25;
tl.to('#letter',{scale:.42,opacity:0,duration:.8,ease:'power3.in'},end-.6);
tl.set('#final',{opacity:1},end);
tl.to('#comet',{opacity:1,duration:.2},end);
tl.to(brush,{strokeDashoffset:0,duration:3.6,ease:'none'},end);
tl.to('#comet',{motionPath:{path:'#flight',align:'#flight',alignOrigin:[.5,.5]},duration:3.6,ease:'none'},end);
tl.to('#comet',{opacity:0,duration:.4},end+3.3);
tl.fromTo('#final',{scale:.94,transformOrigin:'50% 50%'},{scale:1,duration:4.5,ease:'power2.out'},end);
// A full-white mask guarantees that every corner of the original artwork is visible.
tl.to(brush,{strokeWidth:1800,duration:.8,ease:'power2.out'},end+3.1);
const stars=$('#stars');[[330,270],[1000,230],[1270,540],[700,630]].forEach(([x,y],i)=>{const star=document.createElementNS('http://www.w3.org/2000/svg','path');star.setAttribute('d',`M${x-20} ${y}Q${x} ${y} ${x} ${y-25}Q${x} ${y} ${x+20} ${y}Q${x} ${y} ${x} ${y+25}Q${x} ${y} ${x-20} ${y}`);stars.append(star);gsap.set(star,{opacity:0,transformOrigin:'50% 50%'});tl.to(star,{opacity:.9,scale:1.4,duration:.35,yoyo:true,repeat:1},end+3.2+i*.24)});
tl.to({},{duration:1.2});

// No on-screen controls: first click / tap / key press turns the music on (synced to the current time).
// Once the animation has finished, click or Space replays it.
async function interact(){
  if(!soundEnabled){try{await audio.enable();soundEnabled=true;syncAudio()}catch(e){console.error(e)}return}
  if(tl.progress()===1){tl.restart();syncAudio()}
}
addEventListener('pointerdown',interact);
addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();interact()}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)tl.pause();else if(tl.progress()<1&&!matchMedia('(prefers-reduced-motion: reduce)').matches)tl.play();syncAudio()});
if(matchMedia('(prefers-reduced-motion: reduce)').matches)tl.progress(1).pause();else tl.play();
}
start().catch(e=>{console.error(e);$('#error').hidden=false});
