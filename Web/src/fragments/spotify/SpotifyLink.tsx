import { Link, Typography } from "@mui/material";

const SpotifyLink = ({ playlistId, loading }: { playlistId: string; loading: boolean }) => {
	return (
		<Typography variant="subtitle2" color="text.secondary" textAlign="center">
			<Link rel="noopener" target="_blank" href={`https://open.spotify.com/playlist/${playlistId}`} underline="hover">
				{loading ? "Loading..." : "Open in Spotify"}
			</Link>
		</Typography>
	);
};

export default SpotifyLink;
