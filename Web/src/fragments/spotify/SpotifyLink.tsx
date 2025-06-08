import { Link, Typography } from "@mui/material";

const SpotifyLink = ({ playlistId }: { playlistId: string }) => {
	return (
		<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
			<Link rel="noopener" target="_blank" href={`https://open.spotify.com/playlist/${playlistId}`} underline="hover">
				Open in Spotify
			</Link>
		</Typography>
	);
};

export default SpotifyLink;
