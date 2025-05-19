import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import PlaylistCard from "@components/playlist/PlaylistCard";
import { playlist } from "@_types/playlist";
import { useGetPlaylistsQuery } from "@redux/services/spotifyApi";

const Radio = () => {
	const [cards, setCards] = useState<JSX.Element[]>([]);
	const { data, isLoading } = useGetPlaylistsQuery();

	useEffect(() => {
		if (!isLoading && data) {
			setCards(renderCards(data));
		}
	}, [data, isLoading]);

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
			<Box sx={{ justifyContent: "center" }}>
				<Typography variant="h3" gutterBottom>
					Playlists
				</Typography>
			</Box>
			<Grid container>{!isLoading ? cards : <Skeleton />}</Grid>
		</>
	);
};

export default Radio;
