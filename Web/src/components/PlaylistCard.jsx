import * as React from "react";

import { Box, Button, Tooltip } from "@mui/material";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { PropTypes } from "prop-types";
import Typography from "@mui/material/Typography";

const PlaylistCard = ({ title, imageURL, description, genre, trackAndFollowerText }) => {
	const sectionWidth = 215;
	const cardWidth = sectionWidth * 2;

	return (
		<Card sx={{ display: "flex", maxWidth: cardWidth, minHeight: 150 }}>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto", width: 215 }}>
					<Typography component="div" variant="h6">
						{title}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
						{description}
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", alignItems: "center", pl: 1, maxWidth: sectionWidth }}>
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
	spotifyId: PropTypes.string,
	trackAndFollowerText: PropTypes.string,
};

export default PlaylistCard;
