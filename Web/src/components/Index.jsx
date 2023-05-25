import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import PlaylistCard from "./PlaylistCardSelfFetching";
import { useGetPlaylistsQuery } from "../redux/services/spotifyApi";
import { useGetRatingsQuery } from "../redux/services/playlistRatingApi";

const Index = () => {
	const { data, isLoading } = useGetPlaylistsQuery();
	const [cards, setCards] = useState([]);

	useGetRatingsQuery();

	useEffect(() => {
		if (!isLoading && data) {
			setCards(renderCards(data));
		}
	}, [data, isLoading]);

	const renderCards = (data) => {
		return data.map((item) => (
			<React.Fragment key={item.playlistId}>
				<Grid item xs={12} md={6} lg={4} xl={3} pb={2} px={1}>
					<PlaylistCard {...item} />
				</Grid>
			</React.Fragment>
		));
	};

	return (
		<>
			<Box sx={{ justifyContent: "center" }}>
				<Typography variant="h3" gutterBottom>
					Playlists
				</Typography>
			</Box>
			<Grid container>{!isLoading ? cards : <Skeleton />}</Grid>
		</>
	);
};

export default Index;
