const breaks=document.getElementById("break-length");
const session=document.getElementById("session-length")
const timer_label=document.getElementById("timer-label");
const time_left=document.getElementById("time-left");
const control=document.getElementById("start_stop");
const reset=document.getElementById("reset");
const breakinc=document.getElementById('break-increment');
const breakdec=document.getElementById('break-decrement');
const sessioninc=document.getElementById('session-increment');
const sessiondec=document.getElementById('session-decrement');
const audio=document.getElementById("beep");
let pause=true;
let period=25;
let recess=5;
let timer,breaktimer;
let sessiontime,breaktime;
let beginsession=true;
let beginbreak=true;
let minstring,secstring;
breaks.innerText=recess;
session.innerText=period;

control.addEventListener('click',handlepause);

function handlepause(){
    pause=!pause;
    if(pause==false){
        
        startcount();
        control.innerHTML='<i class="bi bi-pause-fill"></i>'
    }
    else{
        pausecount();
        control.innerHTML='<i class="bi bi-play-fill"></i>'
    }
}
reset.addEventListener('click',handlereset);
function handlereset(){
    if(timer_label.innerText=="session")
    pausecount();
    else if(timer_label.innerText=="break")
    pausebreak();
    
    control.innerHTML='<i class="bi bi-play-fill"></i>'
    pause=true;
    
    time_left.innerText='25:00';
    breaks.innerText=recess=5;
    session.innerText=period=25;
    timer_label.innerText="session";
    beginsession=true;
    audio.pause();
    audio.currentTime=0;
    
}
sessioninc.addEventListener("click",sessincr);
function sessincr(){
    if(period<60 && pause==true )
    {
    sessiontime=`${parseInt(session.innerText)}:01`;
    session.innerText=++period;
    let modmin=period.toString().padStart(2,'0');
    if(timer_label.innerText=='session')
    time_left.innerText=`${modmin}:00`;

    }
   
}
sessiondec.addEventListener("click",sessdecr)
function sessdecr(){
    if(period>1 && pause==true)
    {
        sessiontime=`${parseInt(session.innerText)}:01`;
        session.innerText=--period;
        let modmin=period.toString().padStart(2,'0');
        if(timer_label.innerText=='session')
        time_left.innerText=`${modmin}:00`
    }
 
}
breakdec.addEventListener('click',breakdecr)
function breakdecr(){
    if(recess>1 && pause==true)
    {
        breaktime=`${recess}:01`;
        breaks.innerText=--recess;
        let modmin=recess.toString().padStart(2,'0');
        if(timer_label.innerText=='break')
        time_left.innerText=`${modmin}:00`
    }
   
}
breakinc.addEventListener('click',breakincr)
function breakincr(){
    if(recess<60 && pause==true)
    {
        breaktime=`${recess}:01`;
        breaks.innerText=++recess;
        let modmin=recess.toString().padStart(2,'0');
        
        if(timer_label.innerText=='break')
        time_left.innerText=`${modmin}:00`
    }
   
}

function countdown(){
    
    console.log(sessiontime)
    let [min,sec]=sessiontime.split(":").map(Number);
    console.log(min,sec)
    if(min>=0)
    {
        if(sec==0)
        {
        min--;
        sec=60;
        }
        sec--
    }
    
    minstring=min.toString().padStart(2,'0');
    secstring=sec.toString().padStart(2,'0');
    sessiontime=`${minstring}:${secstring}`
    time_left.innerText=sessiontime;
    console.log(sessiontime)
    if(min==0&& sec==0)
    {
    audio.play();
    clearInterval(timer)
    timer_label.innerText="break";
    recess=parseInt(breaks.innerText)
    breaktime=`${parseInt(breaks.innerText)}:01`;
    startbreak();
   
    console.log("it ends with us")
    }
}

function startcount(){
    if(beginsession==true){
        beginsession=false
        sessiontime=`${parseInt(session.innerText)}:00`;
        timer=setInterval(countdown, 1000);
    }
    else
    {
        
        timer=setInterval(countdown, 1000);
    }
    
    
}
function pausecount(){
    clearInterval(timer);
}


function breakdown(){
    console.log(breaktime)
    let [min,sec]=breaktime.split(":").map(Number);
    console.log(min,sec)
    if(min>=0)
    {
        if(sec==0)
        {
        min--;
        sec=60;
        }
        sec--
    }
    minstring=min.toString().padStart(2,'0');
    secstring=sec.toString().padStart(2,'0');
    breaktime=`${minstring}:${secstring}`
    time_left.innerText=breaktime;
    console.log(breaktime)
    if(min==0&& sec==0)
    {
    audio.play();
    clearInterval(breaktimer)
    timer_label.innerText="session";
    period=parseInt(session.innerText)
    sessiontime=`${parseInt(session.innerText)}:01`;
    startcount();
    

    console.log("it begins with us")
    }
}
function startbreak(){
    
    breaktimer=setInterval(breakdown,1000);
}
function pausebreak(){
    clearInterval(breaktimer);
}