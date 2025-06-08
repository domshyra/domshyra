import { Button, Grid, Stack } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { PlaylistPhoto } from "@fragments/playlistPhoto/PlaylistPhoto";
import SpotifyLink from "@fragments/spotify/SpotifyLink";
import Typography from "@mui/material/Typography";
import { playlist } from "@_types/playlist";
import { root } from "@constants/routes";
import { useNavigate } from "react-router-dom";

const PlaylistCardDetailsView = ({ title, imageURL, description, genre, trackCount, followerCount, playlistId }: playlist) => {
	const sectionWidth = 350;
	const cardWidth = sectionWidth * 2;
	const nav = useNavigate();

	return (
		<Grid container justifyContent="center">
			<Stack>
				<Button onClick={() => nav(root)} variant="text" startIcon={<ArrowBackIosIcon />}>
					Back to stations
				</Button>

				<Grid container justifyContent="center">
					<Card sx={{ maxWidth: cardWidth, minHeight: 150 }}>
						<PlaylistPhoto imageURL={imageURL} title={title} cardWidth={cardWidth} />

						<CardContent sx={{ flex: "1 0 auto", width: cardWidth }}>
							<Typography component="div" variant="h6">
								{title}
							</Typography>
							<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
								{description}
							</Typography>
							<SpotifyLink playlistId={playlistId} />
							<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
								{genre}
							</Typography>
							<Typography variant="caption" color="text.secondary.light" noWrap align="right">
								{trackCount} tracks{followerCount ? <>, {followerCount} followers</> : null}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Stack>
		</Grid>
	);
};

export default PlaylistCardDetailsView;
