import * as React from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import HeartRatings from "./HeartRatings";
import { PropTypes } from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

const PlaylistCardDetails = ({ title, imageURL, description, genre, trackAndFollowerText, ratingIsLoading, playlistRating }) => {
	const sectionWidth = 350;
	const cardWidth = sectionWidth * 2;

	return (
		<Card sx={{ maxWidth: cardWidth, minHeight: 150 }}>
			<CardMedia component={AspectRatio} ratio="4/3" objectFit="contain" sx={{ width: sectionWidth }} image={imageURL} alt={`${title} image`} />

			<CardContent sx={{ flex: "1 0 auto", width: sectionWidth }}>
				<Typography component="div" variant="h6">
					{title}
				</Typography>
				<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
					{description}
				</Typography>
				{!ratingIsLoading ? (
					<HeartRatings title={title} rating={playlistRating?.rating ?? 0} />
				) : (
					<Skeleton variant="rectangular" width={100} height={20} />
				)}
				<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
					{genre}
				</Typography>
				<Typography variant="caption" color="text.secondary.light" noWrap align="right">
					{trackAndFollowerText}
				</Typography>
			</CardContent>
		</Card>
	);
};
PlaylistCardDetails.propType = {
	title: PropTypes.string,
	anchorId: PropTypes.string,
	description: PropTypes.string,
	genre: PropTypes.string,
	spotifyMusicLink: PropTypes.string,
	imageURL: PropTypes.string,
	spotifyId: PropTypes.string,
	trackAndFollowerText: PropTypes.string,
};

export default PlaylistCardDetails;
