const $=id=>document.getElementById(id);
let hi=true,idx=0,chosen=false,score=0,points=Number(localStorage.points||0);
const qs=[
{q:["भारत की राजधानी क्या है?","What is the capital of India?"],o:[["मुंबई","नई दिल्ली","जयपुर","भोपाल"],["Mumbai","New Delhi","Jaipur","Bhopal"]],a:1},
{q:["सौरमंडल का सबसे बड़ा ग्रह कौन-सा है?","Which is the largest planet?"],o:[["पृथ्वी","मंगल","बृहस्पति","शुक्र"],["Earth","Mars","Jupiter","Venus"]],a:2},
{q:["भारत का राष्ट्रीय पशु कौन है?","What is India's national animal?"],o:[["शेर","हाथी","बाघ","हिरण"],["Lion","Elephant","Tiger","Deer"]],a:2},
{q:["पानी का रासायनिक सूत्र क्या है?","What is the chemical formula of water?"],o:[["CO2","O2","H2O","NaCl"],["CO2","O2","H2O","NaCl"]],a:2},
{q:["ताजमहल किस शहर में है?","In which city is the Taj Mahal?"],o:[["दिल्ली","आगरा","लखनऊ","जयपुर"],["Delhi","Agra","Lucknow","Jaipur"]],a:1}
];
const tr=(h,e)=>hi?h:e;
function stats(){$("points").textContent=points}
function show(id){["home","quiz","result","board"].forEach(x=>$(x).classList.toggle("hidden",x!==id))}
$("lang").onclick=()=>{hi=!hi;$("lang").textContent=tr("English","हिंदी");$("welcome").textContent=tr("आज का क्विज","Today's Quiz");$("intro").textContent=tr("GK, Science और History के सवालों से अपना ज्ञान बढ़ाएँ।","Improve your knowledge with GK, Science and History questions.");$("start").textContent=tr("क्विज शुरू करें","Start Quiz");$("leader").textContent=tr("Leaderboard देखें","View Leaderboard");$("again").textContent=tr("फिर से खेलें","Play Again");$("back").textContent=tr("होम पर जाएँ","Back to Home");if(!$("quiz").classList.contains("hidden"))render();};
function start(){idx=0;score=0;chosen=false;show("quiz");render()}
function render(){let q=qs[idx];$("counter").textContent=tr(`सवाल ${idx+1} / ${qs.length}`,`Question ${idx+1} / ${qs.length}`);$("bar").style.width=((idx+1)/qs.length*100)+"%";$("question").textContent=q.q[hi?0:1];$("answers").innerHTML="";$("feedback").textContent="";$("next").classList.add("hidden");q.o[hi?0:1].forEach((v,i)=>{let b=document.createElement("button");b.className="answer";b.textContent=String.fromCharCode(65+i)+". "+v;b.onclick=()=>answer(i);$("answers").appendChild(b)})}
function answer(i){if(chosen)return;chosen=true;let q=qs[idx];let btns=[...$("answers").children];btns[q.a].classList.add("correct");if(i===q.a){score++;points+=10;localStorage.points=points;stats();$("feedback").textContent=tr("सही जवाब! +10 Points","Correct! +10 Points");$("feedback").style.color="#16834a"}else{$("feedback").textContent=tr("गलत जवाब। सही उत्तर हरे रंग में है।","Incorrect. Correct answer is highlighted.");$("feedback").style.color="#b33a3a";btns[i].classList.add("wrong")}btns.forEach(b=>b.disabled=true);$("next").textContent=tr(idx===qs.length-1?"रिजल्ट देखें":"अगला सवाल",idx===qs.length-1?"See Result":"Next Question");$("next").classList.remove("hidden")}
function finish(){$("score").textContent=score+" / "+qs.length;$("earned").textContent=tr(`आपने ${score*10} Points कमाए`,`You earned ${score*10} points`);show("result")}
$("start").onclick=start;$("next").onclick=()=>{if(idx===qs.length-1)finish();else{idx++;chosen=false;render()}};$("again").onclick=start;$("back").onclick=()=>show("home");$("leader").onclick=()=>show("board");$("boardback").onclick=()=>show("home");stats();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
