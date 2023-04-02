import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Config from "../../config";

const fetchUrl = `${Config.baseApiUrl}ratings`;
const tagType = "Rating";

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
				result ? [...result.map(({ playlistId }) => ({ type: tagType, playlistId })), tagType] : [tagType],
		}),
		getRating: build.query({
			query: (playlistId) => `/${playlistId}`,
			providesTags: (_result, _err, playlistId) => [{ type: tagType, playlistId }],
		}),
		addRating: build.mutation({
			query(data) {
				const { playlistId, rating } = data;
				return {
					url: `/${playlistId}`,
					method: "POST",
					headers: { "Content-Type": "application/json", "Accept": "application/json" },
					body:  JSON.stringify(rating),
				};
			},
			invalidatesTags: (result, error, arg) => [{ type: tagType, playlistId: arg.playlistId }],
		}),
		updateRating: build.mutation({
			query(data) {
				const { playlistId, rating } = data;
				return {
					url: `/${playlistId}`,
					method: "PUT",
					headers: { "Content-Type": "application/json", "Accept": "application/json" },
					body:  JSON.stringify(rating),
				};
			},
			invalidatesTags: (result, error, arg) => [{ type: tagType, playlistId: arg.playlistId }],
		}),
		deleteRating: build.mutation({
			query(data) {
				const { id } = data;
				return {
					url: `/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags: (result, error, arg) => [{ type: tagType, playlistId: arg.playlistId }],
		}),
	}),
	tagTypes: [tagType],
});

export const { useGetRatingsQuery, useGetRatingQuery, useUpdateRatingMutation, useAddRatingMutation, useDeleteRatingMutation} = playlistRatingApi;
