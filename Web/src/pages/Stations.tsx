import { Grid, Typography } from "@mui/material";

import PlaylistCard from "@components/playlist/PlaylistCard";
import { playlist } from "@_types/playlist";
import { useGetPlaylistsQuery } from "@redux/services/spotifyApi";

const CardGridItem = (props: { children: React.ReactNode; item: playlist }) => {
	const { children, item } = props;
	return (
		<Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} pb={2} px={1} key={item.playlistId} justifyContent={"center"} display="flex">
			{children}
		</Grid>
	);
};

const Stations = () => {
	const { data: cards, isLoading } = useGetPlaylistsQuery();

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
		<Grid container spacing={0.5} pb={2}>
			<Typography component="div" variant="h3" textAlign="center" sx={{ width: "100%" }}>
				Stations
			</Typography>
			<Typography component="p" textAlign="center" variant="caption" color="text.secondary" sx={{ width: "100%" }} pb={2}>
				Radio stations I've curated on Spotify for different seasons, moods, and activities.
			</Typography>
			<Grid container sx={{ width: "100%" }}>
				{!isLoading ? renderCards(cards!) : loadingCards}
			</Grid>
		</Grid>
	);
};

export default Stations;
