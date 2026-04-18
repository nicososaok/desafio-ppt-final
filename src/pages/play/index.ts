import { state } from "../../state";

class PlayPage extends HTMLElement {
  goTo: any;

  connectedCallback() { this.render(); }

  render() {
    this.innerHTML = `
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
    `;

    const style = document.createElement("style");
    style.textContent = `
      .play-container {
        height: 100vh; display: flex; flex-direction: column;
        justify-content: space-between; align-items: center; padding-top: 160px;
      }
      .spacer { height: 100px; }
      .countdown-wrapper {
        position: relative; width: 250px; height: 250px;
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
      .hand-btn { width: 80px; cursor: pointer; transition: all 0.2s; }
      @media (max-width: 768px) {
        .countdown-wrapper { width: 200px; height: 200px; }
        .number { font-size: 60px; }
        .hand-btn { width: 75px; }
        .spacer { height: 60px; }
      }
    `;
    this.appendChild(style);
    this.startCountdown();
  }

  startCountdown() {
    const numberEl = this.querySelector(".number") as HTMLElement;
    let counter = 3;
    let userHasPlayed = false;
    let yaProcese = false;

    const verificarYProcesar = () => {
      if (yaProcese) return;
      const data = state.getState().rtdbData;
      const ids = Object.keys(data);
      const listos = ids.length === 2 && ids.every(id => data[id].choice && data[id].choice !== "");

      if (listos) {
        yaProcese = true;
        state.pushToHistory();
        const { myPlay, computerPlay } = state.getState().currentGame;
        if (this.isConnected) {
          this.showConfrontation(myPlay, computerPlay);
        }
      }
    };

    state.subscribe(() => { verificarYProcesar(); });

    this.querySelectorAll(".hand-btn").forEach((hand: any) => {
      hand.addEventListener("click", () => {
        if (userHasPlayed) return;
        const move = hand.getAttribute("jugada");
        state.setMove(move);
        userHasPlayed = true;
        this.querySelectorAll(".hand-btn").forEach((h: any) => {
          if (h !== hand) h.style.filter = "grayscale(1) opacity(0.4)";
          else { h.style.filter = "none"; h.style.transform = "translateY(-20px)"; }
        });
        if (counter <= 0) {
          if (numberEl) numberEl.innerHTML = "<span style='font-size:20px'>ESPERANDO...</span>";
          verificarYProcesar();
        }
      });
    });

    const intervalId = setInterval(() => {
      counter--;
      if (numberEl) numberEl.textContent = counter.toString();
      if (counter <= 0) {
        clearInterval(intervalId);
        if (!userHasPlayed) {
          if (numberEl) numberEl.innerHTML = "<span style='font-size:30px'>¡ELEGÍ!</span>";
        } else {
          if (numberEl) numberEl.innerHTML = "<span style='font-size:20px'>ESPERANDO...</span>";
          verificarYProcesar();
        }
      }
    }, 1000);
  }

  showConfrontation(myPlay: string, pcPlay: string) {
    this.innerHTML = `
      <section class="duel-screen">
        <my-jugada class="hand-pc" jugada="${pcPlay}"></my-jugada>
        <my-jugada class="hand-user" jugada="${myPlay}"></my-jugada>
      </section>
    `;
    const style = document.createElement("style");
    style.textContent = `
      .duel-screen {
        height: 100dvh; display: flex; flex-direction: column;
        justify-content: space-between; align-items: center; padding-bottom: 20px;
      }
      .hand-pc { transform: rotate(180deg); width: 150px; }
      .hand-user { width: 150px; }
      @media (max-width: 768px) { .hand-pc, .hand-user { width: 130px; } }
    `;
    this.appendChild(style);
    setTimeout(() => this.goTo("/results"), 2000);
  }
}

customElements.define("play-page", PlayPage);
export function initPlay(params) {
  const page = document.createElement("play-page") as any;
  page.goTo = params.goTo;
  return page;
}