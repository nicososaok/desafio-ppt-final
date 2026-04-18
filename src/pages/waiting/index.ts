import { state } from "../../state";

class WaitingPage extends HTMLElement {
  goTo: any;

  connectedCallback() {
    this.render();

    state.subscribe(() => {
      const currentState = state.getState();
      const rtdbData = currentState.rtdbData;
      this.render();

      if (rtdbData) {
        const players = Object.values(rtdbData);
        if (players.length === 2) {
          const p1 = players[0] as any;
          const p2 = players[1] as any;

          if (p1.ready === true && p2.ready === true) {
            if (location.hash === "#/waiting") {
              this.goTo("/play");
            }
          }
        }
      }
    });
  }

  render() {
    const currentState = state.getState();
    const { roomId } = currentState;
    const score = state.getScore() as any;

    this.innerHTML = `
      <header class="header">
        <div class="header__scores">
          <div class="score-line">Jugador N°1: ${score.player.nombre} <span class="score-val">${score.player.score}</span></div>
          <div class="score-line">Jugador N°2: ${score.opponent.nombre} <span class="score-val--blue">${score.opponent.score}</span></div>
        </div>
        <div class="header__room">
          <div class="room-label">Sala</div>
          <div class="room-id">${roomId || "..."}</div>
        </div>
      </header>

      <section class="waiting-screen">
        <div class="waiting-message">
          Esperando a que tu oponente presione ¡Jugar!...
        </div>
        <div class="waiting-hands">
          <my-jugada jugada="piedra"></my-jugada>
          <my-jugada jugada="papel"></my-jugada>
          <my-jugada jugada="tijera"></my-jugada>
        </div>
      </section>
    `;

    const style = document.createElement("style");
    style.textContent = `
      :host { display: block; height: 100vh; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; padding: 15px 25px; font-family: 'Odibee Sans', cursive; font-size: 24px; }
      .score-line { font-weight: 400; }
      .score-val { color: #009048; }
      .score-val--blue { color: #FF0032; }
      .header__room { text-align: right; }
      .room-label { font-weight: bold; }
      .room-id { font-weight: bold; color: #182460; }
      .waiting-screen { height: calc(100vh - 150px); display: flex; flex-direction: column; justify-content: space-between; align-items: center; padding: 60px 20px 0 20px; box-sizing: border-box; text-align: center;}
      .waiting-message { font-family: 'Odibee Sans', cursive; font-size: 35px; color: #000000; max-width: 300px; line-height: 1.1; margin-top: 50px; }
      .waiting-hands { display: flex; justify-content: center; align-items: flex-end; gap: 20px; width: 100%; height: 150px; }
      my-jugada { width: 70px; }
    `;
    this.appendChild(style);
  }
}

customElements.define("waiting-page", WaitingPage);
export function initWaiting(params) {
  const page = document.createElement("waiting-page") as any;
  page.goTo = params.goTo;
  return page;
}