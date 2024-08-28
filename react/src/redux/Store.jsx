import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from "./slice/authSlice";
import adminSlice from './slice/adminSlice';
import jobSlice from './slice/jobSlice';

// Create a persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminSlice,
  jobs: jobSlice
});

// Apply persistReducer middleware
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer and customized middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),
});

// Export the persistor for use with PersistGate
export const persistor = persistStore(store);

// Ensure you're exporting the store as well
export default store;
