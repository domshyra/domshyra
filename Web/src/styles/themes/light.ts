import * as colors from "./colors";

//#region default theme
const light = {
	palette: {
		mode: "light",
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
			dark: colors.greyDark,
			light: colors.greyLight,
			darker: colors.greyDarkest,
			lighter: colors.greyLightest,
			contrastText: colors.white,
		},
		body: {
			main: colors.black,
			contrastText: colors.white,
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
		background: {
			default: colors.lightDefault,
			paper: colors.lightPaper,
			paperBorder: colors.themeColor,
		},
	},
};

export default light;
