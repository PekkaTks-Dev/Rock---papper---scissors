let e={data:{currentGame:{myPlay:"",computerPlay:"",result:""},history:{myScore:0,computerScore:0}},listeners:[],init(){let e=localStorage.getItem("rps_history");e&&(this.data.history=JSON.parse(e))},getState(){return this.data},setState(e){for(let t of(this.data=e,localStorage.setItem("rps_history",JSON.stringify(this.data.history)),this.listeners))t(this.data)},subscribe(e){this.listeners.push(e)},setMove(e){let t=["piedra","papel","tijera"][Math.floor(3*Math.random())],a="empate";"piedra"===e&&"tijera"===t||"papel"===e&&"piedra"===t||"tijera"===e&&"papel"===t?a="ganaste":e!==t&&(a="perdiste");let r={...this.data.history};"ganaste"===a&&(r.myScore+=1),"perdiste"===a&&(r.computerScore+=1),this.setState({...this.data,currentGame:{myPlay:e,computerPlay:t,result:a},history:r})}},t=[{path:/^\/welcome$/,component:function(e){let t=document.createElement("section");return t.className="page welcome-page",t.innerHTML=`
    <h1 class="title">Piedra<br>Papel <span>\xf3</span><br>Tijera</h1>
    <button class="btn start-btn">Empezar</button>
    <div class="hands-preview">\u{270C}\u{FE0F} \u{270A} \u{270B}</div>
  `,t.querySelector(".start-btn")?.addEventListener("click",()=>{e("/rules")}),t}},{path:/^\/rules$/,component:function(e){let t=document.createElement("div");return t.className="page rules-page",t.innerHTML=`
    <p class="rules-text">
      Presion\xe1 jugar<br>y eleg\xed: piedra,<br>papel o tijera<br>antes de que<br>pasen los 3<br>segundos.
    </p>
    <button class="btn btn-play">\xa1Jugar!</button>
    <div class="hands-row">
      <div class="hand-icon hand-tijera"></div>
      <div class="hand-icon hand-piedra"></div>
      <div class="hand-icon hand-papel"></div>
    </div>
  `,t.querySelector(".btn-play")?.addEventListener("click",()=>{e("/game")}),t}},{path:/^\/play$/,component:function(t){let a=document.createElement("section");a.className="page play-page",a.innerHTML=`
    <div class="countdown-circle"><span id="timer">3</span></div>
    <div class="hands-picker">
      <button data-play="tijera" class="hand-btn">\u{270C}\u{FE0F}</button>
      <button data-play="piedra" class="hand-btn">\u{270A}</button>
      <button data-play="papel" class="hand-btn">\u{270B}</button>
    </div>
  `;let r=!1,n=3,s=a.querySelector("#timer"),l=setInterval(()=>{--n>0?s.textContent=String(n):(clearInterval(l),r||t("/rules"))},1e3);return a.querySelectorAll(".hand-btn").forEach(a=>{a.addEventListener("click",a=>{r=!0,clearInterval(l);let n=a.currentTarget.dataset.play;e.setMove(n),t("/result")})}),a}},{path:/^\/result$/,component:function(t){let a=e.getState(),{result:r}=a.currentGame,{myScore:n,computerScore:s}=a.history,l=document.createElement("section");return l.className=`page result-page ${r}`,l.innerHTML=`
    <div class="star-badge">
      <h2>${r.toUpperCase()}</h2>
    </div>
    <div class="score-card">
      <h3>Score</h3>
      <p>Vos: ${n}</p>
      <p>M\xe1quina: ${s}</p>
    </div>
    <button class="btn restart-btn">Volver a Jugar</button>
  `,l.querySelector(".restart-btn")?.addEventListener("click",()=>{t("/play")}),l}}];function a(e){window.location.hash=e}e.init();var r=document.querySelector("#root");function n(e){let n=e.replace("#","")||"/welcome",s=!1;for(let e of t)if(e.path.test(n)){s=!0;let t=e.component(a);r.innerHTML="",r.appendChild(t);break}s||a("/welcome")}window.addEventListener("hashchange",()=>{n(window.location.hash)}),n(window.location.hash);
//# sourceMappingURL=ROCK-PAPER-SCISSORS.2e2510f5.js.map
