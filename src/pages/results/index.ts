import { state } from "../../state";
import * as bgVerde from "url:../../assets/Rectangle-verde.svg";
import * as bgRojo from "url:../../assets/Rectangle-rojo.svg";
import * as starVerde from "url:../../assets/star-green.svg";
import * as starRojo from "url:../../assets/star-red.svg";
import * as textGanaste from "url:../../assets/ganaste.svg";
import * as textPerdiste from "url:../../assets/perdiste.svg";

class ResultsPage extends HTMLElement {
  goTo: any;
  connectedCallback() { this.render(); }

  render() {
    const lastGame = state.getState().currentGame;
    const result = state.whoWins(lastGame.myPlay, lastGame.computerPlay);
    const score = state.getScore();
    const isWin = result === "yo";
    const bgImg = isWin ? bgVerde : bgRojo;
    const starImg = isWin ? starVerde : starRojo;
    const textImg = isWin ? textGanaste : textPerdiste;

    this.innerHTML = `
      <section class="results-screen">
        <div class="result-container">
          <img class="star-base" src="${starImg}" />
          <img class="result-text-img" src="${textImg}" />
        </div>
        <div class="score-board">
          <h2 class="score-title">Score</h2>
          <div class="score-info">
            <p>${score.player.nombre} ${score.player.score}</p>
            <p>${score.opponent.nombre} ${score.opponent.score}</p>
          </div>
        </div>

        <button class="return-btn btn-principal">Volver a Jugar</button>
      </section>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .results-screen { height: 100vh; height: 100dvh; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; background-image: url("${bgImg}"); background-size: cover; position: fixed; top: 0; left: 0; padding: 20px; box-sizing: border-box; }
      .result-container { position: relative; display: flex; justify-content: center; align-items: center; width: 250px; height: 250px; }
      .star-base { width: 100%; height: auto; }
      .result-text-img { position: absolute; width: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); }
      .score-board { background: #FFFFFF; border: 8px solid #000000; border-radius: 10px; width: 100%; max-width: 230px; padding: 15px; box-sizing: border-box; }
      .score-title { margin: 0 0 10px 0; font-size: 45px; text-align: center; font-family: 'Odibee Sans', cursive; }
      .score-info { font-size: 30px; text-align: center; font-family: 'Odibee Sans', cursive; }
      .score-info p { margin: 5px 0; }
      .return-btn { width: 100%; max-width: 322px; height: 87px; font-size: 45px; }

      @media (max-width: 768px) {
        .results-screen { justify-content: space-between; padding: 40px 20px 100px 20px; }
        .result-container { width: 200px; height: 200px; margin-top: 20px; }
        .result-text-img { width: 45%; }
        .score-board { max-width: 260px; }
        .score-title { font-size: 35px; }
        .score-info { font-size: 25px; }
        .return-btn { height: 70px; font-size: 35px; }
      }
    `;
    this.appendChild(style);

    this.querySelector(".return-btn")?.addEventListener("click", () => {
      state.restartGame(() => {
        this.goTo("/instructions");
      });
    });
  }
}

customElements.define("results-page", ResultsPage);
export function initResults(params) {
  const page = document.createElement("results-page") as any;
  page.goTo = params.goTo;
  return page;
}