import * as colors from "./colors";

import base from "./base";
import { createTheme } from "@mui/material/styles";

const dark = createTheme({
	cssVariables: true,
	...base,
	...base.transition,
	palette: {
		mode: "dark",
		text: {
			primary: colors.lightDefault,
		},
		background: {
			default: colors.darkDefault,
			paper: colors.darkPaper,
			paperBorder: colors.white,
		},
		primary: {
			light: "#5bbbe7",
			main: colors.themeColor,
			dark: "#23769d",
		},
		secondary: {
			light: "#e7875b",
			main: "#e16a33",
			dark: "#9d4a23",
		},
		neutral: {
			main: colors.greyMain,
			dark: colors.greyLight,
			light: colors.greyDark,
			darker: colors.greyLightest,
			lighter: colors.greyDarkest,
			contrastText: colors.black,
		},
		body: {
			main: colors.white,
			contrastText: colors.black,
		},
		colors: {
			blue: colors.blue,
			indigo: colors.indigo,
			purple: colors.purple,
			pink: colors.pink,
			red: colors.red,
			orange: colors.orange,
			yellow: colors.yellow,
			green: colors.green,
			teal: colors.teal,
			cyan: colors.cyan,
		},
	},
	components: {
		...base.components,
		MuiSlider: {
			styleOverrides: {
				root: {
					"& .MuiSlider-thumb": {
						backgroundColor: colors.darkDefault,
					},
					"& .MuiSlider-mark": {
						color: colors.lightDefault,
					},
				},
			},
		},
		MuiCssBaseline: {
			...base.components.MuiCssBaseline.body,
			styleOverrides: `
                *::-webkit-scrollbar-track {
                    background: ${colors.greyDarkest};
                }
                *::-webkit-scrollbar-thumb {
                    background-color: ${colors.greyMain};
                }
            `,
		},
	},
});

export default dark;
export { dark as darkTheme };
