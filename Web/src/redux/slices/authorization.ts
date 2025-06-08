import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthorizationState } from "@_types/authorization";

const initialState: AuthorizationState = {
	accessToken: null,
	expiresOn: null,
	extExpiresOn: null,
	fromCache: false,
	name: null,
	scopes: [],
	uniqueId: null,
	username: null,
	userRoles: [],
};

const authorization = createSlice({
	name: "authorization",
	initialState: initialState,
	reducers: {
		/**
		 * Set if the user is authorized or not, or if the token/cache is expired.
		 * @param {*} state
		 * @param {*} action
		 * @returns
		 */
		setAuthorization: (state: AuthorizationState, action: PayloadAction<Partial<AuthorizationState>>) => {
			if (!action) {
				return (state = { ...initialState });
			}
			if (!action.payload.fromCache || state.accessToken !== action.payload.accessToken) {
				return (state = {
					accessToken: action.payload.accessToken ?? null,
					expiresOn: action.payload.expiresOn ?? null,
					extExpiresOn: action.payload.extExpiresOn ?? null,
					fromCache: action.payload.fromCache ?? false,
					name: action.payload.name,
					scopes: action.payload.scopes ?? [],
					uniqueId: action.payload.uniqueId ?? null,
					username: action.payload.username ?? null,
					userRoles: action.payload.userRoles,
				});
			} else {
				return state;
			}
		},
		setAccessToken: (state: AuthorizationState, action: PayloadAction<string | null>) => {
			state.accessToken = action.payload; //TODO! this is a makeshift solution, we need add the expire time and other stuff here
		},
	},
});

export const { setAuthorization, setAccessToken } = authorization.actions;

export default authorization.reducer;
