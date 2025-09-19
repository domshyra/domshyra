import { Box, Button, Skeleton, Tooltip } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { PlaylistPhoto } from "@fragments/playlistPhoto/PlaylistPhoto";
import SpotifyLink from "@fragments/spotify/SpotifyLink";
import Typography from "@mui/material/Typography";
import { stations } from "@constants/routes";
import { useNavigate } from "react-router-dom";

type PlaylistCardProps = {
	anchorId?: string;
	cardWidth: number;
	description?: string;
	genre?: string;
	imageURL?: string;
	playlistId: string;
	sectionWidth: number;
	spotifyMusicLink?: string;
	title?: string;
	trackAndFollowerText?: string;
	loading?: boolean;
};

const PlaylistCard = ({
	title,
	imageURL,
	description,
	genre,
	trackAndFollowerText,
	playlistId,
	sectionWidth,
	cardWidth,
	loading,
}: PlaylistCardProps) => {
	const nav = useNavigate();

	return (
		<Card sx={{ display: "flex", maxWidth: cardWidth, minHeight: 200 }} className="Cardbk">
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto", width: sectionWidth }}>
					<Typography
						sx={{ display: { xs: "none", md: "block" }, cursor: "pointer" }}
						component="div"
						variant="h6"
						color="primary"
						onClick={() => nav(`${stations}/${playlistId}`, { state: { title } })} // Navigate to playlist details
					>
						{loading ? <Skeleton /> : title}
					</Typography>
					<Typography sx={{ display: { xs: "block", md: "none" } }} component="div" variant="h6" color="text.secondary.light">
						{loading ? <Skeleton /> : title}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
						{loading ? <Skeleton /> : description}
					</Typography>
					<SpotifyLink playlistId={playlistId} loading={loading ?? false} />
					<Typography sx={{ display: { xs: "block", md: "none" } }} component="div" variant="caption" color="text.secondary" align="center">
						{loading ? <Skeleton /> : genre}
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
						{loading ? <Skeleton width={25} /> : trackAndFollowerText}
					</Typography>
				</Box>
			</Box>
			<PlaylistPhoto imageURL={imageURL} title={title} cardWidth={cardWidth} loading={loading} />
		</Card>
	);
};

export default PlaylistCard;
