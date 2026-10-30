export function initRulesPage(goTo: (path: string) => void) {
  const div = document.createElement("div");
  div.className = "page rules-page";
  
  div.innerHTML = `
    <p class="rules-text">
      Presioná jugar<br>y elegí: piedra,<br>papel o tijera<br>antes de que<br>pasen los 3<br>segundos.
    </p>
    <button class="btn btn-play">¡Jugar!</button>
    <div class="hands-row">
      <div class="hand-icon hand-tijera"></div>
      <div class="hand-icon hand-piedra"></div>
      <div class="hand-icon hand-papel"></div>
    </div>
  `;

  // Al hacer clic en ¡Jugar!, viaja a la pantalla de la partida
  div.querySelector(".btn-play")?.addEventListener("click", () => {
    goTo("/game");
  });

  return div;
}