import * as React from "react";

import { Button, CardActionArea, CardActions, CardHeader, IconButton } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { PropTypes } from "prop-types";
import Typography from "@mui/material/Typography";

const PlaylistCard = ({ title, imageURL, description, genre, trackAndFollowerText }) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardHeader
					title={title}
					// subheader={trackAndFollowerText}
					action={
						<IconButton aria-label="settings">
							<LibraryAddIcon />
						</IconButton>
					}
				/>
				<CardMedia
					component="img"
					//   height="140"
					image={imageURL}
                    sx={{ width: 151 }}
					alt={`${title} image`}
				/>
				<CardContent>
					<Typography variant="body1" color="text.secondary" gutterBottom>
						{description}
					</Typography>
					<Typography variant="caption" color="text.secondary.light">
						{genre}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
			</CardActions>
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
