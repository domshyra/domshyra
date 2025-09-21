import { AlertColor, AlertPropsColorOverrides } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { OverridableStringUnion } from "@mui/types";

export type SnackbarMessage = {
	severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined;
	link?: string;
	message: string;
	show: boolean;
	duration?: number;
};

const initialState: SnackbarMessage = {
	severity: undefined,
	link: "",
	message: "",
	show: false,
	duration: 5000,
};

/* istanbul ignore next */
const snackbar = createSlice({
	name: "snackbar",
	initialState: initialState,
	reducers: {
		setSnackbar: (state: SnackbarMessage, action: PayloadAction<SnackbarMessage>) => {
			return {
				...state,
				show: action.payload.show,
				message: action.payload.message,
				link: action.payload.link,
				severity: action.payload.severity,
				duration: action.payload.duration ?? initialState.duration,
			};
		},
		resetSnackbar: () => {
			return initialState;
		},
	},
});

export const { setSnackbar, resetSnackbar } = snackbar.actions;

export default snackbar.reducer;
