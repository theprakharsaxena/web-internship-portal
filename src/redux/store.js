import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root', // This key is used to store data in local storage
  storage, // You can choose the storage mechanism (local storage, sessionStorage, etc.)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

export const persistor = persistStore(store);
