import "../App.css";

import * as colors from "./colors";

import { Theme, createTheme } from "@mui/material/styles";

import dark from "./dark";
import light from "./light";

export const tickHeight = 8;
export const sliderThumbSize = 24;

//#endregion
export interface ColorNamePallet {
	blue: string;
	indigo: string;
	purple: string;
	pink: string;
	red: string;
	orange: string;
	yellow: string;
	green: string;
	teal: string;
	cyan: string;
}
//#region MUI Theme Declarations
declare module "@mui/material/styles" {
	interface Palette {
		neutral: PaletteColor;
	}
	interface PaletteColor {
		darker?: string;
		lighter?: string;
	}

	interface PaletteColorExtended {
		darkest?: string;
		lightest?: string;
	}

	interface SimplePaletteColorOptions {
		darker?: string;
		lighter?: string;
	}

	interface PaletteOptions {
		neutral?: PaletteColor;
		colors?: ColorNamePallet;
		body?: Partial<PaletteColor>;
	}
	interface TypeBackground {
		paperBorder?: string;
	}
}
// #endregion
declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		neutral: true;
	}
}

const transitionProperties = {
	transitionDuration: "275ms",
	transitionProperty: "background-color, box-shadow, border-color",
	transitionTimingFunction: "ease-in-out",
};

const base = createTheme({
	// cssVariables: true, //Note this will break dark and light mode switching
	cssVariables: {
		colorSchemeSelector: "class",
	},
	typography: {
		fontFamily: ["Oswald", '"Helvetica Neue"', "Roboto", "Arial", "sans-serif"].join(","),
	},
	components: {
		MuiSlider: {
			styleOverrides: {
				root: () => ({
					"& .MuiSlider-track": {
						border: "none",
					},
					"& .MuiSlider-thumb": {
						width: sliderThumbSize,
						height: sliderThumbSize,
						"&::before": {
							boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
						},
						"&:hover, &.Mui-focusVisible, &.Mui-active": {
							boxShadow: "none",
						},
						backgroundColor: (theme: Theme) => (colors.white, theme.applyStyles("dark", { backgroundColor: colors.greyDarkest })),
					},
					"& .MuiSlider-mark": {
						height: tickHeight, // Default was too short
						color: (theme: Theme) => theme.applyStyles("dark", { color: colors.lightDefault }),
					},
					...transitionProperties,
				}),
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: () => ({
					...transitionProperties,
				}),
			},
		},
		MuiLink: {
			styleOverrides: {
				root: () => ({
					...transitionProperties,
				}),
			},
		},
		MuiButtonBase: {
			styleOverrides: {
				root: () => ({
					transitionProperty: `${transitionProperties.transitionProperty}, color`,
				}),
			},
		},
		MuiGrid: {
			styleOverrides: {
				root: () => ({
					...transitionProperties,
				}),
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					...transitionProperties,
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: () => ({
					...transitionProperties,
				}),
			},
		},
		MuiTable: {
			styleOverrides: {
				root: () => ({
					...transitionProperties,
				}),
			},
		},
		MuiCssBaseline: {
			styleOverrides: (theme: Theme) => ({
				root: {
					"& *::-webkit-scrollbar": {
						width: "0.4em",
						height: "0.6em",
					},
					"& *::-webkit-scrollbar-track": {
						borderRadius: "8px",
						background: (colors.greyLightest, theme.applyStyles("dark", { backgroundColor: colors.greyDarkest })),
					},
					"& *::-webkit-scrollbar-thumb": {
						borderRadius: "8px",
						backgroundColor: colors.greyMain,
					},
					...transitionProperties,
					//TODO! some how the background color transition is not working here, also tried to use this below and didn't seem to get it
					// nor did using a body in app.css work
					//? https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually
					//TOOD! srill a flicker https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually
				},
			}),
		},
	},
	colorSchemes: {
		light: { palette: { ...light.palette, mode: "light" } },
		dark: { palette: { ...dark.palette, mode: "dark" } },
	},
});

export default base;
