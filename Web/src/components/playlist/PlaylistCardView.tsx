import { Box, Button, Tooltip } from "@mui/material";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SpotifyLink from "@fragments/spotify/SpotifyLink";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

type PlaylistCardProps = {
	title?: string;
	anchorId?: string;
	description?: string;
	genre?: string;
	spotifyMusicLink?: string;
	imageURL?: string;
	playlistId: string;
	trackAndFollowerText?: string;
};

const PlaylistCard = ({ title, imageURL, description, genre, trackAndFollowerText, playlistId }: PlaylistCardProps) => {
	const sectionWidth = 215;
	const cardWidth = sectionWidth * 2;
	const nav = useNavigate();

	return (
		<Card sx={{ display: "flex", maxWidth: cardWidth, minHeight: 200 }} className="Cardbk">
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto", width: sectionWidth }}>
					<Typography
						sx={{ display: { xs: "none", md: "block" } }}
						component="div"
						variant="h6"
						color="primary"
						onClick={() => nav(`/playlist/${playlistId}`)}
					>
						{title}
					</Typography>
					<Typography sx={{ display: { xs: "block", md: "none" } }} component="div" variant="h6" color="text.secondary.light">
						{title}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
						{description}
					</Typography>
					<SpotifyLink playlistId={playlistId} />
					<Typography sx={{ display: { xs: "block", md: "none" } }} component="div" variant="caption" color="text.secondary" align="center">
						{genre}
					</Typography>
					<Typography
						sx={{ display: { xs: "block", md: "none" } }}
						component="div"
						variant="caption"
						color="text.secondary.light"
						align="center"
					>
						{trackAndFollowerText}
					</Typography>
				</CardContent>
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

export default PlaylistCard;
