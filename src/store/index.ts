/* eslint-disable no-use-before-define */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

const rootReducer = combineReducers(reducers);

export function setupStore(preloadedState?: DeepPartial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
