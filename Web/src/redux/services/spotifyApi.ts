import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseApiUrl } from "@constants/common";
import { playlist } from "@_types/playlist";

const fetchUrl = `${baseApiUrl}spotify`;

const tagType = "playlist";

//?https://redux-toolkit.js.org/rtk-query/usage/queries
export const spotifyApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: fetchUrl }),
	reducerPath: "spotifyApi",
	endpoints: (build) => ({
		getPlaylists: build.query<playlist[], void>({
			query: () => ``,
			keepUnusedDataFor: 900, //15 min
			providesTags: (result) =>
				result
					? [
							...result.map(({ playlistId }: { playlistId: string }) => ({
								type: "playlist" as const,
								playlistId,
							})),
							{ type: "playlist" as const },
						]
					: [{ type: "playlist" as const }],
		}),
		getPlaylist: build.query({
			query: (playlistId) => `/${playlistId}`,
			providesTags: (_result, _err, playlistId) => [{ type: tagType, playlistId }],
		}),
	}),
	tagTypes: [tagType],
});

export const { useGetPlaylistsQuery, useLazyGetPlaylistQuery, useGetPlaylistQuery } = spotifyApi;
