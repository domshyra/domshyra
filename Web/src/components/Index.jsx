import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import PlaylistCard from "./PlaylistCard";
import { useGetPlaylistsQuery } from "../redux/services/spotifyApi";

const Index = () => {

	const { data, isLoading } = useGetPlaylistsQuery();
	const [playlists, setPlaylists] = useState([]);
	const [cards, setCards] = useState([]);

	  useEffect(() => {
			if (!isLoading && data) {
				setPlaylists(data);
				setCards(renderCards(data));
			}
		}, [data, isLoading]);

	

	const rows = (data) => {
		if (!data) {
			return null;
		}
		return data.map((item) => (
			<tr key={item.spotifyId}>
				<td>{item.title}</td>
				<td>{item.description}</td>
				<td>{item.genre}</td>
				<td>{item.trackAndFollowerText}</td>
			</tr>
		));
	};


	const renderCards = (data) => {
		return data.map((item) => (
			<PlaylistCard {...item} key={item.spotifyId}/>
		));
	}

	return (
		<Grid mt={4}>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Genre</th>
						<th>Track count</th>
					</tr>
				</thead>
				<tbody>
					{rows(playlists)}
				</tbody>
			</table>

			{!isLoading ? cards : null}
		</Grid>
	);
};

export default Index;
