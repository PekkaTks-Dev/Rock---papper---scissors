import { state } from "../state";

export function initPlayPage(goTo: (path: string) => void): HTMLElement {
  const section = document.createElement("section");
  section.className = "page play-page";
  section.innerHTML = `
    <style>
      .play-page {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
        box-sizing: border-box;
        padding-top: 50px;
      }
      .countdown-circle {
        font-size: 80px;
        font-weight: bold;
      }
      .hands-picker {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 30px;
        width: 100%;
        margin-bottom: 20px;
      }
      .hand-btn {
        background: transparent;
        border: none;
        font-size: 100px; /* <--- ACÁ EL TAMAÑO: 100px las deja bien grandes */
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: transform 0.2s ease;
      }
      .hand-btn:hover {
        transform: translateY(-20px) scale(1.15);
      }
    </style>
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