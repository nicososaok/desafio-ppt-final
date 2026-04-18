import { state } from "../../state";
import * as titleImgURL from "url:../../assets/Piedra-papel-tijera-green.png";

class WelcomePage extends HTMLElement {
  goTo: any;

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <main class="welcome-screen">
        <img src="${titleImgURL}" class="welcome-title-img" />

        <div class="form-container">
            <input class="input-element input-name" type="text" placeholder="Tu nombre" />
            <select class="input-element select-room">
                <option value="new">Nuevo Juego</option>
                <option value="join">Ingresar a una sala</option>
            </select>

            <input class="input-element input-room-id" type="text" placeholder="código" style="display: none;" />

            <button class="start-button btn-principal">Empezar</button>
        </div>

        <div class="welcome-hands">
          <my-jugada jugada="piedra"></my-jugada>
          <my-jugada jugada="papel"></my-jugada>
          <my-jugada jugada="tijera"></my-jugada>
        </div>
      </main>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .welcome-screen { height: 100vh; display: flex; flex-direction: column; justify-content: space-between; align-items: center; padding: 40px 20px 0 20px; box-sizing: border-box; }
      .welcome-title-img { width: 100%; max-width: 300px; }
      .form-container { display: flex; flex-direction: column; gap: 15px; width: 100%; max-width: 322px; }
      .input-element { 
        width: 100%; height: 55px; border: 4px solid #182460; border-radius: 10px; 
        font-family: 'Odibee Sans', cursive; font-size: 24px; text-align: center; 
      }
      .start-button { height: 80px; font-size: 35px; cursor: pointer; }
      .welcome-hands { display: flex; justify-content: center; align-items: flex-end; gap: 20px; }
    `;
    this.appendChild(style);

    this.addEventListeners();
  }

  addEventListeners() {
    const selectEl = this.querySelector(".select-room") as HTMLSelectElement;
    const inputRoomEl = this.querySelector(".input-room-id") as HTMLInputElement;
    const inputNameEl = this.querySelector(".input-name") as HTMLInputElement;
    const btnEl = this.querySelector(".start-button");

    selectEl.addEventListener("change", () => {
      inputRoomEl.style.display = selectEl.value === "join" ? "block" : "none";
    });

    btnEl?.addEventListener("click", () => {
      const nombre = inputNameEl.value;
      const mode = selectEl.value;

      if (!nombre) return alert("¡Necesitamos tu nombre!");

      state.setNombre(nombre);

      state.signIn(() => {
        if (mode === "new") {
          // Creamos sala nueva
          state.askNewRoom(() => this.goTo("/instructions"));
        } else {
          // Nos unimos a una existente
          const roomId = inputRoomEl.value;
          if (!roomId) return alert("Poné el código de 4 dígitos");
          state.setRoomId(roomId);
          state.accessRoom(() => this.goTo("/instructions"));
        }
      });
    });
  }
}

customElements.define("welcome-page", WelcomePage);

export function initWelcome(params) {
  const page = document.createElement("welcome-page") as any;
  page.goTo = params.goTo;
  return page;
}