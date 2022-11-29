import * as React from "react";

import { Box, Button, CardActionArea, CardActions, CardHeader, IconButton, Tooltip } from "@mui/material";

import AspectRatio from '@mui/joy/AspectRatio';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { PropTypes } from "prop-types";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Typography from "@mui/material/Typography";

const PlaylistCard = ({ title, imageURL, description, genre, trackAndFollowerText }) => {
	return (
		<Card sx={{ display: "flex" }}>
			<Box sx={{ display: "flex", flexDirection: "column", width: 215 }}>
				<CardContent sx={{ flex: "1 0 auto" }}>
					<Typography component="div" variant="h5">
						{title}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
						{description}
					</Typography>

				</CardContent>
				<Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
					<Tooltip title={genre}>
					<IconButton aria-label="genre">
						<QueueMusicIcon />
					</IconButton>
					</Tooltip>
					<Typography variant="caption" color="text.secondary.light" noWrap>
						{genre}
					</Typography>
				</Box>
			</Box>
			<Box sx={{ width: 215, overflow: "auto", p: 1, borderRadius: 'md' }}>
				<AspectRatio ratio="4/3" minWidth={120} maxWidth={200} objectFit="contain">
					<img src={imageURL} alt="" />
				</AspectRatio>
			</Box>
			{/* <CardMedia component="img" sx={{ width: 200 }} image={imageURL} alt={`${title} image`} /> */}
		</Card>
	);
};

const PlaylistCardV2 = ({ title, imageURL, description, genre, trackAndFollowerText }) => {
	return (
		<Card sx={{ display: "flex", maxWidth: 430, minHeight: 150 }}>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto", width:215 }}>
					<Typography component="div" variant="h6">
						{title}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
						{description}
					</Typography>

				</CardContent>
				<Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, maxWidth:215 }}>
					<Tooltip title={genre}>
					<IconButton aria-label="genre">
						<QueueMusicIcon />
					</IconButton>
					</Tooltip>
					<Typography variant="caption" color="text.secondary.light" noWrap>
						{genre}
					</Typography>
				</Box>
			</Box>
			{/* <Box sx={{ width: 215, overflow: "auto", p: 1, borderRadius: 'md' }}>
				<AspectRatio ratio="4/3" minWidth={120} maxWidth={200} objectFit="contain">
					<img src={imageURL} alt="" />
				</AspectRatio>
			</Box> */}
			<CardMedia component={AspectRatio} ratio="4/3" objectFit="contain" sx={{ width: 215 }} image={imageURL} alt={`${title} image`} />
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
PlaylistCardV2.propType = {
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
export { PlaylistCardV2 };
