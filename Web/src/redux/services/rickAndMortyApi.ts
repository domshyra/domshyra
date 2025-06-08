import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fetchUrl = `https://rickandmortyapi.com/api/character`;

//since this data is required for offline, we cache it in the service worker, and always request it in RTKQuery
const dataInServiceWorkerCache = 0;

type Character = {
	id: number;
	name: string;
	status: string;
	species: string;
};

type CharacterResponse = {
	info: {
		count: number;
		pages: number;
		next: string;
		prev: string;
	};
	results: Character[];
};

//?https://redux-toolkit.js.org/rtk-query/usage/queries
export const rickAndMortyApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: fetchUrl }),
	reducerPath: "rickAndMortyApi",
	endpoints: (build) => ({
		getCharacters: build.query<CharacterResponse, void>({
			query: () => ``,
			providesTags: (result) =>
				result ? [...result.results.map(({ id }: { id: number }) => ({ type: "character" as const, id })), "character"] : ["character"],
			keepUnusedDataFor: dataInServiceWorkerCache,
		}),
	}),
	tagTypes: ["character"],
});

export const { useGetCharactersQuery } = rickAndMortyApi;
