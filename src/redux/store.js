import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamApi } from './services/shazam';

// export const store = configureStore({
//   reducer: {
//     player: playerReducer,
//   },
// });


// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';


// export const store = configureStore({
//   reducer: {
//     [shazamApi.reducerPath]: shazamApi.reducer,
//     player: playerReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamApi.middleware),
// });


export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true,
    }).concat(shazamApi.middleware),
});

