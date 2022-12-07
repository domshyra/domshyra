import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "../components/Index";
import PlaylistDetails from "../components/PlaylistDetails";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Index />} />
          <Route path="/playlist/:spotifyId" element={<PlaylistDetails />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
