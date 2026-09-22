const slides = [...document.querySelectorAll(".slide")];
const deck = document.getElementById("deck");
let current = 0;
let busy = false;
let soundOn = false;

function render(){
  slides.forEach((slide,i)=>slide.classList.toggle("active",i===current));
  history.replaceState(null,"",`#slide-${current+1}`);
}
function goTo(index){
  if(busy) return;
  current=Math.max(0,Math.min(index,slides.length-1));
  busy=true; render();
  setTimeout(()=>busy=false,520);
  if(soundOn) beep();
}
function next(){goTo(current+1>=slides.length?0:current+1)}
function prev(){goTo(current-1<0?slides.length-1:current-1)}

document.addEventListener("keydown",e=>{
  if(["ArrowRight","ArrowDown","PageDown"," "].includes(e.key)){e.preventDefault();next()}
  if(["ArrowLeft","ArrowUp","PageUp"].includes(e.key)){e.preventDefault();prev()}
  if(e.key==="Home") goTo(0);
  if(e.key==="End") goTo(slides.length-1);
  if(e.key.toLowerCase()==="f") toggleFullscreen();
  if(e.key.toLowerCase()==="s"){soundOn=!soundOn;if(soundOn) beep();}
});

let pointerStartX=null;
deck.addEventListener("pointerdown",e=>pointerStartX=e.clientX);
deck.addEventListener("pointerup",e=>{
  if(pointerStartX===null) return;
  const dx=e.clientX-pointerStartX;
  if(Math.abs(dx)>55){dx<0?next():prev();}
  else {e.clientX/window.innerWidth<0.30?prev():next();}
  pointerStartX=null;
});

function beep(){
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  const ctx=new AC(),osc=ctx.createOscillator(),gain=ctx.createGain();
  osc.frequency.value=520;
  gain.gain.setValueAtTime(.0001,ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.035,ctx.currentTime+.01);
  gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.08);
  osc.connect(gain).connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.08);
}
function toggleFullscreen(){
  if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}
const hashMatch=location.hash.match(/slide-(\d+)/);
if(hashMatch) current=Math.max(0,Math.min(Number(hashMatch[1])-1,slides.length-1));
render();
