import * as colors from "./colors";

const dark = {
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
};

export default dark;
