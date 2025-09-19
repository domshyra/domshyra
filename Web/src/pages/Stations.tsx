import { Grid, Skeleton, Typography } from "@mui/material";

import PlaylistCard from "@components/playlist/PlaylistCard";
import React from "react";
import { playlist } from "@_types/playlist";
import { useGetPlaylistsQuery } from "@redux/services/spotifyApi";

const Stations = () => {
	const { data: cards, isLoading } = useGetPlaylistsQuery();

	const renderCards = (data: playlist[]) => {
		return data.map((item) => (
			<React.Fragment key={item.playlistId}>
				<Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} pb={2} px={1}>
					<PlaylistCard {...item} />
				</Grid>
			</React.Fragment>
		));
	};

	return (
		<>
			<Typography variant="h3" gutterBottom align="center">
				Stations
			</Typography>
			<Grid container>{!isLoading ? renderCards(cards!) : <Skeleton />}</Grid>
		</>
	);
};

export default Stations;
