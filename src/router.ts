import { initWelcomePage } from "./pages/welcome";
import { initRulesPage } from "./pages/rules";
import { initPlayPage } from "./pages/play";
import { initResultPage } from "./pages/result";

// 1. Definimos las rutas del juego
const routes = [
  { path: /^\/$/, component: initWelcomePage },
  { path: /^\/welcome$/, component: initWelcomePage },
  { path: /^\/rules$/, component: initRulesPage },
  { path: /^\/play$/, component: initPlayPage },
  { path: /^\/result$/, component: initResultPage },
];

export function initRouter(container: Element) {
  function goTo(path: string) {
    location.hash = path;
  }

  function handleRoute(route: string) {
    let cleanRoute = route.replace("#", "");
    if (!cleanRoute || cleanRoute === "/") {
      cleanRoute = "/welcome";
    }

    container.innerHTML = "";

    // 2. Buscamos en el array 'routes' (en plural), no en el string 'route'
    const matched = routes.find((r) => r.path.test(cleanRoute));
    if (matched) {
      const pageElem = matched.component(goTo);
      container.appendChild(pageElem);
    } else {
      goTo("/welcome");
    }
  }

  window.addEventListener("hashchange", () => {
    handleRoute(location.hash);
  });

  if (!location.hash) {
    goTo("/welcome");
  } else {
    handleRoute(location.hash);
  }
}
