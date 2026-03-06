import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../features/auth/auth-slice';
import { rootSaga } from './saga';
import registerReducer from '../features/register/register.slice';
import forgotPasswordReducer from '../features/forgot-password/forgot-password.slice';
import settingsReducer from '../features/settings/settings.slice';
import goalsReducer from '../features/goals/goals.slice';
import confirmReducer from '../features/confirm/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    settings: settingsReducer,
    forgotPassword: forgotPasswordReducer,
    goals: goalsReducer,
    confirm: confirmReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;