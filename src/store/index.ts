/* eslint-disable @typescript-eslint/no-empty-interface */

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

declare module 'react-redux' {
  export interface DefaultRootState extends RootState {}
}
export default store;
