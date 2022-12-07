import * as React from "react";

import { Button, Grid } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import HeartRatings from "./HeartRatings";
import { PropTypes } from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const PlaylistCardDetails = ({ title, imageURL, description, genre, trackAndFollowerText, ratingIsLoading, playlistRating, spotifyId }) => {
	const sectionWidth = 350;
	const cardWidth = sectionWidth * 2;
	const nav = useNavigate();
	return (
		<>
			<Button onClick={() => nav(`/`)} variant="text" startIcon={<ArrowBackIosIcon />}>
				Back Using Nav
			</Button>
			<Grid container justifyContent="center">
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
						{!ratingIsLoading ? (
							<HeartRatings title={title} rating={playlistRating?.rating ?? 0} spotifyId={spotifyId} ratingId={playlistRating?.id} />
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
	spotifyId: PropTypes.string,
	trackAndFollowerText: PropTypes.string,
};

export default PlaylistCardDetails;
