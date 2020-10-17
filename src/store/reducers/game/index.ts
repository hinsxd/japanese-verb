import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { verbs, Verb } from 'src/data/verbs';

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export enum Status {
  READY = 'Ready',
  GUESS = 'Guess',
  CORRECT = 'Correct',
  WRONG = 'Wrong',
  END = 'END',
}

type GameState = {
  verbs: Verb[];
  status: Status;
  currentIndex: number;
  score: number;
  history: any[];
};

const initialState: GameState = {
  verbs,
  currentIndex: 0,
  status: Status.READY,
  score: 0,
  history: [],
};
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = Status.GUESS;
      state.verbs = shuffle(verbs);
    },
    restartgame: (state) => {
      state.status = Status.READY;
    },
    answerType: (state, action: PayloadAction<'intrans' | 'trans'>) => {
      const guess = action.payload;
      if (state.verbs[state.currentIndex].type === guess) {
        state.score++;
        state.status = Status.CORRECT;
      } else {
        state.status = Status.WRONG;
      }
    },
    next: (state) => {
      if (state.currentIndex < state.verbs.length - 1) {
        state.currentIndex++;
        state.status = Status.GUESS;
      }
    },
  },
});

const { actions, reducer } = gameSlice;

export { actions };
export default reducer;
