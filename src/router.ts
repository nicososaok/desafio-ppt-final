import { initWelcome } from "./pages/welcome";
import { initInstructions } from "./pages/instructions";
import { initWaiting } from "./pages/waiting";
import { initPlay } from "./pages/play";
import { initResults } from "./pages/results";

const routes = [
  { path: /welcome/, component: initWelcome },
  { path: /instructions/, component: initInstructions },
  { path: /\/waiting/, component: initWaiting },
  { path: /play/, component: initPlay },
  { path: /results/, component: initResults },
];

export function initRouter(container: Element) {
  function goTo(path: string) {
    window.location.hash = path;
  }

  function handleRoute(route: string) {
    console.log("El router recibió la ruta (hash):", route);

    const cleanRoute = route.replace("#", "");
    let matched = false;

    for (const r of routes) {
      if (r.path.test(cleanRoute)) {
        matched = true;
        const el = r.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
        break;
      }
    }

    if (!matched && (cleanRoute === "/" || cleanRoute === "")) {
      goTo("/welcome");
    }
  }

  window.addEventListener("hashchange", () => {
    handleRoute(window.location.hash);
  });

  if (window.location.hash) {
    handleRoute(window.location.hash);
  } else {
    handleRoute("#/welcome");
  }
}