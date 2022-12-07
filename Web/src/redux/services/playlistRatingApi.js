import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Config from "../../config";

const fetchUrl = `${Config.baseApiUrl}ratings`;

//?https://redux-toolkit.js.org/rtk-query/usage/queries
export const playlistRatingApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: fetchUrl }),
	reducerPath: "playlistRatingApi",
	// prepareHeaders: (headers, { getState }) => { if we had tokens for this demo we'd do this, here for Q's only
	// 	// By default, if we have a token in the store, let's use that for authenticated requests
	// 	const token = (getState()).auth.token
	// 	if (token) {
	// 	  headers.set('authentication', `Bearer ${token}`)
	// 	}
	// 	return headers
	//   },
	endpoints: (build) => ({
		getRatings: build.query({
			query: () => ``,
			providesTags: (result, error, arg) =>
				result ? [...result.map(({ spotifyId }) => ({ type: "Rating", spotifyId })), "Rating"] : ["Rating"],
		}),
		getRating: build.query({
			query: (spotifyId) => `/${spotifyId}`,
			providesTags: (_result, _err, spotifyId) => [{ type: "Rating", spotifyId }],
		}),
		addRating: build.mutation({
			query(data) {
				const { spotifyId, rating } = data;
				return {
					url: `/${spotifyId}`,
					method: "POST",
					headers: { "Content-Type": "application/json", "Accept": "application/json" },
					body:  JSON.stringify(rating),
				};
			},
			invalidatesTags: (result, error, arg) => [{ type: "Rating", spotifyId: arg.spotifyId }],
		}),
		updateRating: build.mutation({
			query(data) {
				const { spotifyId, rating } = data;
				return {
					url: `/${spotifyId}`,
					method: "PUT",
					headers: { "Content-Type": "application/json", "Accept": "application/json" },
					body:  JSON.stringify(rating),
				};
			},
			invalidatesTags: (result, error, arg) => [{ type: "Rating", spotifyId: arg.spotifyId }],
		}),
		deleteRating: build.mutation({
			query(data) {
				const { id } = data;
				return {
					url: `/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags: (result, error, arg) => [{ type: "Rating", spotifyId: arg.spotifyId }],
		}),
	}),
	tagTypes: ["Rating"],
});

export const { useGetRatingsQuery, useGetRatingQuery, useUpdateRatingMutation, useAddRatingMutation, useDeleteRatingMutation} = playlistRatingApi;
