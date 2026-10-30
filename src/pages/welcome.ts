export function initWelcomePage(goTo: (path: string) => void): HTMLElement {
  const section = document.createElement("section");
  section.className = "page welcome-page";
  section.innerHTML = `
    <h1 class="title">Piedra<br>Papel <span>ó</span><br>Tijera</h1>
    <button class="btn start-btn">Empezar</button>
    <div class="hands-preview">✌️ ✊ ✋</div>
  `;

  section.querySelector(".start-btn")?.addEventListener("click", () => {
    goTo("/rules");
  });

  return section;
}