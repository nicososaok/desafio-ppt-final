import { state } from "../../state";

class InstructionsPage extends HTMLElement {
  goTo: any;

  connectedCallback() {
    this.render();
    state.subscribe(() => {
      this.render();
    });
  }

  render() {
    const score = state.getScore() as any;
    const { roomId } = state.getState();

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

      <section class="instructions">
        <p class="instructions__text">
          Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
        </p>
        <button class="start-btn btn-principal">¡Jugar!</button>
        <div class="instructions__hands">
          <my-jugada jugada="piedra"></my-jugada>
          <my-jugada jugada="papel"></my-jugada>
          <my-jugada jugada="tijera"></my-jugada>
        </div>
      </section>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .header { display: flex; justify-content: space-between; padding: 15px 25px; font-family: 'Odibee Sans', cursive; font-size: 24px; }
      .score-val { color: #009048; }
      .score-val--blue { color: #FF0032; }
      .header__room { text-align: right; }
      .room-id { color: #182460; font-weight: bold; }
      .instructions { height: calc(100vh - 150px); display: flex; flex-direction: column; justify-content: space-between; align-items: center; padding: 20px; box-sizing: border-box; }
      .instructions__text { font-family: 'Odibee Sans', cursive; font-size: 35px; text-align: center; max-width: 300px; line-height: 1.1; margin-top: 40px; }
      .start-btn { width: 100%; max-width: 322px; height: 87px; font-size: 45px; cursor: pointer; }
      .instructions__hands { display: flex; justify-content: center; align-items: flex-end; gap: 20px; width: 100%; height: 150px; }
      my-jugada { width: 70px; }
    `;
    this.appendChild(style);

    this.querySelector(".start-btn")?.addEventListener("click", () => {
      state.setReady(true);
      this.goTo("/waiting");
    });
  }
}

customElements.define("instructions-page", InstructionsPage);
export function initInstructions(params) {
  const page = document.createElement("instructions-page") as any;
  page.goTo = params.goTo;
  return page;
}