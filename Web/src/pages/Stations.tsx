import { Grid, Typography } from "@mui/material";

import PlaylistCard from "@components/playlist/PlaylistCard";
import { playlist } from "@_types/playlist";
import { useEffect } from "react";
import { useGetPlaylistsQuery } from "@redux/services/spotifyApi";
import useSnackbarMessage from "@hooks/useSnackbarMessage";

const CardGridItem = (props: { children: React.ReactNode; item: playlist }) => {
	const { children, item } = props;
	return (
		<Grid size={{ xs: 12, md: 6, lg: 4 }} pb={2} px={1} key={item.playlistId} justifyContent={"center"} display="flex">
			{children}
		</Grid>
	);
};

const Stations = () => {
	const { data: cards, isLoading, error, isError } = useGetPlaylistsQuery();
	const setSnackbarMessage = useSnackbarMessage();

	useEffect(() => {
		if (isError) {
			setSnackbarMessage({ message: "Error loading stations, please try again later", severity: "error" });
			//TODO: use sentry io
			console.error("Error loading stations", error);
		}
	}, [isError, error, setSnackbarMessage]);

	const renderCards = (data: playlist[]) => {
		return data.map((item) => (
			<CardGridItem item={item} key={item.playlistId}>
				<PlaylistCard {...item} />
			</CardGridItem>
		));
	};

	const loadingCards = Array.from({ length: 3 }, (_, index) => (
		<CardGridItem item={{ playlistId: "" }} key={index}>
			<PlaylistCard playlistId="" loading={true} />
		</CardGridItem>
	));

	return (
		<Grid container spacing={0.5} pb={2} mx={{ xs: 0, md: 2, lg: 4, xl: 6 }}>
			<Typography component="div" variant="h3" textAlign="center" sx={{ width: "100%" }}>
				Stations
			</Typography>
			<Typography component="p" textAlign="center" variant="caption" color="text.secondary" sx={{ width: "100%" }} pb={2}>
				Radio stations I've curated on Spotify for different seasons, moods, and activities.
			</Typography>
			<Grid container sx={{ width: "100%" }}>
				{!isLoading ? renderCards(cards ?? []) : loadingCards}
			</Grid>
		</Grid>
	);
};

export default Stations;
