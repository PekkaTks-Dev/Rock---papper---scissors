import { state } from "../state";

export function initResultPage(goTo: (path: string) => void): HTMLElement {
  const currentState = state.getState();
  const { result } = currentState.currentGame;
  const { myScore, computerScore } = currentState.history;

  const section = document.createElement("section");
  section.className = `page result-page ${result}`;
  section.innerHTML = `
    <div class="star-badge">
      <h2>${result.toUpperCase()}</h2>
    </div>
    <div class="score-card">
      <h3>Score</h3>
      <p>Vos: ${myScore}</p>
      <p>Máquina: ${computerScore}</p>
    </div>
    <button class="btn restart-btn">Volver a Jugar</button>
  `;

  section.querySelector(".restart-btn")?.addEventListener("click", () => {
    goTo("/play");
  });

  return section;
}