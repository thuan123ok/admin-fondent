import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/auth";
const persistConfig = {
  key: "vietpro",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});
export const persistor = persistStore(store);
export default store;
