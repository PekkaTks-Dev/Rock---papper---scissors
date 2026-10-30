import { state } from "./state";
import { initRouter } from "./router";

function main() {
  state.init();
  const root = document.querySelector("#root") as HTMLElement;
  initRouter(root);
}

main();