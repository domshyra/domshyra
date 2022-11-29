import { Grid, Stack } from "@mui/material";
import PlaylistCard, { PlaylistCardV2 } from "./PlaylistCard";
import React, { useEffect, useState } from "react";

import { useGetPlaylistsQuery } from "../redux/services/spotifyApi";

const Index = () => {

	const { data, isLoading } = useGetPlaylistsQuery();
	const [playlists, setPlaylists] = useState([]);
	const [cards, setCards] = useState([]);
	const [cards2, setCards2] = useState([]);

	  useEffect(() => {
			if (!isLoading && data) {
				setPlaylists(data);
				setCards(renderCards(data));
				setCards2(renderCards2(data));
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
	const renderCards2 = (data) => {
		return data.map((item) => (
			<React.Fragment key={item.spotifyId}>
				<Grid item xs={12} md={6} xl={4} pb={2} px={1}>
					<PlaylistCardV2 {...item} />
				</Grid>
			</React.Fragment>
		));
	};

	return (
		<Grid mt={4}>
			{/* <table className="table table-hover">
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
			</table> */}
{/* 
			<Grid container>
			{!isLoading ? cards : null}
			</Grid> */}

			<Grid container>
			{!isLoading ? cards2 : null}
			</Grid>
		</Grid>
	);
};

export default Index;
