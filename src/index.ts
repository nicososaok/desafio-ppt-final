import { state } from "./state";
import { initRouter } from "./router";

import "./components/hand/index";
import "./pages/welcome/index";
import "./pages/instructions/index";
import "./pages/play/index";
import "./pages/results/index";

(function () {
  state.init();
  const rootElement = document.querySelector("#root");

  if(rootElement) {
    initRouter(rootElement);
  } else {
    console.error("No se encontró el elemento #root en el HTML. Revisa tu index.html.");
  }
})();