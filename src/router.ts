import { initWelcomePage } from "./pages/welcome";
import { initRulesPage } from "./pages/rules";
import { initPlayPage } from "./pages/play";
import { initResultPage } from "./pages/result";

const routes = [
  { path: /^\/welcome$/, component: initWelcomePage },
  { path: /^\/rules$/, component: initRulesPage },
  { path: /^\/play$/, component: initPlayPage },
  { path: /^\/result$/, component: initResultPage }
];

export function goTo(path: string) {
  window.location.hash = path;
}

export function initRouter(container: HTMLElement) {
  function handleRoute(route: string) {
    const cleanRoute = route.replace("#", "") || "/welcome";
    let matched = false;

    for (const r of routes) {
      if (r.path.test(cleanRoute)) {
        matched = true;
        const pageEl = r.component(goTo);
        container.innerHTML = "";
        container.appendChild(pageEl);
        break;
      }
    }

    if (!matched) {
      goTo("/welcome");
    }
  }

  window.addEventListener("hashchange", () => {
    handleRoute(window.location.hash);
  });

  handleRoute(window.location.hash);
}