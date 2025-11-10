import "@styles/App.css";

import { Box, Container, CssBaseline, IconButton, InitColorSchemeScript, Link, Paper, ThemeProvider, Typography } from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router-dom";

import AppBar from "@sections/appBar/AppBar";
import BreadCrumbs from "src/fragments/breadcrumbs/BreadCrumbs";
import GitHubIcon from "@mui/icons-material/GitHub";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { OfflineAlert } from "@components/offline/OfflineAlert";
import PageTitle from "@sections/PageTitle";
import { SnackbarLayout } from "./SnackbarLayout";
import { githubUrl } from "@constants/common";
import theme from "@styles/themes/base";

//? https://mui.com/joy-ui/integrations/material-ui/
/**
 * Renders the layout of the application.
 * This consists of the AppBar, OfflineAlert, and the Outlet.
 *
 * @returns The layout component.
 */
function Layout() {
	return (
		//joyprovider needed for the aspect ratio
		<JoyCssVarsProvider>
			<ThemeProvider theme={theme} defaultMode="system">
				<CssBaseline enableColorScheme />
				<InitColorSchemeScript attribute="class" />
				<PageTitle />
				<AppBar />
				<OfflineAlert />
				<Box sx={{ mb: 6, pb: 2 }}>
					<Container maxWidth="xl" sx={{ mt: 2 }}>
						<SnackbarLayout>
							<>
								<ScrollRestoration />
								<BreadCrumbs />
								<Outlet />
							</>
						</SnackbarLayout>
					</Container>
				</Box>
				<ScreenFooter />
			</ThemeProvider>
		</JoyCssVarsProvider>
	);
}

const oldCode = () => {
	return (
		<>
			<Typography component="div" variant="caption" color="text.secondary">
				View this code on{" "}
				<Link rel="noopener" target="_blank" href={githubUrl} underline="none">
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
					<IconButton title="view code on github" size="small" href={githubUrl} target="_blank">
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
