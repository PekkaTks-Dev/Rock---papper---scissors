type Play = "piedra" | "papel" | "tijera";
type Result = "ganaste" | "perdiste" | "empate";

interface StateSchema {
  currentGame: {
    myPlay: Play | "";
    computerPlay: Play | "";
    result: Result | "";
  };
  history: {
    myScore: number;
    computerScore: number;
  };
}

export const state = {
  data: {
    currentGame: { myPlay: "", computerPlay: "", result: "" },
    history: { myScore: 0, computerScore: 0 }
  } as StateSchema,
  listeners: [] as Array<(data: StateSchema) => void>,

  init() {
    const saved = localStorage.getItem("rps_history");
    if (saved) {
      this.data.history = JSON.parse(saved);
    }
  },

  getState(): StateSchema {
    return this.data;
  },

  setState(newState: StateSchema) {
    this.data = newState;
    localStorage.setItem("rps_history", JSON.stringify(this.data.history));
    for (const cb of this.listeners) {
      cb(this.data);
    }
  },

  subscribe(callback: (data: StateSchema) => void) {
    this.listeners.push(callback);
  },

  setMove(myPlay: Play) {
    const moves: Play[] = ["piedra", "papel", "tijera"];
    const computerPlay = moves[Math.floor(Math.random() * 3)];

    let result: Result = "empate";
    if (
      (myPlay === "piedra" && computerPlay === "tijera") ||
      (myPlay === "papel" && computerPlay === "piedra") ||
      (myPlay === "tijera" && computerPlay === "papel")
    ) {
      result = "ganaste";
    } else if (myPlay !== computerPlay) {
      result = "perdiste";
    }

    const currentHistory = { ...this.data.history };
    if (result === "ganaste") currentHistory.myScore += 1;
    if (result === "perdiste") currentHistory.computerScore += 1;

    this.setState({
      ...this.data,
      currentGame: { myPlay, computerPlay, result },
      history: currentHistory
    });
  }
};