import { createSlice } from "@reduxjs/toolkit";

export type ConnectionStatusState = {
	online: boolean;
	onlineAt: string | null;
	onlineAtDisplay: string | null;
	previousOnlineAt: string | null;
	offlineAt: string | null;
	offlineAtDisplay: string | null;
};

const initialState: ConnectionStatusState = {
	online: true,
	onlineAt: null,
	onlineAtDisplay: null,
	previousOnlineAt: null,
	offlineAt: null,
	offlineAtDisplay: null,
};
/* istanbul ignore next */
// Slice for connection status
const connectionStatus = createSlice({
	name: "connectionStatus",
	initialState: initialState,
	reducers: {
		setOnline: (state: ConnectionStatusState) => {
			const now = getNewDateForRedux();
			return {
				...state,
				online: true,
				previousOnlineAt: state.onlineAt,
				onlineAt: now.at,
				onlineAtDisplay: now.display,
			};
		},
		setOffline: (state: ConnectionStatusState) => {
			const now = getNewDateForRedux();
			return {
				...state,
				online: false,
				previousOnlineAt: state.onlineAt,
				offlineAt: now.at,
				offlineAtDisplay: now.display,
			};
		},
	},
});

type ReduxTimeStamp = {
	at: string;
	display: string;
};

/**
 *
 * @returns {ReduxTimeStamp} - Object containing the current date and time in JSON and display format
 */
const getNewDateForRedux = (): ReduxTimeStamp => {
	const now = new Date();

	return {
		at: JSON.stringify(now),
		display: now.toLocaleString(),
	};
};

export const { setOnline, setOffline } = connectionStatus.actions;

export default connectionStatus.reducer;
