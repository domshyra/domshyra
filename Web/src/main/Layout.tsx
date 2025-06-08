import "@styles/App.css";

import { Box, Container, CssBaseline, Grid, IconButton, THEME_ID as MATERIAL_THEME_ID, Paper, ThemeProvider, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

import AppBar from "@sections/appBar/AppBar";
import BreadCrumbs from "src/fragments/breadcrumbs/BreadCrumbs";
import GitHubIcon from "@mui/icons-material/GitHub";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from "@mui/material/styles";
import { OfflineAlert } from "@components/offline/OfflineAlert";
import PageTitle from "@sections/PageTitle";
import { SnackbarLayout } from "./SnackbarLayout";
import { getMuiTheme } from "@redux/slices/themeMode";
import { useAppSelector } from "@redux/hooks";

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
					<Box sx={{ mb: 2 }}>
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
					<Paper elevation={3} sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
						<MediumScreenFooter />
						<SmallScreenFooter />
					</Paper>
				</JoyCssVarsProvider>
			</MaterialCssVarsProvider>
		</ThemeProvider>
	);
}

const oldCode = () => {
	return (<><Grid size={12}>
		<IconButton title="view code on github" href="https://github.com/domshyra/domshyra" target="_blank">
			<GitHubIcon />
		</IconButton>
	</Grid>
	<Grid size={12}>
		<Typography component="div" variant="caption" color="text.secondary" align="center">
			View this code on{" "}
			<Link rel="noopener" target="_blank" href="https://github.com/domshyra/domshyra" underline="none">
				GitHub
			</Link>
		</Typography>
	</Grid></>

	)
};
const MediumScreenFooter = () => {
	return (
		<Box display="flex" py={0.5} sx={{ display: { xs: "none", md: "flex" } }}>
			<Box display="flex" justifyContent="left" pt={0.2} pl={1}>
				<Typography variant="caption" color="textSecondary">
					© {new Date().getFullYear()} domshyra
				</Typography>
			</Box>
		</Box>
	);
};

const SmallScreenFooter = () => {
	return (
		<>
			<Box display="flex" justifyContent="center" pb={0.3} sx={{ display: { xs: "flex", md: "none" } }}>
				<Box display="flex" justifyContent="center">
					<Typography variant="caption" color="textSecondary" fontSize=".5rem">
						© {new Date().getFullYear()} domshyra
					</Typography>
				</Box>
			</Box>
		</>
	);
};

export default Layout;
