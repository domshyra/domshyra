import "@styles/App.css";

import { Box, Container, CssBaseline, IconButton, Link, THEME_ID as MATERIAL_THEME_ID, Paper, ThemeProvider, Typography } from "@mui/material";

import AppBar from "@sections/appBar/AppBar";
import BreadCrumbs from "src/fragments/breadcrumbs/BreadCrumbs";
import GitHubIcon from "@mui/icons-material/GitHub";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from "@mui/material/styles";
import { OfflineAlert } from "@components/offline/OfflineAlert";
import { Outlet } from "react-router-dom";
import PageTitle from "@sections/PageTitle";
import { SnackbarLayout } from "./SnackbarLayout";
import { getMuiTheme } from "@redux/slices/themeMode";
import { useAppSelector } from "@redux/hooks";

//? https://mui.com/joy-ui/integrations/material-ui/
/**
 * Renders the layout of the application.
 * This consists of the AppBar, OfflineAlert, and the Outlet.
 *
 * @returns The layout component.
 */
function Layout() {
	const { themeName } = useAppSelector((state) => state.themeMode);
	const theme = getMuiTheme(themeName);

	return (
		<ThemeProvider theme={{ [MATERIAL_THEME_ID]: theme }}>
			<MaterialCssVarsProvider>
				<JoyCssVarsProvider>
					<CssBaseline enableColorScheme />
					<PageTitle />
					<AppBar />
					<OfflineAlert />
					<Box sx={{ mb: 4, pb: 2 }}>
						<div className="App">
							<Box mt={2}>
								<Container maxWidth="xl">
									<SnackbarLayout>
										<>
											<BreadCrumbs />
											<Outlet />
										</>
									</SnackbarLayout>
								</Container>
							</Box>
						</div>
					</Box>
					<Box sx={{ mb: 2 }} />
					<ScreenFooter />
				</JoyCssVarsProvider>
			</MaterialCssVarsProvider>
		</ThemeProvider>
	);
}

const oldCode = () => {
	return (
		<>
			<Typography component="div" variant="caption" color="text.secondary">
				View this code on{" "}
				<Link rel="noopener" target="_blank" href="https://github.com/domshyra/domshyra" underline="none">
					GitHub
				</Link>
			</Typography>
		</>
	);
};
const ScreenFooter = () => {
	return (
		<Paper elevation={3} sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
			<Box display="flex" py={0.5}>
				<Box display="flex" flexGrow={1} />
				<Box sx={{ width: "100%", position: "absolute", left: 0, textAlign: "center" }}>
					{oldCode()}
					<IconButton title="view code on github" size="small" href="https://github.com/domshyra/domshyra" target="_blank">
						<GitHubIcon sx={{ fontSize: "1rem" }} />
					</IconButton>
				</Box>
				<Box display="flex" justifyContent="center" flexGrow={1} />
				<Box display="flex" justifyContent="right" pt={0.2} pr={1}>
					<Typography variant="caption" color="textSecondary">
						© {new Date().getFullYear()} domshyra
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
};


export default Layout;
