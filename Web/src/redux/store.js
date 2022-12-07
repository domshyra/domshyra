import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { playlistRatingApi } from "./services/playlistRatingApi";
import { spotifyApi } from "./services/spotifyApi";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
	[spotifyApi.reducerPath]: spotifyApi.reducer,
	[playlistRatingApi.reducerPath]: playlistRatingApi.reducer,
});

const setupStore = (preloadedState) => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(spotifyApi.middleware, playlistRatingApi.middleware),
		preloadedState,
	});
};

export default setupStore;
