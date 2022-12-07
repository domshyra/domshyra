import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Grid } from "@mui/material";
import Index from "../components/Index";
import PlaylistDetails from "../components/PlaylistDetails";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Grid mt={4}>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/playlist/:spotifyId" element={<PlaylistDetails />} />
					</Routes>
				</Grid>
			</div>
		</BrowserRouter>
	);
}

export default App;
