import * as React from "react";

import { Box, Button, Tooltip } from "@mui/material";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { PropTypes } from "prop-types";
import Typography from "@mui/material/Typography";
import openInSpotifyText from "./subcomponets/openInfSpotify";
import { renderHeart } from "./HeartRatings";
import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ title, imageURL, description, genre, trackAndFollowerText, ratingIsLoading, playlistRating, playlistId }) => {
	const sectionWidth = 215;
	const cardWidth = sectionWidth * 2;
	const nav = useNavigate();

	const heart = renderHeart(ratingIsLoading, title, playlistRating, playlistId);

	return (
		// TODO: make card into a class
		<Card sx={{ display: "flex", maxWidth: cardWidth, minHeight: 200 }} className="Cardbk">
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto", width: sectionWidth }}>
					{/* desktop w/ link */}
					<Typography
						sx={{ display: { xs: "none", md: "block" } }}
						component="div"
						variant="h6"
						color="primary"
						onClick={() => nav(`/playlist/${playlistId}`)}
					>
						{title}
					</Typography>
					{/* mobile w/o link */}
					<Typography sx={{ display: { xs: "block", md: "none" } }} component="div" variant="h6" color="text.secondary.light">
						{title}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
						{description}
					</Typography>
					{heart()}
					{openInSpotifyText(playlistId)}
					{/* mobile */}
					<Typography
						sx={{ display: { xs: "block", md: "none" } }}
						component="div"
						variant="caption"
						color="text.secondary"
						align="center"
					>
						{genre}
					</Typography>
					{/* mobile */}
					<Typography component="div" variant="caption" color="text.secondary.light" align="center">
						{trackAndFollowerText}
					</Typography>
				</CardContent>
				{/* desktop */}
				<Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", pl: 1, maxWidth: sectionWidth }}>
					<Tooltip title={genre} placement="bottom-end" arrow>
						<Button aria-label="genre" color="secondary" size="small" startIcon={<MusicNoteIcon />}>
							Genre
						</Button>
					</Tooltip>
					<Typography sx={{ flex: "1 0 auto" }}>{/*left blank for spacing*/}</Typography>
					<Typography variant="caption" color="text.secondary.light" noWrap align="right">
						{trackAndFollowerText}
					</Typography>
				</Box>
			</Box>
			<CardMedia component={AspectRatio} ratio="4/3" objectFit="contain" sx={{ width: sectionWidth }} image={imageURL} alt={`${title} image`} />
		</Card>
	);
};
PlaylistCard.propType = {
	title: PropTypes.string,
	anchorId: PropTypes.string,
	description: PropTypes.string,
	genre: PropTypes.string,
	spotifyMusicLink: PropTypes.string,
	imageURL: PropTypes.string,
	playlistId: PropTypes.string,
	trackAndFollowerText: PropTypes.string,
};

export default PlaylistCard;
