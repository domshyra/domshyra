import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { isLocal } from "@tools/env";

type passwordAuthorizationState = {
	showFrontEndPasswordPage: boolean;
};

const initialState: passwordAuthorizationState = {
	showFrontEndPasswordPage: isLocal() ? false : true,
};

const passwordAuthorization = createSlice({
	name: "passwordAuthorization",
	initialState: initialState,
	reducers: {
		setShowFrontEndPasswordPage: (state, action: PayloadAction<boolean>) => {
			state.showFrontEndPasswordPage = action.payload;
		},
	},
});

export const { setShowFrontEndPasswordPage } = passwordAuthorization.actions;

export default passwordAuthorization.reducer;
