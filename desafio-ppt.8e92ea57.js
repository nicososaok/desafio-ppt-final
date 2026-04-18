let e={data:{currentGame:{computerPlay:"",myPlay:""},history:[]},listeners:[],getState(){return this.data},setState(e){for(let t of(this.data=e,this.listeners))t();localStorage.setItem("ppt-history",JSON.stringify(this.data.history))},subscribe(e){this.listeners.push(e)},init(){let e=localStorage.getItem("ppt-history");if(e&&"undefined"!==e)try{let t=JSON.parse(e),a=this.getState();this.setState({...a,history:t})}catch(e){console.error("Error recuperando localStorage",e)}},setMove(e){let t=this.getState();t.currentGame.myPlay=e,this.data=t},pushToHistory(){let e=this.getState(),t=e.currentGame.myPlay,a=["piedra","papel","tijera"][Math.floor(3*Math.random())];e.currentGame.computerPlay=a;let n=this.whoWins(t,a),i=[...e.history||[],{myPlay:t,computerPlay:a,winner:n}];this.setState({...e,history:i})},whoWins:(e,t)=>e===t?"empate":"tijera"===e&&"papel"===t||"piedra"===e&&"tijera"===t||"papel"===e&&"piedra"===t?"yo":"computadora",getScore(){let e=this.getState(),t=0,a=0;return(e.history||[]).forEach(e=>{"yo"===e.winner&&t++,"computadora"===e.winner&&a++}),{yo:t,computadora:a}}};e.init();var t={};t=import.meta.resolve("Ujjrq");class a extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
      <main class="welcome-screen">
        <img src="${t}" class="welcome-title-img" />

        <button class="start-button btn-principal">Empezar</button>

        <div class="welcome-hands">
          <my-jugada jugada="piedra"></my-jugada>
          <my-jugada jugada="papel"></my-jugada>
          <my-jugada jugada="tijera"></my-jugada>
        </div>
      </main>
    `;let e=document.createElement("style");e.textContent=`
      .welcome-screen {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-top: 60px;
        padding: 60px 0 0 0; /* Padding superior para el t\xedtulo */
        box-sizing: border-box;
      }
      .welcome-title-img {
        width: 284px;
        height: auto;
      }
      .start-button {
        width: 100%;
        max-width: 322px;
        height: 87px;
        /* El margen autom\xe1tico lo empuja al centro del espacio disponible */
        margin-top: 20px;
      }
      .welcome-hands {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 30px;
        width: 100%;
        overflow: hidden; /* Evita scroll si las manos son grandes */
        height: 234px; /* Altura fija para que la base sea igual siempre */
      }
      my-jugada {
        width: 80px;
      }
    `,this.appendChild(e),this.querySelector(".start-button")?.addEventListener("click",()=>{this.goTo("/instructions")})}}customElements.define("welcome-page",a);var n={};n=import.meta.resolve("48RSy");class i extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
      <section class="instructions-screen">
        <div class="instructions-image-container">
          <img src="${n}" class="instructions-img" alt="Instrucciones">
        </div>

        <button class="start-game-btn btn-principal">\xa1Jugar!</button>

        <div class="instructions-hands">
          <my-jugada jugada="piedra"></my-jugada>
          <my-jugada jugada="papel"></my-jugada>
          <my-jugada jugada="tijera"></my-jugada>
        </div>
      </section>
    `;let e=document.createElement("style");e.textContent=`
      .instructions-screen {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 60px 0 0 0;
        box-sizing: border-box;
      }
      .instructions-image-container {
        width: 320px;
        height: auto;
      }
      .instructions-img {
        width: 100%;
        height: auto;
      }
      .start-game-btn {
        width: 322px;
        height: 87px;
        margin-top: 20px;
      }
      .instructions-hands {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 30px;
        width: 100%;
        height: 234px;
      }
      my-jugada {
        width: 80px;
      }

      /* --- RESPONSIVE MOBILE --- */
      @media (max-width: 768px) {
        .instructions-screen {
          padding: 40px 0 0 0;
        }
        .instructions-image-container {
          width: 280px;
        }
        .start-game-btn {
          width: 80%;
          height: 70px;
          font-size: 1.5rem;
        }
        .instructions-hands {
          gap: 15px;
          height: auto;
        }
        my-jugada {
          transform: scale(0.8);
          transform-origin: bottom;
        }
      }
    `,this.appendChild(e),this.querySelector(".start-game-btn")?.addEventListener("click",()=>{this.goTo("/play")})}}customElements.define("instructions-page",i);class s extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
      <section class="play-container">
        <div class="countdown-wrapper">
          <svg class="timer-svg" viewBox="0 0 100 100">
            <circle class="timer-circle-bg" cx="50" cy="50" r="45"></circle>
            <circle class="timer-circle-path" cx="50" cy="50" r="45"></circle>
          </svg>
          <div class="number">3</div>
        </div>

        <div class="play__hands">
          <my-jugada class="hand-btn" jugada="piedra"></my-jugada>
          <my-jugada class="hand-btn" jugada="papel"></my-jugada>
          <my-jugada class="hand-btn" jugada="tijera"></my-jugada>
        </div>
      </section>
    `;let e=document.createElement("style");e.textContent=`
      .play-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-top: 150px;
        box-sizing: border-box;
      }
      .countdown-wrapper {
        position: relative;
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .timer-svg {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }
      .timer-circle-bg {
        fill: none;
        stroke: rgba(0, 0, 0, 0.1);
        stroke-width: 8;
      }
      .timer-circle-path {
        fill: none;
        stroke: #000;
        stroke-width: 8;
        stroke-linecap: round;
        stroke-dasharray: 283;
        stroke-dashoffset: 0;
        animation: countdown-animation 3s linear forwards;
      }
      @keyframes countdown-animation {
      from { stroke-dashoffset: 0;
      } to { stroke-dashoffset: 283; } }
      .number {
        font-size: 80px;
        font-weight: bold;
      }
      .play__hands {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 30px;
        width: 100%;
        height: 234px;
      }

      /* Clases para la animaci\xf3n del duelo */
      .showdown-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center; overflow: hidden;
      }
      .pc-hand {
        transform: rotate(180deg);
        animation: slideDown 0.5s ease-out;
      }
      .my-hand {
      animation: slideUp 0.5s ease-out;
      }
      @keyframes slideDown {
        from { transform: translateY(-100px) rotate(180deg);
      } to { transform: translateY(0) rotate(180deg); } }
      @keyframes slideUp { from { transform: translateY(100px); } to { transform: translateY(0); } }

      /* --- RESPONSIVE MOBILE --- */
      @media (max-width: 768px) {
        .play-container {
          padding-top: 80px;
          justify-content: space-between;
        }
        .countdown-wrapper {
          width: 150px;
          height: 150px;
        }
        .number {
          font-size: 60px;
        }
        .play__hands {
          gap: 15px;
          height: auto;
        }
        .hand-btn {
          transform: scale(0.85);
          transform-origin: bottom;
        }
      }
    `,this.appendChild(e),this.startCountdown()}startCountdown(){let t=this.querySelector(".number"),a=3,n=!1;this.querySelectorAll(".hand-btn").forEach(t=>{t.addEventListener("click",()=>{let a=t.getAttribute("jugada");e.setMove(a),n=!0,this.querySelectorAll(".hand-btn").forEach(e=>{e!==t?e.style.filter="grayscale(1) opacity(0.4)":(e.style.filter="none",e.style.transform="translateY(-30px)")})})});let i=setInterval(()=>{if(a--,t&&(t.textContent=a.toString()),a<=0)if(clearInterval(i),n){e.pushToHistory();let t=e.getState(),a=t.currentGame.myPlay,n=t.currentGame.computerPlay;this.showConfrontation(a,n)}else this.goTo("/instructions")},1e3)}showConfrontation(e,t){this.innerHTML=`
      <section class="duel-screen">
        <my-jugada class="hand-pc" jugada="${t}"></my-jugada>
        <my-jugada class="hand-user" jugada="${e}"></my-jugada>
      </section>
    `;let a=document.createElement("style");a.textContent=`
      .duel-screen {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
      }
      .hand-pc {
        transform: rotate(180deg);
        width: 150px;
      }
      .hand-user {
        width: 150px;
      }
      my-jugada {
        display: block;
        width: 150px;
        height: 300px;
      }

       /* --- RESPONSIVE DUELO MOBILE --- */
      @media (max-width: 768px) {
        .hand-pc { width: 120px; }
        .hand-user { width: 120px; }
        my-jugada {
          width: 120px;
          height: 240px;
        }
      }
    `,this.appendChild(a),setTimeout(()=>{this.goTo("/results")},2500)}}customElements.define("play-page",s);var o={};o=import.meta.resolve("lpCOD");var r={};r=import.meta.resolve("78Fzp");var l={};l=import.meta.resolve("bO0WC");var d={};d=import.meta.resolve("iSRbA");var c={};c=import.meta.resolve("aV8qR");var p={};p=import.meta.resolve("kOwh6");class h extends HTMLElement{connectedCallback(){this.render()}render(){let t=e.getState().currentGame,a=e.whoWins(t.myPlay,t.computerPlay),n=e.getScore(),i="yo"===a,s=i?o:r,h=i?l:d,m=i?c:p;this.innerHTML=`
      <section class="results-screen">
        <div class="result-container">
          <img class="star-base" src="${h}" />
          <img class="result-text-img" src="${m}" />
        </div>

        <div class="score-board">
          <h2 class="score-title">Score</h2>
          <div class="score-info">
            <p>Vos: ${n.yo}</p>
            <p>M\xe1quina: ${n.computadora}</p>
          </div>
        </div>

        <button class="return-btn btn-principal">Volver a Jugar</button>
      </section>
    `;let u=document.createElement("style");u.textContent=`
      .results-screen {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        background-image: url("${s}");
        background-size: cover;
        background-position: center;
        position: fixed;
        top: 0;
        left: 0;
        padding: 20px;
        box-sizing: border-box;
      }

      .result-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 260px;
        height: 260px;
      }

      .star-base { width: 100%; height: auto; }

      .result-text-img {
        position: absolute;
        width: 60%;
        top: 50%;
        transform: translateY(-50%);
      }

      .score-board {
        background: #FFFFFF;
        border: 10px solid #000000;
        border-radius: 10px;
        width: 260px;
        padding: 20px;
        box-sizing: border-box;
      }

      .score-title { margin: 0 0 10px 0; font-size: 55px; text-align: center; }
      .score-info { font-size: 45px; text-align: right; }
      .score-info p { margin: 5px 0; }

      .return-btn { width: 322px; height: 87px; }

      /* --- RESPONSIVE MOBILE --- */
      @media (max-width: 768px) {
        .results-screen {
          justify-content: space-around;
        }
        .result-container {
          width: 200px;
          height: 200px;
        }
        .score-board {
          width: 220px;
          padding: 15px;
        }
        .score-title { font-size: 45px; }
        .score-info { font-size: 35px; }
        .return-btn {
          width: 80%;
          height: 70px;
          font-size: 1.5rem;
        }
      }
    `,this.appendChild(u),this.querySelector(".return-btn")?.addEventListener("click",()=>{this.goTo("/instructions")})}}customElements.define("results-page",h);let m=[{path:/welcome/,component:function(e){let t=document.createElement("welcome-page");return t.goTo=e.goTo,t}},{path:/instructions/,component:function(e){let t=document.createElement("instructions-page");return t.goTo=e.goTo,t}},{path:/play/,component:function(e){let t=document.createElement("play-page");return t.goTo=e.goTo,t}},{path:/results/,component:function(e){let t=document.createElement("results-page");return t.goTo=e.goTo,t}}];var u={};u=import.meta.resolve("9OT4u");var g={};g=import.meta.resolve("bsbj2");var x={};x=import.meta.resolve("iratE");class y extends HTMLElement{connectedCallback(){this.render()}render(){let e=this.getAttribute("jugada")||"piedra",t={piedra:u,papel:g,tijera:x};this.innerHTML=`
      <div class="hand-container">
        <img src="${t[e]}" class="hand-img" />
      </div>
    `;let a=document.createElement("style");a.textContent=`
      :host {
        display: inline-block;
        width: 104px;   /* Medida exacta pedida */
        height: 234px;  /* Medida exacta pedida */
      }
      .hand-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end; /* Alinea la mano al fondo del contenedor */
      }
      .hand-img {
        width: 100%;
        height: auto;
        display: block;
        filter: none; /* Aseguramos que por defecto no tengan gris */
      }
    `,this.appendChild(a)}}customElements.define("my-jugada",y),e.init();let f=document.querySelector("#root");if(f){function w(e){window.location.hash=e}function b(e){console.log("El router recibió la ruta (hash):",e);let t=e.replace("#",""),a=!1;for(let e of m)if(e.path.test(t)){a=!0;let t=e.component({goTo:w});f.firstChild&&f.firstChild.remove(),f.appendChild(t);break}a||"/"!==t&&""!==t||w("/welcome")}window.addEventListener("hashchange",()=>{b(window.location.hash)}),window.location.hash?b(window.location.hash):b("#/welcome")}else console.error("No se encontró el elemento #root en el HTML. Revisa tu index.html.");
//# sourceMappingURL=desafio-ppt.8e92ea57.js.map
