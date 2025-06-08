import { HttpResponse, http } from "msw";

import { results as rickAndMortyResults } from "./data/rickAndMortyMocks";

export const handlers = [
	// Intercept "GET https://example.com/user" requests...
	http.get("https://example.com/user", () => {
		// ...and respond to them using this JSON response.
		return HttpResponse.json({
			id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
			firstName: "John",
			lastName: "Maverick",
		});
	}),

	// #region Rick and Morty Api Mocks
	// getCharacters / useGetCharactersQuery
	http.get("https://rickandmortyapi.com/api/character", () => {
		return HttpResponse.json(rickAndMortyResults);
	}),
	//#endregion
];
