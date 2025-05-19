import { ThemeModeState } from "@_types/themes";
import { createSlice } from "@reduxjs/toolkit";
import { cvdTheme } from "@styles/themes/cvd";
import { darkTheme } from "@styles/themes/dark";
import { lightTheme } from "@styles/themes/light";

const initialState: ThemeModeState = {
	themeName: "dark",
};

const themeMode = createSlice({
	name: "themeMode",
	initialState: initialState,
	reducers: {
		setLightMode: (state) => {
			state.themeName = "light";
		},
		setDarkMode: (state) => {
			state.themeName = "dark";
		},
		setCvdMode: (state) => {
			state.themeName = "cvd";
		},
	},
});

/**
 * Get the theme for the theme name
 * @param themeName
 * @returns
 */
export const getMuiTheme = (themeName: "light" | "dark" | "cvd") => {
	switch (themeName) {
		case "dark":
			return darkTheme;
		case "cvd":
			return cvdTheme;
		default:
			return lightTheme;
	}
};

export const { setDarkMode, setLightMode, setCvdMode } = themeMode.actions;

export default themeMode.reducer;
