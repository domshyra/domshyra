import { Link, Typography } from "@mui/material";

function openInSpotifyText(playlistId) {
	return <Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
		<Link href={`https://open.spotify.com/playlist/${playlistId}`} underline="hover">
			Open in Spotify
		</Link>
	</Typography>;
}

export default openInSpotifyText;