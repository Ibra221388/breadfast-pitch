(()=>{
 const root=document.documentElement,splash=document.getElementById('openingSplash'),video=document.getElementById('openingVideo'),controls=document.getElementById('introControls'),playButton=document.getElementById('introPlay'),continueButton=document.getElementById('introContinue');
 if(!root.classList.contains('intro-active')){splash?.remove();return;}
 clearTimeout(window.breadfastIntroFailsafe);
 let ready=false,mediaDone=false,closed=false,playing=false;
 function dismiss(){if(closed)return;closed=true;video?.pause();try{sessionStorage.setItem('breadfast-intro-v4','1')}catch(e){}root.classList.remove('intro-active');splash?.classList.add('splash-exit');setTimeout(()=>splash?.remove(),450)}
 function finish(){if(ready&&mediaDone)dismiss()}
 function showControls(){if(!closed&&controls)controls.hidden=false}
 function play(){if(closed||!video)return;mediaDone=false;video.muted=true;try{const attempt=video.play();attempt?.catch(()=>{if(!playing)showControls()})}catch(e){showControls()}}
 window.finishBreadfastIntro=()=>{ready=true;finish()};
 playButton?.addEventListener('click',play);
 continueButton?.addEventListener('click',()=>{mediaDone=true;finish()});
 if(video){
  video.muted=true;
  video.addEventListener('playing',()=>{playing=true;if(controls)controls.hidden=true});
  video.addEventListener('pause',()=>{playing=false;if(!video.ended&&!closed)showControls()});
  video.addEventListener('ended',()=>{playing=false;mediaDone=true;finish()},{once:true});
  video.addEventListener('error',()=>{playing=false;showControls()});
  if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)showControls();else play();
 }else showControls();
 // Slow playback must never be cut short by a wall-clock timer.
 setTimeout(showControls,12000);
})();
