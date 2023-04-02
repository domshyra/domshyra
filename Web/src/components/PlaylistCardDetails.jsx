import * as React from "react";

import { Button, Grid } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { PropTypes } from "prop-types";
import Typography from "@mui/material/Typography";
import {renderHeart} from "./HeartRatings";
import { useNavigate } from "react-router-dom";

const PlaylistCardDetails = ({ title, imageURL, description, genre, trackCount, followerCount, ratingIsLoading, playlistRating, playlistId }) => {
	const sectionWidth = 350;
	const cardWidth = sectionWidth * 2;
	const nav = useNavigate();

	const heart = renderHeart(ratingIsLoading, title, playlistRating, playlistId)

	return (
		<>
			<Button onClick={() => nav(`/`)} variant="text" startIcon={<ArrowBackIosIcon />}>
				Back to playlists
			</Button>
			<Grid container justifyContent="center">
				{/* TODO: make card into a class */}
				<Card sx={{ maxWidth: cardWidth, minHeight: 150 }}>
					<CardMedia
						component={AspectRatio}
						ratio="4/3"
						objectFit="contain"
						sx={{ width: cardWidth }}
						image={imageURL}
						alt={`${title} image`}
					/>

					<CardContent sx={{ flex: "1 0 auto", width: cardWidth }}>
						<Typography component="div" variant="h6">
							{title}
						</Typography>
						<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
							{description}
						</Typography>
						{heart()}
						<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
							{genre}
						</Typography>
						<Typography variant="caption" color="text.secondary.light" noWrap align="right">
							{trackCount} tracks{followerCount ? <>, {followerCount} followers</> : null}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</>
	);
};
PlaylistCardDetails.propType = {
	title: PropTypes.string,
	anchorId: PropTypes.string,
	description: PropTypes.string,
	genre: PropTypes.string,
	spotifyMusicLink: PropTypes.string,
	imageURL: PropTypes.string,
	playlistId: PropTypes.string,
	trackAndFollowerText: PropTypes.string,
};

export default PlaylistCardDetails;

