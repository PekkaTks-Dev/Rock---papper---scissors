import { state } from "../state";

export function initPlayPage(goTo: (path: string) => void): HTMLElement {
  const section = document.createElement("section");
  section.className = "page play-page";
  section.innerHTML = `
    <div class="countdown-circle"><span id="timer">3</span></div>
    <div class="hands-picker">
      <button data-play="tijera" class="hand-btn">✌️</button>
      <button data-play="piedra" class="hand-btn">✊</button>
      <button data-play="papel" class="hand-btn">✋</button>
    </div>
  `;

  let elected = false;
  let counter = 3;
  const timerEl = section.querySelector("#timer")!;

  const interval = setInterval(() => {
    counter--;
    if (counter > 0) {
      timerEl.textContent = String(counter);
    } else {
      clearInterval(interval);
      if (!elected) {
        goTo("/rules"); // Si no eligió a tiempo, vuelve a reglas
      }
    }
  }, 1000);

  section.querySelectorAll(".hand-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      elected = true;
      clearInterval(interval);
      const chosenPlay = (e.currentTarget as HTMLElement).dataset.play as any;
      state.setMove(chosenPlay);
      goTo("/result");
    });
  });

  return section;
}