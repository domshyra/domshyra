import "../App.css";

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

const base = {
	typography: {
		fontFamily: ["Oswald", '"Helvetica Neue"', "Roboto", "Arial", "sans-serif"].join(","),
	},
	components: {
		MuiSlider: {
			styleOverrides: {
				root: {
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
					},
					"& .MuiSlider-mark": {
						height: tickHeight, // Default was too short
					},
				},
			},
		},

		MuiCssBaseline: {
			styleOverrides: `
                    *::-webkit-scrollbar {
                        width: 0.4em;
                        height: 0.6em;
                    }
                    *::-webkit-scrollbar-track {
                        border-radius: 8px;
                    }
                    *::-webkit-scrollbar-thumb {
                        border-radius: 8px;
                    }
                `,
		},
	},
};

export default base;
