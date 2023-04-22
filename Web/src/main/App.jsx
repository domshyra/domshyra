import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Grid, IconButton, Link, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import Index from "../components/Index";
import PlaylistDetails from "../components/PlaylistDetails";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Grid mt={2}>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
					</Routes>
				</Grid>
				<Grid container justifyContent="center" pb={2}>
					<Grid item xs={12}>
						<IconButton title="view code on github" href="https://github.com/domshyra/domshyra" target="_blank">
							<GitHubIcon />
						</IconButton>
					</Grid>
					<Grid item xs={12}>
						<Typography component="div" variant="caption" color="text.secondary" align="center">
							View this code on{" "}
							<Link rel="noopener" target="_blank" href="https://github.com/domshyra/domshyra" underline="none">
								GitHub
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</div>
		</BrowserRouter>
	);
}

export default App;
