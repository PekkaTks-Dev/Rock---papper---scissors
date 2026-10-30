let e={data:{currentGame:{myPlay:"",computerPlay:"",result:""},history:{myScore:0,computerScore:0}},listeners:[],init(){let e=localStorage.getItem("rps_history");e&&(this.data.history=JSON.parse(e))},getState(){return this.data},setState(e){for(let t of(this.data=e,localStorage.setItem("rps_history",JSON.stringify(this.data.history)),this.listeners))t(this.data)},subscribe(e){this.listeners.push(e)},setMove(e){let t=["piedra","papel","tijera"][Math.floor(3*Math.random())],a="empate";"piedra"===e&&"tijera"===t||"papel"===e&&"piedra"===t||"tijera"===e&&"papel"===t?a="ganaste":e!==t&&(a="perdiste");let n={...this.data.history};"ganaste"===a&&(n.myScore+=1),"perdiste"===a&&(n.computerScore+=1),this.setState({...this.data,currentGame:{myPlay:e,computerPlay:t,result:a},history:n})}};function t(e){let t=document.createElement("section");return t.className="page welcome-page",t.innerHTML=`
    <h1 class="title">Piedra<br>Papel <span>\xf3</span><br>Tijera</h1>
    <button class="btn start-btn">Empezar</button>
    <div class="hands-preview">\u{270C}\u{FE0F} \u{270A} \u{270B}</div>
  `,t.querySelector(".start-btn")?.addEventListener("click",()=>{e("/rules")}),t}let a=[{path:/^\/$/,component:t},{path:/^\/welcome$/,component:t},{path:/^\/rules$/,component:function(e){let t=document.createElement("div");return t.className="page rules-page",t.innerHTML=`
    <p class="rules-text">
      Presion\xe1 jugar<br>y eleg\xed: piedra,<br>papel o tijera<br>antes de que<br>pasen los 3<br>segundos.
    </p>
    <button class="btn btn-play">\xa1Jugar!</button>
    <div class="hands-row">
      <div class="hand-icon hand-tijera"></div>
      <div class="hand-icon hand-piedra"></div>
      <div class="hand-icon hand-papel"></div>
    </div>
  `,t.querySelector(".btn-play")?.addEventListener("click",()=>{e("/play")}),t}},{path:/^\/play$/,component:function(t){let a=document.createElement("section");a.className="page play-page",a.innerHTML=`
    <style>
      .play-page {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
        box-sizing: border-box;
        padding-top: 50px;
      }
      .countdown-circle {
        font-size: 80px;
        font-weight: bold;
      }
      .hands-picker {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 30px;
        width: 100%;
        margin-bottom: 20px;
      }
      .hand-btn {
        background: transparent;
        border: none;
        font-size: 100px; /* <--- AC\xc1 EL TAMA\xd1O: 100px las deja bien grandes */
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: transform 0.2s ease;
      }
      .hand-btn:hover {
        transform: translateY(-20px) scale(1.15);
      }
    </style>
    <div class="countdown-circle"><span id="timer">3</span></div>
    <div class="hands-picker">
      <button data-play="tijera" class="hand-btn">\u{270C}\u{FE0F}</button>
      <button data-play="piedra" class="hand-btn">\u{270A}</button>
      <button data-play="papel" class="hand-btn">\u{270B}</button>
    </div>
  `;let n=!1,r=3,s=a.querySelector("#timer"),i=setInterval(()=>{--r>0?s.textContent=String(r):(clearInterval(i),n||t("/rules"))},1e3);return a.querySelectorAll(".hand-btn").forEach(a=>{a.addEventListener("click",a=>{n=!0,clearInterval(i);let r=a.currentTarget.dataset.play;e.setMove(r),t("/result")})}),a}},{path:/^\/result$/,component:function(t){let a=e.getState(),{result:n}=a.currentGame,{myScore:r,computerScore:s}=a.history,i=document.createElement("section");return i.className=`page result-page ${n}`,i.innerHTML=`
    <div class="star-badge">
      <h2>${n.toUpperCase()}</h2>
    </div>
    <div class="score-card">
      <h3>Score</h3>
      <p>Vos: ${r}</p>
      <p>M\xe1quina: ${s}</p>
    </div>
    <button class="btn restart-btn">Volver a Jugar</button>
  `,i.querySelector(".restart-btn")?.addEventListener("click",()=>{t("/play")}),i}}];e.init();var n=document.querySelector("#root");function r(e){location.hash=e}function s(e){let t=e.replace("#","");t&&"/"!==t||(t="/welcome"),n.innerHTML="";let s=a.find(e=>e.path.test(t));if(s){let e=s.component(r);n.appendChild(e)}else r("/welcome")}window.addEventListener("hashchange",()=>{s(location.hash)}),location.hash?s(location.hash):r("/welcome");
//# sourceMappingURL=ROCK-PAPER-SCISSORS.68a82289.js.map
