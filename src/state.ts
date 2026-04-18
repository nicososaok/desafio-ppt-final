import { ref, onValue, update } from "firebase/database";
import { rtdb } from "./rtdb";

const API_BASE_URL = "http://localhost:3000";

type Jugada = "piedra" | "papel" | "tijera";

type Game = {
  myPlay: Jugada;
  computerPlay: Jugada;
  winner: "yo" | "computadora" | "empate";
};

const state = {
  data: {
    nombre: "",
    userId: "",
    roomId: "",
    rtdbId: "",
    rtdbData: {},
    currentGame: {
      computerPlay: "" as Jugada | "",
      myPlay: "" as Jugada | "",
    },
    history: [] as Game[],
  },

  listeners: [] as Function[],

  getState() {
    return this.data;
  },

  setState(newState: any) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }

    localStorage.setItem("ppt-history", JSON.stringify(this.data.history));

    localStorage.setItem("ppt-session", JSON.stringify({
      rtdbId: this.data.rtdbId,
      userId: this.data.userId,
      nombre: this.data.nombre,
      roomId: this.data.roomId
    }));
  },

  subscribe(callback: (any: any) => any) {
    this.listeners.push(callback);
  },

  init() {
    const localHistory = localStorage.getItem("ppt-history");
    if (localHistory && localHistory !== "undefined") {
      this.data.history = JSON.parse(localHistory);
    }

    const localSession = localStorage.getItem("ppt-session");
    if (localSession && localSession !== "undefined") {
      const session = JSON.parse(localSession);
      this.data.nombre = session.nombre || "";
      this.data.userId = session.userId || "";
      this.data.roomId = session.roomId || "";
      this.data.rtdbId = session.rtdbId || "";
      if (this.data.rtdbId) {
        this.listenRoom();
      }
    }
    this.setState(this.data);
  },

  setNombre(nombre: string) {
    const currentState = this.getState();
    currentState.nombre = nombre;
    this.setState(currentState);
  },

  setRoomId(roomId: string) {
    const currentState = this.getState();
    currentState.roomId = roomId;
    this.setState(currentState);
  },

  clearHistory() {
    const currentState = this.getState();
    currentState.history = [];
    this.setState(currentState);
  },

  signIn(callback?: () => void) {
    const currentState = this.getState();
    if (!currentState.nombre) return;

    this.clearHistory();
    localStorage.removeItem("ppt-session");

    fetch(API_BASE_URL + "/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: `${currentState.nombre.toLowerCase().replace(/\s+/g, "")}@test.com`,
        nombre: currentState.nombre
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          const lastState = state.getState();
          lastState.userId = data.id;
          state.setState(lastState);
          if (callback) callback();
        }
      })
      .catch((err) => console.error("No se pudo registrar:", err));
  },

  askNewRoom(callback?: () => void) {
    const currentState = this.getState();
    if (currentState.userId) {
      fetch(API_BASE_URL + "/rooms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: currentState.userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          const lastState = state.getState();
          lastState.roomId = data.id;
          state.setState(lastState);
          state.accessRoom(callback);
        });
    }
  },

  accessRoom(callback?: () => void) {
    const currentState = this.getState();
    const { userId, roomId } = currentState;

    fetch(`${API_BASE_URL}/rooms/${roomId}?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const lastState = state.getState();
        lastState.rtdbId = data.rtdbId;
        state.setState(lastState);
        state.listenRoom();
        if (callback) callback();
      })
      .catch(err => console.error("Error al acceder a la sala", err));
  },

  setReady(ready: boolean) {
    const currentState = this.getState();
    const { rtdbId, userId, nombre } = currentState;

    if (!rtdbId || !userId) return;

    const playerRef = ref(rtdb, `rooms/${rtdbId}/currentGame/${userId}`);
    update(playerRef, {
      name: nombre,
      ready: ready,
      online: true,
      choice: ""
    });
  },

  restartGame(callback?: () => void) {
    const currentState = this.getState();
    const { rtdbId, userId } = currentState;

    if (rtdbId && userId) {
      const playerRef = ref(rtdb, `rooms/${rtdbId}/currentGame/${userId}`);
      update(playerRef, {
        ready: false,
        choice: ""
      }).then(() => {
        if (callback) callback();
      });
    }
  },

  listenRoom() {
    const { rtdbId } = this.getState();
    if (!rtdbId) return;

    const roomRef = ref(rtdb, `/rooms/${rtdbId}`);
    onValue(roomRef, (snapshot) => {
      const valor = snapshot.val();
      if (!valor) return;
      const newState = state.getState();
      newState.rtdbData = valor.currentGame;
      state.setState(newState);
    });
  },

  setMove(move: Jugada) {
    const currentState = this.getState();
    currentState.currentGame.myPlay = move;
    this.setState(currentState);
    const { rtdbId, userId } = currentState;
    if (rtdbId && userId) {
      const playerRef = ref(rtdb, `rooms/${rtdbId}/currentGame/${userId}`);
      update(playerRef, { choice: move });
    }
  },

  pushToHistory() {
    const currentState = this.getState();
    const myUserId = currentState.userId;
    const rtdbData = currentState.rtdbData;

    const ids = Object.keys(rtdbData);
    const opponentId = ids.find(id => id !== myUserId);

    if (opponentId && rtdbData[opponentId] && rtdbData[myUserId]) {
      const myMove = rtdbData[myUserId].choice as Jugada;
      const opponentMove = rtdbData[opponentId].choice as Jugada;

      if (myMove && opponentMove) {
        const resultado = this.whoWins(myMove, opponentMove);

        const newHistory = [...(currentState.history || []), {
          myPlay: myMove,
          computerPlay: opponentMove,
          winner: resultado,
        }];

        this.setState({
          ...currentState,
          history: newHistory,
          currentGame: {
            myPlay: myMove,
            computerPlay: opponentMove
          }
        });
      }
    }
  },

  whoWins(myPlay: Jugada, computerPlay: Jugada) {
    if (myPlay === computerPlay) return "empate";
    const ganeConTijera = myPlay === "tijera" && computerPlay === "papel";
    const ganeConPiedra = myPlay === "piedra" && computerPlay === "tijera";
    const ganeConPapel = myPlay === "papel" && computerPlay === "piedra";
    return (ganeConTijera || ganeConPiedra || ganeConPapel) ? "yo" : "computadora";
  },

  getScore() {
    const currentState = this.getState();
    const { history, nombre, rtdbData, userId } = currentState;

    let misPuntos = 0;
    let puntosRival = 0;

    (history || []).forEach((partida: Game) => {
      if (partida.winner === "yo") misPuntos++;
      if (partida.winner === "computadora") puntosRival++;
    });

    let nombreRival = "Rival";
    if (rtdbData) {
      const ids = Object.keys(rtdbData);
      const opponentId = ids.find(id => id !== userId);
      if (opponentId && rtdbData[opponentId] && rtdbData[opponentId].name) {
        nombreRival = rtdbData[opponentId].name;
      }
    }

    return {
      player: {
        nombre: nombre || "Jugador",
        score: misPuntos
      },
      opponent: {
        nombre: nombreRival,
        score: puntosRival
      }
    };
  }
};

state.init();
export { state };