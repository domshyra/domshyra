import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { accountApi } from "./services/accountApi";
import authorization from "./slices/authorization";
import connectionStatus from "./slices/connectionStatus";
import passwordAuthorization from "./slices/passwordAuthorization";
import { rickAndMortyApi } from "./services/rickAndMortyApi";
import snackbar from "./slices/snackbar";
import { spotifyApi } from "./services/spotifyApi";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

//?https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration talks about persisting the api reducer

//?https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist:~:text=It%20is%20also,something%20like%20this%3A outlines that it's a bad idea to persist the api reducer
//It is also strongly recommended to blacklist any api(s) that you have configured with RTK Query. If the api slice reducer is not blacklisted,
//the api cache will be automatically persisted and restored which could leave you with phantom subscriptions from components that do not exist any more.
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["authorization"],
	blacklist: [rickAndMortyApi.reducerPath, "connectionStatus", "snackbar", "passwordAuthorization"],
};

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
	snackbar,
	connectionStatus,
	authorization,
	passwordAuthorization,
	[accountApi.reducerPath]: accountApi.reducer,
	[spotifyApi.reducerPath]: spotifyApi.reducer,
	[rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = (preloadedState: any) => {
	return configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(rickAndMortyApi.middleware, accountApi.middleware, spotifyApi.middleware),
		preloadedState,
	});
};

export default setupStore;
