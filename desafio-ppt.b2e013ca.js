let e={data:{currentGame:{computerPlay:"",myPlay:""},history:[]},listeners:[],getState(){return this.data},setState(e){for(let t of(this.data=e,this.listeners))t();localStorage.setItem("ppt-history",JSON.stringify(this.data.history))},subscribe(e){this.listeners.push(e)},init(){let e=localStorage.getItem("ppt-history");if(e&&"undefined"!==e)try{let t=JSON.parse(e),a=this.getState();this.setState({...a,history:t})}catch(e){console.error("Error recuperando localStorage",e)}},setMove(e){let t=this.getState();t.currentGame.myPlay=e,this.data=t},pushToHistory(){let e=this.getState(),t=e.currentGame.myPlay,a=["piedra","papel","tijera"][Math.floor(3*Math.random())];e.currentGame.computerPlay=a;let i=this.whoWins(t,a),n=[...e.history||[],{myPlay:t,computerPlay:a,winner:i}];this.setState({...e,history:n})},whoWins:(e,t)=>e===t?"empate":"tijera"===e&&"papel"===t||"piedra"===e&&"tijera"===t||"papel"===e&&"piedra"===t?"yo":"computadora",getScore(){let e=this.getState(),t=0,a=0;return(e.history||[]).forEach(e=>{"yo"===e.winner&&t++,"computadora"===e.winner&&a++}),{yo:t,computadora:a}}};e.init();var t={};t=import.meta.resolve("Ujjrq");class a extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
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
        height: 100dvh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 50px 20px 0 20px; 
        box-sizing: border-box;
        overflow: hidden; /* Evita scroll */
      }
      .welcome-title-img {
        width: 100%;
        max-width: 300px;
        height: auto;
      }
      .start-button {
        width: 100%;
        max-width: 322px;
        height: 87px;
        font-size: 45px;
      }
      .welcome-hands {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 30px;
        width: 100%;
        /* Eliminamos el alto fijo que rompe todo */
        height: auto;
      }
      my-jugada {
        width: 80px;
      }

      @media (max-width: 768px) {
        .welcome-screen {
          padding-top: 40px;
        }
        .welcome-title-img {
          max-width: 260px;
        }
        .start-button {
          height: 75px;
          font-size: 35px;
        }
        .welcome-hands {
          gap: 15px;
          /* Le damos un margen peque\xf1o abajo para que no las tape Brave */
          margin-bottom: -10px;
        }
        my-jugada {
          width: 70px; /* Un pel\xedn m\xe1s chicas para que entren bien */
        }
      }
    `,this.appendChild(e),this.querySelector(".start-button")?.addEventListener("click",()=>{this.goTo("/instructions")})}}customElements.define("welcome-page",a);var i={};i=import.meta.resolve("48RSy");class n extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
      <section class="instructions-screen">
        <div class="instructions-image-container">
          <img src="${i}" class="instructions-img" alt="Instrucciones">
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
        height: 100vh; display: flex; flex-direction: column;
        justify-content: space-between; align-items: center;
        padding: 40px 20px 0 20px; box-sizing: border-box;
      }
      .instructions-image-container { width: 100%; max-width: 300px; }
      .instructions-img { width: 100%; height: auto; }
      .start-game-btn { width: 100%; max-width: 322px; height: 80px; font-size: 30px; }
      .instructions-hands {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 20px;
        width: 100%;
        height: 150px;
      }
      my-jugada { width: 70px; }

      /* --- ESCUDO ANTI-BARRA PARA M\xd3VIL --- */
      @media (max-width: 768px) {
        .instructions-screen {
          height: 100dvh;
          padding: 30px 20px 20px 20px; /* 100px de padding abajo */
        }
        .instructions-image-container { max-width: 250px; }
        .start-game-btn { height: 70px; }
      }
    `,this.appendChild(e),this.querySelector(".start-game-btn")?.addEventListener("click",()=>this.goTo("/play"))}}customElements.define("instructions-page",n);class s extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
      <section class="play-container">
        <div class="spacer"></div> <div class="countdown-wrapper">
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
        height: 100dvh;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        justify-content: space-between; /* Empuja elementos a los extremos */
        align-items: center;
        padding: 20px 0 20px 0;
        padding-top: 160px;
      }
      .spacer { height: 100px; } /* Mismo alto que el padding inferior para centrar perfecto el reloj */

      .countdown-wrapper {
        position: relative;
        width: 250px; height: 250px;
        display: flex; justify-content: center; align-items: center;
      }
      .timer-svg { position: absolute; width: 100%; height: 100%; transform: rotate(-90deg); }
      .timer-circle-bg { fill: none; stroke: rgba(0, 0, 0, 0.1); stroke-width: 8; }
      .timer-circle-path {
        fill: none; stroke: #000; stroke-width: 8; stroke-linecap: round;
        stroke-dasharray: 283; stroke-dashoffset: 0;
        animation: countdown-animation 3s linear forwards;
      }
      @keyframes countdown-animation { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 283; } }
      .number { font-size: 80px; font-weight: bold; font-family: 'Odibee Sans', cursive; }

      .play__hands {
        display: flex; justify-content: center; align-items: flex-end;
        gap: 20px; width: 100%;
      }
      .hand-btn { width: 80px; cursor: pointer; }

      @media (max-width: 768px) {
        .countdown-wrapper { width: 200px; height: 200px; }
        .number { font-size: 60px; }
        .hand-btn { width: 75px; }
        .spacer { height: 60px; } /* Ajuste fino para m\xf3vil */
      }
    `,this.appendChild(e),this.startCountdown()}startCountdown(){let t=this.querySelector(".number"),a=3,i=!1;this.querySelectorAll(".hand-btn").forEach(t=>{t.addEventListener("click",()=>{let a=t.getAttribute("jugada");e.setMove(a),i=!0,this.querySelectorAll(".hand-btn").forEach(e=>{e!==t?e.style.filter="grayscale(1) opacity(0.4)":(e.style.filter="none",e.style.transform="translateY(-20px)")})})});let n=setInterval(()=>{if(a--,t&&(t.textContent=a.toString()),a<=0)if(clearInterval(n),i){e.pushToHistory();let{myPlay:t,computerPlay:a}=e.getState().currentGame;this.showConfrontation(t,a)}else this.goTo("/instructions")},1e3)}showConfrontation(e,t){this.innerHTML=`
      <section class="duel-screen">
        <my-jugada class="hand-pc" jugada="${t}"></my-jugada>
        <my-jugada class="hand-user" jugada="${e}"></my-jugada>
      </section>
    `;let a=document.createElement("style");a.textContent=`
      .duel-screen {
        height: 100dvh; display: flex; flex-direction: column;
        justify-content: space-between; align-items: center;
        padding-bottom: 20px; /* Despegar del borde inferior */
      }
      .hand-pc { transform: rotate(180deg); width: 150px; }
      .hand-user { width: 150px; }
      @media (max-width: 768px) { .hand-pc, .hand-user { width: 130px; } }
    `,this.appendChild(a),setTimeout(()=>this.goTo("/results"),2e3)}}customElements.define("play-page",s);var o={};o=import.meta.resolve("lpCOD");var r={};r=import.meta.resolve("78Fzp");var l={};l=import.meta.resolve("bO0WC");var d={};d=import.meta.resolve("iSRbA");var c={};c=import.meta.resolve("aV8qR");var p={};p=import.meta.resolve("kOwh6");class h extends HTMLElement{connectedCallback(){this.render()}render(){let t=e.getState().currentGame,a=e.whoWins(t.myPlay,t.computerPlay),i=e.getScore(),n="yo"===a,s=n?o:r,h=n?l:d,m=n?c:p;this.innerHTML=`
      <section class="results-screen">
        <div class="result-container">
          <img class="star-base" src="${h}" />
          <img class="result-text-img" src="${m}" />
        </div>
        
        <div class="score-board">
          <h2 class="score-title">Score</h2>
          <div class="score-info">
            <p>Vos: ${i.yo}</p>
            <p>M\xe1quina: ${i.computadora}</p>
          </div>
        </div>

        <button class="return-btn btn-principal">Volver a Jugar</button>
      </section>
    `;let u=document.createElement("style");u.textContent=`
      .results-screen {
        height: 100vh;
        height: 100dvh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        background-image: url("${s}");
        background-size: cover;
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
        width: 250px;
        height: 250px;
      }

      .star-base {
        width: 100%;
        height: auto;
      }

      .result-text-img {
        position: absolute;
        width: 50%; /* Tama\xf1o equilibrado para desktop */
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .score-board {
        background: #FFFFFF;
        border: 8px solid #000000;
        border-radius: 10px;
        width: 100%;
        max-width: 230px;
        padding: 15px;
        box-sizing: border-box;
      }

      .score-title {
        margin: 0 0 10px 0;
        font-size: 45px;
        text-align: center;
        font-family: 'Odibee Sans', cursive;
      }

      .score-info {
        font-size: 30px;
        text-align: right;
        font-family: 'Odibee Sans', cursive;
      }

      .score-info p {
        margin: 5px 0;
      }

      .return-btn {
        width: 100%;
        max-width: 322px;
        height: 87px;
        font-size: 45px;
      }

      /* --- AJUSTES PARA M\xd3VIL (S23+ / Brave) --- */
      @media (max-width: 768px) {
        .results-screen {
          /* Eliminamos el error de width: 200px que ten\xedas */
          justify-content: space-between;
          padding: 40px 20px 100px 20px; /* Colch\xf3n para la barra del navegador */
        }

        .result-container {
          width: 200px;
          height: 200px;
          margin-top: 20px;
        }

        .result-text-img {
          width: 45%; /* M\xe1s chico para que no toque las puntas de la estrella */
        }

        .score-board {
          max-width: 260px;
        }

        .score-title {
          font-size: 35px;
        }

        .score-info {
          font-size: 25px;
        }

        .return-btn {
          height: 70px;
          font-size: 35px;
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
//# sourceMappingURL=desafio-ppt.b2e013ca.js.map
