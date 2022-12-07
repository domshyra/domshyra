import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Config from "../../config";

const fetchUrl = `${Config.baseApiUrl}spotify`;

//?https://redux-toolkit.js.org/rtk-query/usage/queries
export const spotifyApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: fetchUrl }),
	reducerPath: "spotifyApi",
	endpoints: (build) => ({
		getPlaylists: build.query({
			query: () => ``,
			providesTags: ['Playlists'],
		}),
	}),
});

export const { useGetPlaylistsQuery } = spotifyApi;
