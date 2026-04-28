import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from '../features/auth';
import { registerReducer } from '../features/register';
import { forgotPasswordReducer } from '../features/forgot-password';
import { confirmReducer } from '../features/confirm';
import { goalsReducer } from '../features/goals';
import { settingsReducer } from '../features/settings';
import { rootSaga } from './saga';
import { authApi } from '../shared/api/auth';
import { goalsApi } from '../shared/api/goals';
import { tasksReducer } from '../features/tasks/index';
import uiReducer from '../features/goals/ui.slice';
import goalEditModalReducer from '../features/goals/ui/goal-edit-modal/slice';

const api = { authApi, goalsApi };

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer,
    confirm: confirmReducer,
    goals: goalsReducer,
    tasks: tasksReducer,
    settings: settingsReducer,
    ui: uiReducer,
    GoalEditModal: goalEditModalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga, api);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;