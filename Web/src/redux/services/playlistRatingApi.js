import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Config from "../../config";

const fetchUrl = `${Config.baseApiUrl}ratings`;

//?https://redux-toolkit.js.org/rtk-query/usage/queries
export const playlistRatingApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: fetchUrl }),
	reducerPath: "playlistRatingApi",
	endpoints: (build) => ({
		getRatings: build.query({
			query: () => ``,
		}),
		getRating: build.query({
			query: (spotifyId) => `/${spotifyId}`,
			providesTags: (_result, _err, spotifyId) => [{ type: 'Ratings', spotifyId }],
		}),
	}),
	tagTypes: ["Ratings"],
});

export const { useGetRatingsQuery, useGetRatingQuery } = playlistRatingApi;
